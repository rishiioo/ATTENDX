const subjects = [
    { id: "math",        name: "Mathematics",              teacher: "Prof. Anjali Mehta",  total: 42, students: [
        { name: "Rishi Singh",  roll: 71, present: 38 },
        { name: "Amit Kumar",   roll: 1,  present: 40 },
        { name: "Priya Sharma", roll: 12, present: 29 },
        { name: "Rahul Verma",  roll: 23, present: 35 },
        { name: "Sneha Patel",  roll: 34, present: 42 },
        { name: "Vikram Singh", roll: 45, present: 22 },
        { name: "Anita Desai",  roll: 56, present: 37 },
        { name: "Karan Mehta",  roll: 67, present: 31 },
        { name: "Pooja Reddy",  roll: 15, present: 18 },
        { name: "Arjun Nair",   roll: 29, present: 39 },
    ]},
    { id: "c",           name: "Problem Solving Using C",  teacher: "Mr. Suresh Iyer",    total: 38, students: [
        { name: "Rishi Singh",  roll: 71, present: 34 },
        { name: "Amit Kumar",   roll: 1,  present: 36 },
        { name: "Priya Sharma", roll: 12, present: 30 },
        { name: "Rahul Verma",  roll: 23, present: 22 },
        { name: "Sneha Patel",  roll: 34, present: 38 },
        { name: "Vikram Singh", roll: 45, present: 15 },
        { name: "Anita Desai",  roll: 56, present: 33 },
        { name: "Karan Mehta",  roll: 67, present: 28 },
        { name: "Pooja Reddy",  roll: 15, present: 12 },
        { name: "Arjun Nair",   roll: 29, present: 35 },
    ]},
    { id: "stats",       name: "Statistics",               teacher: "Dr. Kavitha Rao",    total: 36, students: [
        { name: "Rishi Singh",  roll: 71, present: 32 },
        { name: "Amit Kumar",   roll: 1,  present: 35 },
        { name: "Priya Sharma", roll: 12, present: 36 },
        { name: "Rahul Verma",  roll: 23, present: 28 },
        { name: "Sneha Patel",  roll: 34, present: 30 },
        { name: "Vikram Singh", roll: 45, present: 25 },
        { name: "Anita Desai",  roll: 56, present: 34 },
        { name: "Karan Mehta",  roll: 67, present: 29 },
        { name: "Pooja Reddy",  roll: 15, present: 20 },
        { name: "Arjun Nair",   roll: 29, present: 33 },
    ]},
    { id: "oe",          name: "OE (Business Entrep.)",    teacher: "Ms. Deepa Nambiar",  total: 30, students: [
        { name: "Rishi Singh",  roll: 71, present: 27 },
        { name: "Amit Kumar",   roll: 1,  present: 24 },
        { name: "Priya Sharma", roll: 12, present: 30 },
        { name: "Rahul Verma",  roll: 23, present: 19 },
        { name: "Sneha Patel",  roll: 34, present: 29 },
        { name: "Vikram Singh", roll: 45, present: 11 },
        { name: "Anita Desai",  roll: 56, present: 28 },
        { name: "Karan Mehta",  roll: 67, present: 22 },
        { name: "Pooja Reddy",  roll: 15, present: 16 },
        { name: "Arjun Nair",   roll: 29, present: 26 },
    ]},
    { id: "evs",         name: "EVS",                      teacher: "Mr. Ajay Thakur",    total: 26, students: [
        { name: "Rishi Singh",  roll: 71, present: 24 },
        { name: "Amit Kumar",   roll: 1,  present: 26 },
        { name: "Priya Sharma", roll: 12, present: 25 },
        { name: "Rahul Verma",  roll: 23, present: 20 },
        { name: "Sneha Patel",  roll: 34, present: 23 },
        { name: "Vikram Singh", roll: 45, present: 14 },
        { name: "Anita Desai",  roll: 56, present: 22 },
        { name: "Karan Mehta",  roll: 67, present: 19 },
        { name: "Pooja Reddy",  roll: 15, present: 10 },
        { name: "Arjun Nair",   roll: 29, present: 24 },
    ]},
    { id: "electronics", name: "Electronics Basic",         teacher: "Ms. Rekha Joshi",    total: 34, students: [
        { name: "Rishi Singh",  roll: 71, present: 31 },
        { name: "Amit Kumar",   roll: 1,  present: 34 },
        { name: "Priya Sharma", roll: 12, present: 28 },
        { name: "Rahul Verma",  roll: 23, present: 30 },
        { name: "Sneha Patel",  roll: 34, present: 32 },
        { name: "Vikram Singh", roll: 45, present: 20 },
        { name: "Anita Desai",  roll: 56, present: 29 },
        { name: "Karan Mehta",  roll: 67, present: 26 },
        { name: "Pooja Reddy",  roll: 15, present: 15 },
        { name: "Arjun Nair",   roll: 29, present: 31 },
    ]},
];

