const form = document.getElementById("loginForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const selectedUser = document.querySelector('input[name="userType"]:checked');
  if (selectedUser === null) {
    alert("Please select Student, Teacher or Admin!");
    return;
  }
  const userType = selectedUser.value;

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (userType === "student") {
    if (username === "student1" && password === "demo123") {
      window.location.href = "student-dashboard.html";
    } else {
      alert("Invalid credentials!");
    }
  } else if (userType === "teacher") {
    window.location.href = "teacher-dashboard.html";
  } else {
    window.location.href = "admin-dashboard.html";
  }
});
