const paths = {
  registry: '../registry/themes.json',
  companies: '../registry/companies.json',
  market: '../state/market-theme-map.json',
  active: '../state/active-themes.json',
  diffusion: '../state/diffusion-candidates.json'
};

const store = { registry:null, companies:null, market:null, active:null, diffusion:null, selected:null };

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
  return `<span class="pill ${esc(String(cls).toLowerCase())}">${esc(text)}</span>`;
}
function empty(text){
  return `<div class="empty">${esc(text)}</div>`;
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
}

function renderBanner(){
  const asOf = store.market?.as_of;
  const banner = document.querySelector('#stateBanner');
  if(asOf && store.market?.themes?.length){
    banner.className = 'state-banner ready';
    banner.innerHTML = `<strong>市場狀態已載入</strong><span>最近掃描：${esc(asOf)} · GitHub state</span>`;
  } else {
    banner.className = 'state-banner waiting';
    banner.innerHTML = '<strong>研究骨架已完成，等待第一次市場主線掃描</strong><span>Registry 可瀏覽；Market / Active / Diffusion state 目前尚未產生。</span>';
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
  root.innerHTML = items.length ? items.map(marketCard).join('') : empty('尚未執行 Market Theme Radar。第一次掃描後，主線狀態會出現在這裡。');
  root.querySelectorAll('[data-theme-id]').forEach(el => el.addEventListener('click',()=>selectTheme(el.dataset.themeId)));
}

function renderActive(){
  const root = document.querySelector('#activeThemes');
  const items = store.active?.active_themes || [];
  root.innerHTML = items.length ? items.map((item,i)=>{
    const id = themeIdOf(item);
    const thesis = first(item.thesis_state,item.thesis_status,item.status);
    const why = first(item.why_active,item.reason,item.summary,item.thesis,'');
    return `<article class="active-card" data-theme-id="${esc(id)}"><span class="rank">ACTIVE ${String(i+1).padStart(2,'0')}</span><h3>${esc(themeName(item))}</h3>${thesis ? pill(thesis,thesis) : ''}${why ? `<p>${esc(why)}</p>` : ''}</article>`;
  }).join('') : empty('尚未選出 Active Themes。市場主線掃描會從主線中選出少數深入研究對象。');
  root.querySelectorAll('[data-theme-id]').forEach(el => el.addEventListener('click',()=>selectTheme(el.dataset.themeId)));
}

function diffusionClass(item){
  const raw = String(first(item.classification,item.category,item.type,'')).toLowerCase();
  if(raw.startsWith('a') || raw.includes('fundamental catch')) return 'A';
  if(raw.startsWith('b') || raw.includes('early')) return 'B';
  return 'C';
}
function diffusionItem(item){
  const company = first(item.company_name,item.name,item.company,item.ticker,'Unknown');
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
    return `<section class="registry-group"><h3>${esc(g.name)}</h3>${entries.map(t=>`<button class="registry-theme" data-theme-id="${esc(t.id)}"><strong>${esc(t.label || t.name)}</strong><span>${esc(t.legacy_tier || t.registry_status || '')}</span></button>`).join('')}</section>`;
  }).join('') || empty('沒有符合搜尋條件的題材。');
  root.querySelectorAll('[data-theme-id]').forEach(el => el.addEventListener('click',()=>selectTheme(el.dataset.themeId)));
}

function renderAux(){
  const changes = store.market?.change_summary || [];
  const discovery = store.market?.discovery_candidates || [];
  const cooling = store.market?.cooling_themes || [];
  document.querySelector('#changeSummary').innerHTML = changes.length ? changes.map(x=>`<div class="list-item"><strong>${esc(first(x.title,x.name,x.theme_name,typeof x === 'string' ? x : '變化'))}</strong>${typeof x === 'object' && first(x.detail,x.summary,x.reason) ? `<p>${esc(first(x.detail,x.summary,x.reason))}</p>` : ''}</div>`).join('') : empty('尚無本期變化資料');
  document.querySelector('#discoveryCandidates').innerHTML = discovery.length ? discovery.map(x=>`<div class="list-item"><strong>${esc(themeName(x))}</strong>${first(x.reason,x.summary) ? `<p>${esc(first(x.reason,x.summary))}</p>` : ''}</div>`).join('') : empty('目前沒有 Discovery Candidate');
  document.querySelector('#coolingThemes').innerHTML = cooling.length ? cooling.map(x=>`<div class="list-item"><strong>${esc(themeName(x))}</strong>${first(x.reason,x.summary) ? `<p>${esc(first(x.reason,x.summary))}</p>` : ''}</div>`).join('') : empty('目前沒有降溫題材');
}

