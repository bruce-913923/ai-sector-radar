const svgNS = 'http://www.w3.org/2000/svg';
const chart = document.querySelector('#rotationChart');
const trailLayer = document.querySelector('#trailLayer');
const bubbleLayer = document.querySelector('#bubbleLayer');
const playBtn = document.querySelector('#playBtn');
const frameLabel = document.querySelector('#frameLabel');
const rangeBtns = [...document.querySelectorAll('[data-days]')];
const filterBtns = [...document.querySelectorAll('[data-filter]')];
const filterStatus = document.querySelector('#filterStatus');

let data = null;
let config = { sectors: [], groups: [] };
let windowDays = 10;
let selectedId = 'ABF';
let activeFilter = 'core';
let isPlaying = true;
let rafId = null;
let cycleStart = 0;
let pausedElapsed = 0;
let lastDetailStep = -1;

const SEGMENT_MS = 700;

// The default view intentionally focuses on the highest-value AI rotation nodes.
// "全部" remains available for the complete 30+ node industry chain.
const CORE_IDS = new Set([
  'HBM_EXTENSION', 'SERVER_DRAM', 'AI_STORAGE',
  'ABF', 'T_GLASS', 'CCL', 'HVLP', 'AI_PCB',
  'PROBE', 'TEST_SOCKET',
  'LIQUID_COOLING', 'OPTICAL_1P6T', 'CPO', 'AI_ASIC'
]);

const palette = [
  '#60a5fa', '#a78bfa', '#2dd4bf', '#22d3ee', '#fb7185', '#fbbf24',
  '#4ade80', '#94a3b8', '#818cf8', '#f472b6', '#38bdf8', '#c084fc',
  '#34d399', '#f59e0b', '#a3e635', '#67e8f9', '#fda4af', '#93c5fd'
];

const labelPositions = [[11, -10], [11, 17], [-11, -10], [-11, 17]];

const xScale = v => 62 + (Math.max(0, Math.min(100, v)) / 100) * 646;
const yScale = v => 414 - (Math.max(0, Math.min(100, v)) / 100) * 380;
const quadrant = (x, y) => x >= 50 && y >= 50 ? '領先區' : x < 50 && y >= 50 ? '改善區' : x < 50 && y < 50 ? '落後區' : '弱化區';
const sectorMeta = id => config.sectors.find(s => s.id === id) || {};
const clamp01 = v => Math.max(0, Math.min(1, v));

function hashId(id) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

function colorFor(id) {
  return palette[hashId(id) % palette.length];
}

function labelOffset(id) {
  return labelPositions[hashId(id) % labelPositions.length];
}

