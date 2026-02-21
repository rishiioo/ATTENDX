const teachers = [
    { name: "Mr. Sharma", attendance: 92 },
    { name: "Mrs. Khan", attendance: 68 },
    { name: "Mr. Patel", attendance: 85 }
];

const students = [
    { name: "Rohit", attendance: 88 },
    { name: "Aman", attendance: 60 },
    { name: "Sneha", attendance: 72 },
    { name: "Priya", attendance: 55 }
];

function loadData() {
    document.getElementById("teacherCount").innerText = teachers.length;
    document.getElementById("studentCount").innerText = students.length;

    let low = students.filter(s => s.attendance < 75).length;
    document.getElementById("lowAttendance").innerText = low;

    const teacherTable = document.getElementById("teacherTable");
    const studentTable = document.getElementById("studentTable");
    const warningBox = document.getElementById("warningBox");

    teachers.forEach(t => {
        teacherTable.innerHTML += `
            <tr>
                <td>${t.name}</td>
                <td>${t.attendance}%</td>
                <td>${t.attendance < 75 ? "⚠ Warning" : "Good"}</td>
            </tr>
        `;
    });

    students.forEach(s => {
        studentTable.innerHTML += `
            <tr>
                <td>${s.name}</td>
                <td>${s.attendance}%</td>
                <td>${s.attendance < 75 ? "⚠ Warning" : "Good"}</td>
            </tr>
        `;

        if (s.attendance < 75) {
            warningBox.innerHTML += `
                <div class="warning">
                    ${s.name} has low attendance (${s.attendance}%)
                </div>
            `;
        }
    });
}

function showSection(id) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.add('hidden');
    });
    document.getElementById(id).classList.remove('hidden');
}

window.onload = loadData;