const PATHS = {
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
  return dir ? ` <span class="ol-badge ${dir.tone}" title="研究展望：${dir.label}">展望${dir.arrow}</span>` : '';
}

function trendRow(t) {
  const st = statusText(t);
  const p = PERSONALITY[t.personality.type];
  const med = t.personality.median_days;
  return `<div class="trend-row${store.openId === t.id ? ' open' : ''}" data-row="${esc(t.id)}">
    <div class="name">${esc(themeLabel(t.id))}${outlookBadge(t.id)}<small>${esc(GROUP_TEXT[t.group] || '')}${mainRank(t.id) ? ` · 研究主線 #${mainRank(t.id)}` : ''}</small></div>
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

function bindTooltips() {
  const tip = $('#tip');
  document.querySelectorAll('svg[data-bars]').forEach(svg => {
    svg.addEventListener('mousemove', e => {
      const t = store.cycleById[svg.dataset.bars];
      const n = Math.min(store.window, t.series.rs.length);
      const rect = svg.getBoundingClientRect();
      const i = Math.min(n - 1, Math.max(0, Math.floor((e.clientX - rect.left) / rect.width * n)));
      const idx = t.series.rs.length - n + i;
      const v = t.series.rs[idx];
      if (v == null) { tip.hidden = true; return; }
      tip.textContent = `${store.cycle.dates[idx].replace(/-/g, '/')} · ${PHASE[t.series.phase[idx]]} · 比大盤強 ${v} 分`;
      tip.hidden = false;
      tip.style.left = `${Math.min(e.clientX + 12, window.innerWidth - 240)}px`;
      tip.style.top = `${e.clientY + 14}px`;
    });
    svg.addEventListener('mouseleave', () => { tip.hidden = true; });
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
    changes.length || todo.length ? `<div class="log-cols">
      ${logCol('這次研究更新了什麼', `研究結果${res.updated_at ? ` · ${esc(res.updated_at)}` : ''}：新證據與判斷變化`, changes, '這次沒有新的證據')}
      ${logCol('還缺哪些資料', '研究待辦：排程之後要補查', todo, '目前沒有待補資料')}
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
    ${more ? `<details class="inner"><summary>受惠路徑、研究更新與待補資料</summary>${more}</details>` : ''}
  </div>`;
}

/* ---------- priority picks ---------- */

function pickTheme(id) {
  const t = store.cycleById?.[id];
  if (!t) return '';
  return statusText(t).text;
}

function renderPicks() {
  const e = store.expectation;
  if (!e) { $('#picksMatrix').innerHTML = empty('預期資料暫時讀不到'); return; }
  const items = e.candidates || [];
  const cls = x => x.classification || 'Insufficient Data';
  const names = list => list.map(x => `<span class="co">${esc(x.company_name || x.ticker)}</span>`).join('') || '<span class="note">目前沒有</span>';
  const by = k => items.filter(x => cls(x) === k);
  $('#picksMatrix').innerHTML = `
    <div></div><div class="colh">股價還沒漲（落後或貼近大盤）</div><div class="colh">股價已經漲（明顯贏大盤）</div>
    <div class="axis">基本面<br>改善中</div>
    <div class="cell hl"><div class="cell-title">優先研究</div>${names(by('Positive Gap'))}</div>
    <div class="cell"><div class="cell-title">已反映 / 漲多了</div>${names(by('Balanced').concat(by('Crowded')))}</div>
    <div class="axis">基本面<br>持平或轉弱</div>
    <div class="cell"><div class="cell-title">觀望</div><span class="note">不列入</span></div>
    <div class="cell"><div class="cell-title">要小心：股價跑在基本面前面</div>${names(by('Negative Gap'))}</div>`;
  const order = ['Positive Gap', 'Negative Gap', 'Crowded', 'Balanced', 'Insufficient Data'];
  const sorted = [...items].sort((a, b) => order.indexOf(cls(a)) - order.indexOf(cls(b)));
  $('#picksCards').innerHTML = sorted.length ? sorted.map(x => {
    const [label, tone, meaning] = GAP[cls(x)] || [cls(x), '', ''];
    const pr = x.price_reaction || {};
    const val = x.valuation || {};
    const rel = pr.relative_to_twii_60d_pct_point;
    const priceText = pr.return_60d_pct == null ? '—'
      : `近 60 日 ${signed(pr.return_60d_pct)}%，大盤 ${signed(pr.twii_return_60d_pct)}%，<span class="${rel >= 0 ? 'ink-red' : 'ink-green'}">${rel >= 0 ? '贏' : '落後'}大盤 ${Math.abs(rel).toFixed(1)} 個百分點</span>`;
    const pe = val.forward_pe_2026 ?? val.trailing_pe;
    const peLabel = val.forward_pe_2026 != null ? '預估本益比' : '本益比';
    const valText = pe == null ? '—' : `${peLabel} ${Number(pe).toFixed(1)} 倍${val.peer_trailing_pe ? `，同業 ${Number(val.peer_trailing_pe).toFixed(1)} 倍` : ''}${cls(x) === 'Positive Gap' && val.peer_trailing_pe && pe > val.peer_trailing_pe ? '（不便宜，是「還沒漲」不是「很便宜」）' : ''}`;
    return `<div class="pick${cls(x) === 'Positive Gap' ? ' hl' : ''}">
      <div class="pick-head"><div><b>${esc(x.company_name)} ${esc(x.ticker)}</b><small>${esc(themeLabel(x.theme_id))} · ${esc(ROLE[x.role] || x.role || '')}</small></div>${chip(label, tone)}</div>
      <div class="note">${esc(meaning)}${pickTheme(x.theme_id) ? ` · 族群現況：${esc(pickTheme(x.theme_id))}` : ''}</div>
      <div class="kv"><b>基本面</b><span>${esc(x.fundamental_momentum?.summary || '—')}</span></div>
      <div class="kv"><b>股價</b><span>${priceText}</span></div>
      <div class="kv"><b>估值</b><span>${esc(valText)}</span></div>
      ${x.crowding_expectation?.note ? `<details><summary>研究判斷理由</summary>${esc(x.crowding_expectation.note)}</details>` : ''}
    </div>`;
  }).join('') : empty('目前沒有完成判斷的公司');
  $('#picksAsOf').textContent = e.as_of ? `研究資料 ${e.as_of}` : '';
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

/* ---------- notes, registry, method ---------- */

function renderNotes() {
  const m = store.market || {};
  const changes = m.change_summary || [];
  $('#changeSummary').innerHTML = changes.length ? changes.map(x => `<div class="list-item">${esc(typeof x === 'string' ? x : (x.detail || x.summary || x.title || ''))}</div>`).join('') : empty('尚無本期變化');
  const disc = m.discovery_candidates || [];
  $('#discoveryCandidates').innerHTML = disc.length ? disc.map(x => `<div class="list-item"><b>${esc(x.name || x.proposed_id)}</b>${x.reason ? `<p>${esc(x.reason)}</p>` : ''}</div>`).join('') : empty('目前沒有新題材候選');
}

function renderRegistry(filter = '') {
  const q = filter.trim().toLowerCase();
  const reg = store.registry || {};
  const themes = reg.themes || [];
  $('#registryGroups').innerHTML = (reg.groups || []).map(g => {
    const rows = themes.filter(t => (g.theme_ids || []).includes(t.id)).filter(t => !q || [t.id, t.name, t.label, ...(t.tags || []), ...(t.companies || []).map(c => `${c.ticker} ${c.name}`)].join(' ').toLowerCase().includes(q));
    if (!rows.length) return '';
    return `<div class="registry-group"><h4>${esc(GROUP_TEXT[g.id] || g.name || g.id)}</h4>${rows.map(t => `<button type="button" class="registry-theme" data-open="${esc(t.id)}"><span style="color:var(--text)">${esc(t.label || t.name)}</span><span>${(t.companies || []).length} 家</span></button>`).join('')}</div>`;
  }).join('') || empty('沒有符合的題材');
  document.querySelectorAll('#registryGroups [data-open]').forEach(el => el.addEventListener('click', () => {
    if (store.cycleById[el.dataset.open]) openTheme(el.dataset.open);
  }));
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
    `優先標的 ${store.expectation?.as_of || '—'}`,
    `題材庫 ${store.registry?.updated_at || '—'}`
  ];
  $('#footerStatus').textContent = `資料日期：${parts.join(' · ')}。股價每個交易日收盤後更新，研究內容由研究排程另外更新。`;
}

/* ---------- boot ---------- */

async function boot() {
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
  renderRegistry();
  renderFooter();
  $('#registrySearch').addEventListener('input', e => renderRegistry(e.target.value));
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
}

boot();
