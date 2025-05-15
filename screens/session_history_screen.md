# Session History Screen – VibeWise

## 🧭 Purpose

The Session History screen provides users with a chronological overview of all logged reflections, HRV sessions, and voice logs. It acts as a timeline to observe their emotional, physiological, and conscious development over time. Users can filter and review entries for self-analysis and pattern recognition.

## ✨ Structure

* List view sorted by most recent session
* Session card includes:

  * Timestamp (e.g., "Today, 10:15 AM")
  * Type icon: reflection 🖊, HRV 📉, audio 🎤, balcony 🧠
  * Primary tag or emotion
  * Vibe score (if present)
* Filters (top bar or modal):

  * Type: Reflection / HRV / Audio / Balcony
  * Spiral Phase
  * Mood group (High / Neutral / Low)
  * Tag/theme (Work, Friends, etc.)
* Optional: Search by keyword or tag
* Tapping item opens full Session Detail view

## 🎨 UI Guidelines

* Minimalistic vertical feed with section spacing by date
* Use subtle icons and typography hierarchy
* Filter chip styling consistent with Library filters
* Color-coded Spiral phases (muted tones)

## 📥 Data Reference

Each session is pulled from:

* `/users/{uid}/sessions/{sessionId}`
* Supports pagination (e.g., 10 at a time)
* Summary card generated from type, mood, vibe, and tags

## 🔁 Connected Features

* Opens detail view with full data, playback, or reflection
* Filter state is remembered across app usage
* Helps build pattern overview on Journey screen

## 🧪 Testing Notes

* Pagination works without data duplication
* Filters work independently and in combination
* Handles sessions without mood/vibe data (e.g., audio-only)
* Detail screen loads correctly from all session types
