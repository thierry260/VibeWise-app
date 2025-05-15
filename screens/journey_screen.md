# Journey Screen – VibeWise

## 🧭 Purpose

The Journey screen helps users visualize their personal growth over time using Spiral Dynamics as the guiding model. The app passively infers a user's dominant spiral phase based on reflection content, emotion patterns, vibe score trends, and voice tone. This screen also allows users to set an intention for their current phase and view behavioral patterns, including limiting beliefs and truths derived from Balcony experiments.

## ✨ Structure

* Current Spiral Phase indicator (e.g., "You’re currently expressing patterns in Green")
* Set/Update Intention for this phase (short text field)
* Timeline or radial graph showing recent movement between Spiral phases
* Pattern recognition module:

  * Recurring tags, moods, and transitions
  * Example: "You often move from Green → Orange during work-related reflections."
* Limiting Beliefs vs Truth insights (drawn from Balcony experiments)

## 🎨 UI Guidelines

* Visualize Spiral as a circular or stacked ladder progression
* Minimalistic, yet colorful enough to differentiate levels
* Current phase clearly highlighted
* Use calming transitions and avoid gamification
* Each phase should have a soft icon or visual signature (optional)

## 🗂 Spiral Phases & Tags (for internal logic)

* Beige
* Purple
* Red
* Blue
* Orange
* Green
* Yellow
* Turquoise

Each mapped internally to emotions, beliefs, and reflection tone patterns.

## 📝 Intention Setting

* Input: "What is your conscious intention during this phase?"
* Stores in: `/users/{uid}/journey/intention`

```json
{
  "phase": "Green",
  "intention": "Practice compassionate listening",
  "set_at": "2025-05-15T08:00:00Z"
}
```

## 📥 Data Inputs for Spiral Estimation

* Mood tag frequency (e.g., high sadness in Red, connection in Green)
* Emotion tone from voice logs
* Vibe Score variance
* Language sentiment from reflection text

## 🔁 Connected Features

* Pulls Balcony insights from `/sessions/`
* Reads intention from `/journey/intention`
* Updates summary doc:

  * `current_spiral_phase`
  * `spiral_history[]`

## 🧪 Testing Notes

* Validate passive inference doesn’t conflict with user intuition (no manual setting)
* Ensure intention field only appears once per phase
* Spiral history can’t be edited, only appended by system
* Recheck behavior patterns when sessions are deleted
