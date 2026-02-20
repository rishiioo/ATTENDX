const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get selected role
  const selectedUser = document.querySelector('input[name="userType"]:checked');

  // Get inputs
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validation
  if (!selectedUser) {
    showError("Please select a role.");
    return;
  }

  if (username === "" || password === "") {
    showError("Username and password cannot be empty.");
    return;
  }

  const userType = selectedUser.value;

  // Demo credential database
  const users = {
    student: {
      username: "student1",
      password: "demo123",
      redirect: href="student-dashboard.html",
    },
    teacher: {
      username: "teacher1",
      password: "demo123",
      redirect: "teacher-dashboard.html",
    },
    admin: {
      username: "admin1",
      password: "admin123",
      redirect: "admin-dashboard.html",
    },
  };

  // Check credentials
  if (
    username === users[userType].username &&
    password === users[userType].password
  ) {
    showSuccess("Login successful!");

    // Delay for better UX
    setTimeout(() => {
      window.location.href = users[userType].redirect;
    }, 800);
  } else {
    showError("Invalid username or password.");
  }
});

// Error function
function showError(message) {
  removeMessage();

  const error = document.createElement("div");

  error.className = "error-message";
  error.innerText = message;

  form.prepend(error);
}

// Success function
function showSuccess(message) {
  removeMessage();

  const success = document.createElement("div");

  success.className = "success-message";
  success.innerText = message;

  form.prepend(success);
}

// Remove old message
function removeMessage() {
  const oldMessage = document.querySelector(".error-message, .success-message");

  if (oldMessage) {
    oldMessage.remove();
  }
}
