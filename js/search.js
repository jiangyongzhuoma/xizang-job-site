// 西藏公考通 - 搜索过滤逻辑
let currentResults = [];
let currentPage = 1;
const PAGE_SIZE = 20;
let sortField = 'year';
let sortDir = 'desc';

function doSearch() {
  const year = document.getElementById('sYear').value;
  const type = document.getElementById('sType').value;
  const edu = document.getElementById('sEducation').value;
  const loc = document.getElementById('sLocation').value;
  const dept = document.getElementById('sDepartment').value.trim().toLowerCase();
  const keyword = document.getElementById('sKeyword').value.trim().toLowerCase();
  const ratioMin = parseFloat(document.getElementById('sRatioMin').value) || 0;
  const ratioMax = parseFloat(document.getElementById('sRatioMax').value) || Infinity;

  currentResults = POSITIONS_DATA.filter(p => {
    if (year && p.year !== parseInt(year)) return false;
    if (type && p.type !== type) return false;
    if (edu && p.education !== edu) return false;
    if (loc && p.location !== loc) return false;
    if (dept && !(p.department && p.department.toLowerCase().includes(dept)) && !(p.position && p.position.toLowerCase().includes(dept))) return false;
    if (keyword) {
      const matchDept = p.department && p.department.toLowerCase().includes(keyword);
      const matchPos = p.position && p.position.toLowerCase().includes(keyword);
      const matchMajor = p.major && p.major.toLowerCase().includes(keyword);
      const matchId = p.id && p.id.toLowerCase().includes(keyword);
      if (!matchDept && !matchPos && !matchMajor && !matchId) return false;
    }
    if (ratioMin > 0 || ratioMax < Infinity) {
      if (p.ratio === null || p.ratio === undefined) return false;
      if (p.ratio < ratioMin || p.ratio > ratioMax) return false;
    }
    return true;
  });

  applySort();
  currentPage = 1;
  renderResults();
}

function resetSearch() {
  document.querySelectorAll('#searchForm select, #searchForm input').forEach(el => el.value = '');
  doSearch();
}

function applySort() {
  const sortVal = document.getElementById('sSort') ? document.getElementById('sSort').value : 'year_desc';
  const [field, dir] = sortVal.split('_');
  sortField = field;
  sortDir = dir;
  currentResults.sort((a, b) => {
    let va = a[sortField] !== undefined && a[sortField] !== null ? a[sortField] : '';
    let vb = b[sortField] !== undefined && b[sortField] !== null ? b[sortField] : '';
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return sortDir === 'asc' ? -1 : 1;
    if (va > vb) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });
}

function sortBy(field) {
  if (sortField === field) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
  else { sortField = field; sortDir = 'desc'; }
  currentResults.sort((a, b) => {
    let va = a[field] !== undefined && a[field] !== null ? a[field] : '';
    let vb = b[field] !== undefined && b[field] !== null ? b[field] : '';
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return sortDir === 'asc' ? -1 : 1;
    if (va > vb) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });
  currentPage = 1;
  renderResults();
}

function renderResults() {
  const tbody = document.getElementById('resultBody');
  const count = document.getElementById('resultCount');
  const noRes = document.getElementById('noResult');
  const pagination = document.getElementById('pagination');
  const total = currentResults.length;
  count.textContent = total > 0 ? `共 ${total} 个岗位` : '';
  if (total === 0) {
    tbody.innerHTML = ''; noRes.style.display = 'block'; pagination.innerHTML = '';
    return;
  }
  noRes.style.display = 'none';
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const pageData = currentResults.slice(start, end);
  let html = '';
  pageData.forEach(p => {
    const ratioStr = p.ratio ? p.ratio.toFixed(1) : '-';
    const appStr = p.applicants ? p.applicants.toLocaleString() : '-';
    const scoreStr = p.score_line ? p.score_line + '分' : '-';
    const typeBadge = getTypeBadge(p.type);
    html += `<tr class="fade-in">
      <td><input type="checkbox" class="compare-cb" value="${p.id}" onchange="updateCompareCount()"></td>
      <td><span class="badge badge-blue">${p.year}</span></td>
      <td><span class="${typeBadge}">${p.type}</span></td>
      <td><strong>${p.department || '-'}</strong></td>
      <td>${p.position || '-'}</td>
      <td>${p.education || '-'}</td>
      <td style="text-align:center;font-weight:600;">${p.recruits}</td>
      <td style="text-align:center;">${appStr}</td>
      <td style="text-align:center;"><span class="${getRatioBadge(p.ratio)}">${ratioStr}${p.ratio ? ':1' : ''}</span></td>
      <td style="text-align:center;">${scoreStr}</td>
      <td>${p.location || '-'}</td>
    </tr>`;
  });
  tbody.innerHTML = html;
  updateCompareCount();
  const totalPages = Math.ceil(total / PAGE_SIZE);
  let phtml = `<button onclick="goPage(${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i></button>`;
  phtml += `<span class="info">第 ${currentPage} / ${totalPages} 页</span>`;
  phtml += `<button onclick="goPage(${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''}><i class="fas fa-chevron-right"></i></button>`;
  pagination.innerHTML = phtml;
}

