const DISPLAY_TERMS = [["coverage","涵蓋範圍"],["Theme","題材"],["Packaging","封裝"],["median","中位數"],["mean","平均數"],["rolling price adjustment","滾動式調價"],["design-win confirmation","設計導入確認"],["Insufficient Evidence","證據不足"],["Mass Production Ready","量產準備就緒"],["Secondary Beneficiary","次要受惠公司"],["Thesis Strengthening","投資論點增強"],["Primary Beneficiary","主要受惠公司"],["Market Theme Radar","市場主線雷達"],["Insufficient Data","資料不足"],["forward valuation","預期估值"],["FactSet via Cnyes","FactSet（鉅亨引述）"],["customer adoption","客戶採用"],["coverage universe","涵蓋範圍"],["Thesis Weakening","投資論點轉弱"],["mass production","量產"],["Packaging Proxy","封裝代理標的"],["research agenda","研究議程"],["Fab Engineering","廠務工程"],["memory content","記憶體搭載量"],["Server Chassis","伺服器機殼"],["production mix","量產產品組合"],["custom silicon","客製化晶片"],["Enterprise SSD","企業級SSD"],["enterprise SSD","企業級SSD"],["coaxial socket","同軸測試座"],["Active Themes","當期研究主線"],["Thesis Intact","投資論點維持"],["Thesis Broken","投資論點失效"],["EPS consensus","EPS共識預估"],["EPS revisions","EPS預估修正"],["qualification","資格認證"],["Heat Spreader","均熱片"],["AI Networking","AI網路設備"],["Active Theme","當期研究主線"],["Positive Gap","正向預期差"],["Negative Gap","負向預期差"],["EPS revision","EPS預估修正"],["design-ready","設計就緒"],["trailing P/E","近四季本益比"],["Contradicted","有反證"],["Accelerating","加速"],["gross margin","毛利率"],["gross profit","毛利"],["wafer volume","晶圓投片量"],["AI ecosystem","AI生態系"],["constituents","成分公司"],["Server DRAM","伺服器DRAM"],["Server DDR5","伺服器DDR5"],["Server DIMM","伺服器記憶體模組"],["Client DRAM","用戶端DRAM"],["cycle proxy","景氣循環代理標的"],["forward EPS","未來年度EPS預估"],["reservation","產能預留"],["overbooking","重複下單"],["utilization","稼動率"],["Unconfirmed","未確認"],["Power Shelf","電源機框"],["Test Socket","測試座"],["Physical AI","實體AI"],["Server Rail","伺服器滑軌"],["custom ASIC","客製化ASIC"],["Data Center","資料中心"],["Test Proxy","測試代理標的"],["forward PE","預估本益比"],["Unverified","未驗證"],["Probe Card","探針卡"],["AI Storage","AI儲存"],["design win","設計導入"],["net income","淨利"],["networking","網路設備"],["boot drive","開機儲存裝置"],["Power Semi","功率半導體"],["probe card","探針卡"],["percentile","百分位"],["AI server","AI伺服器"],["High Beta","高彈性"],["consensus","共識預估"],["lead time","交期"],["Confirmed","已確認"],["Candidate","候選"],["Watchlist","觀察名單"],["diffusion","產業擴散"],["AI Optics","AI光通訊"],["Scale-out","橫向擴充"],["discovery","新題材探索"],["tape-out","設計定案投片"],["baseline","研究基礎"],["timeline","時程"],["capacity","產能"],["forecast","預估"],["revision","預估修正"],["Deferred","暫緩"],["Emerging","新興"],["Balanced","大致反映"],["momentum","動能"],["Registry","題材庫"],["Scale-up","縱向擴充"],["backlog","在手訂單"],["margins","利潤率"],["revenue","營收"],["Partial","部分確認"],["Updated","已更新"],["Dormant","休眠"],["Crowded","預期偏熱"],["breadth","參與廣度"],["Edge AI","邊緣AI"],["coaxial","同軸"],["burn-in","老化測試"],["agenda","研究議程"],["thesis","投資論點"],["margin","利潤率"],["Queued","待研究"],["Mature","成熟"],["Leader","龍頭"],["server","伺服器"],["client","用戶端"],["AI ODM","AI伺服器代工"],["Non-IT","非資訊設備"],["Watch","觀察"],["Fab工程","廠務工程"],["EPS本值","EPS預估值"],["AI PC","AI個人電腦"],["TWII","加權指數"],["rack","機櫃"],["ramp","量產爬坡"],["gate","條件"],["mix","產品組合"],["ASP","平均售價"],["YoY","年增率"],["QoQ","季增率"],["MoM","月增率"],["RS","相對強度"]];
function displayChinese(value) {
  let s=String(value || '');
  for (const [from,to] of DISPLAY_TERMS) {
    const escaped=from.replace(/[.*+?^$\{\}()|[\]\\]/g,'\\$&');
    s=s.replace(new RegExp('\\b'+escaped+'\\b','gi'),to);
  }
  return s;
}
const PATHS = {
  queue: '../state/research-queue.json',
  timeline: '../state/theme-change-timeline.json',
  priority: '../state/priority-candidates.json',
  cycle: '../data/latest/cycle.json',
  regime: '../state/market-regime.json',
  registry: '../registry/themes.json',
  market: '../state/market-theme-map.json',
  research: '../state/theme-research.json',
  active: '../state/active-themes.json',
  diffusion: '../state/diffusion-candidates.json',
  expectation: '../state/expectation-gap.json'
};

const store = { window: 244, sort: 'status', openId: null };

const PHASE = { L: '強勢', W: '退燒', I: '升溫', G: '冷門' };
const PHASE_COLOR = { L: 'var(--strong)', W: 'var(--fading)', I: 'var(--warming)', G: 'var(--cold)' };
const PERSONALITY = {
  trend: { label: '長趨勢型', hint: '一年多數時間贏大盤，回檔後常再轉強' },
  breakout: { label: '盤整爆發型', hint: '長期盤整後才轉強，轉強後常走得久' },
  choppy: { label: '強弱交替型', hint: '轉強後通常撐不久，偏短打' },
  weak: { label: '長期弱勢型', hint: '一年多數時間輸大盤' },
  swing: { label: '波段型', hint: '強弱交替約數週一輪' }
};
const TURN = { ready: '就緒', brewing: '醞釀', watch: '觀察', none: '無訊號' };
const QUALITY = { strong: '品質強', normal: '品質普通', weak: '品質弱' };
const EXIT = { alert: '警戒', caution: '注意', stable: '穩' };
const EXIT_INK = { alert: 'ink-green', caution: 'ink-amber', stable: 'ink-red' };
const STOCK_STATE = {
  READY: '接近前高', '過熱': '強勢加速（離月線 14% 以上）', '推進中': '上漲中', '改善中': '站上月線',
  '整理中': '月線下整理', '轉弱': '跌破季線', '資料不足': '資料不足'
};
const ROLE = {
  Leader: '龍頭', 'High Beta': '高彈性', Candidate: '候選', Member: '成員',
  'Primary Beneficiary': '主要受惠', 'Secondary Beneficiary': '次要受惠', 'Packaging Proxy': '封裝代理', 'Test Proxy': '測試代理'
};
Object.assign(ROLE, {
  "Cloud AI Custom Silicon": "雲端AI客製化晶片",
  "Advanced Packaging Equipment / Integration": "先進封裝設備與整合",
  "Advanced Packaging Automation / Material Handling": "先進封裝自動化與搬運",
  "Cycle Proxy": "景氣循環觀察標的",
  "Glass Fiber Yarn / Cloth Supplier": "玻纖紗／布供應商",
  "CCL / Electronic Materials Supplier": "銅箔基板與電子材料供應商",
  "AI Server / High-layer PCB": "AI伺服器與高多層PCB",
  "MLCC Conductive Paste Supplier": "MLCC導電膏供應商",
  "AI Server PSU": "AI伺服器電源",
  "AI Server Power Manufacturing": "AI伺服器電源製造",
  "AI Data Center Power / Power Shelf": "AI資料中心電源與電源機框",
  "1MW / 800V HVDC Power System": "1MW／800V高壓直流供電系統",
  "Laser Packaging / 800G-1.6T Supply Chain": "雷射封裝與800G–1.6T供應鏈",
  "ELSFP External Laser Source Candidate": "ELSFP外部雷射光源候選",
  "AI Server ODM": "AI伺服器代工",
  "AI Server / NeoCloud ODM": "AI伺服器與新型雲端業者代工",
  "AI Server System": "AI伺服器系統",
  "AI Server / Rack System": "AI伺服器與機櫃系統",
  "AI Server System / ODM": "AI伺服器系統與代工",
  "Fab System Integration / Engineering": "廠務系統整合與工程",
  "Ultra-pure Water / Wastewater Engineering": "超純水與廢水工程",
  "High-tech Fab Engineering": "高科技廠務工程",
  "Edge AI SoC Platform": "邊緣AI系統單晶片平台",
  "Joint Module / Reducer Supplier": "關節模組與減速機供應商",
  "AI Vision / Perception": "AI視覺與感知",
  "Humanoid Actuation / Motion Components": "人形機器人致動與運動零組件",
  "Humanoid Robot / Joint Module / Automation": "人形機器人、關節模組與自動化",
  "Transformer Leader": "變壓器龍頭",
  "GIS / Substation": "氣體絕緣開關與變電站",
  "Power Distribution": "配電設備",
  "AIDC Power / Electrical Infrastructure": "AI資料中心電力基礎設施",
  "Power Infrastructure / AIDC Integration": "電力基礎設施與AI資料中心整合",
  "System Integrator": "系統整合商",
  "UAS / Propulsion": "無人機系統與動力",
  "AI Vision / Drone System": "AI視覺與無人機系統",
  "USV / Shipbuilding": "無人水面載具與造船",
  "RF / Microwave / Waveguide Components": "射頻、微波與波導零組件",
  "Satellite PCB / HDI": "衛星PCB與高密度互連",
  "LEO User Terminal / Network Equipment": "低軌衛星用戶終端與網路設備",
  "Satellite Power": "衛星電源",
  "Satellite Service / Ground Network": "衛星服務與地面網路",
  "Multi-Orbit Satellite Service": "多軌道衛星服務",
  "Satellite / Multi-orbit Electronics Manufacturing": "衛星與多軌道電子製造",
  "LEO Satellite Power": "低軌衛星電源",
  "Dry Bulk Owner / Fleet Renewal": "散裝船東與船隊汰換",
  "Dry Bulk Owner / Energy-efficient Fleet": "散裝船東與節能船隊",
  "Dry Bulk Operator / Mid-small Vessel Exposure": "散裝航運與中小型船運",
  "Liquid Cooling Beneficiary": "液冷受惠公司",
  "Heat Exchanger / Thermal": "熱交換器與散熱",
  "Leader": "龍頭",
  "Primary Beneficiary": "主要受惠公司",
  "Secondary Beneficiary": "次要受惠公司",
  "High Beta": "高彈性",
  "Packaging Proxy": "封裝觀察標的",
  "Test Proxy": "測試觀察標的",
  "Candidate": "候選",
  "Member": "成員"
});
const THESIS = {
  'Thesis Strengthening': ['增強', 'red'], 'Thesis Intact': ['維持', ''], 'Thesis Weakening': ['轉弱', 'green'], 'Thesis Broken': ['失效', 'green']
};
const RESEARCH_STATUS = { Updated: '已更新', 'Insufficient Evidence': '證據不足', Queued: '待研究' };
const CHAIN = { Confirmed: ['已確認', 'ok'], Partial: ['部分確認', 'part'], Unverified: ['未驗證', ''], Contradicted: ['有反證', 'bad'] };
const RATING = { H: [4, '高'], MH: [3, '中高'], M: [2, '中'], L: [1, '低'], N: [0, '無'], U: [null, '未知'], Mix: [2, '混合'] };
const DIMS = [
  ['fundamental', '基本面', '營收、毛利、獲利是否跟上'],
  ['catalyst', '催化', '新訂單、新產品、漲價等事件'],
  ['price', '股價', '股價趨勢強弱'],
  ['breadth', '參與', '是否多檔一起漲'],
  ['capital', '資金', '成交量、資金是否進場']
];
const GROUP_TEXT = {
  silicon: '晶片 / 運算', memory: '記憶體 / 儲存', pcb: 'PCB / 載板 / 材料', packaging: '封裝 / 測試',
  cooling_power: '散熱 / 電源', networking: '網通 / 光通訊', system: '伺服器 / 系統', fab_infra: '晶圓廠 / 工程',
  extension: 'AI 延伸應用', power_infrastructure: '電網 / 重電', defense: '國防 / 無人機', satellite: '衛星通訊', shipping: '航運'
};
const GAP = {
  'Positive Gap': ['優先研究', 'red', '基本面改善中，股價還沒反映'],
  Balanced: ['已反映', '', '基本面和股價大致同步'],
  Crowded: ['漲多了', 'amber', '股價跑在已驗證的基本面前面'],
  'Negative Gap': ['要小心', 'green', '股價強但基本面轉弱'],
  'Insufficient Data': ['資料不足', '', '證據不夠，不做判斷']
};

