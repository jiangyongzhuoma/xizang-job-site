// 西藏公考通 - 联网搜索功能
// 由于安全限制，前端无法直接调用 API Key，本模块提供官方渠道导航
// 数据更新由 Claude Code 后台定期通过 Exa 搜索补充

function searchWeb(query, resultDivId) {
  const div = document.getElementById(resultDivId);
  div.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i><br>正在获取官方信息...</div>';

  // Build smart search links
  setTimeout(() => {
    let html = '<div style="font-size:12px;color:var(--text-light);margin-bottom:8px;">🔍 官方渠道查询结果</div>';

    // Direct search suggestions
    const searchTerms = [
      { label: '搜索招考公告', url: `https://www.google.com/search?q=site:hrss.xizang.gov.cn+${encodeURIComponent(query)}` },
      { label: '搜索西藏人社厅', url: `https://hrss.xizang.gov.cn` },
    ];

    searchTerms.forEach(s => {
      html += `<div class="web-search-result fade-in">
        <a href="${s.url}" target="_blank"><i class="fas fa-external-link-alt"></i> ${s.label}</a>
        <div class="snippet">${s.url}</div>
      </div>`;
    });

    // Official sites
    html += `<div style="margin-top:12px;padding:12px;background:#e3f2fd;border-radius:6px;">
      <strong style="font-size:13px;">📌 官方信息渠道</strong>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;font-size:13px;">`;

    const sites = [
      { name: '西藏人社厅', url: 'https://hrss.xizang.gov.cn', desc: '招考公告、成绩查询' },
      { name: '拉萨市人社局', url: 'https://hrss.lasa.gov.cn', desc: '拉萨市招考信息' },
      { name: '日喀则市委', url: 'https://rikaze.xzdw.gov.cn', desc: '日喀则市公告' },
      { name: '阿里地区人社局', url: 'https://hrss.al.gov.cn', desc: '阿里地区信息' },
      { name: '全国人事考试平台', url: 'http://zp.cpta.com.cn', desc: '网上报名系统' },
      { name: '西藏自治区政府', url: 'https://www.xizang.gov.cn', desc: '政府信息公开' },
    ];

    sites.forEach(s => {
      html += `<div style="padding:8px;background:#fff;border-radius:4px;border:1px solid #e0e0e0;">
        <a href="${s.url}" target="_blank" style="font-weight:500;">${s.name}</a>
        <div style="font-size:11px;color:var(--text-light);">${s.desc}</div>
      </div>`;
    });

    html += `</div></div>`;

    // Quick search tips
    html += `<div style="margin-top:12px;padding:12px;background:#fff8e1;border-radius:6px;font-size:13px;">
      <strong>💡 搜索技巧：</strong><br>
      在百度/Google中使用 <code style="background:#f5f5f5;padding:2px 8px;border-radius:3px;">site:hrss.xizang.gov.cn 公务员 2026</code> 精确搜索
    </div>`;

    div.innerHTML = html;
  }, 500);
}

// Data update helper - called by Claude Code backend
function getDataStats() {
  const types = {};
  const years = {};
  POSITIONS_DATA.forEach(p => {
    types[p.type] = (types[p.type] || 0) + 1;
    years[p.year] = (years[p.year] || 0) + 1;
  });
  return {
    total: POSITIONS_DATA.length,
    byType: types,
    byYear: years,
    lastUpdated: '2026-06-11',
    dataSource: '西藏自治区人社厅官网 + PDF报名数据'
  };
}

// Search suggestions helper
const SEARCH_SUGGESTIONS = [
  { type: '公务员', keywords: ['不限专业', '本科', '拉萨', '乡镇'] },
  { type: '事业编（教育）', keywords: ['语文教师', '数学教师', '本科', '中学'] },
  { type: '事业编（综合）', keywords: ['临床医学', '会计', '计算机'] },
];
