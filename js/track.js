// 报考进度追踪
const TRACK_KEY = 'xizang_track';

function getTrackItems() {
  return JSON.parse(localStorage.getItem(TRACK_KEY) || '[]');
}

function saveTrackItems(items) {
  localStorage.setItem(TRACK_KEY, JSON.stringify(items));
}

function addTrack() {
  const name = document.getElementById('tName').value.trim();
  const date = document.getElementById('tDate').value;
  const stage = document.getElementById('tStage').value;
  if(!name || !date) { alert('请填写考试名称和日期'); return; }
  const items = getTrackItems();
  items.push({ id: Date.now().toString(), name, date, stage, created: new Date().toISOString() });
  saveTrackItems(items);
  document.getElementById('tName').value = '';
  renderTrack();
}

function deleteTrack(id) {
  const items = getTrackItems().filter(i => i.id !== id);
  saveTrackItems(items);
  renderTrack();
}

function updateStage(id, stage) {
  const items = getTrackItems();
  const item = items.find(i => i.id === id);
  if(item) item.stage = stage;
  saveTrackItems(items);
  renderTrack();
}

function renderTrack() {
  const container = document.getElementById('trackList');
  if(!container) return;
  const items = getTrackItems();
  if(items.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-light);"><i class="fas fa-tasks" style="font-size:32px;display:block;margin-bottom:12px;"></i>还没有添加考试目标<br>添加后可以追踪报考进度</div>';
    return;
  }
  const stageNames = { signup:'未报名', signed:'已报名', studying:'备考中', written:'已笔试', interview:'已面试', admitted:'已录取' };
  const stageColors = { signup:'badge-gray', signed:'badge-blue', studying:'badge-orange', written:'badge-purple', interview:'badge-green', admitted:'badge-red' };
  let html = '';
  items.sort((a,b) => new Date(a.date) - new Date(b.date));
  items.forEach(i => {
    const days = Math.ceil((new Date(i.date) - new Date()) / (1000*60*60*24));
    const dayStr = days > 0 ? `还剩 ${days} 天` : days === 0 ? '今天！' : `已过 ${-days} 天`;
    html += `<div class="track-item fade-in">
      <div><strong>${i.name}</strong><br><span style="font-size:12px;color:var(--text-light);">${i.date} · ${dayStr}</span></div>
      <div style="display:flex;gap:6px;align-items:center;">
        <select onchange="updateStage('${i.id}',this.value)" style="padding:4px 8px;border:1px solid var(--border);border-radius:4px;font-size:12px;">
          ${Object.entries(stageNames).map(([k,v]) => `<option value="${k}" ${i.stage===k?'selected':''}>${v}</option>`).join('')}
        </select>
        <button onclick="deleteTrack('${i.id}')" style="border:none;background:none;color:var(--danger);cursor:pointer;font-size:16px;">&times;</button>
      </div>
    </div>`;
  });
  container.innerHTML = html;
}