function goPage(page) {
  if (page < 1 || page > Math.ceil(currentResults.length / PAGE_SIZE)) return;
  currentPage = page;
  renderResults();
  document.getElementById('resultTable').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getTypeBadge(type) {
  const map = {'公务员':'badge badge-red','事业编（教育）':'badge badge-green','事业编（综合）':'badge badge-blue','三支一扶':'badge badge-purple','人才引进':'badge badge-orange','国考':'badge badge-gray','遴选':'badge badge-gray'};
  return map[type] || 'badge badge-gray';
}

function getRatioBadge(ratio) {
  if (!ratio) return 'badge badge-gray';
  if (ratio <= 10) return 'badge badge-green';
  if (ratio <= 30) return 'badge badge-blue';
  if (ratio <= 100) return 'badge badge-orange';
  return 'badge badge-red';
}

// === 对比功能 ===
function updateCompareCount() {
  const cbs = document.querySelectorAll('.compare-cb:checked');
  document.getElementById('compareCount').textContent = cbs.length;
}

function goCompare() {
  const cbs = document.querySelectorAll('.compare-cb:checked');
  const ids = Array.from(cbs).map(cb => cb.value);
  if (ids.length === 0) { alert('请至少勾选1个岗位'); return; }
  if (ids.length > 4) { alert('最多选择4个岗位对比'); return; }
  localStorage.setItem('compare_ids', JSON.stringify(ids));
  window.open('compare.html', '_blank');
}

// === 智能推荐 ===
function showMatch() {
  const section = document.getElementById('matchSection');
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
  if (section.style.display === 'block') section.scrollIntoView({ behavior: 'smooth' });
}

function matchPositions() {
  const major = document.getElementById('mMajor').value.trim().toLowerCase();
  const edu = document.getElementById('mEdu').value;
  const loc = document.getElementById('mLoc').value;
  const type = document.getElementById('mType').value;
  const div = document.getElementById('matchResults');

  let candidates = POSITIONS_DATA.filter(p => p.type !== '三支一扶' && p.type !== '人才引进' && p.type !== '遴选');
  if (type) candidates = candidates.filter(p => p.type === type);
  if (edu) candidates = candidates.filter(p => p.education === edu || !p.education);
  if (loc) candidates = candidates.filter(p => p.location === loc);

  candidates.forEach(p => {
    let score = 50;
    if (major && p.major) {
      if (p.major.toLowerCase().includes(major)) score += 25;
      if (p.major === '不限' || p.major.includes('不限')) score += 10;
    }
    if (edu && p.education === edu) score += 15;
    if (loc && p.location === loc) score += 10;
    if (p.ratio && p.ratio > 0) {
      if (p.ratio <= 10) score += 15;
      else if (p.ratio <= 30) score += 10;
      else if (p.ratio <= 100) score += 5;
    }
    if (p.applicants && p.applicants > 1000) score -= 10;
    if (p.recruits >= 3) score += 5;
    p._matchScore = Math.min(100, score);
  });

  candidates.sort((a, b) => (b._matchScore || 0) - (a._matchScore || 0));
  const top = candidates.slice(0, 10);

  div.innerHTML = '<div style="font-weight:600;margin-bottom:8px;">推荐排名 TOP 10</div>';
  top.forEach((p, i) => {
    div.innerHTML += `<div class="match-result fade-in">
      <div><strong>${i+1}.</strong> ${p.department} - ${p.position}<br><span style="font-size:12px;color:var(--text-light)">${p.type} | ${p.location} | ${p.education||'学历不限'}</span></div>
      <div class="match-score">${p._matchScore}<span style="font-size:12px;font-weight:400;">分</span></div>
    </div>`;
  });
  if (top.length === 0) div.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-light);">未找到匹配岗位，请调整条件</div>';
}

// === CSV导出 ===
function exportCSV() {
  if (currentResults.length === 0) { alert('当前没有可导出的数据'); return; }
  let csv = '年份,类型,招考部门,职位名称,学历要求,专业要求,招录人数,报名人数,竞争比,分数线,地区\n';
  currentResults.forEach(p => {
    csv += `${p.year},${p.type},"${p.department||''}","${p.position||''}",${p.education||''},"${p.major||''}",${p.recruits},${p.applicants||''},${p.ratio||''},${p.score_line||''},${p.location||''}\n`;
  });
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = '西藏公考岗位_export.csv';
  link.click();
  URL.revokeObjectURL(link.href);
}
