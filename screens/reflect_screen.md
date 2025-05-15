# Reflect Screen – VibeWise

## 🧭 Purpose

The Reflect screen allows users to capture emotional experiences by logging a "New Moment." It forms the core of personal insight in VibeWise. Users document their current or past emotional state using an intuitive structure that includes mood, timestamp, tags, and an optional voice log.

## ✨ Structure

This screen is broken down into:

* Mood selection (emotion slider)
* Moment description (free text)
* Theme tags
* Timestamp selection (Now or Set Time)
* Optional voice recording (with AI emotion analysis)

## 🎨 UI Guidelines

* Reflects the app’s minimalistic, high-design aesthetic
* Emotion slider grouped in three categories:

  * High: Joy, Empowerment, Clarity, Inspiration
  * Neutral: Calm, Acceptance, Curiosity
  * Low: Fear, Frustration, Shame, Overwhelm
* Use grouped button-style selectors or pill components
* Theme/tag selector uses chips (preset or user-defined)
* Input area for free-text
* “Add Voice Log” (mic icon) triggers voice recording overlay
* Timestamp defaults to `Now` with option to open time picker
* Final CTA: "Log Reflection"

## 📥 On Submission

Store reflection with the following structure:

```json
{
  "type": "reflection",
  "timestamp": "2025-05-15T10:15:00Z",
  "mood": ["Overwhelmed"],
  "mood_level": "low",
  "text": "I felt drained after a client call.",
  "tags": ["Work"],
  "audio_url": "...", // if recorded
  "voice_insight": {
    "tone": "sadness",
    "confidence": 0.88
  }
}
```

* Save to: `/users/{uid}/sessions/{sessionId}`
* Update summary doc:

  * `latest_reflection_timestamp`
  * `latest_vibe_score`
  * `reflection_count`

## 🔁 Connected Features

* **Triggers Divine ToolChooser**: Suggest 1–2 random meditations, quotes, or tools
* **Enables Balcony Experiment**: A follow-up reflection can be added later
* **Feeds Spiral Detection Engine**: Reflection tone, mood, and text used for estimating Spiral level
* **Affects Streak Count**: Reflection contributes to ongoing usage streak

## 🔔 Optional Interaction

* After log, subtle confetti or affirmation animation
* Option to “Add Insight Later” → bookmark this reflection for a future Balcony moment

## 🧪 Testing Notes

* Ensure log is saved only once per press
* Test voice recognition offline fallback
* Confirm tone analysis works across languages (or restrict to EN/NL for now)
* Ensure Divine ToolChooser does not repeat same tool twice in a row
