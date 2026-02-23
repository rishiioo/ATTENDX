console.log("Signup JS loaded");
// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCEMdtxpccxO-ljWBOgx8slMO650JMAZcY",
  authDomain: "attendx-2924d.firebaseapp.com",
  projectId: "attendx-2924d",
  storageBucket: "attendx-2924d.firebasestorage.app",
  messagingSenderId: "159650493656",
  appId: "1:159650493656:web:bce902f2087cbdccd4d3ad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup Logic
const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("signuppassword").value.trim();
  const role = document.getElementById("role").value;

  // Basic validation
  if (!name || !email || !password) {
    alert("All fields are required.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user;

    // Store additional user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role,
      createdAt: new Date(),
    });

    alert("Account created successfully!");
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
});
