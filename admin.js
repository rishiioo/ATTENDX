const teachers = [
  { name: "Mr Sharma", attendance: 82 },
  { name: "Ms Patel", attendance: 68 },
  { name: "Mr Khan", attendance: 91 },
  { name: "Ms Rao", attendance: 59 }
];

const totalStudents = 120;
const todayAttendance = 87;

function loadDashboard() {

  document.getElementById("totalTeachers").innerText = teachers.length;
  document.getElementById("totalStudents").innerText = totalStudents;
  document.getElementById("todayAttendance").innerText = todayAttendance + "%";

  const low = teachers.filter(t => t.attendance < 75).length;
  document.getElementById("lowAttendance").innerText = low;

  loadTable();
  loadChart();
}

function loadTable() {
  const table = document.getElementById("teacherTable");
  table.innerHTML = "";

  teachers.forEach(teacher => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${teacher.name}</td>
      <td style="color:${teacher.attendance < 75 ? 'red' : 'green'}">
        ${teacher.attendance}%
      </td>
      <td>
        ${teacher.attendance < 75 
          ? `<button class="warning" onclick="sendWarning('${teacher.name}')">Send Warning</button>`
          : "Good"}
      </td>
    `;

    table.appendChild(row);
  });
}

function sendWarning(name) {
  const log = document.getElementById("activityLog");
  const time = new Date().toLocaleTimeString();

  log.innerHTML += `<p>⚠ Warning sent to ${name} at ${time}</p>`;
}

function loadChart() {
  const ctx = document.getElementById("attendanceChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: teachers.map(t => t.name),
      datasets: [{
        label: "Attendance %",
        data: teachers.map(t => t.attendance),
        backgroundColor: "#007bff"
      }]
    }
  });
}

loadDashboard();