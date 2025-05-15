# Balcony Experiment Screen – VibeWise

## 🧭 Purpose

The Balcony Experiment screen is a follow-up screen that allows users to reflect on a prior moment of emotional insight. It captures the shift from a limiting belief or reactive pattern into a more conscious and honest truth. This screen is only accessible **after a text-based reflection** has been created.

## ✨ Structure

This screen collects three structured elements:

* **Limiting Belief or Pattern** (short text field)
* **Honest Truth or Insight** (short text field)
* **Time Delay** (auto-calculated duration between original reflection and this insight)

## 🎨 UI Guidelines

* Display a reference to the original reflection (timestamp, emotion tag, excerpt of text)
* Two input areas:

  1. “What pattern or limiting belief did you notice?”
  2. “What insight or truth did you discover when you zoomed out?”
* Time difference displayed as a badge or subtle label: “You gained this insight after 3 hours and 12 minutes.”
* Final CTA: "Save Balcony Insight"

## 📥 On Submission

Data structure to be saved:

```json
{
  "type": "balcony",
  "parent_reflection_id": "abc123",
  "pattern": "I always need to fix everything for others",
  "truth": "People can take care of themselves – I don’t need to carry it all",
  "delay_minutes": 192,
  "created_at": "2025-05-15T13:15:00Z"
}
```

* Save to: `/users/{uid}/sessions/{sessionId}`
* Or optionally nest under reflection: `/users/{uid}/sessions/{reflectionId}/balcony/{balconyId}`

## 🔁 Connected Features

* **Journey Screen**:

  * Adds patterns to long-term Spiral tracking (e.g., recurring beliefs)
  * Shows timeline of limiting beliefs vs truths as growth indicators
* **Summary Doc Update** (optional): counts of total insights, last insight timestamp

## ✅ Requirements

* Can only be created after a reflection exists
* Each reflection can have only one associated Balcony experiment

## 🧪 Testing Notes

* Ensure time delay is calculated correctly from referenced reflection
* Ensure max length for input fields is handled (e.g., 255 chars)
* UI should gracefully fallback if the parent reflection was deleted (disabled entry)
