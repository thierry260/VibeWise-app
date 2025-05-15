# Reflect Screen – VibeWise

## 🧭 Purpose

The Reflect screen allows users to capture emotional experiences by logging a "New Moment." It forms the core of personal insight in VibeWise. Users document their current or past emotional state using an intuitive structure that includes mood, timestamp, tags, and an optional voice log.

## ✨ Structure

This screen is broken down into:

* Mood selection (Abraham-Hicks scale)
* Moment description (free text)
* Theme tags
* Timestamp selection (Now or Set Time)
* Optional voice recording (with AI emotion analysis)

## 🎨 UI Guidelines

* Use the full Abraham-Hicks Emotional Guidance Scale with 22 emotions:

  1. Joy / Appreciation / Empowerment / Freedom / Love
  2. Passion
  3. Enthusiasm / Eagerness / Happiness
  4. Positive Expectation / Belief
  5. Optimism
  6. Hopefulness
  7. Contentment
  8. Boredom
  9. Pessimism
  10. Frustration / Irritation / Impatience
  11. Overwhelm
  12. Disappointment
  13. Doubt
  14. Worry
  15. Blame
  16. Discouragement
  17. Anger
  18. Revenge
  19. Hatred / Rage
  20. Jealousy
  21. Insecurity / Guilt / Unworthiness
  22. Fear / Grief / Depression / Despair / Powerlessness
* Emotions should be grouped visually into high (1–7), neutral (8–14), and low (15–22) states
* Use grouped chips or expandable selectors to manage screen space
* Tag selector uses chips (preset or user-defined)
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
  "mood": "Frustration",
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