const esc = v => String(v ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[ch]));
const pct = p => (p == null ? '—' : `${Math.round(p * 100)}%`);
const signed = v => (v == null ? '—' : `${v > 0 ? '+' : ''}${v}`);
const $ = sel => document.querySelector(sel);

async function fetchJson(path) {
  const r = await fetch(`${path}?_=${Date.now()}`, { cache: 'no-store' });
  if (!r.ok) throw new Error(`${path} ${r.status}`);
  return r.json();
}

function check(kind, text, aux = false) {
  const icon = { ok: '✓', no: '✕', wn: '!', info: '·' }[kind];
  return `<div class="check${aux ? ' aux' : ''}"><span class="ic ${kind}">${icon}</span><span>${text}</span></div>`;
}
function chip(text, tone = '') { return `<span class="chip ${tone}">${esc(text)}</span>`; }
function empty(text) { return `<div class="empty">${esc(text)}</div>`; }
function sample(n) { return n ? `（樣本 ${n}）` : ''; }

/* ---------- theme lookups ---------- */

function registryTheme(id) { return (store.registry?.themes || []).find(t => t.id === id); }
function marketTheme(id) { return (store.market?.themes || []).find(t => (t.id || t.theme_id) === id); }
function researchTheme(id) { return (store.research?.themes || []).find(t => (t.theme_id || t.id) === id); }
function activeTheme(id) { return (store.active?.active_themes || []).find(t => (t.theme_id || t.id) === id); }
function mainRank(id) { return activeTheme(id)?.rank ?? null; }
function themeLabel(id) {
  const reg = registryTheme(id);
  const cyc = store.cycleById?.[id];
  return reg?.label || cyc?.label || reg?.name || id;
}
function groupOf(id) {
  const cyc = store.cycleById?.[id];
  if (cyc?.group) return cyc.group;
  const g = (store.registry?.groups || []).find(x => (x.theme_ids || []).includes(id));
  return g?.id || registryTheme(id)?.parent_id || 'other';
}
function completedWaves(t) { return (t.waves || []).filter(w => w.complete).map(w => w.days); }
function pastWaveText(t) {
  const days = completedWaves(t);
  return days.length ? `${days.join('、')} 天` : '還沒有完整的強勢紀錄';
}
function statusText(t) {
  const c = t.current;
  if (c.strong) return { text: `強勢第 ${c.wave.day} 天`, sub: `結束風險：${EXIT[c.wave.exit]}`, ink: EXIT_INK[c.wave.exit] };
  if (c.turn !== 'none') {
    const s = store.cycle.stats.turn[c.turn];
    return { text: `${TURN[c.turn]} · ${pct(s.p)}`, sub: '10 天內轉強機率', ink: c.turn === 'ready' ? 'ink-red' : '' };
  }
  return { text: PHASE[c.phase], sub: `轉強線下 ${c.base_days}${c.base_known ? '' : '+'} 天`, ink: '' };
}

/* ---------- regime ---------- */

function renderRegime() {
  const r = store.regime;
  const bar = $('#regimeBar');
  if (!r) { bar.textContent = '大盤狀態暫時讀不到'; return; }
  const label = { 'Strong Bull': '強多', Bull: '多頭', Range: '盤整', Bear: '空頭' }[r.regime] || '未分類';
  const s = r.signals || {};
  const mas = [['10', s.ma10], ['20', s.ma20], ['60', s.ma60]].filter(([, v]) => v != null);
  const above = mas.filter(([, v]) => s.close > v).map(([d]) => d);
  const bear = r.bear_phase || {};
  const bearText = bear.confirmed_gate ? '空頭確認' : bear.pending_gate ? '待隔日確認' : (bear.current_setups || []).length ? '觀察中' : '無';
  const weak = r.regime === 'Bear' || r.regime === 'Range';
  bar.className = `regime-bar${weak ? ' warn' : ''}`;
  bar.innerHTML = `
    <span>大盤 <b class="regime-label">${label}</b></span>
    <span>建議最大持股 <b>${r.risk_budget_cap == null ? '—' : Math.round(r.risk_budget_cap * 100) + '%'}</b></span>
    <span>加權指數 <b>${s.close ? Math.round(s.close).toLocaleString('zh-TW') : '—'}</b>${above.length ? `（站上 ${above.join(' / ')} 日均線）` : '（跌破均線）'}</span>
    <span>空頭訊號 <b>${bearText}</b></span>
    ${weak ? '<span><b>大盤偏弱時，下面的轉強機率要打折看</b></span>' : ''}
    <span class="date">資料日期 ${esc(r.as_of || '—')}</span>`;
}

/* ---------- radar ---------- */

function turnChecks(t) {
  const c = t.current;
  const stats = store.cycle.stats;
  const out = [];
  if (c.near_line) out.push(check('ok', `逼近轉強線：${c.rs} 分，5 天 ${signed(c.rs_5d)}`));
  if (c.momentum_hot) out.push(check('ok', `動能已轉強（${c.momentum} 分）`));
  if (c.near_line || c.momentum_hot) {
    if (c.ext20 >= 3) out.push(check('ok', `股價站穩月線（高於月線 ${c.ext20}%）`));
    else if (c.ext20 >= 0) out.push(check('no', `股價只高於月線 ${c.ext20}%，還沒站穩`));
    else out.push(check('no', `股價還在月線下（${c.ext20}%）`));
  } else if (c.turn === 'watch') {
    out.push(check('ok', `股價高於月線 ${c.ext20}%，成分股都在季線上（底部打穩）`));
  }
  if (c.weak_share > 0) out.push(check('wn', `${c.weak_share}% 成分股跌破季線`));
  if (c.base_days >= store.cycle.method.long_base_days) {
    const lb = stats.long_base;
    out.push(check('ok', `已盤整 ${c.base_days}${c.base_known ? '' : '+'} 天，這類轉強後中位撐 ${lb.median_days ?? '—'} 天${sample(lb.n)}`));
  }
  if (c.breadth_5d >= 25) out.push(check('ok', `參與擴散：${c.breadth}% 站上月線（5 天 ${signed(c.breadth_5d)}）`, true));
  if (c.leader_breakout) out.push(check('ok', '龍頭接近前高', true));
  if (t.personality.type === 'choppy') out.push(check('wn', `強弱交替型，過去強勢：${pastWaveText(t)}`));
  return out.join('');
}

