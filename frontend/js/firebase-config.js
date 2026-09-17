// ============================================================
//  SPORTFIT — FIREBASE CONFIGURATION
//  ⚠️  Replace the config object below with YOUR Firebase config
//  Get it from: Firebase Console → Project Settings → Your Apps
// ============================================================

// TODO: Replace with your actual Firebase config after creating project
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID",
  measurementId:     "YOUR_MEASUREMENT_ID"
};

// ── Initialize Firebase ──
// Using CDN imports — scripts are loaded in each HTML <head>
// window.firebaseApp, window.firebaseAuth, window.firebaseDb
// will be set once firebase-init.js is loaded (see firebase-init.js)

window.__SPORTFIT_CONFIG__ = firebaseConfig;