// helpers
const pct = (p, t) => Math.round((p / t) * 100);
const avg = s => Math.round(s.reduce((a, st) => a + pct(st.present, s[0]?.total || 1), 0) / s.length);

function subjectAvg(sub) {
    return Math.round(sub.students.reduce((a, st) => a + pct(st.present, sub.total), 0) / sub.students.length);
}

function fillClass(p) {
    if (p >= 75) return "fill-high";
    if (p >= 60) return "fill-mid";
    return "fill-low";
}

// summary
const avgs = subjects.map(subjectAvg);
const overall = Math.round(avgs.reduce((a, b) => a + b, 0) / avgs.length);
const maxAvg = Math.max(...avgs);
const minAvg = Math.min(...avgs);

document.getElementById("overallAvg").textContent    = overall + "%";
document.getElementById("highestSub").textContent    = subjects[avgs.indexOf(maxAvg)].name + " (" + maxAvg + "%)";
document.getElementById("lowestSub").textContent     = subjects[avgs.indexOf(minAvg)].name + " (" + minAvg + "%)";

// render teacher cards
function renderCards() {
    const container = document.getElementById("teacherCards");
    container.innerHTML = "";
    subjects.forEach(sub => {
        const a = subjectAvg(sub);
        const atRisk = sub.students.filter(st => pct(st.present, sub.total) < 60).length;
        const isUrgent = a < 65;

        const card = document.createElement("div");
        card.className = "teacher-card";
        card.innerHTML = `
            <h4>${sub.name}</h4>
            <p class="tname">Teacher: ${sub.teacher}</p>
            <div class="card-stats">
                <div class="card-stat">
                    <span class="val">${a}%</span>
                    <span class="lbl">Avg. Attendance</span>
                </div>
                <div class="card-stat">
                    <span class="val green">${sub.students.filter(st => pct(st.present, sub.total) >= 75).length}</span>
                    <span class="lbl">Above 75%</span>
                </div>
                <div class="card-stat">
                    <span class="val red">${atRisk}</span>
                    <span class="lbl">At Risk (&lt;60%)</span>
                </div>
            </div>
            <div class="progress-bg">
                <div class="progress-fill ${fillClass(a)}" style="width:${a}%"></div>
            </div>
            <div class="card-footer">
                <span>${sub.total} classes &middot; ${sub.students.length} students</span>
                <button class="alert-btn ${isUrgent ? 'urgent' : ''}"
                    data-teacher="${sub.teacher}" data-subject="${sub.name}" data-avg="${a}">
                    ${isUrgent ? "⚠ Send Alert" : "Message"}
                </button>
            </div>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll(".alert-btn").forEach(btn => {
        btn.addEventListener("click", () => openModal(btn.dataset.teacher, btn.dataset.subject, btn.dataset.avg));
    });
}

// student breakdown table
document.getElementById("tableSubject").addEventListener("change", function() {
    const sub = subjects.find(s => s.id === this.value);
    const area = document.getElementById("tableArea");
    if (!sub) {
        area.innerHTML = `<p style="color:#888;">Select a subject to view students.</p>`;
        return;
    }
    const sorted = [...sub.students].sort((a, b) => pct(b.present, sub.total) - pct(a.present, sub.total));
    area.innerHTML = `
        <table>
            <tr><th>Roll No</th><th>Name</th><th>Present</th><th>Total</th><th>Attendance %</th><th>Status</th></tr>
            ${sorted.map(st => {
                const p = pct(st.present, sub.total);
                const status = p >= 75 ? "Regular" : p >= 60 ? "Average" : "At Risk";
                return `<tr>
                    <td>${st.roll}</td>
                    <td>${st.name}</td>
                    <td>${st.present}</td>
                    <td>${sub.total}</td>
                    <td>${p}%</td>
                    <td>${status}</td>
                </tr>`;
            }).join("")}
        </table>
    `;
});

// modal
function openModal(teacher, subject, a) {
    document.getElementById("modalTo").textContent = `To: ${teacher} (${subject} — Avg: ${a}%)`;
    document.getElementById("alertMsg").value = a < 65
        ? `Dear ${teacher},\n\nThe average attendance in your ${subject} class is ${a}%, which is below the required 65%. Please take necessary action.\n\nRegards,\nAdmin`
        : `Dear ${teacher},\n\nRegarding attendance for ${subject} (Current avg: ${a}%).\n\nRegards,\nAdmin`;
    document.getElementById("modal").classList.add("open");
}

document.getElementById("cancelBtn").addEventListener("click", () => document.getElementById("modal").classList.remove("open"));
document.getElementById("sendBtn").addEventListener("click", () => {
    const msg = document.getElementById("alertMsg").value.trim();
    if (!msg) return;
    document.getElementById("modal").classList.remove("open");
    alert("Alert sent successfully!");
});

renderCards();