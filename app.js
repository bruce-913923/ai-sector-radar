const svgNS = 'http://www.w3.org/2000/svg';
const chart = document.querySelector('#rotationChart');
const trailLayer = document.querySelector('#trailLayer');
const bubbleLayer = document.querySelector('#bubbleLayer');
const playBtn = document.querySelector('#playBtn');
const frameLabel = document.querySelector('#frameLabel');
const rangeBtns = [...document.querySelectorAll('[data-days]')];

let data = null;
let config = null;
let windowDays = 10;
let selectedId = 'ABF';
let isPlaying = true;
let rafId = null;
let cycleStart = 0;
let pausedElapsed = 0;
let lastDetailStep = -1;

const SEGMENT_MS = 1050;
const END_HOLD_MS = 1100;

const sectorColors = {
  ABF: '#60a5fa',
  PROBE: '#a78bfa',
  CPO: '#2dd4bf',
  LIQUID_COOLING: '#22d3ee',
  CCL: '#fb7185',
  MLCC: '#fbbf24',
  SERVER_DRAM: '#4ade80',
  AI_ODM: '#94a3b8',
  HVDC_800V: '#818cf8'
};

const labelOffsets = {
  ABF: [11, -10],
  PROBE: [11, 16],
  CPO: [11, -10],
  LIQUID_COOLING: [-11, -10],
  CCL: [-11, 17],
  MLCC: [11, 17],
  SERVER_DRAM: [-11, -10],
  AI_ODM: [11, 17],
  HVDC_800V: [11, -10]
};

const xScale = v => 62 + (Math.max(0, Math.min(100, v)) / 100) * 646;
const yScale = v => 414 - (Math.max(0, Math.min(100, v)) / 100) * 380;
const quadrant = (x, y) => x >= 50 && y >= 50 ? '領先區' : x < 50 && y >= 50 ? '改善區' : x < 50 && y < 50 ? '落後區' : '弱化區';
const totalPoints = () => data?.sectors?.[0]?.path?.length || 0;
const windowStart = () => Math.max(0, totalPoints() - windowDays);
const windowEnd = () => Math.max(0, totalPoints() - 1);
const sectorMeta = id => config.sectors.find(s => s.id === id) || {};
const colorFor = id => sectorColors[id] || '#7dd3fc';
const clamp01 = v => Math.max(0, Math.min(1, v));
const ease = t => {
  t = clamp01(t);
  return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
const lerp = (a, b, t) => a + (b - a) * t;

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

function pointAt(s, segment, progress) {
  const start = windowStart();
  const aIndex = Math.min(windowEnd(), start + segment);
  const bIndex = Math.min(windowEnd(), aIndex + 1);
  const a = s.path[aIndex];
  const b = s.path[bIndex];
  const t = ease(progress);
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
}

function trailPointsAt(s, segment, progress) {
  const start = windowStart();
  const upto = Math.min(windowEnd(), start + segment);
  const pts = s.path.slice(start, upto + 1).map(p => [xScale(p[0]), yScale(p[1])]);
  const live = pointAt(s, segment, progress);
  const livePx = [xScale(live[0]), yScale(live[1])];
  if (progress > .002 && upto < windowEnd()) pts.push(livePx);
  return pts;
}

function smoothPath(points) {
  if (!points.length) return '';
  if (points.length === 1) return `M ${points[0][0]} ${points[0][1]}`;
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d;
}

function ensureNodes() {
  if (bubbleLayer.childElementCount) return;

  data.sectors.forEach(s => {
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
    const hit = svgEl('circle', { class: 'node-hit', cx: 0, cy: 0, r: 23, fill: 'transparent' });
    const label = svgEl('text', { class: 'node-label' });
    label.textContent = s.label;
    g.append(halo, core, label, hit);

    g.addEventListener('click', () => {
      selectedId = s.id;
      updateSelection();
      renderDetail(lastDetailStep < 0 ? 0 : lastDetailStep);
    });
    g.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectedId = s.id;
        updateSelection();
        renderDetail(lastDetailStep < 0 ? 0 : lastDetailStep);
      }
    });
    bubbleLayer.appendChild(g);
  });
  updateSelection();
}

function updateSelection() {
  bubbleLayer.querySelectorAll('.sector-node').forEach(g => g.classList.toggle('selected', g.dataset.sector === selectedId));
}

function renderTrails(segment, progress) {
  trailLayer.innerHTML = '';

  data.sectors.forEach(s => {
    const selected = s.id === selectedId;
    const color = colorFor(s.id);
    const pts = trailPointsAt(s, segment, progress);
    if (pts.length < 2) return;
    const d = smoothPath(pts);

    const glow = svgEl('path', {
      d,
      fill: 'none',
      stroke: color,
      'stroke-width': selected ? 8 : 6,
      opacity: selected ? .075 : .035,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    });
    const line = svgEl('path', {
      d,
      fill: 'none',
      stroke: color,
      'stroke-width': selected ? 2.35 : 1.45,
      opacity: selected ? .86 : .44,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    });
    trailLayer.append(glow, line);
  });
}

