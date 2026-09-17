// ============================================================
//  SPORTFIT — AUTH MODULE
//  Handles: Google Sign-In, Email/Password, Sign-Out, Auth State
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── Initialize ──
const app  = initializeApp(window.__SPORTFIT_CONFIG__);
const auth = getAuth(app);
const db   = getFirestore(app);

window.__SPORTFIT_AUTH__ = auth;
window.__SPORTFIT_DB__   = db;

// ── Helper: create user doc in Firestore on first login ──
async function ensureUserDoc(user) {
  const ref  = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      uid:       user.uid,
      name:      user.displayName || "Athlete",
      email:     user.email,
      photoURL:  user.photoURL || null,
      createdAt: serverTimestamp(),
      stats: {
        totalWorkouts:  0,
        caloriesBurned: 0,
        waterGlasses:   0,
        streakDays:     0,
        totalXP:        0
      },
      accessibility: {
        mode:       "standard",
        highContrast: false,
        largeText:   false,
        seatedMode:  false
      }
    });
  }
}

// ── Google Sign-In ──
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  try {
    const result = await signInWithPopup(auth, provider);
    await ensureUserDoc(result.user);
    return { success: true, user: result.user };
  } catch (err) {
    console.error("Google Sign-In error:", err);
    return { success: false, error: err.message };
  }
}

// ── Email/Password Login ──
export async function loginWithEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (err) {
    console.error("Email login error:", err);
    const msgs = {
      "auth/user-not-found":  "No account found with this email.",
      "auth/wrong-password":  "Incorrect password. Please try again.",
      "auth/invalid-email":   "Invalid email address.",
      "auth/too-many-requests": "Too many attempts. Please try again later."
    };
    return { success: false, error: msgs[err.code] || err.message };
  }
}

// ── Email/Password Register ──
export async function registerWithEmail(name, email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    await ensureUserDoc({ ...result.user, displayName: name });
    return { success: true, user: result.user };
  } catch (err) {
    console.error("Register error:", err);
    const msgs = {
      "auth/email-already-in-use": "An account with this email already exists.",
      "auth/weak-password":        "Password must be at least 6 characters.",
      "auth/invalid-email":        "Invalid email address."
    };
    return { success: false, error: msgs[err.code] || err.message };
  }
}

// ── Sign Out ──
export async function logout() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ── Auth State Observer ──
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// ── Get current user ──
export function getCurrentUser() {
  return auth.currentUser;
}

// ── Update navbar based on auth state ──
export function bindNavAuthState() {
  onAuthStateChanged(auth, (user) => {
    const loginBtn  = document.getElementById("nav-login-btn");
    const signupBtn = document.getElementById("nav-signup-btn");
    const userMenu  = document.getElementById("nav-user-menu");
    const userAvatar = document.getElementById("nav-avatar");
    const userLabel  = document.getElementById("nav-user-label");

    if (user) {
      if (loginBtn)  loginBtn.style.display  = "none";
      if (signupBtn) signupBtn.style.display = "none";
      if (userMenu)  userMenu.style.display  = "flex";
      if (userAvatar) {
        const initials = (user.displayName || user.email || "U")[0].toUpperCase();
        userAvatar.textContent = initials;
        if (user.photoURL) {
          userAvatar.innerHTML = `<img src="${user.photoURL}" alt="avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
        }
      }
      if (userLabel) userLabel.textContent = user.displayName || "Athlete";
    } else {
      if (loginBtn)  loginBtn.style.display  = "";
      if (signupBtn) signupBtn.style.display = "";
      if (userMenu)  userMenu.style.display  = "none";
    }
  });
}
