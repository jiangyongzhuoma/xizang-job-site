// 收藏功能
const FAV_KEY = 'xizang_favorites';

function getFavorites() {
  return JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
}

function toggleFavorite(id) {
  let favs = getFavorites();
  const idx = favs.indexOf(id);
  if(idx >= 0) favs.splice(idx, 1);
  else favs.push(id);
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  updateFavButtons();
  return idx < 0;
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function updateFavButtons() {
  document.querySelectorAll('.fav-btn').forEach(btn => {
    const id = btn.dataset.id;
    if(id) btn.classList.toggle('active', isFavorite(id));
  });
}

function renderFavList() {
  const ids = getFavorites();
  const container = document.getElementById('favList');
  if(!container) return;
  if(ids.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-light);"><i class="fas fa-star" style="font-size:32px;display:block;margin-bottom:12px;"></i>还没有收藏的岗位<br>在岗位查询页点击星标即可收藏</div>';
    return;
  }
  const items = POSITIONS_DATA.filter(p => ids.includes(p.id));
  let html = '<div class="table-wrap"><table><thead><tr><th>年份</th><th>类型</th><th>招考部门</th><th>职位</th><th>招录</th><th>竞争比</th><th>操作</th></tr></thead><tbody>';
  items.forEach(p => {
    const r = p.ratio ? p.ratio.toFixed(1)+':1' : '-';
    html += `<tr><td>${p.year}</td><td>${p.type}</td><td>${p.department||'-'}</td><td>${p.position||'-'}</td><td>${p.recruits}</td><td>${r}</td><td><button class="fav-btn active" data-id="${p.id}" onclick="toggleFavorite('${p.id}');renderFavList();" title="取消收藏">★</button></td></tr>`;
  });
  html += '</tbody></table></div>';
  container.innerHTML = html;
}
