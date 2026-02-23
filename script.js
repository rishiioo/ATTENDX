// ========================
// ATTENDX Login JS
// ========================

import { auth, db } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const form = document.getElementById("loginForm");
const forgotLink = document.getElementById("forgotPasswordLink");

// ========================
// LOGIN SUBMIT
// ========================
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("loginusername").value.trim();
  const password = document.getElementById("loginpassword").value.trim();

  if (!email || !password) {
    showError("Email and password cannot be empty.");
    return;
  }

  showLoading("Logging in...");

  try {
    // Firebase login
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const uid = userCredential.user.uid;

    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) throw new Error("User not found");

    const role = userDoc.data().role;

    // Redirect based on role
    if (role === "student") window.location.href = "student-dashboard.html";
    else if (role === "teacher")
      window.location.href = "teacher-dashboard.html";
    else if (role === "admin") window.location.href = "admin-dashboard.html";
    else throw new Error("Invalid role");
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      showError("Incorrect password. Please try again.");
    } else if (error.code === "auth/user-not-found") {
      showError("No account found with this email.");
    } else if (error.code === "auth/invalid-email") {
      showError("Please enter a valid email.");
    } else {
      showError("Login failed. Please try again.");
    }
    console.log(error.code, error.message); // for debugging
  }
});

// ========================
// FORGOT PASSWORD
// ========================
forgotLink.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginusername").value.trim();
  if (!email) {
    showError("Please enter your email first.");
    return;
  }

  showLoading("Sending reset email...");

  try {
    await sendPasswordResetEmail(auth, email);
    showSuccess("Password reset email sent! Check your inbox.");
  } catch (error) {
    console.log(error.code, error.message); // debugging
    if (error.code === "auth/user-not-found") {
      showError("No account found with this email.");
    } else if (error.code === "auth/invalid-email") {
      showError("Please enter a valid email.");
    } else {
      showError("Failed to send reset email. Try again.");
    }
  }
});

// ========================
// UTILITY FUNCTIONS
// ========================
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

function showLoading(message) {
  removeMessage();
  const loading = document.createElement("div");
  loading.className = "success-message";
  loading.innerText = message;
  form.prepend(loading);
}

function removeMessage() {
  const oldMessage = document.querySelector(".error-message, .success-message");
  if (oldMessage) oldMessage.remove();
}
