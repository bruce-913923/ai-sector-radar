const svgNS = 'http://www.w3.org/2000/svg';
const trailLayer = document.querySelector('#trailLayer');
const bubbleLayer = document.querySelector('#bubbleLayer');
const playBtn = document.querySelector('#playBtn');
const frameLabel = document.querySelector('#frameLabel');
const rangeBtns = [...document.querySelectorAll('[data-days]')];

let data = null;
let config = null;
let windowDays = 10;
let selectedId = 'ABF';
let playIndex = 0;
let timer = null;
let isPlaying = false;

const sectorColors = {
  ABF: '#2563eb',
  PROBE: '#7c3aed',
  CPO: '#0f766e',
  COOL: '#0891b2',
  CCL: '#e11d48',
  MLCC: '#d97706',
  DRAM: '#16a34a',
  ODM: '#64748b',
  HVDC: '#4f46e5'
};

const labelOffsets = {
  ABF: [10, -10], PROBE: [10, 16], CPO: [10, -10], COOL: [-10, -11],
  CCL: [-10, 17], MLCC: [10, 16], DRAM: [-10, -11], ODM: [10, 16], HVDC: [10, -10]
};

const xScale = v => 62 + (Math.max(0, Math.min(100, v)) / 100) * 646;
const yScale = v => 414 - (Math.max(0, Math.min(100, v)) / 100) * 380;
const quadrant = (x, y) => x >= 50 && y >= 50 ? '領先區' : x < 50 && y >= 50 ? '改善區' : x < 50 && y < 50 ? '落後區' : '弱化區';
const totalPoints = () => data?.sectors?.[0]?.path?.length || 0;
const windowStart = () => Math.max(0, totalPoints() - windowDays);
const windowEnd = () => Math.max(0, totalPoints() - 1);
const currentIndex = () => Math.min(windowEnd(), windowStart() + playIndex);
const sectorMeta = id => config.sectors.find(s => s.id === id) || {};

function svgEl(tag, attrs = {}) {
  const el = document.createElementNS(svgNS, tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
  return el;
}

function colorFor(id) {
  return sectorColors[id] || '#475569';
}

function fullMovement(s) {
  const a = s.path[windowStart()];
  const b = s.path[windowEnd()];
  return {
    dx: b[0] - a[0],
    dy: b[1] - a[1],
    score: (b[0] - a[0]) + (b[1] - a[1]),
    startQ: quadrant(a[0], a[1]),
    endQ: quadrant(b[0], b[1])
  };
}

function ensureNodes() {
  if (bubbleLayer.childElementCount) return;

  data.sectors.forEach(s => {
    const selected = s.id === selectedId;
    const color = colorFor(s.id);
    const g = svgEl('g', {
      class: 'sector-node',
      'data-sector': s.id,
      tabindex: '0',
      role: 'button',
      'aria-label': s.label
    });

    const halo = svgEl('circle', { class: 'node-halo', cx: 0, cy: 0, r: 14, fill: color });
    const core = svgEl('circle', { class: 'node-core', cx: 0, cy: 0, r: 7, fill: color });
    const hit = svgEl('circle', { class: 'node-hit', cx: 0, cy: 0, r: 20, fill: 'transparent' });
    const label = svgEl('text', { class: 'node-label', 'data-label': s.id });
    label.textContent = s.label;

    g.append(halo, core, label, hit);
    g.addEventListener('click', () => {
      selectedId = s.id;
      updateSelection();
      renderDetail();
    });
    g.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectedId = s.id;
        updateSelection();
        renderDetail();
      }
    });
    bubbleLayer.appendChild(g);
  });

  updateSelection();
}

function updateSelection() {
  bubbleLayer.querySelectorAll('.sector-node').forEach(g => {
    g.classList.toggle('selected', g.dataset.sector === selectedId);
  });
  renderTrails();
}

function renderTrails() {
  trailLayer.innerHTML = '';
  const end = currentIndex();
  const start = windowStart();

  data.sectors.forEach(s => {
    const selected = s.id === selectedId;
    const color = colorFor(s.id);
    const pts = s.path.slice(start, end + 1);
    if (pts.length < 2) return;

    pts.slice(1).forEach((p, i) => {
      const prev = pts[i];
      const age = (pts.length - 2) - i;
      const normalized = pts.length <= 2 ? 1 : 1 - age / (pts.length - 1);
      const opacity = selected ? 0.18 + normalized * 0.68 : 0.08 + normalized * 0.48;
      const width = selected ? 2.2 + normalized * 1.4 : 1.25 + normalized * 0.8;
      const line = svgEl('line', {
        class: 'comet-segment',
        x1: xScale(prev[0]),
        y1: yScale(prev[1]),
        x2: xScale(p[0]),
        y2: yScale(p[1]),
        stroke: color,
        'stroke-width': width.toFixed(2),
        opacity: opacity.toFixed(2)
      });
      trailLayer.appendChild(line);
    });
  });
}

function updateNodePositions() {
  ensureNodes();
  const idx = currentIndex();

  data.sectors.forEach(s => {
    const p = s.path[idx];
    const g = bubbleLayer.querySelector(`[data-sector="${s.id}"]`);
    if (!g || !p) return;

    const r = 5.5 + Math.max(0, Math.min(1, (s.heat - 0.8) / 0.9)) * 3.5;
    const core = g.querySelector('.node-core');
    const halo = g.querySelector('.node-halo');
    const label = g.querySelector('.node-label');
    const [dx, dy] = labelOffsets[s.id] || [10, -10];

    core.setAttribute('r', r.toFixed(1));
    halo.setAttribute('r', (r + 6).toFixed(1));
    label.setAttribute('x', dx);
    label.setAttribute('y', dy);
    label.setAttribute('text-anchor', dx < 0 ? 'end' : 'start');
    g.setAttribute('transform', `translate(${xScale(p[0])} ${yScale(p[1])})`);
    g.setAttribute('aria-label', `${s.label}，${quadrant(p[0], p[1])}`);
  });

  renderTrails();
  frameLabel.textContent = `${windowDays}D 循環 · 第 ${playIndex + 1}/${windowDays} 日`;
}

