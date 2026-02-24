// Sample Data
const teachers = [
  { name: "Mr. Sharma", attendance: 82 },
  { name: "Ms. Patel", attendance: 68 },
  { name: "Mr. Khan", attendance: 91 },
  { name: "Ms. Rao", attendance: 59 },
  { name: "Dr. Gupta", attendance: 88 },
  { name: "Ms. Singh", attendance: 72 }
];

const totalStudents = 91;
const todayAttendance = 85;

// Load Dashboard on page load
function loadDashboard() {
  // Update KPI cards
  document.getElementById("totalTeachers").innerText = teachers.length;
  document.getElementById("totalStudents").innerText = totalStudents;
  document.getElementById("todayAttendance").innerText = todayAttendance + "%";

  // Calculate low attendance teachers
  const low = teachers.filter((t) => t.attendance < 75).length;
  document.getElementById("lowAttendance").innerText = low;

  // Load table and charts
  loadTable();
  loadCharts();
}

// Load Teacher Performance Table
function loadTable() {
  const table = document.getElementById("teacherTable");
  table.innerHTML = "";

  teachers.forEach((teacher) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${teacher.name}</td>
      <td style="color:${teacher.attendance < 75 ? "#dc2626" : "#16a34a"}; font-weight: 600;">
        ${teacher.attendance}%
      </td>
      <td>
        ${
          teacher.attendance < 75
            ? `<button class="warning" onclick="sendWarning('${teacher.name}')">Send Warning</button>`
            : '<span style="color: #16a34a; font-weight: 600;">✓ Good</span>'
        }
      </td>
    `;

    table.appendChild(row);
  });
}

// Send Warning Function
function sendWarning(name) {
  const log = document.getElementById("activityLog");
  const time = new Date().toLocaleTimeString();

  const newLog = document.createElement("p");
  newLog.innerHTML = `⚠️ Warning sent to <strong>${name}</strong> at ${time}`;
  
  log.insertBefore(newLog, log.firstChild);
}

// Logout Function
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}

// Load Charts
function loadCharts() {
  // Attendance Trend Line Chart
  const lineCtx = document.getElementById('attendanceLineChart');
  if (lineCtx) {
    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [{
          label: 'Attendance %',
          data: [78, 81, 79, 85, 82, 84],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: '#2563eb',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: 12,
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#2563eb',
            borderWidth: 1
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            },
            grid: {
              color: 'rgba(0,0,0,0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  // Subject-wise Bar Chart
  const barCtx = document.getElementById('subjectBarChart');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Math', 'Computer', 'Stats', 'OE', 'EVS', 'Electronics'],
        datasets: [{
          label: 'Attendance %',
          data: [85, 78, 81, 80, 83, 84],
          backgroundColor: [
            'rgba(37, 99, 235, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(236, 72, 153, 0.8)'
          ],
          borderRadius: 8,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: 12,
            titleColor: '#fff',
            bodyColor: '#fff'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            },
            grid: {
              color: 'rgba(0,0,0,0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}

// Initialize dashboard when page loads
window.addEventListener('load', loadDashboard);