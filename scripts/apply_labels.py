#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / 'config' / 'sectors.json'
ROTATION = ROOT / 'data' / 'latest' / 'rotation.json'
ROTATION_JS = ROOT / 'data' / 'latest' / 'rotation.js'


def main():
    config = json.loads(CONFIG.read_text(encoding='utf-8'))
    rotation = json.loads(ROTATION.read_text(encoding='utf-8'))

    meta = {s['id']: s for s in config.get('sectors', [])}
    group_by_sector = {}
    for group in config.get('groups', []):
        for sid in group.get('sectors', []):
            group_by_sector[sid] = group.get('id')

    for sector in rotation.get('sectors', []):
        sid = sector.get('id')
        cfg = meta.get(sid, {})
        sector['label'] = cfg.get('label') or sector.get('label') or sid
        sector['group'] = group_by_sector.get(sid)

    ROTATION.write_text(json.dumps(rotation, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    ROTATION_JS.write_text(
        'window.__RADAR_DATA__ = ' + json.dumps(rotation, ensure_ascii=False, separators=(',', ':')) + ';\n',
        encoding='utf-8'
    )
    print(f"applied labels/groups to {len(rotation.get('sectors', []))} sectors")


if __name__ == '__main__':
    main()