function renderDetail() {
  const s = data.sectors.find(x => x.id === selectedId) || data.sectors[0];
  const m = fullMovement(s);
  const p = s.path[currentIndex()];
  const meta = sectorMeta(s.id);

  document.querySelector('#detailTitle').textContent = meta.name || s.label;
  document.querySelector('#detailTier').textContent = `${meta.tier || ''} · ${(meta.theme || []).join(' / ')}`;
  document.querySelector('#detailQuadrant').textContent = quadrant(p[0], p[1]);
  document.querySelector('#detailDirection').textContent = m.dx > 0 && m.dy > 0 ? '↗↗' : m.dx < 0 && m.dy < 0 ? '↙' : m.dy < 0 ? '↘' : m.dx > 0 ? '→' : '↑';
  document.querySelector('#detailHeat').textContent = `${s.heat.toFixed(2)}×`;
  document.querySelector('#detailBreadth').textContent = `${s.breadth}%`;
  document.querySelector('#detailCatalyst').textContent = meta.catalyst || '—';
  document.querySelector('#stockList').innerHTML = s.stocks.map(st => `
    <div class="stock-row">
      <div><strong>${st.name}</strong><small>${st.ticker} · ${st.role}</small></div>
      <span class="state">${st.state}</span>
    </div>`).join('');
}

function rankRow(o, up) {
  return `<button class="rank-row" data-rank="${o.s.id}">
    <span class="rank-arrow ${up ? 'up' : 'down'}">${up ? '↗' : '↘'}</span>
    <span><strong>${sectorMeta(o.s.id).name || o.s.label}</strong><small>${o.m.startQ} → ${o.m.endQ}</small></span>
    <em>Δ ${o.m.dx >= 0 ? '+' : ''}${o.m.dx.toFixed(0)} / ${o.m.dy >= 0 ? '+' : ''}${o.m.dy.toFixed(0)}</em>
  </button>`;
}

function renderRankings() {
  const all = data.sectors.map(s => ({ s, m: fullMovement(s) }));
  const up = all.filter(o => o.m.dx > 0 && o.m.dy > 0).sort((a, b) => b.m.score - a.m.score).slice(0, 5);
  const down = all.filter(o => o.m.dy < 0 || o.m.dx < 0).sort((a, b) => (a.m.dx + a.m.dy) - (b.m.dx + b.m.dy)).slice(0, 5);

  document.querySelector('#upDays').textContent = windowDays;
  document.querySelector('#downDays').textContent = windowDays;
  document.querySelector('#upRanking').innerHTML = up.map(o => rankRow(o, true)).join('') || '<p>目前沒有一致往右上的族群</p>';
  document.querySelector('#downRanking').innerHTML = down.map(o => rankRow(o, false)).join('') || '<p>目前沒有明顯弱化族群</p>';

  document.querySelectorAll('[data-rank]').forEach(btn => btn.addEventListener('click', () => {
    selectedId = btn.dataset.rank;
    updateSelection();
    renderDetail();
  }));
}

function renderFrame() {
  updateNodePositions();
  renderDetail();
}

function clearTimer() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

function updatePlayButton() {
  playBtn.textContent = isPlaying ? 'Ⅱ 暫停' : '▶ 播放';
  playBtn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
}

function scheduleNext() {
  clearTimer();
  if (!isPlaying) return;

  const atEnd = playIndex >= windowDays - 1;
  timer = setTimeout(() => {
    if (!isPlaying) return;
    playIndex = atEnd ? 0 : playIndex + 1;
    renderFrame();
    scheduleNext();
  }, atEnd ? 1300 : 900);
}

function startPlayback({ reset = false } = {}) {
  clearTimer();
  if (reset) playIndex = 0;
  isPlaying = true;
  updatePlayButton();
  renderFrame();
  scheduleNext();
}

function pausePlayback() {
  isPlaying = false;
  clearTimer();
  updatePlayButton();
}

function setDays(days) {
  windowDays = Math.max(5, Math.min(20, Number(days) || 10));
  playIndex = 0;
  rangeBtns.forEach(b => b.classList.toggle('active', Number(b.dataset.days) === windowDays));
  renderRankings();
  startPlayback({ reset: true });
}

rangeBtns.forEach(btn => btn.addEventListener('click', () => setDays(btn.dataset.days)));
playBtn.addEventListener('click', () => isPlaying ? pausePlayback() : startPlayback());

Promise.all([
  fetch('./data/latest/rotation.json').then(r => r.json()),
  fetch('./config/sectors.json').then(r => r.json())
]).then(([rotation, sectors]) => {
  data = rotation;
  config = sectors;
  selectedId = data.sectors[0]?.id || 'ABF';
  document.querySelector('#dataStatus').textContent = `資料日期 ${data.updated_at} · ${data.source === 'mock' ? 'Prototype 假資料' : '正式資料'}`;
  ensureNodes();
  setDays(data.window_default || 10);
}).catch(err => {
  console.error(err);
  document.querySelector('#dataStatus').textContent = '資料載入失敗，請重新整理頁面。';
});
