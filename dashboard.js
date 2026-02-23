import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Not logged in, send to login page
    window.location.href = "login.html";
    return;
  }

  try {
    const uid = user.uid;
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) throw new Error("User not found");

    const role = userDoc.data().role;

    // Redirect based on role
    if (role === "student") window.location.href = "student-dashboard.html";
    else if (role === "teacher") window.location.href = "teacher-dashboard.html";
    else if (role === "admin") window.location.href = "admin-dashboard.html";
    else throw new Error("Invalid role");

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please login again.");
    await signOut(auth);
    window.location.href = "login.html";
  }
});