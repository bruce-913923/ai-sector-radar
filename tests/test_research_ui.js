const fs=require('fs');
const vm=require('vm');
const assert=require('assert');
const source=fs.readFileSync('market/app.js','utf8');
const start=source.indexOf('/* Source-backed company detail');
const end=source.indexOf('function researchHtml(',start);
assert(start>=0&&end>start,'research helpers must exist');
const ctx={
  store:{queue:{research_tasks:[
    {theme_id:'A',question:'仍待查證',status:'open',last_checked_at:null},
    {theme_id:'A',question:'已結案比較',status:'resolved',last_checked_at:'2026-10-04',result:'已完成同季比較'}
  ]}},
  esc:v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;'),
  displayChinese:v=>String(v),
  sourceLink:v=>String(v),
  ESTIMATE_TYPE:{consensus_median:'共識中位數'}
};
vm.createContext(ctx);vm.runInContext(source.slice(start,end),ctx);
const c={ticker:'1',company:'測試公司',research_readiness:{status:'in_progress',reason:'估值未齊'},
  forward_thesis:'未來成長待驗證',
  forecast_metrics:[{metric:'EPS',period:'2027',value:23.45,unit:'TWD/share',source:'https://example.com/forecast',as_of:'2026-09-29'}],
  current_support:[{period:'2026Q2',revenue_million_twd:1000,gross_margin_pct:25,basic_eps_twd:2}],
  valuation:{status:'in_progress',current_price:100,price_as_of:'2026-10-02',reference_pe:4.26,reference_year:2027,scenarios:[],analyst_targets:[{target:120,source:'https://example.com/target',as_of:'2026-10-01'}]},
  risks:[{item:'客戶時程遞延'}],milestones:[]};
const html=ctx.companyResearchHtml('A',{companies:[{ticker:'1',name:'測試公司'},{ticker:'2',name:'尚缺公司'}]},{updated_at:'2026-10-04',company_analyses:[c]});
assert(html.includes('23.45'));
assert(html.includes('10.00 億元'));
assert(html.includes('待補個別分析'));
assert(html.includes('0家完成公司研究檢核'));
assert(html.includes('第三方目標價'));
assert(html.includes('合理价')===false);
const tasks=ctx.taskDetailsHtml('A',[]);
assert(tasks.includes('1項未結案'));
assert(tasks.includes('1項已完成'));
assert(tasks.indexOf('已結案比較')>tasks.indexOf('已完成／結束紀錄'));
assert(ctx.recommendationDetails({}).includes('尚缺完整'));
assert(ctx.valuationDetails({status:'unsupported'}).includes('尚未完成'));
assert(ctx.assumptionText({eps:10,pe:20}).includes('EPS 10、本益比 20'));
const malicious=ctx.forecastDetails([{metric:'<script>',period:'2027',value:1}]);
assert(!malicious.includes('<script>'));
assert(source.includes("queue: '../state/research-queue.json'"));
console.log('Structured research UI regression checks passed');
