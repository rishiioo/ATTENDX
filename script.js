import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const form = document.getElementById("loginForm");

const forgotLink = document.getElementById("forgotPasswordLink");
forgotLink.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginusername").value.trim();
  if (!email) {
    showError("Please enter your email first.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    showSuccess("Password reset email sent! Check your inbox.");
  } catch (error) {
    if (error.code === "auth/user-not-found") showError("No account found with this email.");
    else if (error.code === "auth/invalid-email") showError("Please enter a valid email.");
    else showError("Failed to send reset email. Try again.");
  }
});

// ---------------- LOGIN ----------------
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginusername").value.trim();
  const password = document.getElementById("loginpassword").value.trim();
   
  if (!email || !password) {
    showError("Email and password cannot be empty.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) throw new Error("User not found");

    const role = userDoc.data().role;

    // Redirect based on role
    if (role === "student") redirectWithMessage("student-dashboard.html");
    else if (role === "teacher") redirectWithMessage("teacher-dashboard.html");
    else if (role === "admin") redirectWithMessage("admin-dashboard.html");
    else throw new Error("Invalid role");

  } catch (error) {
    if (error.code === 'auth/wrong-password') showError("Incorrect password. Please try again.");
    else if (error.code === 'auth/user-not-found') showError("No account found with this email.");
    else showError("Login failed. Please try again.");
  }
});

// ---------------- REDIRECT WITH DELAY ----------------
function redirectWithMessage(url) {
  showSuccess("Login successful! Redirecting...");
  setTimeout(() => {
    window.location.href = url;
  }, 600); // 0.6 seconds delay for UX
}

// ---------------- ERROR/SUCCESS HANDLERS ----------------
function showError(message) {
  removeMessage();
  const error = document.createElement("div");
  error.className = "error-message";
  error.innerText = message;
  form.prepend(error);
}

function showSuccess(message) {
  removeMessage();
  const success = document.createElement("div");
  success.className = "success-message";
  success.innerText = message;
  form.prepend(success);
}

function removeMessage() {
  const oldMessage = document.querySelector(".error-message, .success-message");
  if (oldMessage) oldMessage.remove();
}