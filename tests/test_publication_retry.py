"""Exercise the actual workflow publish shell with isolated command doubles.
No network calls, remote writes, or production data changes.
This checks retry control flow; it is not a live concurrent-push integration test.
"""
import os
from pathlib import Path
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


def publish_script():
    source = (ROOT / ".github/workflows/data-update.yml").read_text()
    marker = "      - name: Commit generated data with bounded fresh-base retries\n"
    section = source.split(marker, 1)[1].split("        run: |\n", 1)[1]
    return "\n".join(line[10:] for line in section.splitlines())


class PublicationRetryTests(unittest.TestCase):
    def exercise(self, failures, no_changes=False):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            log = root / "commands"
            counter = root / "count"
            bin_dir = root / "bin"
            bin_dir.mkdir()
            git = bin_dir / "git"
            git.write_text("""#!/bin/bash
printf 'git %s\\n' "$*" >> "$TEST_LOG"
if [ "$1" = diff ]; then
  if [ "$NO_CHANGES" = 1 ]; then exit 0; else exit 1; fi
fi
if [ "$1" = push ]; then
  n=0
  if [ -f "$TEST_COUNT" ]; then n=$(cat "$TEST_COUNT"); fi
  n=$((n+1))
  echo "$n" > "$TEST_COUNT"
  if [ "$n" -le "$FAILURES" ]; then exit 1; fi
fi
exit 0
""")
            git.chmod(0o755)
            for name in ("python", "pip"):
                file = bin_dir / name
                file.write_text("#!/bin/bash\nprintf '" + name + " %s\\n' \"$*\" >> \"$TEST_LOG\"\nexit 0\n")
                file.chmod(0o755)
            env = dict(os.environ, PATH=str(bin_dir) + os.pathsep + os.environ["PATH"],
                       TEST_LOG=str(log), TEST_COUNT=str(counter), FAILURES=str(failures),
                       NO_CHANGES="1" if no_changes else "0")
            result = subprocess.run(["bash", "-c", publish_script()], cwd=root, env=env,
                                    text=True, capture_output=True, timeout=10)
            return result, log.read_text().splitlines()

    def test_first_push_success(self):
        result, commands = self.exercise(0)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(commands.count("git push origin HEAD:main"), 1)
        self.assertNotIn("git reset --hard origin/main", commands)

    def test_rejected_push_regenerates_and_revalidates(self):
        result, commands = self.exercise(1)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(commands.count("git push origin HEAD:main"), 2)
        expected = ["git fetch origin main", "git reset --hard origin/main",
                    "pip install -r requirements.txt",
                    "python -m unittest discover -s tests -p test_*.py -v",
                    "python scripts/backfill_missing.py", "python scripts/update_data.py",
                    "python scripts/apply_labels.py", "python scripts/update_market_regime.py",
                    "python scripts/compute_cycle.py",
                    "python scripts/build_theme_change_timeline.py",
                    "python scripts/validate_market_data.py"]
        start = commands.index(expected[0])
        self.assertEqual(commands[start:start+len(expected)], expected)
        self.assertFalse(any("--force" in c for c in commands))

    def test_three_failures_exit_nonzero(self):
        result, commands = self.exercise(3)
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(commands.count("git push origin HEAD:main"), 3)
        self.assertEqual(commands.count("python scripts/validate_market_data.py"), 2)

    def test_no_changes_does_not_commit_or_push(self):
        result, commands = self.exercise(0, no_changes=True)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertFalse(any(c.startswith("git commit") or c.startswith("git push") for c in commands))


if __name__ == "__main__":
    unittest.main()
