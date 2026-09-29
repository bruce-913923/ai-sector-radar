const paths = {
  regime: '../state/market-regime.json',
  registry: '../registry/themes.json',
  companies: '../registry/companies.json',
  market: '../state/market-theme-map.json',
  active: '../state/active-themes.json',
  themeResearch: '../state/theme-research.json',
  diffusion: '../state/diffusion-candidates.json',
  expectation: '../state/expectation-gap.json'
};

const store = { regime:null, registry:null, companies:null, market:null, active:null, themeResearch:null, diffusion:null, expectation:null, selected:null };

async function fetchJson(path){
  const sep = path.includes('?') ? '&' : '?';
  const r = await fetch(`${path}${sep}_=${Date.now()}`, {cache:'no-store'});
  if(!r.ok) throw new Error(`${path} ${r.status}`);
  return r.json();
}

const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
const arr = value => Array.isArray(value) ? value : (value == null || value === '' ? [] : [value]);
const first = (...values) => values.find(v => v !== undefined && v !== null && v !== '');
const themeIdOf = item => first(item?.theme_id, item?.id, item?.theme, item?.themeId);
const byId = id => store.registry?.themes?.find(t => t.id === id);
const themeName = itemOrId => {
  const id = typeof itemOrId === 'string' ? itemOrId : themeIdOf(itemOrId);
  const meta = byId(id);
  return first(itemOrId?.name, itemOrId?.theme_name, meta?.name, meta?.label, id, 'Unknown');
};

