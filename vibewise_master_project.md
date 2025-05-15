# VibeWise – Master Project Document

## ✨ Purpose & Vision

VibeWise is a personal reflection app designed to raise global consciousness by helping users become deeply aware of their emotional states, limiting beliefs, and behavioral patterns. Through biometric tracking, structured reflections, and intuitive design, the app empowers users to let go of ego-driven behaviors and grow toward emotional clarity and spiritual peace. The ultimate goal: 30% of users release limiting beliefs and live more consciously, contributing to global harmony.

## 🧠 Core Concept

* Self-reflection through moments, moods, and voice
* Biometric data via Polar H10 (HRV: RMSSD, SDNN, Vibe Score)
* Spiral Dynamics model for user evolution (passive detection)
* Randomly-timed prompts (Divine Timing) to foster spontaneous awareness
* Random tool suggestions after reflections (Divine ToolChooser)
* No community features, sharing, gamification, or ego triggers

---

## 🧱 Tech Stack

* **Frontend**: SvelteKit + Capacitor (mobile)
* **Backend**: Firebase (Firestore, Auth, Storage, Functions)
* **Authentication**:

  * Google login
  * Email + password
  * Magic link (email-based, no password)
* **Charts**: uPlot (live heart/breath/RMSSD rendering)
* **Voice Analysis**: AI-driven emotion detection from tone

---

## 🎨 Design Principles

* Minimalistic and artful (Calm x Apple aesthetic)
* Rounded, modern UI components
* Gradients and subtle animation
* **Primary Gradient**: `#4D44B3 → #BF469A`
* **Dark Blue**: `#0D2C46`
* **Background**: `#FFF8EE` (no harsh white)
* **Supports light and dark modes**

---

## 📁 Firestore Structure

```
/users/{uid}/
  summary         ← all core stats for Home screen (1 read)
  settings        ← light/dark, mood scale prefs
  sessions/{id}   ← reflections, HRV, audio logs
  journey/        ← spiral patterns + intentions
  library/        ← favorites, usage data, custom uploads
```

### 🔒 Optimization Goals

* **Minimal writes**: batch commits, local buffering
* **Minimal reads**: summaries, pagination, cached sessions
* **Precomputed fields**: average vibe, spiral state, streaks

---

## 🔑 Key Features Overview

### 1. **Authentication (required)**

* Redirects to login on first open
* Auth required to use any app feature

### 2. **Reflect**

* Log a new moment: mood slider, tags, description
* Timestamp: now or manual
* Optionally record voice
* Balcony Experiment: add insight after a clarity moment

### 3. **HRV Session (Polar H10)**

* BLE connection (native on mobile, Web Bluetooth fallback on PWA)
* Live chart with:

  * Heart rate
  * RMSSD (labeled as Balance)
  * Vibe Score (HRV-based metric 0–100)
  * Breathing Guide
* Stop Session → choose save or discard (tooltip on chart interaction)

### 4. **Spiral Dynamics Journey**

* Passive detection of user's spiral level
* Timeline of progression (no ego gamification)
* Intention setting per phase
* Pattern tracking (e.g., "Red → Blue under stress")
* Limiting beliefs + insights surfaced from Balcony Experiments

### 5. **Library**

* Meditations, breathing tools, quotes, custom uploads
* Divine ToolChooser offers random tool after reflection
* Favorites and tagging by Spiral level

### 6. **Session History**

* Timeline view of all sessions (reflection, audio, HRV)
* Filters: tag, Spiral level, mood, type
* Opens detailed session screen

### 7. **Home**

* Latest vibe + reflection summary
* Spiral level + intention reminder
* Streak overview + quick actions

### 8. **Settings**

* Theme toggle (light/dark)
* Account settings
* Mood scale preferences
* BLE device reconnection

---

## 🧠 Mood & Vibe Architecture

### Mood Tracking

* Emotion slider grouped into:

  * High: Joy, Empowerment, Clarity
  * Neutral: Calm, Curiosity, Acceptance
  * Low: Fear, Shame, Frustration
* Users select themes/tags (Work, Friends, etc.)

### Vibe Score Calculation

* Formula: `Vibe = normalize(RMSSD) + weighted SDNN + pattern_stability`
* Interpreted as 0–100 score of physiological-emotional coherence
* Used to:

  * Show trendlines
  * Suggest tools
  * Inform Spiral Dynamics estimation

### Spiral Dynamics Estimation

* Passive, inferred only (no user input)
* Based on:

  * Language patterns from reflections
  * Emotional tone from voice
  * Mood and tag trends
  * Vibe score variability over time

---

## 🛎 Notifications & Interaction

### Divine Timing

* 4 daily push notifications at random times between 07:00–22:30
* Prompt user to open app for spontaneous reflection

### Divine ToolChooser

* After completing a reflection, offer a random:

  * Quote
  * Meditation
  * Breathing exercise

---

## 🔮 Analytics & Insights

* Vibe Score trends
* Spiral stage timeline
* Most frequent tags/themes
* Mood distribution over time
* Streak tracking

---

## ⛔ Excluded Features (Intentionally)

* No community/sharing features
* No leaderboard, streak-based competition, or gamified ranking
* No encryption required for reflections

---

This document serves as the **core blueprint** for Windsurf, AI-assisted dev tools, and collaborators. All screens and features will derive their specific prompts and UI logic from this foundation.
