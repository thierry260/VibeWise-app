# Notification Permission Screen – VibeWise

## 🧭 Purpose

This screen introduces the concept of **Divine Timing** and requests notification permission from the user. VibeWise sends 4 random reminders per day (between 07:00 and 22:30) to prompt spontaneous emotional reflection. The goal of this screen is to encourage opt-in with clarity and intention, rather than system dialog alone.

## ✨ Structure

* **Intro Text**:

  * "We believe reflection happens best when it’s unexpected."
  * "With your permission, we’ll remind you 4 times per day — at perfectly random moments — to pause and look within."

* **Benefits Card**:

  * 🔔 Daily reflection boosts your self-awareness
  * 🌿 Divine Timing respects your rhythm
  * 🙏 You’re always in control

* **CTA Buttons**:

  * \[Enable Notifications]
  * \[Maybe Later]

* **Visual/Animation (optional)**:

  * Soft ripple or bell animation to suggest gentle interruption

## 🎨 UI Guidelines

* Calm, minimalist design
* Primary CTA uses gradient (#4D44B3 → #BF469A)
* “Maybe later” is secondary text button, not dominant

## 🔁 Connected Features

* Triggered after login or during onboarding (only once)
* Divine Timing reminders start only after permission granted
* App state tracks permission (e.g., in `/settings` or local storage)

## 📥 Data Example (if stored in settings):

```json
{
  "divine_timing_enabled": true,
  "last_prompted": "2025-05-15T08:00:00Z"
}
```

## 🧪 Testing Notes

* Handles browsers that don’t support push notifications
* Gracefully bypasses if permission already granted
* “Maybe later” stores a `last_prompted` so we can re-ask gently in future
* Ensure prompt UI is shown before native system dialog