function normalizeStatus(value){
  const s = String(value || 'Unclassified');
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function changeSymbol(value){
  const v = String(value || '').toLowerCase();
  if(['up','↑','rising','stronger','strengthening'].includes(v)) return '↑';
  if(['down','↓','falling','weaker','weakening'].includes(v)) return '↓';
  if(['flat','→','same','unchanged','stable'].includes(v)) return '→';
  return value || '—';
}
function pill(text, cls=''){
  if(text === undefined || text === null || text === '') return '';
  return `<span class="pill ${esc(String(cls).toLowerCase())}">${esc(uiText(text))}</span>`;
}
function empty(text){
  return `<div class="empty">${esc(text)}</div>`;
}

const UI_TEXT = {
  'Strong Bull':'強多','Bull':'多頭','Range':'盤整','Bear':'空頭','Unclassified':'未分類',
  'Emerging':'萌芽','Confirmed':'已確認','Accelerating':'加速','Mature':'成熟','Cooling':'降溫','Dormant':'沉寂',
  'Positive Gap':'正向預期差','Balanced':'大致反映','Crowded':'擁擠','Negative Gap':'負向預期差','Insufficient Data':'資料不足',
  'Queued':'待研究','Updated':'已更新','Insufficient Evidence':'證據不足','Not Yet Researched':'尚未研究',
  'Thesis Strengthening':'投資邏輯增強','Thesis Intact':'投資邏輯維持','Thesis Weakening':'投資邏輯轉弱','Thesis Broken':'投資邏輯失效',
  'Confirmed':'已確認','Partial':'部分確認','Unverified':'未驗證','Contradicted':'已有反證',
  'Leader':'龍頭','High Beta':'高彈性','Candidate':'候選','Primary Beneficiary':'主要受惠','Secondary Beneficiary':'次要受惠','Member':'成員',
  'Packaging Proxy':'封裝代理','Test Proxy':'測試代理',
  'High':'高','Medium-High':'中高','Medium':'中','Low':'低','None':'無','Unknown':'未知','Mixed':'混合',
  'H':'高','MH':'中高','M':'中','L':'低','N':'無','U':'未知','Mix':'混合',
  'low':'低','medium':'中','high':'高'
};
const GROUP_TEXT = {
  silicon:'晶片 / 運算', memory:'記憶體 / 儲存', pcb:'PCB / 載板 / 材料', packaging:'封裝 / 測試',
  cooling_power:'散熱 / 電源', networking:'網通 / 光通訊', system:'伺服器 / 系統',
  fab_infra:'晶圓廠 / 工程', extension:'AI 延伸應用', power_infrastructure:'電網 / 重電設備',
  defense:'國防 / 自主系統'
};
function uiText(value){
  const s=String(value ?? '');
  if(UI_TEXT[s]) return UI_TEXT[s];
  if(s.startsWith('催化 ')) return '催化 ' + uiText(s.slice(3));
  if(s.startsWith('基本面 ')) return '基本面 ' + uiText(s.slice(4));
  return s;
}
function groupText(group){ return GROUP_TEXT[group?.id] || group?.name || group?.id || ''; }
function roleText(value){ return uiText(value); }
function regimePhaseText(bear){
  if(bear.confirmed_gate) return `已確認 ${(bear.confirmed_phases||[]).join('/')}`;
  if(bear.pending_gate) return `待隔日開盤確認 ${(bear.current_setups||[]).join('/')}`;
  if((bear.current_setups||[]).length) return `觀察中 ${bear.current_setups.join('/')}`;
  return '無';
}
function isResponsiveDetail(){ return window.matchMedia('(max-width: 1100px)').matches; }
function openResponsiveDetail(){
  if(!isResponsiveDetail()) return;
  document.querySelector('.side-column')?.classList.add('detail-open');
  document.querySelector('#detailBackdrop')?.classList.add('show');
  document.body.classList.add('detail-drawer-open');
}
function closeResponsiveDetail(){
  document.querySelector('.side-column')?.classList.remove('detail-open');
  document.querySelector('#detailBackdrop')?.classList.remove('show');
  document.body.classList.remove('detail-drawer-open');
}


function renderRegime(){
  const r = store.regime || {};
  const panel = document.querySelector('#regimePanel');
  const label = r.regime || 'Unclassified';
  const sig = r.signals || {};
  const bear = r.bear_phase || {};
  const ready = r.as_of && label !== 'Unclassified';
  panel.className = `regime-panel ${ready ? 'ready' : 'waiting'} regime-${String(label).toLowerCase().replace(/\\s+/g,'-')}`;
  document.querySelector('#regimeLabel').textContent = ready ? uiText(label) : '等待大盤狀態';
  document.querySelector('#regimeChange').textContent = r.change || '—';
  document.querySelector('#riskCap').textContent = r.risk_budget_cap == null ? '—' : `${Math.round(Number(r.risk_budget_cap)*100)}%`;
  document.querySelector('#twiiClose').textContent = sig.close == null ? '—' : Number(sig.close).toLocaleString('zh-TW',{maximumFractionDigits:0});
  document.querySelector('#maStack').textContent = [sig.ma10,sig.ma20,sig.ma60].every(v=>v!=null) ? [sig.ma10,sig.ma20,sig.ma60].map(v=>Math.round(Number(v)).toLocaleString('zh-TW')).join(' / ') : '—';
  document.querySelector('#bearPhase').textContent = regimePhaseText(bear);
  document.querySelector('#regimeNote').textContent = ready ? `資料日期 ${r.as_of} · 避險傾向 ${uiText(r.hedge_bias || '—')} · 槓桿 ${r.leverage_allowed ? '允許' : '關閉'}` : '由 TWII 收盤資料與固定規則計算，不用新聞情緒決定。';
}

function renderSummary(){
  const tracked = (store.registry?.themes || []).filter(t => t.registry_status !== 'deprecated').length;
  const market = store.market?.themes?.length || 0;
  const active = store.active?.active_themes?.length || 0;
  const candidates = (store.diffusion?.candidates || []).filter(c => {
    const k = String(first(c.classification,c.category,c.type,'')).toLowerCase();
    return k.startsWith('a') || k.startsWith('b') || k.includes('fundamental catch') || k.includes('early');
  }).length;
  document.querySelector('#themeCount').textContent = tracked;
  document.querySelector('#marketCount').textContent = market;
  document.querySelector('#activeCount').textContent = active;
  document.querySelector('#diffusionCount').textContent = candidates;
  const gapDone = (store.expectation?.candidates || []).filter(x => expectationClass(x) !== 'Insufficient Data').length;
  document.querySelector('#gapCount').textContent = gapDone;
}

function renderBanner(){
  const asOf = store.market?.as_of;
  const banner = document.querySelector('#stateBanner');
  if(asOf && store.market?.themes?.length){
    banner.className = 'state-banner ready';
    banner.innerHTML = `<strong>市場狀態已載入</strong><span>最近掃描：${esc(asOf)} · GitHub 狀態</span>`;
  } else {
    banner.className = 'state-banner waiting';
    banner.innerHTML = '<strong>研究骨架已完成，等待第一次市場主線掃描</strong><span>題材庫可瀏覽；市場主線 / 深度研究 / 產業擴散 / 預期差目前尚未產生。</span>';
  }
  document.querySelector('#marketAsOf').textContent = asOf ? `資料日期 ${asOf}` : '尚未掃描';
}

function marketCard(item){
  const id = themeIdOf(item);
  const status = normalizeStatus(first(item.status,item.market_status));
  const change = changeSymbol(first(item.change,item.direction,item.vs_previous));
  const summary = first(item.market_signal,item.summary,item.rationale,item.why,item.description,'');
  const catalyst = first(item.catalyst_strength,item.catalyst,item.primary_catalyst);
  const fundamental = first(item.fundamental_confirmation,item.fundamentals,item.evidence_status);
  return `<article class="theme-card" data-theme-id="${esc(id)}">
    <div class="theme-card-head"><h3>${esc(themeName(item))}</h3>${pill(status,status)}</div>
    ${summary ? `<p>${esc(summary)}</p>` : ''}
    <div class="status-row">${pill(change, change === '↑' ? 'up' : change === '↓' ? 'down' : '')}${pill(catalyst ? `催化 ${catalyst}` : '')}${pill(fundamental ? `基本面 ${fundamental}` : '')}</div>
  </article>`;
}

function renderMarket(){
  const root = document.querySelector('#marketThemes');
  const items = store.market?.themes || [];
  root.innerHTML = items.length ? items.map(marketCard).join('') : empty('尚未執行市場主線雷達。第一次掃描後，主線狀態會出現在這裡。');
  root.querySelectorAll('[data-theme-id]').forEach(el => el.addEventListener('click',()=>selectTheme(el.dataset.themeId)));
}

function renderActive(){
  const root = document.querySelector('#activeThemes');
  const items = store.active?.active_themes || [];
  root.innerHTML = items.length ? items.map((item,i)=>{
    const id = themeIdOf(item);
    const thesis = first(item.thesis_state,item.thesis_status,item.status);
    const why = first(item.why_active,item.reason,item.summary,item.thesis,'');
    return `<article class="active-card" data-theme-id="${esc(id)}"><span class="rank">主線 ${String(i+1).padStart(2,'0')}</span><h3>${esc(themeName(item))}</h3>${thesis ? pill(thesis,thesis) : ''}${why ? `<p>${esc(why)}</p>` : ''}</article>`;
  }).join('') : empty('尚未選出 Active Themes。市場主線掃描會從主線中選出少數深入研究對象。');
  root.querySelectorAll('[data-theme-id]').forEach(el => el.addEventListener('click',()=>selectTheme(el.dataset.themeId)));
}


function currentThemeResearchItem(id){
  return (store.themeResearch?.themes || []).find(x => themeIdOf(x) === id);
}
function researchStatusClass(value){
  const s=String(value||'').toLowerCase();
  if(s.includes('strengthening') || s.includes('updated')) return 'up';
  if(s.includes('weakening') || s.includes('broken') || s.includes('contradicted')) return 'down';
  return '';
}
function renderFocusList(items, limit=4){
  const xs=arr(items).filter(Boolean).slice(0,limit);
  return xs.length ? `<ul class="research-list">${xs.map(x=>`<li>${esc(typeof x === 'string' ? x : first(x.stage,x.title,x.name,x.detail,x.summary,''))}</li>`).join('')}</ul>` : '';
}
function renderThemeResearch(){
  const root=document.querySelector('#themeResearch');
  const activeItems=store.active?.active_themes||[];
  const structured=store.themeResearch?.themes||[];
  const items=activeItems.map(a=>{
    const id=themeIdOf(a);
    const r=structured.find(x=>themeIdOf(x)===id)||{};
    return {id,active:a,research:r};
  });
  root.innerHTML=items.length ? items.map(({id,active,research})=>{
    const status=first(research.research_status,active.research_status,'Queued');
    const thesis=first(research.thesis_state,'Not Yet Researched');
    const summary=first(research.current_thesis,active.research_hypothesis,'等待建立研究假說');
    const focus=first(research.research_focus,active.research_focus,[]);
    return `<article class="research-card" data-theme-id="${esc(id)}">
      <div class="research-card-head"><div><span class="rank">深度研究</span><h3>${esc(themeName(id))}</h3></div><div class="research-badges">${pill(status,researchStatusClass(status))}${pill(thesis,researchStatusClass(thesis))}</div></div>
      <p>${esc(summary)}</p>
      <div class="research-subtitle">目前研究重點</div>
      ${renderFocusList(focus,3) || '<div class="muted-note">等待研究議程</div>'}
    </article>`;
  }).join('') : empty('尚未選出 Active Themes。');
  root.querySelectorAll('[data-theme-id]').forEach(el=>el.addEventListener('click',()=>selectTheme(el.dataset.themeId)));
  document.querySelector('#themeResearchAsOf').textContent = store.themeResearch?.as_of ? `研究更新 ${store.themeResearch.as_of}` : 'Agenda 已建立，等待深度研究';
}

function diffusionClass(item){
  const raw = String(first(item.classification,item.category,item.type,'')).toLowerCase();
  if(raw.startsWith('a') || raw.includes('fundamental catch')) return 'A';
  if(raw.startsWith('b') || raw.includes('early')) return 'B';
  return 'C';
}
function diffusionItem(item){
  const company = first(item.company_name,item.name,item.company,item.ticker,'未知公司');
  const ticker = first(item.ticker,item.company_ticker,'');
  const id = themeIdOf(item);
  const reason = first(item.benefit_mechanism,item.reason,item.summary,item.relationship,'');
  return `<div class="list-item"><strong>${esc(company)}${ticker && !String(company).includes(String(ticker)) ? ` · ${esc(ticker)}` : ''}</strong><small>${esc(themeName(id))}</small>${reason ? `<p>${esc(reason)}</p>` : ''}</div>`;
}
function renderDiffusion(){
  const grouped = {A:[],B:[],C:[]};
  (store.diffusion?.candidates || []).forEach(item => grouped[diffusionClass(item)].push(item));
  document.querySelector('#diffusionA').innerHTML = grouped.A.length ? grouped.A.map(diffusionItem).join('') : empty('目前沒有 A 類候選');
  document.querySelector('#diffusionB').innerHTML = grouped.B.length ? grouped.B.map(diffusionItem).join('') : empty('目前沒有 B 類候選');
  document.querySelector('#diffusionC').innerHTML = grouped.C.length ? grouped.C.map(diffusionItem).join('') : empty('目前沒有 C 類觀察');
}


function formatPct(value){
  if(value === undefined || value === null || value === '' || Number.isNaN(Number(value))) return '—';
  const n = Number(value);
  const pct = Math.abs(n) <= 1.5 ? n * 100 : n;
  return `${pct > 0 ? '+' : ''}${pct.toFixed(1)}%`;
}
function expectationClass(item){
  return String(first(item.classification,item.expectation_gap,item.status,'Insufficient Data'));
}
function expectationLabel(value){ return uiText(value); }
function gapClassName(label){
  const s = String(label).toLowerCase();
  if(s.includes('positive')) return 'gap-positive';
  if(s.includes('crowded')) return 'gap-crowded';
  if(s.includes('negative')) return 'gap-negative';
  if(s.includes('balanced')) return 'gap-balanced';
  return 'gap-insufficient';
}
function gapCandidateCard(item){
  const ticker = first(item.ticker,item.company_ticker,'');
  const name = first(item.name,item.company_name,item.company,ticker,'Unknown');
  const id = themeIdOf(item);
  const label = expectationClass(item);
  const reason = first(item.reason,item.summary,item.rationale,'');
  const eps = first(item.fundamental?.eps_revision_30d,item.metrics?.eps_revision_30d,item.eps_revision_30d);
  const r60 = first(item.price?.return_60d,item.metrics?.return_60d,item.return_60d);
  const pe = first(item.valuation?.forward_pe,item.metrics?.forward_pe,item.forward_pe);
  const evidence = first(item.evidence_quality,item.confidence,item.data_quality);
  return `<article class="gap-card ${gapClassName(label)}" data-theme-id="${esc(id || '')}">
    <div class="gap-card-head"><div><strong>${esc(name)}${ticker && !String(name).includes(String(ticker)) ? ` · ${esc(ticker)}` : ''}</strong><small>${esc(themeName(id))}</small></div><span class="gap-label">${esc(expectationLabel(label))}</span></div>
    <div class="gap-metrics"><span>EPS 修正 <b>${formatPct(eps)}</b></span><span>60日 <b>${formatPct(r60)}</b></span><span>預估本益比 <b>${pe == null || pe === '' ? '—' : esc(Number(pe).toFixed(1)+'x')}</b></span></div>
    ${reason ? `<p>${esc(reason)}</p>` : ''}
    ${evidence ? `<em>證據品質：${esc(uiText(evidence))}</em>` : ''}
  </article>`;
}
function renderExpectation(){
  const root = document.querySelector('#expectationGap');
  const items = store.expectation?.candidates || [];
  const order = ['Positive Gap','Balanced','Crowded','Negative Gap','Insufficient Data'];
  const groups = order.map(label => ({label, items:items.filter(x => expectationClass(x) === label)}));
  root.innerHTML = items.length ? groups.map(group => `<section class="gap-column ${gapClassName(group.label)}"><h3>${esc(expectationLabel(group.label))} <span>${group.items.length}</span></h3><div class="gap-list">${group.items.length ? group.items.map(gapCandidateCard).join('') : empty('目前沒有')}</div></section>`).join('') : empty('尚未執行 Expectation Gap。會在 Active Theme / Diffusion 產生候選後才開始分析。');
  root.querySelectorAll('[data-theme-id]').forEach(el => {
    if(el.dataset.themeId) el.addEventListener('click',()=>selectTheme(el.dataset.themeId));
  });
  document.querySelector('#gapAsOf').textContent = store.expectation?.as_of ? `資料日期 ${store.expectation.as_of}` : '尚未分析';
}

function renderRegistry(filter=''){
  const q = filter.trim().toLowerCase();
  const groups = store.registry?.groups || [];
  const themes = store.registry?.themes || [];
  const root = document.querySelector('#registryGroups');
  const companyText = t => (t.companies || []).map(c => `${c.ticker} ${c.name} ${c.role}`).join(' ');
  root.innerHTML = groups.map(g => {
    const entries = themes.filter(t => (g.theme_ids || []).includes(t.id)).filter(t => {
      if(!q) return true;
      return [t.id,t.name,t.label,t.parent_name,...(t.tags||[]),companyText(t)].join(' ').toLowerCase().includes(q);
    });
    if(!entries.length) return '';
    return `<section class="registry-group"><h3>${esc(groupText(g))}</h3>${entries.map(t=>`<button class="registry-theme" data-theme-id="${esc(t.id)}"><strong>${esc(t.label || t.name)}</strong><span>${esc(t.legacy_tier || t.registry_status || '')}</span></button>`).join('')}</section>`;
  }).join('') || empty('沒有符合搜尋條件的題材。');
  root.querySelectorAll('[data-theme-id]').forEach(el => el.addEventListener('click',()=>selectTheme(el.dataset.themeId)));
}

function renderAux(){
  const changes = store.market?.change_summary || [];
  const discovery = store.market?.discovery_candidates || [];
  const cooling = store.market?.cooling_themes || [];
  document.querySelector('#changeSummary').innerHTML = changes.length ? changes.map(x=>`<div class="list-item"><strong>${esc(first(x.title,x.name,x.theme_name,typeof x === 'string' ? x : '變化'))}</strong>${typeof x === 'object' && first(x.detail,x.summary,x.reason) ? `<p>${esc(first(x.detail,x.summary,x.reason))}</p>` : ''}</div>`).join('') : empty('尚無本期變化資料');
  document.querySelector('#discoveryCandidates').innerHTML = discovery.length ? discovery.map(x=>`<div class="list-item"><strong>${esc(themeName(x))}</strong>${first(x.reason,x.summary) ? `<p>${esc(first(x.reason,x.summary))}</p>` : ''}</div>`).join('') : empty('目前沒有新題材候選');
  document.querySelector('#coolingThemes').innerHTML = cooling.length ? cooling.map(x=>`<div class="list-item"><strong>${esc(themeName(x))}</strong>${first(x.reason,x.summary) ? `<p>${esc(first(x.reason,x.summary))}</p>` : ''}</div>`).join('') : empty('目前沒有降溫題材');
}

function currentMarketItem(id){ return (store.market?.themes || []).find(x => themeIdOf(x) === id); }
function currentActiveItem(id){ return (store.active?.active_themes || []).find(x => themeIdOf(x) === id); }

function selectTheme(id, openDetail=true){
  store.selected = id;
  const meta = byId(id);
  if(!meta) return;
  const market = currentMarketItem(id) || {};
  const active = currentActiveItem(id) || {};
  const research = currentThemeResearchItem(id) || {};
  const status = first(market.status,market.market_status,meta.market_status,'Unclassified');
  const change = changeSymbol(first(market.change,market.direction,market.vs_previous));
  const catalyst = first(market.catalyst,market.primary_catalyst,active.catalyst,meta.thesis);
  const fundamental = first(market.fundamental_confirmation,active.fundamental_confirmation,market.evidence_status);
  const risks = arr(first(market.risks,market.risk,active.risks,active.risk_flags));
  const researchFocus = first(research.research_focus,active.research_focus,[]);
  const questions = first(research.open_questions,active.key_questions,[]);
  const causal = arr(research.causal_chain);
  const catalysts = arr(research.catalysts);
  const fundamentals = arr(research.fundamental_confirmation);
  const contradictions = arr(research.contradictory_evidence);
  const latestChanges = arr(research.latest_changes);
  const companies = meta.companies || [];

  document.querySelector('#detailPanel').innerHTML = `
    <h2>${esc(meta.name)}</h2>
    <p>${esc(meta.thesis || '')}</p>
    <div class="detail-meta">${pill(status,status)}${pill(change,change === '↑' ? 'up' : change === '↓' ? 'down' : '')}${(meta.tags||[]).map(t=>pill(t)).join('')}</div>
    <div class="detail-section"><h3>為什麼是 Active Theme</h3><p>${esc(first(active.selection_reason,active.why_active,'尚未記錄選入理由'))}</p></div>
    <div class="detail-section"><h3>研究假說</h3><p>${esc(first(research.current_thesis,active.research_hypothesis,meta.thesis,'尚未建立'))}</p><div class="detail-meta">${pill(first(research.research_status,active.research_status,'Queued'),researchStatusClass(first(research.research_status,active.research_status,'')))}${pill(first(research.thesis_state,'Not Yet Researched'),researchStatusClass(first(research.thesis_state,'')))}</div></div>
    <div class="detail-section"><h3>正在研究什麼</h3>${renderFocusList(researchFocus,6) || '<p>等待研究議程</p>'}</div>
    <div class="detail-section"><h3>因果鏈驗證</h3><div class="causal-chain">${causal.length ? causal.map(x=>`<div class="causal-node"><strong>${esc(first(x.stage,x.name,''))}</strong><span>${esc(uiText(first(x.status,'Unverified')))}</span>${first(x.evidence_summary,x.summary) ? `<p>${esc(first(x.evidence_summary,x.summary))}</p>` : ''}</div>`).join('') : (arr(active.causal_chain_focus).length ? arr(active.causal_chain_focus).map(x=>`<div class="causal-node"><strong>${esc(x)}</strong><span>未驗證</span></div>`).join('') : '<p>等待建立因果鏈</p>')}</div></div>
    <div class="detail-section"><h3>催化 / 基本面驗證</h3>${catalysts.length ? renderFocusList(catalysts,5) : `<p>${esc(catalyst || '尚未有深度研究資料')}</p>`}${fundamentals.length ? renderFocusList(fundamentals,5) : (fundamental ? `<div class="detail-meta">${pill(`基本面 ${fundamental}`)}</div>` : '')}</div>
    <div class="detail-section"><h3>反證 / 風險</h3>${contradictions.length ? renderFocusList(contradictions,5) : (risks.length ? `<p>${risks.map(esc).join(' · ')}</p>` : '<p>尚未記錄反證</p>')}</div>
    <div class="detail-section"><h3>待驗證問題</h3>${renderFocusList(questions,6) || '<p>尚未建立</p>'}</div>
    ${latestChanges.length ? `<div class="detail-section"><h3>相較上次改變</h3>${renderFocusList(latestChanges,5)}</div>` : ''}
    <div class="detail-section"><h3>代表公司</h3><div class="company-list">${companies.length ? companies.map(c=>`<div class="company-row"><strong>${esc(c.name)} · ${esc(c.ticker)}</strong><span>${esc(roleText(c.role || ''))}</span></div>`).join('') : '<p>尚未建立公司關聯</p>'}</div></div>
    ${risks.length ? `<div class="detail-section"><h3>主要風險</h3><p>${risks.map(esc).join(' · ')}</p></div>` : ''}
    <div class="detail-section"><h3>題材庫資訊</h3><p>ID：${esc(meta.id)}<br>上層題材：${esc(meta.parent_name || meta.parent_id || '—')}<br>狀態：${esc(uiText(meta.registry_status || '—'))}</p></div>
  `;
  if(openDetail) openResponsiveDetail();
}

async function boot(){
  try{
    const [regime,registry,companies,market,active,themeResearch,diffusion,expectation] = await Promise.all([
      fetchJson(paths.regime),fetchJson(paths.registry),fetchJson(paths.companies),fetchJson(paths.market),fetchJson(paths.active),fetchJson(paths.themeResearch),fetchJson(paths.diffusion),fetchJson(paths.expectation)
    ]);
    Object.assign(store,{regime,registry,companies,market,active,themeResearch,diffusion,expectation});
    renderRegime();renderSummary();renderBanner();renderMarket();renderActive();renderThemeResearch();renderDiffusion();renderExpectation();renderRegistry();renderAux();

    const firstId = themeIdOf(store.active?.active_themes?.[0]) || themeIdOf(store.market?.themes?.[0]) || store.registry?.themes?.[0]?.id;
    if(firstId) selectTheme(firstId, false);

    document.querySelector('#registrySearch').addEventListener('input', e => renderRegistry(e.target.value));
    document.querySelector('#detailClose')?.addEventListener('click', closeResponsiveDetail);
    document.querySelector('#detailBackdrop')?.addEventListener('click', closeResponsiveDetail);
    document.addEventListener('keydown', e => { if(e.key === 'Escape') closeResponsiveDetail(); });
    document.querySelector('#footerStatus').textContent = `大盤 ${regime.as_of || '尚未計算'} · 題材庫 ${registry.updated_at || '—'} · 市場主線 ${market.as_of || '尚未掃描'} · 預期差 ${expectation.as_of || '尚未分析'}`;
  }catch(err){
    console.error(err);
    const banner = document.querySelector('#stateBanner');
    banner.className = 'state-banner waiting';
    banner.innerHTML = '<strong>資料載入失敗</strong><span>請確認 repository state files 已部署到 GitHub Pages。</span>';
    document.querySelector('#footerStatus').textContent = String(err.message || err);
  }
}
boot();
