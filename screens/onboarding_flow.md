# Onboarding Flow – VibeWise

## 🧭 Purpose

The Onboarding Flow introduces new users to the purpose, principles, and core concepts of VibeWise before they begin using the app. It helps establish emotional connection and understanding of the app’s unique features like Spiral Dynamics, Vibe Score, and Divine Timing.

## ✨ Structure

A **3-step horizontal scroll** layout, shown only on first login or install.

### 🪞 Slide 1 – "Look Within"

* Message: "Change begins with awareness. VibeWise helps you notice how you feel — and what that means."
* Visual: Subtle animation or icon of a mirror, reflection, or soft aura

### 💗 Slide 2 – "Feel the Vibe"

* Message: "We combine heart data, breath, and tone of voice to calculate your Vibe Score — a reflection of your balance and alignment."
* Visual: Radiating heart or waveform animation

### 🌀 Slide 3 – "Grow in Awareness"

* Message: "Your journey through life is unique. We help you see where you are — and what’s ready to shift — without judgment."

* Visual: Spiral path, gently ascending or morphing

* **CTA:** \[Begin Your Journey] → directs to Home or login (if not yet authenticated)

## 🎨 UI Guidelines

* Fullscreen swipe or scroll layout (horizontal panels)
* Each panel should feel artful, minimal, and emotionally grounding
* Consistent color palette: #4D44B3 → #BF469A, #0D2C46, #FFF8EE

## 🔁 Connected Features

* On completion, flag `onboarding_completed: true` in local storage or Firebase
* Not shown again unless user resets account
* Completion directs user to Login screen or Home screen depending on auth state

## 📥 Example (optional settings doc):

```json
{
  "onboarding_completed": true
}
```

## 🧪 Testing Notes

* Swipe/scroll gestures should work smoothly on all mobile devices
* Skip animation or CTA should not appear until the final slide
* Persistent flag ensures onboarding is not repeated