function svgEl(tag, attrs = {}) {
  const el = document.createElementNS(svgNS, tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
  return el;
}

function addGrid() {
  if (chart.querySelector('#gridLayer')) return;
  const g = svgEl('g', { id: 'gridLayer' });
  [25, 75].forEach(v => {
    g.appendChild(svgEl('line', { x1: xScale(v), y1: 34, x2: xScale(v), y2: 414, stroke: 'rgba(148,163,184,.075)', 'stroke-width': 1 }));
    g.appendChild(svgEl('line', { x1: 62, y1: yScale(v), x2: 708, y2: yScale(v), stroke: 'rgba(148,163,184,.075)', 'stroke-width': 1 }));
  });
  chart.insertBefore(g, trailLayer);
}

function idsForFilter(filterId) {
  if (!data) return new Set();
  if (filterId === 'all') return new Set(data.sectors.map(s => s.id));
  if (filterId === 'core') return new Set(data.sectors.map(s => s.id).filter(id => CORE_IDS.has(id)));
  const group = (config.groups || []).find(g => g.id === filterId);
  return new Set((group?.sectors || []).filter(id => data.sectors.some(s => s.id === id)));
}

function visibleSectors() {
  const ids = idsForFilter(activeFilter);
  const list = data?.sectors?.filter(s => ids.has(s.id)) || [];
  return list.length ? list : (data?.sectors || []);
}

function minAvailablePoints() {
  const list = visibleSectors();
  if (!list.length) return 0;
  return Math.min(...list.map(s => s.path?.length || 0));
}

function pathStart(s) {
  return Math.max(0, s.path.length - windowDays);
}

function pathEnd(s) {
  return Math.max(0, s.path.length - 1);
}

function fullMovement(s) {
  const a = s.path[pathStart(s)];
  const b = s.path[pathEnd(s)];
  if (!a || !b) return { dx: 0, dy: 0, score: 0, startQ: '—', endQ: '—' };
  return { dx: b[0] - a[0], dy: b[1] - a[1], score: (b[0] - a[0]) + (b[1] - a[1]), startQ: quadrant(a[0], a[1]), endQ: quadrant(b[0], b[1]) };
}

function catmullScalar(p0, p1, p2, p3, t) {
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}

function pointAt(s, segment, progress) {
  const start = pathStart(s);
  const end = pathEnd(s);
  const i1 = Math.min(end, start + segment);
  const i2 = Math.min(end, i1 + 1);
  const i0 = Math.max(start, i1 - 1);
  const i3 = Math.min(end, i2 + 1);
  const p0 = s.path[i0], p1 = s.path[i1], p2 = s.path[i2], p3 = s.path[i3];
  const t = clamp01(progress);
  return [catmullScalar(p0[0], p1[0], p2[0], p3[0], t), catmullScalar(p0[1], p1[1], p2[1], p3[1], t)];
}

function trailPointsAt(s, segment, progress) {
  const start = pathStart(s);
  const end = pathEnd(s);
  const upto = Math.min(end, start + segment);
  const pts = s.path.slice(start, upto + 1).map(p => [xScale(p[0]), yScale(p[1])]);
  const live = pointAt(s, segment, progress);
  if (progress > .002 && upto < end) pts.push([xScale(live[0]), yScale(live[1])]);
  return pts;
}

function smoothPath(points) {
  if (!points.length) return '';
  if (points.length === 1) return `M ${points[0][0]} ${points[0][1]}`;
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i], p1 = points[i], p2 = points[i + 1], p3 = points[i + 2] || p2;
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6, cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6, cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d;
}

function ensureNodes() {
  if (bubbleLayer.childElementCount) return;
  data.sectors.forEach(s => {
    const color = colorFor(s.id);
    const g = svgEl('g', { class: 'sector-node', 'data-sector': s.id, tabindex: '0', role: 'button', 'aria-label': s.label });
    const halo = svgEl('circle', { class: 'node-halo', cx: 0, cy: 0, r: 14, fill: color });
    const core = svgEl('circle', { class: 'node-core', cx: 0, cy: 0, r: 7, fill: color });
    const hit = svgEl('circle', { class: 'node-hit', cx: 0, cy: 0, r: 23, fill: 'transparent' });
    const label = svgEl('text', { class: 'node-label' });
    label.textContent = s.label;
    g.append(halo, core, label, hit);
    g.addEventListener('click', () => { selectedId = s.id; updateSelection(); renderDetail(lastDetailStep < 0 ? 0 : lastDetailStep); });
    g.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); selectedId = s.id; updateSelection(); renderDetail(lastDetailStep < 0 ? 0 : lastDetailStep);
      }
    });
    bubbleLayer.appendChild(g);
  });
  applyFilter(false);
}

function updateSelection() {
  bubbleLayer.querySelectorAll('.sector-node').forEach(g => g.classList.toggle('selected', g.dataset.sector === selectedId));
}

function applyFilter(restart = false) {
  if (!data) return;
  const visible = visibleSectors();
  const ids = new Set(visible.map(s => s.id));
  bubbleLayer.querySelectorAll('.sector-node').forEach(g => g.classList.toggle('filtered-out', !ids.has(g.dataset.sector)));
  filterBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === activeFilter));
  chart.classList.toggle('dense-mode', visible.length > 17);

  if (!ids.has(selectedId)) selectedId = visible[0]?.id || data.sectors[0]?.id;
  updateSelection();

  const available = minAvailablePoints();
  if (available && windowDays > available) windowDays = available;
  rangeBtns.forEach(b => {
    const wanted = Number(b.dataset.days);
    b.disabled = wanted > available;
    b.classList.toggle('active', wanted === windowDays);
  });

  if (filterStatus) filterStatus.textContent = `顯示 ${visible.length} / ${data.sectors.length} 個產業節點`;
  renderRankings();
  renderDetail(lastDetailStep < 0 ? 0 : Math.min(lastDetailStep, windowDays - 1));

  if (restart) {
    renderAnimationFrame(0);
    startPlayback({ reset: true });
  } else {
    const elapsed = isPlaying ? performance.now() - cycleStart : pausedElapsed;
    renderAnimationFrame(elapsed);
  }
}

