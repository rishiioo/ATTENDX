// Logout functionality
const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// Submit attendance functionality
const submitBtn = document.querySelector(".submit-btn");
const subjectSelect = document.getElementById("subject");
const dateInput = document.getElementById("date");

if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    // Get selected subject
    const subject = subjectSelect.value;
    const subjectText = subjectSelect.options[subjectSelect.selectedIndex].text;
    const date = dateInput.value;

    // Validation
    if (!subject) {
      alert("Please select a subject!");
      return;
    }

    if (!date) {
      alert("Please select a date!");
      return;
    }

    // Count present/absent students
    const checkboxes = document.querySelectorAll(
      '.student-item input[type="checkbox"]',
    );
    let presentCount = 0;
    let absentCount = 0;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        presentCount++;
      } else {
        absentCount++;
      }
    });

    // Show success message
    alert(
      `Attendance Marked Successfully!\n\nSubject: ${subjectText}\nDate: ${date}\nPresent: ${presentCount}\nAbsent: ${absentCount}`,
    );

    // In production, this would save to database
    console.log("Attendance Data:", {
      subject: subject,
      date: date,
      present: presentCount,
      absent: absentCount,
    });
  });
}
