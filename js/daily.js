// 西藏公考通 - 每日更新展示
// 数据由 GitHub Actions 每日自动抓取更新

async function loadDailyUpdates() {
  const container = document.getElementById('dailyUpdates');
  if (!container) return;

  try {
    const resp = await fetch('js/daily-updates.json');
    if (!resp.ok) throw new Error('Failed to fetch');
    const data = await resp.json();

    if (data.count > 0 && data.items.length > 0) {
      let html = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span style="font-size:13px;color:var(--text-light);">今日更新 ${data.count} 条</span>
        <span style="font-size:11px;color:var(--text-light);">更新于 ${data.updated_at}</span>
      </div>`;
      data.items.forEach(item => {
        html += `<div class="web-search-result fade-in" style="border-left:4px solid var(--accent);padding:10px;">
          <a href="${item.url}" target="_blank" style="font-size:14px;">${item.title}</a>
          <div style="font-size:12px;color:var(--text-light);margin-top:4px;">${item.source} · ${item.date}</div>
        </div>`;
      });
      container.innerHTML = html;
    } else {
      container.innerHTML = `<div style="padding:16px;text-align:center;color:var(--text-light);font-size:13px;">
        <i class="fas fa-check-circle" style="color:#27ae60;font-size:24px;display:block;margin-bottom:8px;"></i>
        今日暂无新公告<br><span style="font-size:12px;">数据每天 9:00 自动更新</span>
      </div>`;
    }
  } catch (e) {
    container.innerHTML = `<div style="padding:16px;text-align:center;color:var(--text-light);font-size:13px;">
      暂时无法获取今日更新<br><span style="font-size:12px;">请刷新页面重试</span>
    </div>`;
  }
}