function renderTrails(segment, progress) {
  trailLayer.innerHTML = '';
  visibleSectors().forEach(s => {
    const selected = s.id === selectedId, color = colorFor(s.id), pts = trailPointsAt(s, segment, progress);
    if (pts.length < 2) return;
    const d = smoothPath(pts);
    trailLayer.append(
      svgEl('path', { d, fill: 'none', stroke: color, 'stroke-width': selected ? 8 : 6, opacity: selected ? .075 : .035, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
      svgEl('path', { d, fill: 'none', stroke: color, 'stroke-width': selected ? 2.35 : 1.45, opacity: selected ? .86 : .44, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    );
  });
}

function renderNodes(segment, progress) {
  visibleSectors().forEach(s => {
    const p = pointAt(s, segment, progress), g = bubbleLayer.querySelector(`[data-sector="${s.id}"]`);
    if (!g) return;
    const r = 5.3 + Math.max(0, Math.min(1, (s.heat - .8) / .9)) * 3.2;
    const core = g.querySelector('.node-core'), halo = g.querySelector('.node-halo'), label = g.querySelector('.node-label');
    const [dx, dy] = labelOffset(s.id);
    core.setAttribute('r', r.toFixed(1)); halo.setAttribute('r', (r + 6.5).toFixed(1));
    label.setAttribute('x', dx); label.setAttribute('y', dy); label.setAttribute('text-anchor', dx < 0 ? 'end' : 'start');
    g.setAttribute('transform', `translate(${xScale(p[0]).toFixed(2)} ${yScale(p[1]).toFixed(2)})`);
    g.setAttribute('aria-label', `${s.label}，${quadrant(p[0], p[1])}`);
  });
}

function renderDetail(step) {
  const visible = visibleSectors();
  const s = data.sectors.find(x => x.id === selectedId) || visible[0] || data.sectors[0];
  if (!s) return;
  const idx = Math.min(pathEnd(s), pathStart(s) + step), p = s.path[idx], m = fullMovement(s), meta = sectorMeta(s.id);
  document.querySelector('#detailTitle').textContent = meta.name || s.label;
  document.querySelector('#detailTier').textContent = `${meta.tier || ''}${meta.tier ? ' · ' : ''}${(meta.theme || []).join(' / ')}`;
  document.querySelector('#detailQuadrant').textContent = p ? quadrant(p[0], p[1]) : '—';
  document.querySelector('#detailDirection').textContent = m.dx > 0 && m.dy > 0 ? '↗↗' : m.dx < 0 && m.dy < 0 ? '↙' : m.dy < 0 ? '↘' : m.dx > 0 ? '→' : '↑';
  document.querySelector('#detailHeat').textContent = `${s.heat.toFixed(2)}×`;
  document.querySelector('#detailBreadth').textContent = `${s.breadth}%`;
  document.querySelector('#detailCatalyst').textContent = meta.catalyst || '—';
  document.querySelector('#stockList').innerHTML = s.stocks.map(st => `<div class="stock-row"><div><strong>${st.name}</strong><small>${st.ticker} · ${st.role}</small></div><span class="state">${st.state}</span></div>`).join('');
}

function rankRow(o, up) {
  return `<button class="rank-row" data-rank="${o.s.id}"><span class="rank-arrow ${up ? 'up' : 'down'}">${up ? '↗' : '↘'}</span><span><strong>${sectorMeta(o.s.id).name || o.s.label}</strong><small>${o.m.startQ} → ${o.m.endQ}</small></span><em>Δ ${o.m.dx >= 0 ? '+' : ''}${o.m.dx.toFixed(0)} / ${o.m.dy >= 0 ? '+' : ''}${o.m.dy.toFixed(0)}</em></button>`;
}

function renderRankings() {
  if (!data) return;
  const all = visibleSectors().map(s => ({ s, m: fullMovement(s) }));
  const up = all.filter(o => o.m.dx > 0 && o.m.dy > 0).sort((a, b) => b.m.score - a.m.score).slice(0, 5);
  const down = all.filter(o => o.m.dy < 0 || o.m.dx < 0).sort((a, b) => (a.m.dx + a.m.dy) - (b.m.dx + b.m.dy)).slice(0, 5);
  document.querySelector('#upDays').textContent = windowDays; document.querySelector('#downDays').textContent = windowDays;
  document.querySelector('#upRanking').innerHTML = up.map(o => rankRow(o, true)).join('') || '<p>目前沒有一致往右上的族群</p>';
  document.querySelector('#downRanking').innerHTML = down.map(o => rankRow(o, false)).join('') || '<p>目前沒有明顯弱化族群</p>';
  document.querySelectorAll('[data-rank]').forEach(btn => btn.addEventListener('click', () => { selectedId = btn.dataset.rank; updateSelection(); renderDetail(lastDetailStep < 0 ? 0 : lastDetailStep); }));
}

function cycleDuration() { return Math.max(1, windowDays - 1) * SEGMENT_MS; }

function renderAnimationFrame(elapsed) {
  const duration = cycleDuration();
  const wrapped = ((elapsed % duration) + duration) % duration;
  const segment = Math.min(windowDays - 2, Math.floor(wrapped / SEGMENT_MS));
  const progress = (wrapped - segment * SEGMENT_MS) / SEGMENT_MS;
  const step = Math.min(windowDays - 1, segment + (progress >= .5 ? 1 : 0));
  renderTrails(segment, progress); renderNodes(segment, progress);
  frameLabel.textContent = `${windowDays}D 自動循環 · ${segment + 1}/${windowDays}`;
  if (step !== lastDetailStep) { lastDetailStep = step; renderDetail(step); }
}

function tick(now) {
  if (!isPlaying) return;
  renderAnimationFrame(now - cycleStart);
  rafId = requestAnimationFrame(tick);
}

function updatePlayButton() { playBtn.textContent = isPlaying ? 'Ⅱ 暫停' : '▶ 播放'; playBtn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false'); }

function startPlayback({ reset = false } = {}) {
  if (rafId) cancelAnimationFrame(rafId);
  const now = performance.now();
  if (reset) pausedElapsed = 0;
  cycleStart = now - pausedElapsed; isPlaying = true; updatePlayButton(); rafId = requestAnimationFrame(tick);
}

function pausePlayback() {
  if (!isPlaying) return;
  pausedElapsed = (performance.now() - cycleStart) % cycleDuration(); isPlaying = false;
  if (rafId) cancelAnimationFrame(rafId); rafId = null; updatePlayButton();
}

function setDays(days) {
  const available = minAvailablePoints();
  windowDays = Math.min(available, Math.max(5, Math.min(20, Number(days) || 10)));
  lastDetailStep = -1;
  rangeBtns.forEach(b => { const wanted = Number(b.dataset.days); b.disabled = wanted > available; b.classList.toggle('active', wanted === windowDays); });
  renderRankings(); renderAnimationFrame(0); startPlayback({ reset: true });
}

rangeBtns.forEach(btn => btn.addEventListener('click', () => setDays(btn.dataset.days)));
filterBtns.forEach(btn => btn.addEventListener('click', () => { activeFilter = btn.dataset.filter; lastDetailStep = -1; applyFilter(true); }));
playBtn.addEventListener('click', () => isPlaying ? pausePlayback() : startPlayback());

document.addEventListener('visibilitychange', () => {
  if (document.hidden && isPlaying) { pausePlayback(); document.body.dataset.autoResume = '1'; }
  else if (!document.hidden && document.body.dataset.autoResume === '1') { delete document.body.dataset.autoResume; startPlayback(); }
});

async function fetchJson(url) {
  const r = await fetch(url, { cache: 'no-cache' });
  if (!r.ok) throw new Error(`${url} ${r.status}`);
  return r.json();
}

async function boot() {
  try {
    data = window.__RADAR_DATA__ || await fetchJson('./data/latest/rotation.json');
    const coreFirst = data.sectors.find(s => CORE_IDS.has(s.id));
    selectedId = coreFirst?.id || data.sectors[0]?.id || 'ABF';
    document.querySelector('#dataStatus').textContent = `資料日期 ${data.updated_at} · ${data.source === 'mock' ? 'Prototype 假資料' : '正式市場資料'}`;
    addGrid(); ensureNodes(); setDays(data.window_default || 10);

    try {
      config = await fetchJson('./config/sectors.json');
      applyFilter(false);
    } catch (configErr) {
      console.warn('Sector metadata loaded late or unavailable', configErr);
    }
  } catch (err) {
    console.error(err);
    document.querySelector('#dataStatus').textContent = '資料載入失敗，請重新整理頁面。';
  }
}

boot();