function renderNodes(segment, progress) {
  data.sectors.forEach(s => {
    const p = pointAt(s, segment, progress);
    const g = bubbleLayer.querySelector(`[data-sector="${s.id}"]`);
    if (!g) return;
    const r = 5.3 + Math.max(0, Math.min(1, (s.heat - .8) / .9)) * 3.2;
    const core = g.querySelector('.node-core');
    const halo = g.querySelector('.node-halo');
    const label = g.querySelector('.node-label');
    const [dx, dy] = labelOffsets[s.id] || [11, -10];

    core.setAttribute('r', r.toFixed(1));
    halo.setAttribute('r', (r + 6.5).toFixed(1));
    label.setAttribute('x', dx);
    label.setAttribute('y', dy);
    label.setAttribute('text-anchor', dx < 0 ? 'end' : 'start');
    g.setAttribute('transform', `translate(${xScale(p[0]).toFixed(2)} ${yScale(p[1]).toFixed(2)})`);
    g.setAttribute('aria-label', `${s.label}，${quadrant(p[0], p[1])}`);
  });
}

function renderDetail(step) {
  const s = data.sectors.find(x => x.id === selectedId) || data.sectors[0];
  const idx = Math.min(windowEnd(), windowStart() + step);
  const p = s.path[idx];
  const m = fullMovement(s);
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
    renderDetail(lastDetailStep < 0 ? 0 : lastDetailStep);
  }));
}

function cycleDuration() {
  return Math.max(1, windowDays - 1) * SEGMENT_MS + END_HOLD_MS;
}

function renderAnimationFrame(elapsed) {
  const motionDuration = Math.max(1, windowDays - 1) * SEGMENT_MS;
  let segment;
  let progress;
  let step;

  if (elapsed >= motionDuration) {
    segment = Math.max(0, windowDays - 2);
    progress = 1;
    step = windowDays - 1;
  } else {
    segment = Math.min(windowDays - 2, Math.floor(elapsed / SEGMENT_MS));
    progress = (elapsed - segment * SEGMENT_MS) / SEGMENT_MS;
    step = Math.min(windowDays - 1, segment + (progress >= .55 ? 1 : 0));
  }

  renderTrails(segment, progress);
  renderNodes(segment, progress);
  frameLabel.textContent = `${windowDays}D 自動循環 · ${Math.min(windowDays, segment + 1 + (progress > .96 ? 1 : 0))}/${windowDays}`;

  if (step !== lastDetailStep) {
    lastDetailStep = step;
    renderDetail(step);
  }
}

function tick(now) {
  if (!isPlaying) return;
  const duration = cycleDuration();
  const elapsed = (now - cycleStart) % duration;
  renderAnimationFrame(elapsed);
  rafId = requestAnimationFrame(tick);
}

function updatePlayButton() {
  playBtn.textContent = isPlaying ? 'Ⅱ 暫停' : '▶ 播放';
  playBtn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
}

function startPlayback({ reset = false } = {}) {
  if (rafId) cancelAnimationFrame(rafId);
  const now = performance.now();
  if (reset) pausedElapsed = 0;
  cycleStart = now - pausedElapsed;
  isPlaying = true;
  updatePlayButton();
  rafId = requestAnimationFrame(tick);
}

function pausePlayback() {
  if (!isPlaying) return;
  pausedElapsed = (performance.now() - cycleStart) % cycleDuration();
  isPlaying = false;
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  updatePlayButton();
}

function setDays(days) {
  windowDays = Math.max(5, Math.min(20, Number(days) || 10));
  lastDetailStep = -1;
  rangeBtns.forEach(b => b.classList.toggle('active', Number(b.dataset.days) === windowDays));
  renderRankings();
  renderAnimationFrame(0);
  startPlayback({ reset: true });
}

rangeBtns.forEach(btn => btn.addEventListener('click', () => setDays(btn.dataset.days)));
playBtn.addEventListener('click', () => isPlaying ? pausePlayback() : startPlayback());

document.addEventListener('visibilitychange', () => {
  if (document.hidden && isPlaying) {
    pausePlayback();
    document.body.dataset.autoResume = '1';
  } else if (!document.hidden && document.body.dataset.autoResume === '1') {
    delete document.body.dataset.autoResume;
    startPlayback();
  }
});

Promise.all([
  fetch('./data/latest/rotation.json').then(r => {
    if (!r.ok) throw new Error(`rotation.json ${r.status}`);
    return r.json();
  }),
  fetch('./config/sectors.json').then(r => {
    if (!r.ok) throw new Error(`sectors.json ${r.status}`);
    return r.json();
  })
]).then(([rotation, sectors]) => {
  data = rotation;
  config = sectors;
  selectedId = data.sectors[0]?.id || 'ABF';
  document.querySelector('#dataStatus').textContent = `資料日期 ${data.updated_at} · ${data.source === 'mock' ? 'Prototype 假資料' : '正式資料'}`;
  addGrid();
  ensureNodes();
  setDays(data.window_default || 10);
}).catch(err => {
  console.error(err);
  document.querySelector('#dataStatus').textContent = '資料載入失敗，請重新整理頁面。';
});
