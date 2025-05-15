# Home Screen – VibeWise

## 🧭 Purpose

The Home screen is the user’s starting point. It provides a snapshot of their current inner state and recent activity. It encourages continued use by showing summary data like the latest vibe score, Spiral phase, and ongoing streak — while offering quick access to the most important features.

## ✨ Structure

* **Top section**:

  * Greeting ("Good morning, \[name]")
  * Streak badge (e.g., “6 days in a row 🌿”)

* **Current Status Card**:

  * Latest Vibe Score
  * Mood summary or last emotion selected
  * Spiral Phase (“You’re showing Green patterns”)
  * Intention for current Spiral phase

* **Quick Action Buttons**:

  * Start New Reflection
  * Start HRV Session
  * Record Voice Note

* **Recent Activity Feed** (optional):

  * Past 2–3 entries (reflection, HRV, balcony)
  * Tapping opens Session Detail

## 🎨 UI Guidelines

* Calm, inviting, and minimal
* Use subtle animations on Vibe score change
* Streak badge has a soft highlight and no gamification
* Spiral colors used subtly in background or icon

## 📥 Data Sources

* `/users/{uid}/summary` for quick-read data:

```json
{
  "latest_reflection_timestamp": "2025-05-15T10:32:00Z",
  "latest_vibe_score": 72,
  "current_spiral_phase": "Green",
  "streak_days": 6,
  "intention": "Listen with compassion"
}
```

* `/sessions/` limited fetch (e.g., last 3)

## 🔁 Connected Features

* Quick actions open Reflect or HRV Session screens
* Divine Timing pushes may bring users back here
* Pulls intention from Journey screen
* Vibe score connects to Live HRV and Spiral estimation

## 🧪 Testing Notes

* Summary loads instantly from `/summary` doc (1 read)
* Action buttons navigate correctly
* Handle case when no reflection yet exists
* Responsive layout works across mobile sizes
