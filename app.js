const DISPLAY_TERMS = [["rolling price adjustment","滾動式調價"],["design-win confirmation","設計導入確認"],["Insufficient Evidence","證據不足"],["Mass Production Ready","量產準備就緒"],["Secondary Beneficiary","次要受惠公司"],["Thesis Strengthening","投資論點增強"],["Primary Beneficiary","主要受惠公司"],["Market Theme Radar","市場主線雷達"],["Insufficient Data","資料不足"],["forward valuation","預期估值"],["FactSet via Cnyes","FactSet（鉅亨引述）"],["customer adoption","客戶採用"],["coverage universe","涵蓋範圍"],["Thesis Weakening","投資論點轉弱"],["mass production","量產"],["Packaging Proxy","封裝代理標的"],["research agenda","研究議程"],["Fab Engineering","廠務工程"],["memory content","記憶體搭載量"],["Server Chassis","伺服器機殼"],["production mix","量產產品組合"],["custom silicon","客製化晶片"],["Enterprise SSD","企業級SSD"],["enterprise SSD","企業級SSD"],["coaxial socket","同軸測試座"],["Active Themes","當期研究主線"],["Thesis Intact","投資論點維持"],["Thesis Broken","投資論點失效"],["EPS consensus","EPS共識預估"],["EPS revisions","EPS預估修正"],["qualification","資格認證"],["Heat Spreader","均熱片"],["AI Networking","AI網路設備"],["Active Theme","當期研究主線"],["Positive Gap","正向預期差"],["Negative Gap","負向預期差"],["EPS revision","EPS預估修正"],["design-ready","設計就緒"],["trailing P/E","近四季本益比"],["Contradicted","有反證"],["Accelerating","加速"],["gross margin","毛利率"],["gross profit","毛利"],["wafer volume","晶圓投片量"],["AI ecosystem","AI生態系"],["constituents","成分公司"],["Server DRAM","伺服器DRAM"],["Server DDR5","伺服器DDR5"],["Server DIMM","伺服器記憶體模組"],["Client DRAM","用戶端DRAM"],["cycle proxy","景氣循環代理標的"],["forward EPS","未來年度EPS預估"],["reservation","產能預留"],["overbooking","重複下單"],["utilization","稼動率"],["Unconfirmed","未確認"],["Power Shelf","電源機框"],["Test Socket","測試座"],["Physical AI","實體AI"],["Server Rail","伺服器滑軌"],["custom ASIC","客製化ASIC"],["Data Center","資料中心"],["Test Proxy","測試代理標的"],["forward PE","預估本益比"],["Unverified","未驗證"],["Probe Card","探針卡"],["AI Storage","AI儲存"],["design win","設計導入"],["net income","淨利"],["networking","網路設備"],["boot drive","開機儲存裝置"],["Power Semi","功率半導體"],["probe card","探針卡"],["percentile","百分位"],["AI server","AI伺服器"],["High Beta","高彈性"],["consensus","共識預估"],["lead time","交期"],["Confirmed","已確認"],["Candidate","候選"],["Watchlist","觀察名單"],["diffusion","產業擴散"],["AI Optics","AI光通訊"],["Scale-out","橫向擴充"],["discovery","新題材探索"],["tape-out","設計定案投片"],["baseline","研究基礎"],["timeline","時程"],["capacity","產能"],["forecast","預估"],["revision","預估修正"],["Deferred","暫緩"],["Emerging","新興"],["Balanced","大致反映"],["momentum","動能"],["Registry","題材庫"],["Scale-up","縱向擴充"],["backlog","在手訂單"],["margins","利潤率"],["revenue","營收"],["Partial","部分確認"],["Updated","已更新"],["Dormant","休眠"],["Crowded","預期偏熱"],["breadth","參與廣度"],["Edge AI","邊緣AI"],["coaxial","同軸"],["burn-in","老化測試"],["agenda","研究議程"],["thesis","投資論點"],["margin","利潤率"],["Queued","待研究"],["Mature","成熟"],["Leader","龍頭"],["server","伺服器"],["client","用戶端"],["AI ODM","AI伺服器代工"],["Non-IT","非資訊設備"],["Watch","觀察"],["Fab工程","廠務工程"],["EPS本值","EPS預估值"],["AI PC","AI個人電腦"],["TWII","加權指數"],["rack","機櫃"],["ramp","量產爬坡"],["gate","條件"],["mix","產品組合"],["ASP","平均售價"],["YoY","年增率"],["QoQ","季增率"],["MoM","月增率"],["RS","相對強度"]];
function displayChinese(value) {
  let s=String(value || '');
  for (const [from,to] of DISPLAY_TERMS) {
    const escaped=from.replace(/[.*+?^$\{\}()|[\]\\]/g,'\\$&');
    s=s.replace(new RegExp('\\b'+escaped+'\\b','gi'),to);
  }
  return s;
}
const DISPLAY_NAMES = {"ADVANCED_NODE":{"label":"先進製程","name":"AI 先進製程"},"AI_ASIC":{"label":"AI客製晶片","name":"AI客製化晶片"},"HBM_EXTENSION":{"label":"HBM鏈","name":"HBM / HBM4 台股延伸鏈"},"SERVER_DRAM":{"label":"DRAM","name":"伺服器DRAM"},"AI_STORAGE":{"label":"AI儲存","name":"企業級SSD與AI儲存"},"ABF":{"label":"ABF","name":"ABF 高階載板"},"T_GLASS":{"label":"低介電玻纖布","name":"低膨脹、低介電玻纖布（T-Glass）"},"CCL":{"label":"M8/M9 CCL","name":"M8 / M9 高速 CCL"},"HVLP":{"label":"HVLP銅箔","name":"HVLP 高階銅箔"},"AI_PCB":{"label":"AI電路板","name":"AI高多層PCB與高密度互連"},"COWOS":{"label":"CoWoS","name":"CoWoS / 2.5D / 3D 先進封裝"},"PACKAGING_EQUIP":{"label":"封裝設備","name":"先進封裝設備"},"PROBE":{"label":"探針卡","name":"探針卡"},"TEST_SOCKET":{"label":"測試座","name":"測試座與測試介面"},"HANDLER":{"label":"AI測試","name":"AI測試分選與自動化"},"LIQUID_COOLING":{"label":"液冷","name":"液冷、冷板與分流管"},"HEAT_SPREADER":{"label":"均熱片","name":"均熱片與高階散熱機構"},"CDU_HEAT_EXCHANGER":{"label":"熱交換器","name":"冷卻液分配與熱交換器（CDU）"},"MLCC":{"label":"MLCC","name":"高階 MLCC"},"PSU":{"label":"電源機框","name":"高功率電源與電源機框"},"HVDC_800V":{"label":"800V直流供電","name":"800V高壓直流供電"},"BBU":{"label":"備援電池","name":"備援電池模組（BBU）"},"OPTICAL_1P6T":{"label":"1.6T光通訊","name":"1.6T 光通訊 / EML"},"CPO":{"label":"共封裝光學","name":"共封裝光學與矽光子"},"AI_NETWORKING":{"label":"AI網路設備","name":"AI乙太網路交換器"},"CONNECTOR":{"label":"高速連接","name":"高速連接器與線纜"},"AI_ODM":{"label":"AI伺服器代工","name":"AI伺服器代工與機櫃組裝"},"CHASSIS":{"label":"伺服器機殼","name":"AI伺服器機殼"},"RAIL":{"label":"伺服器滑軌","name":"伺服器滑軌"},"FAB_ENGINEERING":{"label":"廠務工程","name":"AI半導體廠務工程"},"EDGE_AI":{"label":"邊緣AI","name":"邊緣AI與工業AI"},"PHYSICAL_AI":{"label":"實體AI","name":"機器人與實體AI"},"GRID_POWER_EQUIPMENT":{"label":"重電電網","name":"重電 / 電網設備"},"DEFENSE_UNMANNED_SYSTEMS":{"label":"國防無人載具","name":"國防無人載具 / 自主系統"},"LEO_SATELLITE":{"label":"低軌衛星","name":"低軌衛星與非地面通訊"},"BULK_SHIPPING":{"label":"散裝航運","name":"散裝航運"}};
const DISPLAY_ROLES = {"Cloud AI Custom Silicon":"雲端AI客製化晶片","Advanced Packaging Equipment / Integration":"先進封裝設備與整合","Advanced Packaging Automation / Material Handling":"先進封裝自動化與搬運","Cycle Proxy":"景氣循環觀察標的","Glass Fiber Yarn / Cloth Supplier":"玻纖紗／布供應商","CCL / Electronic Materials Supplier":"銅箔基板與電子材料供應商","AI Server / High-layer PCB":"AI伺服器與高多層PCB","MLCC Conductive Paste Supplier":"MLCC導電膏供應商","AI Server PSU":"AI伺服器電源","AI Server Power Manufacturing":"AI伺服器電源製造","AI Data Center Power / Power Shelf":"AI資料中心電源與電源機框","1MW / 800V HVDC Power System":"1MW／800V高壓直流供電系統","Laser Packaging / 800G-1.6T Supply Chain":"雷射封裝與800G–1.6T供應鏈","ELSFP External Laser Source Candidate":"ELSFP外部雷射光源候選","AI Server ODM":"AI伺服器代工","AI Server / NeoCloud ODM":"AI伺服器與新型雲端業者代工","AI Server System":"AI伺服器系統","AI Server / Rack System":"AI伺服器與機櫃系統","AI Server System / ODM":"AI伺服器系統與代工","Fab System Integration / Engineering":"廠務系統整合與工程","Ultra-pure Water / Wastewater Engineering":"超純水與廢水工程","High-tech Fab Engineering":"高科技廠務工程","Edge AI SoC Platform":"邊緣AI系統單晶片平台","Joint Module / Reducer Supplier":"關節模組與減速機供應商","AI Vision / Perception":"AI視覺與感知","Humanoid Actuation / Motion Components":"人形機器人致動與運動零組件","Humanoid Robot / Joint Module / Automation":"人形機器人、關節模組與自動化","Transformer Leader":"變壓器龍頭","GIS / Substation":"氣體絕緣開關與變電站","Power Distribution":"配電設備","AIDC Power / Electrical Infrastructure":"AI資料中心電力基礎設施","Power Infrastructure / AIDC Integration":"電力基礎設施與AI資料中心整合","System Integrator":"系統整合商","UAS / Propulsion":"無人機系統與動力","AI Vision / Drone System":"AI視覺與無人機系統","USV / Shipbuilding":"無人水面載具與造船","RF / Microwave / Waveguide Components":"射頻、微波與波導零組件","Satellite PCB / HDI":"衛星PCB與高密度互連","LEO User Terminal / Network Equipment":"低軌衛星用戶終端與網路設備","Satellite Power":"衛星電源","Satellite Service / Ground Network":"衛星服務與地面網路","Multi-Orbit Satellite Service":"多軌道衛星服務","Satellite / Multi-orbit Electronics Manufacturing":"衛星與多軌道電子製造","LEO Satellite Power":"低軌衛星電源","Dry Bulk Owner / Fleet Renewal":"散裝船東與船隊汰換","Dry Bulk Owner / Energy-efficient Fleet":"散裝船東與節能船隊","Dry Bulk Operator / Mid-small Vessel Exposure":"散裝航運與中小型船運","Liquid Cooling Beneficiary":"液冷受惠公司","Heat Exchanger / Thermal":"熱交換器與散熱","Leader":"龍頭","Primary Beneficiary":"主要受惠公司","Secondary Beneficiary":"次要受惠公司","High Beta":"高彈性","Packaging Proxy":"封裝觀察標的","Test Proxy":"測試觀察標的","Candidate":"候選","Member":"成員"};
function localizeSectorLabels(value) {
  for (const sector of value?.sectors || []) {
    if (DISPLAY_NAMES[sector.id]) sector.label=DISPLAY_NAMES[sector.id].label;
  }
  return value;
}
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
let focusedId = null;
let activeFilter = 'core';
let isPlaying = true;
let rafId = null;
let cycleStart = 0;
let pausedElapsed = 0;
let lastDetailStep = -1;

