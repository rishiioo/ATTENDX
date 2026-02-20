// LOGOUT

document.querySelector(".logout-btn").onclick = () => {
  window.location.href = "index.html";
};

// DATA

const attendanceData = {
  math: [
    "22-Dec",
    "24-Dec",
    "27-Dec",
    "30-Dec",
    "02-Jan",
    "06-Jan",
    "08-Jan",
    "10-Jan",
    "13-Jan",
  ],

  computer: [
    "22-Dec",
    "24-Dec",
    "26-Dec",
    "30-Dec",
    "02-Jan",
    "05-Jan",
    "08-Jan",
    "10-Jan",
    "12-Jan",
  ],

  stats: [
    "23-Dec",
    "25-Dec",
    "27-Dec",
    "31-Dec",
    "03-Jan",
    "06-Jan",
    "09-Jan",
    "11-Jan",
    "13-Jan",
  ],

  english: [
    "22-Dec",
    "25-Dec",
    "27-Dec",
    "30-Dec",
    "03-Jan",
    "06-Jan",
    "08-Jan",
    "11-Jan",
    "13-Jan",
  ],

  evs: [
    "23-Dec",
    "25-Dec",
    "31-Dec",
    "03-Jan",
    "06-Jan",
    "07-Jan",
    "09-Jan",
    "11-Jan",
    "14-Jan",
  ],

  oe: [
    "23-Dec",
    "26-Dec",
    "29-Dec",
    "31-Jan",
    "05-Jan",
    "07-Jan",
    "09-Jan",
    "12-Jan",
    "14-Jan",
  ],

  electronics: [
    "24-Dec",
    "26-Dec",
    "29-Dec",
    "02-Jan",
    "05-Jan",
    "07-Jan",
    "10-Jan",
    "12-Jan",
    "14-Jan",
  ],
};

// RANDOM STATUS

function getStatus() {
  return Math.random() > 0.2 ? "Present" : "Absent";
}

// DROPDOWN

const dropdown = document.getElementById("subject");

const table = document.getElementById("attendance-table");

const tbody = table.querySelector("tbody");

const subjectTitle = document.getElementById("selected-subject");

dropdown.addEventListener("change", () => {
  const subject = dropdown.value;

  tbody.innerHTML = "";

  if (!subject) {
    subjectTitle.innerText = "None";

    return;
  }

  subjectTitle.innerText = dropdown.options[dropdown.selectedIndex].text;

  attendanceData[subject].forEach((date) => {
    const status = getStatus();

    tbody.innerHTML += `

<tr>

<td>${date}</td>

<td class="${status === "Present" ? "present-text" : "absent-text"}">

${status}

</td>

</tr>

`;
  });
});
