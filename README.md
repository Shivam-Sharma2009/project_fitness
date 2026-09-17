# project_fitness

## 🏋️ SportFit — AI-Powered Fitness Platform

> **SIH 2026 | PS-26194 | AICTE | Fitness & Sports**

A full-stack, AI-powered sports and fitness web platform built for Smart India Hackathon 2026.

---

## 🚀 Features

- **AI Form Guard** — Real-time posture detection & rep counting via camera (TensorFlow.js)
- **Accessibility AI** — Voice-first fitness assistant powered by Claude AI (for differently-abled users)
- **AI Voice Coach** — Personal voice coaching using Web Speech API
- **Fatigue Detection** — Smart energy monitoring with voice alerts
- **AR Campus Quests** — Gamified fitness missions with XP & badges
- **Nutrition Tracker** — Calorie counter, water tracker, meal planner
- **Progress Dashboard** — Daily workout, calorie & hydration tracking
- **Google + Email Auth** — Firebase Authentication
- **Real-time Database** — Cloud Firestore for persistent user data

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Design | Inter Font, Glassmorphism, CSS Animations |
| Auth | Firebase Authentication (Google + Email) |
| Database | Cloud Firestore |
| AI (Pose) | Human.js + TensorFlow.js |
| AI (Voice) | Claude API (Anthropic) + Web Speech API |
| Deployment | Vercel (Frontend) + Firebase (Backend) |

---

## 📁 Project Structure

```
project_fitness/
├── frontend/
│   ├── home.html          # Main landing page
│   ├── about.html
│   ├── login.html         # Firebase Auth login
│   ├── register.html      # Firebase Auth register
│   ├── fitness.html
│   ├── workouts.html
│   ├── sports.html
│   ├── nutrition.html
│   ├── progress.html
│   ├── Accessibility.html # Claude AI voice assistant
│   ├── aiformguard.html   # TF.js pose detection
│   ├── AI_voice_coach.html
│   ├── fatigue.html
│   ├── ar_campus.html
│   ├── PW Care.html
│   ├── Donate.html
│   ├── css/
│   │   └── style.css      # Shared design system
│   └── js/
│       ├── firebase-config.js
│       ├── auth.js
│       └── app.js
├── functions/             # Firebase Cloud Functions
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
└── vercel.json
```

---

## ⚙️ Setup

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/project_fitness.git
cd project_fitness
```

### 2. Set up Firebase
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project named `project-fitness`
3. Enable **Authentication** → Email/Password + Google
4. Enable **Firestore Database**
5. Copy your config from **Project Settings → Your Apps → Web**
6. Paste into `frontend/js/firebase-config.js`

### 3. Deploy to Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

### 4. Deploy Frontend to Vercel
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Select the repo → Deploy

---

## 🤝 Team

Built for **SIH 2026** | Problem Statement ID: **26194**
Organization: **AICTE, MIC-Student Innovation**
Theme: **Fitness & Sports**

---

© 2026 SportFit