const SEGMENT_MS = 700;

const CORE_IDS = new Set([
  'HBM_EXTENSION', 'SERVER_DRAM', 'AI_STORAGE',
  'ABF', 'T_GLASS', 'CCL', 'HVLP', 'AI_PCB',
  'PROBE', 'TEST_SOCKET',
  'LIQUID_COOLING', 'OPTICAL_1P6T', 'CPO', 'AI_ASIC'
]);

const FALLBACK_GROUPS = {
  silicon: ['ADVANCED_NODE', 'AI_ASIC'],
  memory: ['HBM_EXTENSION', 'SERVER_DRAM', 'AI_STORAGE'],
  pcb: ['ABF', 'T_GLASS', 'CCL', 'HVLP', 'AI_PCB'],
  packaging: ['COWOS', 'PACKAGING_EQUIP', 'PROBE', 'TEST_SOCKET', 'HANDLER'],
  cooling_power: ['LIQUID_COOLING', 'HEAT_SPREADER', 'CDU_HEAT_EXCHANGER', 'MLCC', 'PSU', 'HVDC_800V', 'BBU'],
  networking: ['OPTICAL_1P6T', 'CPO', 'AI_NETWORKING', 'CONNECTOR'],
  system: ['AI_ODM', 'CHASSIS', 'RAIL'],
  fab_infra: ['FAB_ENGINEERING'],
  extension: ['EDGE_AI', 'PHYSICAL_AI']
};

