#!/usr/bin/env python3
"""Validate generated market outputs; shared by initial and retry execution."""
import json
from pathlib import Path
config = json.loads(Path('config/sectors.json').read_text(encoding='utf-8'))
data = json.loads(Path('data/latest/rotation.json').read_text(encoding='utf-8'))
regime = json.loads(Path('state/market-regime.json').read_text(encoding='utf-8'))
history = json.loads(Path('data/market_history.json').read_text(encoding='utf-8'))
assert len(data.get('sectors', [])) >= 20, f"too few sectors: {len(data.get('sectors', []))}"
configured = {s['id'] for s in config['sectors']}
generated = {s['id'] for s in data['sectors']}
coverage = len(configured & generated) / len(configured)
assert coverage >= 0.75, f"sector coverage too low: {coverage:.1%}"
for s in data['sectors']:
    assert len(s.get('path', [])) >= 5, s.get('id')
assert Path('data/latest/rotation.js').exists()
assert Path('data/market_history.json').exists()
benchmark_rows = (history.get('benchmark') or {}).get('rows') or []
assert benchmark_rows, 'benchmark history is empty'
assert benchmark_rows[-1].get('date') == history.get('market_date'), (benchmark_rows[-1].get('date'), history.get('market_date'))
assert history.get('market_date') == data.get('updated_at'), (history.get('market_date'), data.get('updated_at'))
assert regime.get('as_of') == data.get('updated_at'), (regime.get('as_of'), data.get('updated_at'))
assert regime.get('regime') in {'Strong Bull', 'Bull', 'Range', 'Bear'}
print('validated', data['updated_at'], len(data['sectors']), 'sectors', f'coverage={coverage:.1%}')
