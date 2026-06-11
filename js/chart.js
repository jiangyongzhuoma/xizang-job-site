// 西藏公考通 - 数据可视化
function initChart() {
  const ctx = document.getElementById('trendChart').getContext('2d');

  // Aggregate data by year
  const yearData = {};
  POSITIONS_DATA.forEach(p => {
    const y = p.year;
    if (!yearData[y]) yearData[y] = { recruits: 0, applicants: 0, count: 0 };
    yearData[y].recruits += p.recruits;
    yearData[y].count++;
    if (p.applicants) yearData[y].applicants += p.applicants;
  });

  const years = Object.keys(yearData).sort();
  const recruits = years.map(y => yearData[y].recruits);
  const counts = years.map(y => yearData[y].count);
  const apps = years.map(y => yearData[y].applicants > 0 ? Math.round(yearData[y].applicants / yearData[y].recruits * 10) / 10 : 0);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        {
          label: '招录人数',
          data: recruits,
          backgroundColor: 'rgba(26, 107, 138, 0.7)',
          borderColor: 'rgba(26, 107, 138, 1)',
          borderWidth: 1,
          borderRadius: 4,
          yAxisID: 'y',
        },
        {
          label: '岗位数',
          data: counts,
          backgroundColor: 'rgba(33, 150, 176, 0.5)',
          borderColor: 'rgba(33, 150, 176, 1)',
          borderWidth: 1,
          borderRadius: 4,
          yAxisID: 'y',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { size: 13 } }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { font: { size: 12 } },
          grid: { color: 'rgba(0,0,0,0.05)' }
        },
        x: {
          ticks: { font: { size: 12 } }
        }
      }
    }
  });
}

// Competition distribution chart (used on search page if needed)
function initRatioChart(containerId, data) {
  const canvas = document.getElementById(containerId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const ranges = { '1:1~10': 0, '1:10~30': 0, '1:30~50': 0, '1:50~100': 0, '1:100~200': 0, '1:200+': 0 };
  data.forEach(p => {
    if (!p.ratio) return;
    if (p.ratio <= 10) ranges['1:1~10']++;
    else if (p.ratio <= 30) ranges['1:10~30']++;
    else if (p.ratio <= 50) ranges['1:30~50']++;
    else if (p.ratio <= 100) ranges['1:50~100']++;
    else if (p.ratio <= 200) ranges['1:100~200']++;
    else ranges['1:200+']++;
  });

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(ranges),
      datasets: [{
        data: Object.values(ranges),
        backgroundColor: ['#27ae60', '#2196b0', '#f39c12', '#e67e22', '#e74c3c', '#c62828'],
        borderWidth: 0,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'right', labels: { font: { size: 12 } } }
      }
    }
  });
}