const FILTER_LABELS = {
  core: '核心主線', all: '全部', silicon: '半導體', memory: '記憶體', pcb: 'PCB / 材料',
  packaging: '封裝測試', cooling_power: '散熱 / 電源', networking: '光通訊 / 網路',
  system: '伺服器', fab_infra: '廠務工程', extension: 'AI 延伸'
};

const palette = [
  '#60a5fa', '#a78bfa', '#2dd4bf', '#22d3ee', '#fb7185', '#fbbf24',
  '#4ade80', '#94a3b8', '#818cf8', '#f472b6', '#38bdf8', '#c084fc',
  '#34d399', '#f59e0b', '#a3e635', '#67e8f9', '#fda4af', '#93c5fd'
];
const labelPositions = [[11, -10], [11, 17], [-11, -10], [-11, 17]];

const xScale = v => 62 + (Math.max(0, Math.min(100, v)) / 100) * 646;
const yScale = v => 414 - (Math.max(0, Math.min(100, v)) / 100) * 380;
const quadrant = (x, y) => x >= 50 && y >= 50 ? '領先區' : x < 50 && y >= 50 ? '改善區' : x < 50 && y < 50 ? '落後區' : '弱化區';
const sectorMeta = id => { const s=config.sectors.find(s => s.id === id) || {}; return {...s, name:DISPLAY_NAMES[id]?.name || s.name}; };
const clamp01 = v => Math.max(0, Math.min(1, v));

