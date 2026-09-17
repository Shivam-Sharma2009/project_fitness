// ============================================================
//  SPORTFIT — FIREBASE CONFIGURATION
//  ⚠️  Replace the config object below with YOUR Firebase config
//  Get it from: Firebase Console → Project Settings → Your Apps
// ============================================================

const firebaseConfig = {
  apiKey:            "AIzaSyAcl1tb-JW4T4P6rup_TNGMNXqfQ_wnTRE",
  authDomain:        "fitness-innovexathetechlets.firebaseapp.com",
  projectId:         "fitness-innovexathetechlets",
  storageBucket:     "fitness-innovexathetechlets.firebasestorage.app",
  messagingSenderId: "541024216414",
  appId:             "1:541024216414:web:9017d878fc34c961105bcf",
  measurementId:     "G-M2XSHC9WWM"
};

// ── Initialize Firebase ──
// Using CDN imports — scripts are loaded in each HTML <head>
// window.firebaseApp, window.firebaseAuth, window.firebaseDb
// will be set once firebase-init.js is loaded (see firebase-init.js)

window.__SPORTFIT_CONFIG__ = firebaseConfig;