function renderRadar() {
  const { themes, stats } = store.cycle;
  const order = { ready: 0, brewing: 1, watch: 2 };
  const turning = themes.filter(t => !t.current.strong && t.current.turn !== 'none')
    .sort((a, b) => order[a.current.turn] - order[b.current.turn] || b.current.rs - a.current.rs);
  const shown = turning.filter(t => t.current.turn !== 'watch').concat(turning.filter(t => t.current.turn === 'watch').slice(0, 3));
  const hidden = turning.length - shown.length;
  $('#radarTurn').innerHTML = shown.length ? shown.map(t => {
    const s = stats.turn[t.current.turn];
    const tone = t.current.turn === 'ready' ? 'red' : t.current.turn === 'brewing' ? 'amber' : '';
    return `<div class="card clickable" data-open="${esc(t.id)}">
      <div class="card-head"><b>${esc(themeLabel(t.id))}</b>${chip(`${TURN[t.current.turn]} · ${pct(s.p)}`, tone)}</div>
      <div class="sub">10 天內轉強機率${sample(s.n)}${s.lead_days ? `，轉強的話通常 ${s.lead_days} 天內` : ''}</div>
      ${turnChecks(t)}
    </div>`;
  }).join('') + (hidden > 0 ? `<div class="more">另有 ${hidden} 個族群在觀察名單，見下方族群走勢</div>` : '')
    : empty('目前沒有族群出現轉強訊號');

  const fresh = themes.filter(t => t.current.strong && t.current.wave.day <= 7).sort((a, b) => a.current.wave.day - b.current.wave.day);
  $('#radarNew').innerHTML = fresh.length ? fresh.map(t => {
    const w = t.current.wave;
    const q = stats.quality[w.quality];
    const qc = w.quality_checks;
    const lines = [];
    if (qc.long_base) lines.push(check('ok', `轉強前盤整 ${w.base_days}${w.base_known ? '' : '+'} 天`));
    else lines.push(check('info', w.base_days < 10 ? `短暫回落 ${w.base_days} 天後再轉強` : `轉強前盤整 ${w.base_days} 天`));
    lines.push(qc.firm_ma20 ? check('ok', `轉強時股價高於月線 ${w.at_start.ext20}%`) : check('no', `轉強時股價只高於月線 ${w.at_start.ext20}%`));
    if (w.at_start.breadth < 50) lines.push(check('wn', `轉強時只有 ${w.at_start.breadth}% 成分股站上月線`));
    else lines.push(check(qc.broad ? 'ok' : 'info', `轉強時 ${w.at_start.breadth}% 成分股站上月線`));
    if (qc.hot) lines.push(check('ok', `${w.at_start.hot_share}% 成分股強勢加速（強者恆強，不是警訊）`));
    lines.push(check('info', `本族群過去強勢：${pastWaveText(t)}`));
    const past = completedWaves(t);
    const shorter = past.filter(d => d < w.day).length;
    if (past.length >= 3 && shorter / past.length >= 0.7) lines.push(check('wn', `已超過它過去 ${Math.round(shorter / past.length * 100)}% 的強勢長度`));
    lines.push(check(w.exit === 'stable' ? 'ok' : w.exit === 'alert' ? 'no' : 'wn', `結束風險：${EXIT[w.exit]}（5 天內結束 ${pct(stats.exit[w.exit].p)}）`));
    return `<div class="card clickable" data-open="${esc(t.id)}">
      <div class="card-head"><b>${esc(themeLabel(t.id))} · 第 ${w.day} 天</b>${chip(QUALITY[w.quality], w.quality === 'strong' ? 'red' : w.quality === 'weak' ? 'green' : '')}</div>
      <div class="sub">同類轉強中位撐 ${q.median_days ?? '—'} 天，2 天內失敗 ${pct(q.fail_2d)}${sample(q.n)}</div>
      ${lines.join('')}
    </div>`;
  }).join('') : empty('最近 7 天沒有族群剛轉強');

  const strong = themes.filter(t => t.current.strong);
  $('#radarExit').innerHTML = strong.length ? ['alert', 'caution', 'stable'].map(level => {
    const rows = strong.filter(t => t.current.wave.exit === level).sort((a, b) => b.current.wave.day - a.current.wave.day);
    if (!rows.length) return '';
    const s = stats.exit[level];
    return `<div class="exit-group"><h4><span class="${EXIT_INK[level]}">${EXIT[level]} · ${pct(s.p)}</span><small>樣本 ${s.n}</small></h4>
      ${rows.map(t => `<div class="exit-row" data-open="${esc(t.id)}"><span>${esc(themeLabel(t.id))} <small class="note">第 ${t.current.wave.day} 天</small></span><span>${exitReason(t)}</span></div>`).join('')}
    </div>`;
  }).join('') + `<div class="note">穩＝強度 ${store.cycle.method.exit_safe_line} 以上、站上月線、沒有成分股跌破季線。強勢天數長不代表快結束。</div>`
    : empty('目前沒有強勢族群');

  $('#radarAsOf').textContent = `股價資料 ${store.cycle.updated_at}`;
  document.querySelectorAll('#radarPanel [data-open]').forEach(el => el.addEventListener('click', () => openTheme(el.dataset.open)));
}

function exitReason(t) {
  const c = t.current;
  const w = c.wave;
  const m = store.cycle.method;
  if (w.exit === 'alert') return c.rs < m.exit_fade_line && c.rs_5d < -5 ? `強度 ${c.rs}，5 天 ${signed(c.rs_5d)}` : `跌破月線（${c.ext20}%）`;
  if (w.exit === 'caution') {
    if (c.ext20 < 0) return `跌破月線（${c.ext20}%）`;
    if (c.weak_share > 0) return `${c.weak_share}% 成分股破季線`;
    return `強度 ${c.rs}`;
  }
  return `強度 ${c.rs}`;
}

/* ---------- trend list ---------- */

function bars(t) {
  const n = store.window;
  const rs = t.series.rs.slice(-n);
  const ph = t.series.phase.slice(-n);
  const w = n <= 60 ? 0.78 : 1;
  const rects = rs.map((v, i) => v == null ? '' : `<rect x="${i}" width="${w}" y="${30 - 2 - v * 0.26}" height="${2 + v * 0.26}" fill="${PHASE_COLOR[ph[i]] || 'var(--cold)'}"/>`).join('');
  return `<svg viewBox="0 0 ${rs.length} 30" preserveAspectRatio="none" data-bars="${esc(t.id)}" role="img" aria-label="${esc(themeLabel(t.id))}走勢">
    <line x1="0" x2="${rs.length}" y1="${30 - 2 - 50 * 0.26}" y2="${30 - 2 - 50 * 0.26}" stroke="var(--border-strong)" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke"/>${rects}</svg>`;
}

function renderTicks() {
  const dates = store.cycle.dates.slice(-store.window);
  const n = dates.length;
  let html = '';
  if (store.window <= 20) {
    html = `<span style="left:0">${dates[0].slice(5).replace('-', '/')}</span>`;
  } else {
    let last = '';
    let lastPos = -100;
    dates.forEach((d, i) => {
      const month = d.slice(0, 7);
      if (month === last) return;
      last = month;
      const pos = (i / n) * 100;
      const m = Number(d.slice(5, 7));
      if (pos > 86 || pos - lastPos < 9 || (store.window > 100 && m % 3 !== 1)) return;
      lastPos = pos;
      html += `<span style="left:${pos}%">${store.window > 100 && m === 1 ? d.slice(0, 4) + '/' : ''}${m}月</span>`;
    });
  }
  html += `<span style="right:0">${dates[n - 1].slice(5).replace('-', '/')}</span>`;
  $('#ticks').innerHTML = html;
}

function rank(t) {
  const c = t.current;
  if (!c.strong) return c.turn === 'ready' ? 0 : c.turn === 'brewing' ? 1 : c.turn === 'watch' ? 2 : 7;
  if (c.wave.day <= 7) return 3;
  return { alert: 4, caution: 5, stable: 6 }[c.wave.exit];
}

function outlookBadge(id) {
  const dir = outlookDirection(outlookOf(id));
  return dir ? `<span class="ol-badge ${dir.tone}" title="研究展望：${dir.label}">展望${dir.arrow}</span>` : '';
}

