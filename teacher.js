
const logoutBtn = document.querySelector(".logout-btn");
const submitBtn = document.querySelector(".submit-btn");
const subject = document.getElementById("subject");
const date = document.getElementById("date");
const studentCheckboxes = document.querySelectorAll(".student input");

logoutBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
});


submitBtn.addEventListener("click", () => {
  const selectedSubject = subject.value;
  const selectedDate = date.value;

  if (selectedSubject === "") {
    alert("Please select subject");
    return;
  }

  if (selectedDate === "") {
    alert("Please select date");
    return;
  }


  let present = 0;
  let absent = 0;

  studentCheckboxes.forEach((student) => {
    if (student.checked) present++;
    else absent++;
  });


  const attendanceData = {
    subject: selectedSubject,
    date: selectedDate,
    present: present,
    absent: absent,
  };


  localStorage.setItem("attendance", JSON.stringify(attendanceData));


  alert(
    `Attendance Submitted Successfully!

Subject: ${selectedSubject}
Date: ${selectedDate}

Present: ${present}
Absent: ${absent}`,
  );

  console.log(attendanceData);
});