function currentMarketItem(id){ return (store.market?.themes || []).find(x => themeIdOf(x) === id); }
function currentActiveItem(id){ return (store.active?.active_themes || []).find(x => themeIdOf(x) === id); }

function selectTheme(id){
  store.selected = id;
  const meta = byId(id);
  if(!meta) return;
  const market = currentMarketItem(id) || {};
  const active = currentActiveItem(id) || {};
  const status = first(market.status,market.market_status,meta.market_status,'Unclassified');
  const change = changeSymbol(first(market.change,market.direction,market.vs_previous));
  const catalyst = first(market.catalyst,market.primary_catalyst,active.catalyst,meta.thesis);
  const fundamental = first(market.fundamental_confirmation,active.fundamental_confirmation,market.evidence_status);
  const risks = arr(first(market.risks,market.risk,active.risks));
  const companies = meta.companies || [];

  document.querySelector('#detailPanel').innerHTML = `
    <h2>${esc(meta.name)}</h2>
    <p>${esc(meta.thesis || '')}</p>
    <div class="detail-meta">${pill(status,status)}${pill(change,change === '↑' ? 'up' : change === '↓' ? 'down' : '')}${(meta.tags||[]).map(t=>pill(t)).join('')}</div>
    <div class="detail-section"><h3>目前催化 / 驗證</h3><p>${esc(catalyst || '尚未有市場狀態資料')}</p>${fundamental ? `<div class="detail-meta">${pill(`基本面 ${fundamental}`)}</div>` : ''}</div>
    <div class="detail-section"><h3>代表公司</h3><div class="company-list">${companies.length ? companies.map(c=>`<div class="company-row"><strong>${esc(c.name)} · ${esc(c.ticker)}</strong><span>${esc(c.role || '')}</span></div>`).join('') : '<p>尚未建立公司關聯</p>'}</div></div>
    ${risks.length ? `<div class="detail-section"><h3>主要風險</h3><p>${risks.map(esc).join(' · ')}</p></div>` : ''}
    <div class="detail-section"><h3>Registry</h3><p>ID: ${esc(meta.id)}<br>Parent: ${esc(meta.parent_name || meta.parent_id || '—')}<br>Status: ${esc(meta.registry_status || '—')}</p></div>
  `;
}

async function boot(){
  try{
    const [registry,companies,market,active,diffusion] = await Promise.all([
      fetchJson(paths.registry),fetchJson(paths.companies),fetchJson(paths.market),fetchJson(paths.active),fetchJson(paths.diffusion)
    ]);
    Object.assign(store,{registry,companies,market,active,diffusion});
    renderSummary();renderBanner();renderMarket();renderActive();renderDiffusion();renderRegistry();renderAux();

    const firstId = themeIdOf(store.active?.active_themes?.[0]) || themeIdOf(store.market?.themes?.[0]) || store.registry?.themes?.[0]?.id;
    if(firstId) selectTheme(firstId);

    document.querySelector('#registrySearch').addEventListener('input', e => renderRegistry(e.target.value));
    document.querySelector('#footerStatus').textContent = `Registry ${registry.updated_at || '—'} · Market ${market.as_of || '尚未掃描'}`;
  }catch(err){
    console.error(err);
    const banner = document.querySelector('#stateBanner');
    banner.className = 'state-banner waiting';
    banner.innerHTML = '<strong>資料載入失敗</strong><span>請確認 repository state files 已部署到 GitHub Pages。</span>';
    document.querySelector('#footerStatus').textContent = String(err.message || err);
  }
}
boot();