function trendRow(t) {
  const st = statusText(t);
  const p = PERSONALITY[t.personality.type];
  const med = t.personality.median_days;
  return `<div class="trend-row${store.openId === t.id ? ' open' : ''}" data-row="${esc(t.id)}">
    <div class="name"><div class="name-line"><span>${esc(themeLabel(t.id))}</span>${outlookBadge(t.id)}</div><small>${esc(GROUP_TEXT[t.group] || '')}${mainRank(t.id) ? ` · 研究主線 #${mainRank(t.id)}` : ''}</small></div>
    ${bars(t)}
    <div class="pers" title="${esc(p.hint)}">${p.label}<small>一年強勢 ${t.personality.strong_waves} 次${med != null ? ` · 中位 ${Math.round(med)} 天` : ''}</small></div>
    <div class="now ${st.ink}">${esc(st.text)}<small>${esc(st.sub)}</small></div>
  </div>`;
}

function missingRow(reg) {
  return `<div class="trend-row" data-row="${esc(reg.id)}">
    <div class="name">${esc(reg.label || reg.name)}<small>${esc(GROUP_TEXT[groupOf(reg.id)] || '')}</small></div>
    <div class="nodata">尚無股價資料：成分股還沒納入每日股價計算</div><div></div><div></div>
  </div>`;
}

function renderTrend() {
  hideTip();
  renderTicks();
  const themes = [...store.cycle.themes];
  const missing = (store.registry?.themes || []).filter(r => r.registry_status !== 'deprecated' && !store.cycleById[r.id]);
  let html = '';
  if (store.sort === 'group') {
    const groups = [...new Set(themes.map(t => t.group || groupOf(t.id)).concat(missing.map(r => groupOf(r.id))))];
    groups.forEach(g => {
      const rows = themes.filter(t => (t.group || groupOf(t.id)) === g).sort((a, b) => rank(a) - rank(b));
      const miss = missing.filter(r => groupOf(r.id) === g);
      html += `<div class="group-title">${esc(GROUP_TEXT[g] || g)}</div>` + rows.map(rowWithDetail).join('') + miss.map(missingRow).join('');
    });
  } else {
    themes.sort((a, b) => rank(a) - rank(b) || b.current.rs - a.current.rs);
    html = themes.map(rowWithDetail).join('') + missing.map(missingRow).join('');
  }
  $('#trendList').innerHTML = html;
  document.querySelectorAll('#trendList [data-row]').forEach(el => el.addEventListener('click', () => toggleTheme(el.dataset.row)));
  bindTooltips();
}

function rowWithDetail(t) { return trendRow(t) + (store.openId === t.id ? detailHtml(t) : ''); }

function hideTip() { $('#tip').hidden = true; }

function showTip(svg, e) {
  const tip = $('#tip');
  const t = store.cycleById[svg.dataset.bars];
  const n = Math.min(store.window, t.series.rs.length);
  const rect = svg.getBoundingClientRect();
  const i = Math.min(n - 1, Math.max(0, Math.floor((e.clientX - rect.left) / rect.width * n)));
  const idx = t.series.rs.length - n + i;
  const v = t.series.rs[idx];
  if (v == null) { hideTip(); return; }
  tip.textContent = `${store.cycle.dates[idx].replace(/-/g, '/')} · ${PHASE[t.series.phase[idx]]} · 比大盤強 ${v} 分`;
  tip.hidden = false;
  tip.style.left = `${Math.max(8, Math.min(e.clientX + 12, window.innerWidth - 240))}px`;
  // A finger covers the spot below it, so touch puts the bubble above the touch point.
  tip.style.top = `${e.pointerType === 'mouse' ? e.clientY + 14 : e.clientY - 44}px`;
}

function bindTooltips() {
  document.querySelectorAll('svg[data-bars]').forEach(svg => {
    svg.addEventListener('pointerdown', e => showTip(svg, e));
    svg.addEventListener('pointermove', e => showTip(svg, e));
    svg.addEventListener('pointerleave', hideTip);
    // Touch has no hover, so the bubble only lives while the finger is on the chart.
    ['pointerup', 'pointercancel'].forEach(type => svg.addEventListener(type, e => { if (e.pointerType !== 'mouse') hideTip(); }));
  });
}

function toggleTheme(id) {
  store.openId = store.openId === id ? null : id;
  renderTrend();
}

function openTheme(id) {
  store.openId = id;
  renderTrend();
  document.querySelector(`[data-row="${CSS.escape(id)}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---------- theme detail ---------- */

function sparkline(values, ref, lo, hi) {
  const v = values.slice(-60);
  const pts = v.map((d, i) => d == null ? null : `${(i * 300 / Math.max(1, v.length - 1)).toFixed(1)},${(32 - (Math.min(hi, Math.max(lo, d)) - lo) / (hi - lo) * 30).toFixed(1)}`).filter(Boolean).join(' ');
  const y = (32 - (ref - lo) / (hi - lo) * 30).toFixed(1);
  return `<svg viewBox="0 0 300 34" preserveAspectRatio="none" aria-hidden="true"><line x1="0" x2="300" y1="${y}" y2="${y}" stroke="var(--border-strong)" stroke-dasharray="3 3" stroke-width="1" vector-effect="non-scaling-stroke"/><polyline fill="none" stroke="var(--strong)" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke" points="${pts}"/></svg>`;
}

function summaryLine(t) {
  const c = t.current;
  const heatText = c.heat == null ? '' : c.heat >= 1 ? `成交金額是半年平均的 ${c.heat} 倍` : `成交金額只有半年平均的 ${Math.round(c.heat * 100)}%`;
  if (c.strong) {
    return `比大盤強（${c.rs} 分），強勢第 ${c.wave.day} 天；${c.breadth}% 成分股站上月線，${heatText}。結束風險：${EXIT[c.wave.exit]}。`;
  }
  const signal = c.turn === 'none' ? '還沒出現轉強訊號' : `出現轉強訊號（${TURN[c.turn]}）`;
  return `目前輸大盤（${c.rs} 分），已在轉強線下 ${c.base_days}${c.base_known ? '' : '+'} 天，${signal}；${c.breadth}% 成分股站上月線，${heatText}。`;
}

function dimRow([key, label, hint], fiveDim) {
  const raw = fiveDim?.[key];
  if (raw == null) return '';
  const [level, text] = RATING[raw] || [null, raw];
  const dots = [1, 2, 3, 4].map(i => `<i class="${level != null && i <= level ? 'on' : ''}"></i>`).join('');
  return `<div class="dim"><span>${label}</span><span class="dots" title="${esc(text)}">${dots}</span><span class="exp">${esc(text)} · ${hint}</span></div>`;
}

function detailHtml(t) {
  const c = t.current;
  const reg = registryTheme(t.id) || {};
  const mkt = marketTheme(t.id) || {};
  const res = researchTheme(t.id) || {};
  const p = PERSONALITY[t.personality.type];
  const thesis = THESIS[res.thesis_state];
  const stocksTotal = t.stocks.length;
  const above20 = Math.round(c.breadth * stocksTotal / 100);
  const tags = [
    c.strong ? chip(`強勢第 ${c.wave.day} 天`, 'red') : chip(c.turn === 'none' ? PHASE[c.phase] : `${TURN[c.turn]}`, c.turn === 'ready' ? 'red' : ''),
    chip(p.label),
    thesis ? chip(`投資邏輯 ${thesis[0]}`, thesis[1]) : '',
    mainRank(t.id) ? chip(`研究主線 #${mainRank(t.id)}`) : '',
    outlookDirection(outlookOf(t.id)) ? chip(`展望 ${outlookDirection(outlookOf(t.id)).label}`, outlookDirection(outlookOf(t.id)).tone) : ''
  ].join('');
  const fmtDate = d => d.split('-').map(Number).join('/');
  const waves = (t.waves || []).slice(-8).map(w => {
    const note = !w.end ? '（進行中）' : !w.complete ? '（資料起點前就已強勢）' : '';
    return `<span class="wave-chip${w.end ? '' : ' now'}" title="轉強前盤整 ${w.base_days}${w.base_known ? '' : '+'} 天">${fmtDate(w.start)} 起 ${w.days} 天${note}</span>`;
  }).join('');
  const peers = store.cycle.themes.filter(x => x.group === t.group && x.id !== t.id);
  const chain = (res.causal_chain || []).map(x => {
    const [label, cls] = CHAIN[x.status] || ['未驗證', ''];
    return `<div class="${cls}"><b>${esc(x.stage)}</b><span>${label}</span>${x.evidence_summary ? `<p>${esc(x.evidence_summary)}</p>` : ''}</div>`;
  }).join('');
  const list = items => (items || []).slice(0, 6).map(x => `<li>${esc(typeof x === 'string' ? x : (x.summary || x.title || x.detail || x.stage || ''))}</li>`).join('');
  return `<div class="detail" data-detail="${esc(t.id)}">
    <div class="detail-head">
      <div><h3>${esc(reg.name || t.name)}</h3><p>${esc(reg.thesis || '')}</p></div>
      <div class="detail-tags">${tags}</div>
    </div>
    <div class="summary-line${c.strong ? '' : ' cold'}">${esc(summaryLine(t))}</div>
    <div class="tiles">
      <div class="tile"><div class="lab">比大盤強多少</div><div class="val">${c.rs} <small>/ 100</small></div><div class="exp">近 1～3 個月贏大盤的幅度，勝過 ${c.rs}% 的族群；50 以上算強勢</div>${sparkline(t.series.rs, 50, 0, 100)}</div>
      <div class="tile"><div class="lab">轉強速度</div><div class="val">${c.momentum} <small>/ 100</small></div><div class="exp">近 5 天變強的速度，勝過 ${c.momentum}% 的族群；70 以上算動能轉強</div>${sparkline(t.series.momentum, 50, 0, 100)}</div>
      <div class="tile"><div class="lab">多少檔站上月線</div><div class="val">${above20} / ${stocksTotal} 檔</div><div class="exp">股價在 20 日均線之上的成分股；越多代表越不是單一個股行情</div>${sparkline(t.series.breadth, 50, 0, 100)}</div>
      <div class="tile"><div class="lab">成交熱度</div><div class="val">${c.heat ?? '—'} <small>倍</small></div><div class="exp">近 1 個月成交金額 ÷ 半年平均；1 倍以上代表錢比平常多</div>${sparkline(t.series.heat, 1, 0.4, 2)}</div>
    </div>
    <div class="note" style="margin-top:4px">走勢線為最近 60 個交易日，虛線為基準</div>
    <div class="detail-grid">
      <div>
        <h4>強勢波段紀錄 <small>${p.label}：${p.hint}</small></h4>
        <div class="waves">${waves || '<span class="note">一年內沒有強勢波段</span>'}</div>
        <h4 style="margin-top:14px">研究判斷 <small>研究排程給的等第（高／中高／中／低／無），格數是頁面換算，不是公式分數</small></h4>
        ${DIMS.map(d => dimRow(d, mkt.five_dim)).join('') || '<div class="note">尚無研究評分</div>'}
      </div>
      <div>
        <h4>族群內公司</h4>
        ${t.stocks.map(s => `<div class="row-line"><span>${esc(s.name)} ${esc(s.ticker)} <small class="note">${esc(ROLE[s.role] || s.role)}</small></span><span>${esc(STOCK_STATE[s.state] || s.state)}${s.ext20 != null ? ` · 離月線 ${signed(s.ext20)}%` : ''}</span></div>`).join('')}
        <h4 style="margin-top:14px">同產業其他族群 <small>參考用；回測顯示同類先轉強不會提高它轉強的機率</small></h4>
        ${peers.length ? peers.map(x => { const st = statusText(x); return `<div class="row-line"><span>${esc(themeLabel(x.id))}</span><span class="${st.ink}">${esc(st.text)}</span></div>`; }).join('') : '<div class="note">沒有同產業族群</div>'}
      </div>
    </div>
    ${researchHtml(t, reg, chain, list)}
  </div>`;
}

const OUTLOOK_DIR = {
  improving: { label: '改善中', tone: 'red', arrow: '↑' },
  stable: { label: '持平', tone: '', arrow: '→' },
  deteriorating: { label: '轉弱', tone: 'green', arrow: '↓' }
};

function outlookOf(id) {
  const o = researchTheme(id)?.outlook;
  if (!o) return null;
  return typeof o === 'string' ? { summary: o } : o;
}

function outlookDirection(o) {
  const d = String(o?.direction || '').trim().toLowerCase();
  if (!d) return null;
  if (d.startsWith('improv') || d.includes('改善') || d === 'up' || d.includes('上修')) return OUTLOOK_DIR.improving;
  if (d.startsWith('deterior') || d.includes('轉弱') || d.includes('惡化') || d === 'down' || d.includes('下修')) return OUTLOOK_DIR.deteriorating;
  if (d.startsWith('stab') || d.includes('持平') || d === 'flat') return OUTLOOK_DIR.stable;
  return null;
}

function timingKey(text) {
  const s = String(text || '').toUpperCase();
  let m = s.match(/(20\d{2})\s*[-\/ ]?\s*Q([1-4])/) || s.match(/([1-4])Q\s*(\d{2})/);
  if (m) return m[1].length === 4 ? Number(m[1]) + (Number(m[2]) - 1) / 4 : 2000 + Number(m[2]) + (Number(m[1]) - 1) / 4;
  m = s.match(/(20\d{2})\s*H([12])/) || s.match(/([12])H\s*(\d{2})/);
  if (m) return m[1].length === 4 ? Number(m[1]) + (Number(m[2]) - 1) / 2 : 2000 + Number(m[2]) + (Number(m[1]) - 1) / 2;
  m = s.match(/(20\d{2})[-\/](\d{1,2})/);
  if (m) return Number(m[1]) + (Number(m[2]) - 1) / 12;
  m = s.match(/(20\d{2})/);
  return m ? Number(m[1]) : Infinity;
}

function sourceLink(src) {
  if (!src) return '';
  const text = String(src);
  return /^https?:\/\//.test(text) ? `<a href="${esc(text)}" target="_blank" rel="noreferrer">出處</a>` : esc(text);
}

function outlookHtml(id) {
  const o = outlookOf(id);
  if (!o) return '';
  const dir = outlookDirection(o);
  const drivers = (Array.isArray(o.drivers) ? o.drivers : [])
    .map(d => (typeof d === 'string' ? { item: d } : d))
    .filter(d => d && d.item)
    .sort((a, b) => timingKey(a.timing) - timingKey(b.timing));
  const head = [
    dir ? chip(`展望 ${dir.label}`, dir.tone) : '',
    o.horizon ? `<span class="note">看的是 ${esc(o.horizon)}</span>` : ''
  ].filter(Boolean).join(' ');
  return `${head ? `<div class="ol-head">${head}</div>` : ''}
    ${o.summary ? `<p class="research-thesis">${esc(o.summary)}</p>` : ''}
    ${drivers.length ? `<div class="ol-list">${drivers.map(d => `<div class="ol-row">
      <span class="ol-time">${esc(d.timing || '時間未定')}</span>
      <div><div>${esc(d.item)}</div><div class="note">${[d.type ? esc(d.type) : '', d.as_of ? `資料日期 ${esc(d.as_of)}` : '', sourceLink(d.source)].filter(Boolean).join(' · ')}</div></div>
    </div>`).join('')}</div>` : ''}`;
}

const ESTIMATE_TYPE = { consensus_median: '共識中位數', consensus_mean: '共識平均', broker_estimate: '單一券商', company_guidance: '公司指引' };

function epsOutlook(res) {
  // Only the research job decides comparability (same issuer / year / forecaster / statistic);
  // the page never derives a revision from two separate entries.
  const latestByKey = new Map();
  (res.eps_revisions || []).filter(e => e && e.current != null)
    .sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')))
    .forEach(e => latestByKey.set([e.company, e.year, e.forecaster || e.source, e.estimate_type].join('|'), e));
  const rows = [...latestByKey.values()].sort((a, b) => String(a.company).localeCompare(String(b.company)) || a.year - b.year);
  if (!rows.length) return '';
  const change = e => e.previous == null ? '<span class="note">沒有可比較的前值</span>'
    : `${esc(e.previous)} → ${esc(e.current)}${e.change_pct != null ? `（${signed(Number(e.change_pct).toFixed(1))}%）` : ''}`;
  const origin = e => {
    const isUrl = /^https?:\/\//.test(String(e.source || ''));
    const who = e.forecaster || (isUrl ? '' : e.source) || '';
    const detail = [ESTIMATE_TYPE[e.estimate_type] || e.estimate_type, e.sample_size ? `${e.sample_size} 家` : ''].filter(Boolean).join('，');
    return [who ? esc(who) : '', detail ? `<span class="note">${esc(detail)}</span>` : '', e.date ? `<span class="note">${esc(e.date)}</span>` : '', isUrl ? sourceLink(e.source) : '']
      .filter(Boolean).join(' ');
  };
  return `<h5>法人 EPS 預估</h5><table class="eps"><tr><th>公司</th><th>年度</th><th>預估 EPS</th><th>變化</th><th>來源</th></tr>
    ${rows.map(e => `<tr><td>${esc(e.company)}</td><td>${esc(e.year)}</td><td>${esc(e.current)}${e.currency && e.currency !== 'TWD' ? ` ${esc(e.currency)}` : ''}</td><td>${change(e)}</td><td>${origin(e)}</td></tr>`).join('')}
  </table><div class="note">預估數值不是實際獲利；變化只在同一機構、同一統計方式之間比較，由研究排程判斷。</div>`;
}

function brakeSignals(t) {
  const c = t.current;
  const out = [];
  const hot = t.stocks.filter(s => s.state === '過熱').length;
  if (hot) out.push(`${hot} / ${t.stocks.length} 檔成分股離月線 14% 以上`);
  if (c.ext20 != null && c.ext20 >= 10) out.push(`族群股價中位數高於月線 ${c.ext20}%`);
  const crowded = (store.expectation?.candidates || []).filter(x => x.theme_id === t.id && ['Crowded', 'Negative Gap'].includes(x.classification));
  crowded.forEach(x => out.push(`${x.company_name} 被判定「${GAP[x.classification][0]}」`));
  if (c.strong && c.wave.exit !== 'stable') out.push(`強勢結束風險：${EXIT[c.wave.exit]}`);
  return out;
}


/* Source-backed company detail; display completeness never changes eligibility. */
function researchArray(value) { return value == null ? [] : Array.isArray(value) ? value : [value]; }
function researchText(value) {
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (!value) return '';
  return value.summary || value.item || value.reason || value.note || value.description || '';
}
function researchSources(value, date) {
  const entries=researchArray(value).map(s=>{
    const url=typeof s==='string'?s:(s.url || s.source);
    const at=typeof s==='object'?(s.as_of || s.date || date):date;
    return [at?esc(at):'',url?sourceLink(url):''].filter(Boolean).join(' · ');
  }).filter(Boolean);
  return entries.length?'<div class="note">'+entries.join('；')+'</div>':date?'<div class="note">資料日期 '+esc(date)+'</div>':'';
}
function researchBullets(items) {
  return researchArray(items).map(x=>'<li>'+esc(displayChinese(researchText(x)))+(typeof x==='object'?researchSources(x.source || x.sources,x.as_of || x.date):'')+'</li>').join('');
}
function researchNumber(v, suffix) { return v == null || v === '' ? '未取得' : esc(v)+(suffix || ''); }
function forecastDetails(metrics) {
  const rows=researchArray(metrics);
  if (!rows.length) return '<p class="note">尚未取得可呈現的年度預估</p>';
  return '<div class="research-table-wrap"><table class="eps"><tr><th>指標／年度</th><th>預估</th><th>口徑與來源</th></tr>'+
    rows.map(e=>'<tr><td>'+esc(e.metric || 'EPS')+' · '+esc(e.period || e.year || '未指定')+'</td><td>'+researchNumber(e.value,e.unit==='TWD/share'?' 元':e.unit?' '+esc(e.unit):'')+'</td><td>'+esc(ESTIMATE_TYPE[e.estimate_type] || '')+researchSources(e.source,e.as_of || e.date)+'</td></tr>').join('')+'</table></div>';
}
function actualDetails(items) {
  const fields={revenue_million_twd:'營收',gross_profit_million_twd:'毛利',operating_profit_million_twd:'營業利益',nonoperating_net_million_twd:'業外淨額',net_income_parent_million_twd:'歸母淨利'};
  return researchArray(items).map(x=>{
    if (typeof x==='string') return '<li>'+esc(x)+'</li>';
    const values=[];
    for (const [key,label] of Object.entries(fields)) if (x[key]!=null) values.push(label+' '+(Number(x[key])/100).toFixed(2)+' 億元');
    if(x.gross_margin_pct!=null)values.push('毛利率 '+x.gross_margin_pct+'%');
    if(x.basic_eps_twd!=null)values.push('EPS '+x.basic_eps_twd+'元');
    return '<li>'+esc([x.period,x.summary,values.join('、')].filter(Boolean).join(' · '))+
      (x.scope?'<div class="note">'+esc(x.scope)+'</div>':'')+researchSources(x.source || x.sources,x.as_of || x.date)+'</li>';
  }).join('');
}

function assumptionText(value) {
  if(value==null)return '';
  if(typeof value!=='object')return String(value);
  if(Array.isArray(value))return value.map(assumptionText).filter(Boolean).join('；');
  const text=researchText(value); if(text)return text;
  const labels={eps:'EPS',pe:'本益比',multiple:'估值倍數',growth_rate:'成長率',revenue_growth_pct:'營收成長率',margin:'利潤率',gross_margin_pct:'毛利率',discount_rate:'折現率',terminal_growth:'終值成長率',reference_year:'估值年度'};
  return Object.entries(value).filter(([key,v])=>labels[key]&&v!=null).map(([key,v])=>labels[key]+' '+v).join('、');
}

function valuationDetails(v) {
  if (!v) return '<p class="note">估值方法、假設與情境尚未建立</p>';
  const supported=v.status==='supported';
  let html='<p class="note">'+(supported?'已有估值依據；仍屬假設，並非價格保證':'估值研究尚未完成，不能据此判定低估或推薦'.replace('据','據'))+'</p>';
  if(v.current_price!=null)html+='<p>參考現價 '+researchNumber(v.current_price,'元')+' · 行情日期 '+esc(v.price_as_of || '未取得')+'</p>';
  if(v.reference_pe!=null)html+='<p>'+esc(v.reference_year || '未指定年度')+'年參考本益比 '+researchNumber(v.reference_pe,'倍')+'（現價÷預估EPS，非合理倍數）'+researchSources(v.reference_eps_source,v.reference_eps_as_of)+'</p>';
  if(v.method)html+='<p>估值方法：'+esc(displayChinese(v.method))+'；年度 '+esc(v.reference_year || '未指定')+'；期限 '+esc(v.horizon || '未指定')+'</p>';
  const scenarios=researchArray(v.scenarios);
  html+=scenarios.length?'<ul>'+scenarios.map(s=>{
    const label=({bear:'保守',bearish:'保守',base:'基準',bull:'樂觀',bullish:'樂觀'})[s.case] || s.case || s.name || '情境';
    return '<li><b>'+esc(label)+'</b> · 合理價 '+researchNumber(s.fair_value ?? s.price,'元')+
      (s.upside_pct!=null?' · 相對現價 '+researchNumber(s.upside_pct,'%'):'')+
      '<div>'+esc(assumptionText(s.assumptions) || s.assumption || s.note || '假設尚未完整記錄')+'</div>'+
      researchSources(s.source || s.sources,s.as_of)+'</li>';
  }).join('')+'</ul>':'<p class="note">保守／基準／樂觀合理價情境尚待補齊</p>';
  html+=researchSources(v.assumption_sources);
  const targets=researchArray(v.analyst_targets);
  if(targets.length)html+='<h6>第三方目標價，與自有估值分開</h6><ul>'+targets.map(t=>'<li>'+researchNumber(t.target ?? t.value,'元')+' · '+esc(t.forecaster || t.forecaster_description || '未具名機構')+
    '<div>'+esc(t.method || '原始估值方法尚未取得')+'</div>'+
    (t.eps!=null?'<div>'+esc(t.reference_year || '')+'年EPS '+researchNumber(t.eps,'元')+(t.pe!=null?' × '+researchNumber(t.pe,'倍'):'')+'</div>':'')+
    (t.note?'<div class="note">'+esc(t.note)+'</div>':'')+researchSources(t.source,t.as_of)+'</li>').join('')+'</ul>';
  if(v.note)html+='<p class="note">'+esc(v.note)+'</p>';
  return html;
}
function companyResearchHtml(id, reg, res) {
  const analyses=researchArray(res.company_analyses);
  const companies=researchArray(reg.companies);
  if(!companies.length)return '';
  const ready=analyses.filter(c=>c.research_readiness?.status==='complete').length;
  return '<section class="company-research"><h5>逐家公司比較</h5><p class="note">'+companies.length+'家公司 · '+analyses.length+'家已有個別分析 · '+ready+'家完成公司研究檢核。已補資料不等於研究完整。</p>'+
    (res.industry_synthesis?.summary?'<p>'+esc(res.industry_synthesis.summary)+'</p>':'')+
    (analyses.length?'<div class="research-table-wrap"><table class="eps"><tr><th>公司</th><th>下一年度EPS預估</th><th>已公布毛利率</th><th>參考本益比</th></tr>'+companies.map(c=>{
      const x=analyses.find(v=>String(v.ticker)===String(c.ticker));
      const year=Number(String(res.updated_at || '').slice(0,4));
      const forecast=researchArray(x?.forecast_metrics).filter(e=>e.metric==='EPS'&&Number(e.period || e.year)>year).sort((l,r)=>Number(l.period || l.year)-Number(r.period || r.year))[0];
      const actual=researchArray(x?.current_support).find(e=>e.gross_margin_pct!=null);
      return '<tr><td>'+esc(c.name)+' '+esc(c.ticker)+'</td><td>'+(forecast?esc(forecast.period || forecast.year)+'年 '+researchNumber(forecast.value,'元')+researchSources(forecast.source,forecast.as_of):'待補')+'</td><td>'+(actual?esc(actual.period || '')+' · '+researchNumber(actual.gross_margin_pct,'%'):'待補')+'</td><td>'+(x?.valuation?.reference_pe!=null?researchNumber(x.valuation.reference_pe,'倍')+'<div class="note">'+esc(x.valuation.price_as_of || '')+'行情／'+esc(x.valuation.reference_year || '')+'年EPS</div>':'估值待補')+'</td></tr>';
    }).join('')+'</table><p class="note">參考本益比是現價除以預估EPS，並非合理倍數。各家公司範圍、預估日期與股本口徑不同，不能只看數字排名。</p></div>':'')+
    companies.map(c=>{
      const x=analyses.find(a=>String(a.ticker)===String(c.ticker));
      if(!x)return '<details class="inner company-entry"><summary>'+esc(c.name)+' '+esc(c.ticker)+' · 待補個別分析</summary><p class="note">目前可先參考上方既有EPS與題材摘要；完整公司比較尚未整理，不能視為已完成研究。</p></details>';
      const state=({complete:'已完成檢核',in_progress:'研究中',blocked:'暫受阻'})[x.research_readiness?.status] || '研究中';
      return '<details class="inner company-entry"><summary>'+esc(c.name)+' '+esc(c.ticker)+' · '+state+'</summary>'+
        '<p class="note">'+esc(x.research_readiness?.reason || '仍須查核證據完整性')+'</p>'+
        '<h6>未來成長來源</h6><p>'+esc(x.forward_thesis || '尚待建立')+'</p><ul>'+researchBullets(x.growth_drivers)+'</ul>'+
        forecastDetails(x.forecast_metrics)+'<h6>目前實績是否支持</h6><ul>'+actualDetails(x.current_support)+'</ul>'+
        '<h6>估值依據與情境</h6>'+valuationDetails(x.valuation)+
        '<h6>主要風險與反證</h6><ul>'+researchBullets(x.risks)+'</ul>'+
        '<h6>下一步驗證</h6><ul>'+researchArray(x.milestones).map(m=>'<li><b>'+esc(m.metric || '追蹤指標')+'</b><div>'+esc(m.baseline || '基準待補')+'</div><div>'+esc(m.next_event || '事件待確認')+'</div><div>'+esc(m.invalidation_condition || '')+'</div></li>').join('')+'</ul></details>';
    }).join('')+'</section>';
}
function taskDetailsHtml(id, legacyFocus) {
  const tasks=researchArray(store.queue?.research_tasks).filter(t=>t.theme_id===id);
  if(!tasks.length)return '<h5>還缺哪些資料</h5><p class="note">尚未載入此題材的完整待辦狀態</p><ul>'+researchBullets(legacyFocus)+'</ul>';
  const closed=tasks.filter(t=>['resolved','dismissed','cancelled'].includes(t.status));
  const active=tasks.filter(t=>!closed.includes(t));
  const labels={open:'待補查',in_progress:'查核中',waiting_event:'等待事件',blocked:'受阻',resolved:'已完成',dismissed:'不採納',cancelled:'已取消'};
  const row=t=>'<li><b>'+esc(labels[t.status] || '待確認')+'</b> · '+esc(displayChinese(t.question || ''))+
    '<div class="note">最近查核 '+esc(t.last_checked_at || '尚未查核')+' · 下次查核 '+esc(t.next_check_at || '未排定')+'</div>'+
    (t.next_event?'<div>'+esc(t.next_event)+'</div>':'')+
    (t.result?'<div>'+esc(displayChinese(researchText(t.result)))+'</div>':'')+
    (t.resolution_criteria?'<div class="note">結案條件：'+esc(t.resolution_criteria)+'</div>':'')+'</li>';
  return '<h5>研究待辦與持續追蹤</h5><p class="note">'+active.length+'項未結案 · '+closed.length+'項已完成／結束；等待未來公告不代表資料已驗證。</p><ul class="research-task-list">'+active.map(row).join('')+'</ul>'+
    (closed.length?'<details class="inner"><summary>已完成／結束紀錄（'+closed.length+'）</summary><ul class="research-task-list">'+closed.map(row).join('')+'</ul></details>':'');
}
function recommendationDetails(c) {
  const rc=c.recommendation_case;
  return '<details class="inner pk-research-detail"><summary>查看成長、估值依據與待補缺口</summary>'+
    '<p class="note">'+esc(c.research_readiness?.reason || '推薦研究尚未完成')+'</p>'+
    (rc?'<h6>前瞻論點</h6><p>'+esc(rc.forward_thesis || '尚待建立')+'</p>'+forecastDetails(rc.forecast_metrics)+
      '<h6>合理價如何推導</h6>'+valuationDetails(rc.valuation)+
      '<h6>實績支撐</h6><ul>'+actualDetails(rc.current_support)+'</ul>'+
      '<h6>失效條件</h6><ul>'+researchBullets(rc.invalidation_conditions)+'</ul>':
      '<p class="note">尚缺完整的未來成長、估值與失效條件分析；原有摘要與技術初選不代表推薦研究通過。</p>')+'</details>';
}

function researchHtml(t, reg, chain, list) {
  const res = researchTheme(t.id) || {};
  const act = activeTheme(t.id) || {};
  const thesisText = res.current_thesis || act.research_hypothesis || res.research_hypothesis || reg.thesis;
  const risks = (res.contradictory_evidence || []).concat(act.risk_flags || []);
  const questions = res.open_questions?.length ? res.open_questions : act.key_questions;
  const focus = res.research_focus?.length ? res.research_focus : act.research_focus;
  const sub = (title, items) => (items || []).length ? `<h5>${title}</h5><ul>${list(items)}</ul>` : '';
  const meta = [
    res.updated_at ? `研究日期 ${esc(res.updated_at)}（不等於今日行情）` : '尚未研究',
    res.research_status ? `研究狀態：${esc(RESEARCH_STATUS[res.research_status] || res.research_status)}` : ''
  ].filter(Boolean).join(' · ');
  const outlook = outlookHtml(t.id) + epsOutlook(res);
  const brakes = brakeSignals(t);
  const changes = res.latest_changes || [];
  const todo = focus || [];
  const logCol = (title, note, items, emptyText) => `<div><h5>${title} <small>${note}</small></h5>${items.length ? `<ul>${list(items)}</ul>` : `<p class="note">${emptyText}</p>`}</div>`;
  const more = [
    chain ? `<h5>受惠路徑確認到哪</h5><div class="chain">${chain}</div>` : '',
    changes.length || todo.length || researchArray(store.queue?.research_tasks).some(task=>task.theme_id===t.id) ? `<div class="log-cols">
      ${logCol('這次研究更新了什麼', `研究結果${res.updated_at ? ` · ${esc(res.updated_at)}` : ''}：新證據與判斷變化`, changes, '這次沒有新的證據')}
      ${taskDetailsHtml(t.id,todo)}
    </div>` : ''
  ].join('');
  return `<div class="research">
    <h4>題材研究 <small>${meta}</small></h4>
    ${act.selection_reason ? `<div class="research-why"><b>為什麼列為研究主線 #${esc(act.rank)}</b>${esc(act.selection_reason)}</div>` : ''}
    <div class="story">
      <section class="story-step">
        <div class="step-title"><span>1</span>為什麼漲</div>
        ${thesisText ? `<p class="research-thesis">${esc(thesisText)}</p>` : ''}
        ${sub('催化', res.catalysts)}
        ${sub('基本面驗證', res.fundamental_confirmation)}
      </section>
      <section class="story-step">
        <div class="step-title"><span>2</span>展望：股價接下來靠什麼推動</div>
        ${outlook || '<p class="note">研究排程還沒有提供這個題材的展望資料（未來幾季的成長預期、法人 EPS 預估）。</p>'}
      </section>
      <section class="story-step">
        <div class="step-title"><span>3</span>踩剎車：反證、風險與過熱</div>
        ${brakes.length ? `<div class="brake-chips">${brakes.map(b => `<span class="chip amber">${esc(b)}</span>`).join('')}</div><p class="note">過熱代表進場追高的風險；回測顯示它不代表強勢快結束。</p>` : '<p class="note">價格面沒有明顯過熱訊號</p>'}
        ${risks.length ? `<ul>${list(risks)}</ul>` : '<p class="note">研究尚未記錄反證</p>'}
      </section>
      <section class="story-step">
        <div class="step-title"><span>4</span>要投入的話，後續追蹤什麼</div>
        ${(questions || []).length ? `<ul>${list(questions)}</ul>` : '<p class="note">尚未建立追蹤清單</p>'}
      </section>
    </div>
    ${companyResearchHtml(t.id, reg, res)}
    ${more ? `<details class="inner"><summary>受惠路徑、研究更新與待補資料</summary>${more}</details>` : ''}
  </div>`;
}

/* ---------- priority picks ---------- */

function pickTheme(id) {
  const t = store.cycleById?.[id];
  if (!t) return '';
  return statusText(t).text;
}

const PICK_CLASS = {
  priority: ['優先追蹤', 'red'], waiting_signal: ['等待訊號', 'amber'], research_pending: ['研究中', 'amber'],
  deferred: ['暫緩', ''], data_insufficient: ['研究中', 'amber']
};

function renderPicks() {
  const p = store.priority;
  const body = $('#picksBody');
  if (!p) { body.innerHTML = empty('優先名單尚未完成新規則計算；不以舊 Positive Gap 冒充新推薦'); return; }
  const preview = p.mode !== 'live';
  const all = p.candidates || [];
  const byTicker = new Map(all.map(c => [c.ticker, c]));
  const recent = [...(p.weekly || [])].sort((a, b) => String(b.latest_qualified_date).localeCompare(String(a.latest_qualified_date)));
  const passed = all.filter(c => c.technical?.status === 'pass');
  const eligible = all.filter(c => c.classification === 'priority');
  const pending = passed.filter(c => c.classification !== 'priority');
  // One row per company keeps every field lined up, so uneven text lengths never leave holes.
  const row = (x, history) => {
    const c = byTicker.get(x.ticker) || x;
    const t = c.technical || {};
    const [label, tone] = PICK_CLASS[c.classification] || ['研究中', 'amber'];
    const themes = (c.theme_ids || []).map(themeLabel).join('、');
    const dates = history
      ? `最新符合 ${x.latest_qualified_date} · 首次 ${x.first_qualified_date} · 連續 ${x.consecutive_qualified_sessions} 日 · ${x.qualifies_today ? '今天仍符合' : '目前未確認符合'}`
      : '';
    const timing = [`${t.trigger_date || '—'} 訊號`, `月線乖離 ${t.extension_pct ?? '—'}%`, `5日相對大盤 ${t.relative_5d_pp ?? '—'} 個百分點`];
    return `<div class="pk-row">
      <div class="pk-name"><div><b>${esc(c.company_name)}</b> <span class="note">${esc(c.ticker)}</span></div>${chip(label, tone)}${themes ? `<div class="note">${esc(themes)}</div>` : ''}${dates ? `<div class="note">${esc(dates)}</div>` : ''}</div>
      <div class="pk-cell" data-label="成長展望"><div>${esc(c.fundamental?.summary || '待研究')}</div></div>
      <div class="pk-cell" data-label="時機"><div>${timing.map(v => `<span>${esc(v)}</span>`).join('')}</div></div>
      <div class="pk-cell" data-label="風險"><div>${esc(c.risk?.summary || '待查核')}</div></div>
    </div>${recommendationDetails(c)}`;
  };
  const list = (items, history) => `<div class="pk-list"><div class="pk-row pk-head"><span>公司</span><span>成長展望</span><span>時機</span><span>風險</span></div>${items.map(x => row(x, history)).join('')}</div>`;
  const section = (title, note, items, history) => `<div class="pk-section"><h3>${title}</h3>${note ? `<p class="note">${note}</p>` : ''}${items.length ? list(items, history) : ''}</div>`;
  body.innerHTML = `
    <div class="pk-top">
      <p class="note">${preview ? '研究預覽：尚未完成交易日15:00後的當日研究與訊號核對；不回填歷史推薦。' : '近5個交易日推薦紀錄；符合日期更新，失效紀錄保留並標示。'}</p>
      <div class="pk-funnel"><span>技術初選 <b>${passed.length}</b> 檔</span><span>研究完整且訊號符合 <b>${eligible.length}</b> 檔</span><span>仍需查證或有風險 <b>${pending.length}</b> 檔</span></div>
    </div>
    ${section('近 5 個交易日推薦', recent.length ? '' : '目前沒有正式推薦紀錄；沒有符合時不湊名額。', recent, true)}
    ${preview && eligible.length ? section('研究完整，待下一交易日確認訊號', '預覽，不作過去推薦紀錄。', eligible, false) : ''}
    ${pending.length ? section(`研究中／暫緩 · ${pending.length} 檔`, '股價符合初選，但推薦所需的成長、估值或風險證據仍未齊備。預覽，不作過去推薦紀錄。', pending, false) : ''}
    <p class="note pk-foot">研究觀察名單，不是買賣指令。技術門檻只做過數量測試，尚未完成樣本外績效驗證。</p>`;
  $('#picksAsOf').textContent = '行情 ' + p.market_as_of + ' · 評估 ' + (p.evaluated_at ? new Date(p.evaluated_at).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei', hour12: false }) : '—') + ' 台北';
}

/* ---------- diffusion ---------- */

function renderDiffusion() {
  const d = store.diffusion;
  if (!d) { $('#diffusionBody').innerHTML = empty('補漲候選資料暫時讀不到'); return; }
  const kind = x => {
    const raw = String(x.classification || x.category || x.type || '').toLowerCase();
    return raw.startsWith('a') || raw.includes('catch') ? 'A' : raw.startsWith('b') || raw.includes('early') ? 'B' : 'C';
  };
  const cols = [['A', '基本面已跟上'], ['B', '基本面初步確認'], ['C', '只有題材（參考）']];
  const items = d.candidates || [];
  const card = x => `<div class="list-item"><b>${esc(x.company_name || x.name || x.ticker)} ${esc(x.ticker || '')}</b> <span class="note">${esc(themeLabel(x.theme_id))}</span>${x.benefit_mechanism || x.reason ? `<p>${esc(x.benefit_mechanism || x.reason)}</p>` : ''}</div>`;
  const scans = (d.theme_scans || []).map(s => `<div class="list-item"><b>${esc(themeLabel(s.theme_id))}</b>${s.candidate_conclusion ? `<p>${esc(s.candidate_conclusion)}</p>` : ''}</div>`).join('');
  $('#diffusionBody').innerHTML = items.length
    ? `<div class="diff-cols">${cols.map(([k, label]) => { const xs = items.filter(x => kind(x) === k); return `<div><h3>${label}</h3>${xs.length ? xs.map(card).join('') : empty('目前沒有')}</div>`; }).join('')}</div>`
    : `${empty('目前沒有補漲候選：龍頭還沒帶動二線公司的基本面')}${scans ? `<details class="inner"><summary>各族群掃描結論</summary>${scans}</details>` : ''}`;
  $('#diffusionAsOf').textContent = d.as_of ? `研究資料 ${d.as_of}` : '';
}

/* ---------- theme changes, method ---------- */

const STAGE = {
  Emerging: ['新興', 'st-emg'], Confirmed: ['確認', 'st-cnf'], Accelerating: ['加速', 'st-acc'],
  Mature: ['成熟', 'st-mat'], Cooling: ['降溫', 'st-cool'], Dormant: ['休眠', 'st-dorm']
};
// The research job records a direction next to each change: ↑ stronger, ↓ weaker, → about the same.
const DIRECTION = { '↑': ['轉強', 'ink-red'], '↓': ['轉弱', 'ink-green'], '→': ['持平', 'ink-muted'] };
const shortDate = d => { const [, m, day] = String(d).split('-'); return `${+m}/${+day}`; };

function changeText(e, stage) {
  const from = stage(e.from_status)[0];
  const to = stage(e.to_status)[0];
  return e.from_status === e.to_status ? `維持${to}` : `${from} → ${to}`;
}

function renderChanges() {
  const box = $('#changeSummary');
  const tl = store.timeline;
  if (!tl) { box.innerHTML = empty('近5個交易日紀錄尚未載入；不把當期摘要當成完整歷史'); return; }
  const days = tl.trading_dates || [];
  const missing = new Set(tl.missing_snapshot_dates || []);
  const themes = (tl.themes || []).filter(g => g.material_change_count > 0);
  const stage = x => STAGE[x] || [x ? '未列入' : '未記錄', 'st-dorm'];
  const legend = Object.values(STAGE).map(([label, cls]) => `<span><i class="tl-sw ${cls}"></i>${label}</span>`).join('');
  const head = `<div class="tl-grid tl-head"><span></span>${days.map(d => `<span>${shortDate(d)}${missing.has(d) ? '<small>無紀錄</small>' : ''}</span>`).join('')}</div>`;
  const row = g => {
    const events = [...(g.events || [])].sort((a, b) => a.date.localeCompare(b.date));
    let current = null;
    const cells = days.map(d => {
      const today = events.filter(e => e.date === d).pop();
      if (missing.has(d)) return '<span class="tl-cell tl-missing" title="這天沒有快照，不能推定沒有變化"></span>';
      if (today) {
        current = today.to_status;
        const [label, cls] = stage(current);
        if (today.baseline) return `<span class="tl-cell tl-start ${cls}" title="${shortDate(d)} 起始紀錄">${label}</span>`;
        const dir = DIRECTION[today.direction];
        // Only up/down get a symbol in the cell; a sideways arrow beside a stage name read like a second transition.
        const mark = today.direction === '↑' || today.direction === '↓' ? today.direction : '';
        return `<span class="tl-cell tl-change ${cls}" title="${shortDate(d)} ${esc(changeText(today, stage))}${dir ? `，${dir[0]}` : ''}">${label}${mark}</span>`;
      }
      return current ? `<span class="tl-cell tl-carry ${stage(current)[1]}"></span>` : '<span class="tl-cell"></span>';
    }).join('');
    const open = store.openChange === g.theme_id;
    const reasons = events.map(e => {
      const dir = DIRECTION[e.direction];
      const what = e.baseline ? `起始：${stage(e.to_status)[0]}` : changeText(e, stage);
      return `<li><b>${shortDate(e.date)}</b> ${esc(what)}${!e.baseline && dir ? `<em class="tl-dir ${dir[1]}">${dir[0]}</em>` : ''}<span>${esc(displayChinese(e.reason))}</span></li>`;
    }).join('');
    return `<div class="tl-theme${open ? ' open' : ''}">
      <button type="button" class="tl-grid tl-row" data-change="${esc(g.theme_id)}" aria-expanded="${open}"><span class="tl-name"><b>${esc(themeLabel(g.theme_id))}</b><small>${g.material_change_count} 次變化${g.has_reversal ? ' · <em>有轉折</em>' : ''}</small></span>${cells}</button>
      ${open ? `<ul class="tl-reasons">${reasons}</ul>` : ''}
    </div>`;
  };
  box.innerHTML = `<p class="note">${esc(shortDate(days[0] || ''))}～${esc(shortDate(days[days.length - 1] || ''))}，最近 ${days.length} 個交易日。${missing.size ? `${[...missing].map(shortDate).join('、')} 沒有快照，不能推定當日無變化。` : ''}點題材看每次變化的原因。</p>
    <div class="tl-legend">${legend}<span class="note">有字＝當天有變化（↑轉強、↓轉弱、沒有箭頭＝持平），細條＝延續前一天</span></div>
    ${themes.length ? `<div class="tl" style="--days:${days.length}">${head}${themes.map(row).join('')}</div>` : empty('這5個交易日尚無可呈現的主線變化紀錄')}`;
  box.querySelectorAll('[data-change]').forEach(el => el.addEventListener('click', () => {
    store.openChange = store.openChange === el.dataset.change ? null : el.dataset.change;
    renderChanges();
  }));
}

function renderNotes() {
  renderChanges();
  const disc = (store.market || {}).discovery_candidates || [];
  $('#discoveryCandidates').innerHTML = disc.length ? disc.map(x => `<div class="list-item"><b>${esc(x.name || x.proposed_id)}</b>${x.reason ? `<p>${esc(x.reason)}</p>` : ''}</div>`).join('') : empty('目前沒有新題材候選');
}

/* ---------- search ---------- */

const SEARCH_LIMIT = 12;

function searchIndex() {
  if (store.searchIndex) return store.searchIndex;
  const themes = (store.registry?.themes || []).filter(t => t.registry_status !== 'deprecated');
  const companies = new Map();
  themes.forEach(t => (t.companies || []).forEach(c => {
    if (!companies.has(c.ticker)) companies.set(c.ticker, { ticker: c.ticker, name: c.name, themes: [] });
    companies.get(c.ticker).themes.push({ id: t.id, role: c.role });
  }));
  store.searchIndex = {
    themes: themes.map(t => ({ id: t.id, text: [t.id, t.label, t.name, ...(t.tags || []), GROUP_TEXT[groupOf(t.id)]].join(' ').toLowerCase() })),
    companies: [...companies.values()]
  };
  return store.searchIndex;
}

function searchStatus(id) {
  const t = store.cycleById?.[id];
  if (!t) return { dot: 'var(--border-strong)', text: '還沒有走勢資料' };
  return { dot: PHASE_COLOR[t.current.phase], text: statusText(t).text };
}

function renderSearch() {
  const box = $('#searchResults');
  const q = $('#searchInput').value.trim().toLowerCase();
  if (!store.registry) { box.innerHTML = '<span class="note">題材資料讀取中…</span>'; return; }
  const idx = searchIndex();
  const go = id => store.cycleById?.[id] ? `data-go="${esc(id)}"` : 'disabled';
  const themeRow = ({ id }) => {
    const st = searchStatus(id);
    return `<button type="button" class="sr-theme" ${go(id)}><i class="sr-dot" style="background:${st.dot}"></i><span><b>${esc(themeLabel(id))}</b>${q ? `<small>${esc(GROUP_TEXT[groupOf(id)] || '')}</small>` : ''}</span><span class="sr-status">${esc(st.text)}</span></button>`;
  };
  if (!q) {
    // Empty box = browse mode: every theme under its category, so a whole sector can be scanned at once.
    const known = new Set(idx.themes.map(t => t.id));
    const seen = new Set();
    const groups = (store.registry.groups || []).map(g => {
      const ids = (g.theme_ids || []).filter(id => known.has(id) && !seen.has(id));
      ids.forEach(id => seen.add(id));
      return [GROUP_TEXT[g.id] || g.name || g.id, ids];
    });
    groups.push(['其他', idx.themes.map(t => t.id).filter(id => !seen.has(id))]);
    box.innerHTML = `<span class="note">全部 ${known.size} 個題材；輸入族群、公司名稱或股票代號可以篩選。</span>`
      + groups.filter(([, ids]) => ids.length).map(([name, ids]) => `<h4>${esc(name)}</h4>${ids.map(id => themeRow({ id })).join('')}`).join('');
    return;
  }
  // Matches at the start of a name or ticker are what people usually mean, so they go first.
  const starts = c => c.ticker.toLowerCase().startsWith(q) || String(c.name || '').toLowerCase().startsWith(q);
  const companies = idx.companies
    .filter(c => `${c.ticker} ${c.name}`.toLowerCase().includes(q))
    .sort((a, b) => starts(b) - starts(a) || a.ticker.localeCompare(b.ticker))
    .slice(0, SEARCH_LIMIT);
  const themes = idx.themes.filter(t => t.text.includes(q)).slice(0, SEARCH_LIMIT);
  const chip = ({ id, role }) => {
    const st = searchStatus(id);
    return `<button type="button" class="sr-chip" ${go(id)} title="${esc(st.text)}"><i class="sr-dot" style="background:${st.dot}"></i>${esc(themeLabel(id))}${ROLE[role] ? `<small>${esc(ROLE[role])}</small>` : ''}</button>`;
  };
  const companyRow = c => `<div class="sr-company"><b>${esc(c.name)}</b> <span class="note">${esc(c.ticker)}</span><div class="sr-chips">${c.themes.map(chip).join('')}</div></div>`;
  box.innerHTML = (companies.length ? `<h4>公司（點族群看詳情）</h4>${companies.map(companyRow).join('')}` : '')
    + (themes.length ? `<h4>族群</h4>${themes.map(themeRow).join('')}` : '')
    || '<span class="note">找不到符合的族群或公司</span>';
}

function openSearch() {
  $('#searchSheet').hidden = false;
  $('#searchOpen').setAttribute('aria-expanded', 'true');
  document.body.classList.add('search-on');
  hideTip();
  renderSearch();
  const input = $('#searchInput');
  input.focus();
  input.select();
}

function closeSearch() {
  if ($('#searchSheet').hidden) return;
  $('#searchSheet').hidden = true;
  $('#searchOpen').setAttribute('aria-expanded', 'false');
  document.body.classList.remove('search-on');
}

function bindSearch() {
  $('#searchOpen').addEventListener('click', openSearch);
  $('#searchInput').addEventListener('input', renderSearch);
  document.querySelectorAll('[data-search-close]').forEach(el => el.addEventListener('click', closeSearch));
  $('#searchResults').addEventListener('click', e => {
    const target = e.target.closest('[data-go]');
    if (!target) return;
    closeSearch();
    openTheme(target.dataset.go);
  });
  $('#searchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); $('#searchResults [data-go]')?.click(); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });
}

function renderMethod() {
  const c = store.cycle;
  const m = c.method;
  const s = c.stats;
  const row = (name, rule, stat) => `<tr><td>${name}</td><td>${rule}</td><td>${stat}</td></tr>`;
  $('#methodBody').innerHTML = `
    <p>所有數字每個交易日收盤後由 GitHub Actions 從原始股價重新計算（<code>scripts/compute_cycle.py</code>），歷史從 ${esc(c.history_start)} 起。機率是過去同樣條件下的實際比例，描述過去，不保證未來；這段期間大盤多數時間在季線之上，空頭時期樣本不足。</p>
    <h3>基本指標</h3>
    <table><tr><th>指標</th><th>怎麼算</th></tr>
      <tr><td>比大盤強多少</td><td>族群成分股近 20 日（權重 60%）與 60 日（40%）贏大盤的幅度，在所有族群中排第幾百分位，再取 ${m.smooth_days} 日平均。${m.strong_line} 以上＝強勢</td></tr>
      <tr><td>轉強速度（動能）</td><td>上面那個強度近 5 天的變化，在所有族群中的百分位</td></tr>
      <tr><td>站上月線</td><td>股價在 20 日均線之上的成分股比例</td></tr>
      <tr><td>成交熱度</td><td>近 20 日成交金額 ÷ 近 120 日平均（取成分股中位數）</td></tr>
    </table>
    <h3>轉強訊號（尚未強勢的族群）</h3>
    <table><tr><th>等級</th><th>條件</th><th>10 天內真的轉強</th></tr>
      ${row('就緒', `強度在 ${m.near_line}～${m.strong_line} 且 5 天上升 ${m.near_rise} 分以上，同時動能 ${m.momentum_hot} 以上`, `${pct(s.turn.ready.p)}${sample(s.turn.ready.n)}，通常 ${s.turn.ready.lead_days ?? '—'} 天內`)}
      ${row('醞釀', `上面兩個條件只有一個，而且股價高於月線 ${m.firm_ma20_pct}% 以上`, `${pct(s.turn.brewing.p)}${sample(s.turn.brewing.n)}`)}
      ${row('觀察', '有一個條件但股價還沒站穩月線；或股價高於月線 5% 且沒有成分股跌破季線', `${pct(s.turn.watch.p)}${sample(s.turn.watch.n)}`)}
      ${row('無訊號', '以上皆非', `${pct(s.turn.none.p)}${sample(s.turn.none.n)}`)}
    </table>
    <p class="note">「真的轉強」＝強度越過 ${m.strong_line} 並至少維持 ${m.min_wave_days} 天。</p>
    <h3>轉強品質（剛轉強的族群）</h3>
    <p>四個加分條件：轉強前盤整 ${m.long_base_days} 天以上、轉強時股價高於月線 ${m.firm_ma20_pct}%、3/4 以上成分股站上月線、過半成分股強勢加速。</p>
    <table><tr><th>品質</th><th>加分條件</th><th>強勢中位天數 / 2 天內失敗</th></tr>
      ${row('強', '3～4 個', `${s.quality.strong.median_days ?? '—'} 天 / ${pct(s.quality.strong.fail_2d)}${sample(s.quality.strong.n)}`)}
      ${row('普通', '1～2 個', `${s.quality.normal.median_days ?? '—'} 天 / ${pct(s.quality.normal.fail_2d)}${sample(s.quality.normal.n)}`)}
      ${row('弱', '0 個', `${s.quality.weak.median_days ?? '—'} 天 / ${pct(s.quality.weak.fail_2d)}${sample(s.quality.weak.n)}`)}
    </table>
    <h3>結束風險（強勢中的族群）</h3>
    <table><tr><th>等級</th><th>條件</th><th>5 天內結束</th></tr>
      ${row('警戒', `強度低於 ${m.exit_fade_line} 且 5 天下滑超過 5 分；或跌破月線且強度低於 ${m.exit_fade_line}`, `${pct(s.exit.alert.p)}${sample(s.exit.alert.n)}`)}
      ${row('注意', '介於警戒與穩之間', `${pct(s.exit.caution.p)}${sample(s.exit.caution.n)}`)}
      ${row('穩', `強度 ${m.exit_safe_line} 以上、站上月線、沒有成分股跌破季線`, `${pct(s.exit.stable.p)}${sample(s.exit.stable.n)}`)}
    </table>
    <h3>族群性格（看過去一年的樣子）</h3>
    <p>長趨勢型：一年 70% 以上時間贏大盤。盤整爆發型：曾在盤整 ${m.long_base_days} 天以上後走出 20 天以上的強勢。強弱交替型：強勢 5 次以上且中位不到 7 天。長期弱勢型：一年 70% 以上時間輸大盤。其餘為波段型。</p>
    <p class="note">回測後沒有採用的訊號：同產業族群先轉強、同產業只剩它沒轉強，都沒有提高轉強機率；均線多頭排列也沒有額外效果。強勢天數長、成分股過熱，都不代表快結束。</p>`;
}

function renderFooter() {
  const parts = [
    `股價 ${store.cycle?.updated_at || '—'}`,
    `大盤 ${store.regime?.as_of || '—'}`,
    `研究 ${store.research?.as_of || '—'}`,
    `優先標的 ${store.priority?.market_as_of || '—'}`,
    `題材庫 ${store.registry?.updated_at || '—'}`
  ];
  $('#footerStatus').innerHTML = `資料日期：${esc(parts.join(' · '))}。股價每個交易日收盤後更新，研究內容由研究排程另外更新。 · <a href="https://github.com/bruce-913923/ai-sector-radar" target="_blank" rel="noreferrer">GitHub</a>`;
}

/* ---------- boot ---------- */

async function boot() {
  bindSearch();
  const keys = Object.keys(PATHS);
  const results = await Promise.allSettled(keys.map(k => fetchJson(PATHS[k])));
  results.forEach((r, i) => { store[keys[i]] = r.status === 'fulfilled' ? r.value : null; if (r.status === 'rejected') console.error(r.reason); });
  renderRegime();
  if (!store.cycle) {
    $('#radarTurn').innerHTML = empty('族群週期資料尚未產生，等下一次收盤後更新');
    $('#trendList').innerHTML = empty('族群週期資料尚未產生');
  } else {
    store.cycleById = Object.fromEntries(store.cycle.themes.map(t => [t.id, t]));
    renderRadar();
    renderTrend();
    renderMethod();
  }
  renderPicks();
  renderDiffusion();
  renderNotes();
  renderFooter();
  window.addEventListener('scroll', hideTip, { passive: true });
  document.querySelectorAll('#windowSeg button').forEach(b => b.addEventListener('click', () => {
    store.window = Number(b.dataset.window);
    document.querySelectorAll('#windowSeg button').forEach(x => x.classList.toggle('on', x === b));
    renderTrend();
  }));
  document.querySelectorAll('#sortSeg button').forEach(b => b.addEventListener('click', () => {
    store.sort = b.dataset.sort;
    document.querySelectorAll('#sortSeg button').forEach(x => x.classList.toggle('on', x === b));
    renderTrend();
  }));
  if (!$('#searchSheet').hidden) renderSearch();
}

boot();