function hashId(id) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) { h ^= id.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h >>> 0);
}
function colorFor(id) { return palette[hashId(id) % palette.length]; }
function labelOffset(id) { return labelPositions[hashId(id) % labelPositions.length]; }
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
  const configured = (config.groups || []).find(g => g.id === filterId)?.sectors;
  const desired = configured?.length ? configured : (FALLBACK_GROUPS[filterId] || []);
  return new Set(desired.filter(id => data.sectors.some(s => s.id === id)));
}

function visibleSectors() {
  const ids = idsForFilter(activeFilter);
  const list = data?.sectors?.filter(s => ids.has(s.id)) || [];
  return list.length ? list : (data?.sectors || []);
}

function chartSectors() {
  const visible = visibleSectors();
  if (!focusedId) return visible;
  return visible.filter(s => s.id === focusedId);
}

function minAvailablePoints() {
  const list = visibleSectors();
  return list.length ? Math.min(...list.map(s => s.path?.length || 0)) : 0;
}
function pathStart(s) { return Math.max(0, s.path.length - windowDays); }
function pathEnd(s) { return Math.max(0, s.path.length - 1); }

function fullMovement(s) {
  const a = s.path[pathStart(s)], b = s.path[pathEnd(s)];
  if (!a || !b) return { dx: 0, dy: 0, score: 0, startQ: '—', endQ: '—' };
  return { dx: b[0] - a[0], dy: b[1] - a[1], score: (b[0] - a[0]) + (b[1] - a[1]), startQ: quadrant(a[0], a[1]), endQ: quadrant(b[0], b[1]) };
}

