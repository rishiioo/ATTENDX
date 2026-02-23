// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEMdtxpccxO-ljWBOgx8slMO650JMAZcY",
  authDomain: "attendx-2924d.firebaseapp.com",
  projectId: "attendx-2924d",
  storageBucket: "attendx-2924d.firebasestorage.app",
  messagingSenderId: "159650493656",
  appId: "1:159650493656:web:bce902f2087cbdccd4d3ad"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);