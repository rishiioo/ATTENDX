# ATTENDX — Attendance Management System

A web-based attendance management platform for educational institutions. It lets **teachers** mark attendance (manually or via QR code), gives **students** a personal attendance dashboard, and provides an **admin** panel for oversight and analytics. Built with vanilla HTML/CSS/JavaScript, powered by Firebase (Authentication + Firestore), and hosted on Vercel with Web Analytics enabled.

---

## 📸 Screens / Pages

| Page | File | Purpose |
|------|------|---------|
| Login | `index.html` | Role-based login (Student / Teacher / Admin) with Firebase auth |
| Student Dashboard | `student-dashboard.html` | Attendance stats, per-subject summary, progress bar, recent activity |
| Teacher Dashboard | `teacher-dashboard.html` | Mark attendance by subject + date, generate a QR code for students to self-check-in, or tick students manually |
| Admin Dashboard | `admin-dashboard.html` | Overview stats, teacher & student records, low-attendance warnings |

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, vanilla JavaScript (ES modules)
- **Backend / Auth:** Firebase Authentication + Firestore (SDK loaded via CDN)
- **QR codes:** `qrcodejs` (CDN)
- **Hosting:** Vercel (branch `vercel/set-up-vercel-web-analytics-in-m5ktlb`)
- **Analytics:** Vercel Web Analytics (`/_vercel/insights/script.js`)

## 🧩 Roles

1. **Student** — views their own attendance, overall percentage, per-subject breakdown, and recent activity.
2. **Teacher** — selects a subject and date, then marks attendance either by checking students off the list or by generating a QR code students scan to mark themselves present.
3. **Admin** — sees total teacher/student counts, low-attendance students, full teacher & student record tables, and a warnings panel.

## 🚀 How to Run / Deploy

The project is already deployed on Vercel. To run it locally:

```bash
# 1. Create the missing Firebase config file (see setup below)
# 2. Serve the folder with any static server, e.g.:
python -m http.server 8000
```

Then open `http://localhost:8000/index.html`.

### ⚠️ Setup: `firebase-config.js`

`script.js` imports `./firebase-config.js`, which is **not** currently in the repo. You must create it with your own Firebase project credentials:

```js
// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  appId: "YOUR_APP_ID",
  authDomain: "YOUR_PROJECT_ID firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderID: "YOUR_SENDER_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

Get these values from the **Firebase Console → Project Settings → General → Your apps → Web app**. Also make sure **Email/Password** is enabled as a sign-in method in Authentication, and that a `users` collection exists in Firestore with each user document containing a `role` field (`"student"`, `"teacher"`, or `"admin"`).

## 📝 Notes for HR / Handoff

- **Data is stored in Firebase Firestore.** The `users` collection holds accounts; attendance records are written by teachers via `teacher.js` (currently saved to `localStorage` as a demo fallback).
- **Demo credentials** were used during development (e.g. `student1`/`demo123`). These must be replaced with real accounts before production use.
- **Contact:** attendx.support@gmail.com
- **Source:** github.com/rishi-attendx

## 📂 Repository Layout

```