function catmullScalar(p0, p1, p2, p3, t) {
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}
function pointAt(s, segment, progress) {
  const start = pathStart(s), end = pathEnd(s);
  const i1 = Math.min(end, start + segment), i2 = Math.min(end, i1 + 1), i0 = Math.max(start, i1 - 1), i3 = Math.min(end, i2 + 1);
  const p0 = s.path[i0], p1 = s.path[i1], p2 = s.path[i2], p3 = s.path[i3], t = clamp01(progress);
  return [catmullScalar(p0[0], p1[0], p2[0], p3[0], t), catmullScalar(p0[1], p1[1], p2[1], p3[1], t)];
}
function trailPointsAt(s, segment, progress) {
  const start = pathStart(s), end = pathEnd(s), upto = Math.min(end, start + segment);
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

function currentElapsed() {
  return isPlaying ? performance.now() - cycleStart : pausedElapsed;
}

function updateChartNodeVisibility() {
  const visibleIds = new Set(visibleSectors().map(s => s.id));
  bubbleLayer.querySelectorAll('.sector-node').forEach(g => {
    const inFilter = visibleIds.has(g.dataset.sector);
    const inFocus = !focusedId || g.dataset.sector === focusedId;
    g.classList.toggle('filtered-out', !inFilter);
    g.classList.toggle('focused-out', inFilter && !inFocus);
    g.style.display = inFilter && inFocus ? '' : 'none';
  });
  chart.classList.toggle('focus-mode', Boolean(focusedId));
  chart.classList.toggle('dense-mode', !focusedId && visibleIds.size > 17);
}

function updateSelection() {
  bubbleLayer.querySelectorAll('.sector-node').forEach(g => g.classList.toggle('selected', g.dataset.sector === selectedId));
}

function focusSector(id) {
  if (!visibleSectors().some(s => s.id === id)) return;
  focusedId = id;
  selectedId = id;
  updateChartNodeVisibility();
  updateSelection();
  renderDetail(lastDetailStep < 0 ? 0 : lastDetailStep);
  renderAnimationFrame(currentElapsed());
}

function clearFocus() {
  if (!focusedId) return;
  focusedId = null;
  updateChartNodeVisibility();
  renderAnimationFrame(currentElapsed());
}

function ensureNodes() {
  if (bubbleLayer.childElementCount) return;
  data.sectors.forEach(s => {
    const color = colorFor(s.id);
    const g = svgEl('g', { class: 'sector-node', 'data-sector': s.id, tabindex: '0', role: 'button', 'aria-label': s.label });
    const halo = svgEl('circle', { class: 'node-halo', cx: 0, cy: 0, r: 14, fill: color });
    const core = svgEl('circle', { class: 'node-core', cx: 0, cy: 0, r: 7, fill: color });
    const hit = svgEl('circle', { class: 'node-hit', cx: 0, cy: 0, r: 23, fill: 'transparent' });
    const label = svgEl('text', { class: 'node-label' }); label.textContent = s.label;
    g.append(halo, core, label, hit);
    g.addEventListener('click', e => {
      e.stopPropagation();
      focusSector(s.id);
    });
    g.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        focusSector(s.id);
      }
    });
    bubbleLayer.appendChild(g);
  });
  applyFilter(false);
}

