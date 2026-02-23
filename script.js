import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Get email and password
  const email = document.getElementById("loginusername").value.trim();
  const password = document.getElementById("loginpassword").value.trim();

  if (!email || !password) {
    showError("Email and password cannot be empty.");
    return;
  }

  try {
    // Firebase modular login
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) throw new Error("User not found");

    const role = userDoc.data().role;

    // Redirect based on role
    if (role === "student") window.location.href = "student-dashboard.html";
    else if (role === "teacher") window.location.href = "teacher-dashboard.html";
    else if (role === "admin") window.location.href = "admin-dashboard.html";
    else throw new Error("Invalid role");

  } catch (error) {
if (error.code === 'auth/wrong-password') {
    showError("Incorrect password. Please try again.");
} else if (error.code === 'auth/user-not-found') {
    showError("No account found with this email.");
} else {
    showError("Login failed. Please try again.");
}  }
});

// Error display function
function showError(message) {
  removeMessage();
  const error = document.createElement("div");
  error.className = "error-message";
  error.innerText = message;
  form.prepend(error);
}

// Remove old error/success messages
function removeMessage() {
  const oldMessage = document.querySelector(".error-message, .success-message");
  if (oldMessage) oldMessage.remove();
}