function applyFilter(restart = false) {
  if (!data) return;
  const visible = visibleSectors(), ids = new Set(visible.map(s => s.id));
  if (focusedId && !ids.has(focusedId)) focusedId = null;
  updateChartNodeVisibility();
  filterBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === activeFilter));

  if (!ids.has(selectedId)) selectedId = visible[0]?.id || data.sectors[0]?.id;
  updateSelection();

  const available = minAvailablePoints();
  if (available && windowDays > available) windowDays = available;
  rangeBtns.forEach(b => { const wanted = Number(b.dataset.days); b.disabled = wanted > available; b.classList.toggle('active', wanted === windowDays); });

  if (filterStatus) filterStatus.textContent = `${FILTER_LABELS[activeFilter] || activeFilter} · ${visible.length} / ${data.sectors.length} 個節點`;
  renderRankings();
  renderDetail(lastDetailStep < 0 ? 0 : Math.min(lastDetailStep, windowDays - 1));

  if (restart) { renderAnimationFrame(0); startPlayback({ reset: true }); }
  else { renderAnimationFrame(currentElapsed()); }
}

function renderTrails(segment, progress) {
  trailLayer.innerHTML = '';
  chartSectors().forEach(s => {
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
  chartSectors().forEach(s => {
    const p = pointAt(s, segment, progress), g = bubbleLayer.querySelector(`[data-sector="${s.id}"]`);
    if (!g) return;
    const r = 5.3 + Math.max(0, Math.min(1, (s.heat - .8) / .9)) * 3.2;
    const core = g.querySelector('.node-core'), halo = g.querySelector('.node-halo'), label = g.querySelector('.node-label'), [dx, dy] = labelOffset(s.id);
    core.setAttribute('r', r.toFixed(1)); halo.setAttribute('r', (r + 6.5).toFixed(1)); label.setAttribute('x', dx); label.setAttribute('y', dy); label.setAttribute('text-anchor', dx < 0 ? 'end' : 'start');
    g.setAttribute('transform', `translate(${xScale(p[0]).toFixed(2)} ${yScale(p[1]).toFixed(2)})`);
    g.setAttribute('aria-label', `${s.label}，${quadrant(p[0], p[1])}`);
  });
}

function renderDetail(step) {
  const visible = visibleSectors(), s = data.sectors.find(x => x.id === selectedId) || visible[0] || data.sectors[0];
  if (!s) return;
  const idx = Math.min(pathEnd(s), pathStart(s) + step), p = s.path[idx], m = fullMovement(s), meta = sectorMeta(s.id);
  document.querySelector('#detailTitle').textContent = meta.name || s.label;
  document.querySelector('#detailTier').textContent = `${meta.tier || ''}${meta.tier ? ' · ' : ''}${(meta.theme || []).map(displayChinese).join(' / ')}`;
  document.querySelector('#detailQuadrant').textContent = p ? quadrant(p[0], p[1]) : '—';
  document.querySelector('#detailDirection').textContent = m.dx > 0 && m.dy > 0 ? '↗↗' : m.dx < 0 && m.dy < 0 ? '↙' : m.dy < 0 ? '↘' : m.dx > 0 ? '→' : '↑';
  document.querySelector('#detailHeat').textContent = `${s.heat.toFixed(2)}×`;
  document.querySelector('#detailBreadth').textContent = `${s.breadth}%`;
  document.querySelector('#detailCatalyst').textContent = displayChinese(meta.catalyst) || '—';
  document.querySelector('#stockList').innerHTML = s.stocks.map(st => `<div class="stock-row"><div><strong>${st.name}</strong><small>${st.ticker} · ${DISPLAY_ROLES[st.role] || displayChinese(st.role)}</small></div><span class="state">${st.state}</span></div>`).join('');
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
  document.querySelectorAll('[data-rank]').forEach(btn => btn.addEventListener('click', () => focusSector(btn.dataset.rank)));
}

function cycleDuration() { return Math.max(1, windowDays - 1) * SEGMENT_MS; }
function renderAnimationFrame(elapsed) {
  const duration = cycleDuration(), wrapped = ((elapsed % duration) + duration) % duration;
  const segment = Math.min(windowDays - 2, Math.floor(wrapped / SEGMENT_MS)), progress = (wrapped - segment * SEGMENT_MS) / SEGMENT_MS;
  const step = Math.min(windowDays - 1, segment + (progress >= .5 ? 1 : 0));
  renderTrails(segment, progress); renderNodes(segment, progress);
  if (focusedId) {
    const focused = data?.sectors?.find(s => s.id === focusedId);
    const name = sectorMeta(focusedId).name || focused?.label || focusedId;
    frameLabel.textContent = `聚焦：${name} · 點圖表空白處或 Esc 返回`;
  } else {
    frameLabel.textContent = `${windowDays}日 自動循環 · ${segment + 1}/${windowDays}`;
  }
  if (step !== lastDetailStep) { lastDetailStep = step; renderDetail(step); }
}
function tick(now) { if (!isPlaying) return; renderAnimationFrame(now - cycleStart); rafId = requestAnimationFrame(tick); }
function updatePlayButton() { playBtn.textContent = isPlaying ? 'Ⅱ 暫停' : '▶ 播放'; playBtn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false'); }
function startPlayback({ reset = false } = {}) {
  if (rafId) cancelAnimationFrame(rafId);
  const now = performance.now(); if (reset) pausedElapsed = 0;
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
filterBtns.forEach(btn => btn.addEventListener('click', () => {
  focusedId = null;
  activeFilter = btn.dataset.filter;
  lastDetailStep = -1;
  applyFilter(true);
}));
playBtn.addEventListener('click', () => isPlaying ? pausePlayback() : startPlayback());

chart.addEventListener('click', e => {
  if (e.target.closest?.('.sector-node')) return;
  clearFocus();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') clearFocus();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden && isPlaying) { pausePlayback(); document.body.dataset.autoResume = '1'; }
  else if (!document.hidden && document.body.dataset.autoResume === '1') { delete document.body.dataset.autoResume; startPlayback(); }
});

async function fetchJson(url) {
  const sep = url.includes('?') ? '&' : '?';
  const r = await fetch(`${url}${sep}_=${Date.now()}`, { cache: 'no-store' });
  if (!r.ok) throw new Error(`${url} ${r.status}`);
  return r.json();
}

function replaceData(fresh) {
  if (!fresh?.sectors?.length) return;
  data = localizeSectorLabels(fresh);
  bubbleLayer.innerHTML = '';
  const visibleIds = idsForFilter(activeFilter);
  if (!visibleIds.has(selectedId)) selectedId = visibleSectors()[0]?.id || data.sectors[0]?.id;
  if (focusedId && !visibleIds.has(focusedId)) focusedId = null;
  ensureNodes();
  applyFilter(true);
  document.querySelector('#dataStatus').textContent = `資料日期 ${data.updated_at} · 正式市場資料`;
}

async function boot() {
  try {
    data = localizeSectorLabels(window.__RADAR_DATA__ || await fetchJson('./data/latest/rotation.json'));
    const coreFirst = data.sectors.find(s => CORE_IDS.has(s.id));
    selectedId = coreFirst?.id || data.sectors[0]?.id || 'ABF';
    document.querySelector('#dataStatus').textContent = `資料日期 ${data.updated_at} · ${data.source === 'mock' ? '示範資料' : '正式市場資料'}`;
    addGrid(); ensureNodes(); setDays(data.window_default || 10);

    fetchJson('./config/sectors.json').then(meta => {
      config = meta;
      applyFilter(false);
    }).catch(err => console.warn('Sector metadata unavailable', err));

    // Always reconcile against a no-store JSON fetch. rotation.js gives instant paint;
    // this request guarantees daily Actions updates are not hidden by Pages/browser cache.
    fetchJson('./data/latest/rotation.json').then(fresh => {
      if (!data.generated_at || fresh.generated_at !== data.generated_at || fresh.sectors.length !== data.sectors.length) replaceData(fresh);
    }).catch(err => console.warn('Fresh market data reconciliation failed', err));
  } catch (err) {
    console.error(err);
    document.querySelector('#dataStatus').textContent = '資料載入失敗，請重新整理頁面。';
  }
}

boot();
