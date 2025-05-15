# Library Item Screen – VibeWise

## 🧭 Purpose

The Library Item screen allows users to view and interact with a single tool from the VibeWise Library. Each tool (e.g., meditation, breathwork, quote, soundscape) includes media content, descriptive context, and tagging by Spiral Dynamics phase. Users can favorite tools or remove their own uploads.

## ✨ Structure

* Tool Title and Tags (e.g., type + Spiral phase)
* Media Player or Visual (based on tool type)

  * Audio: play/pause, duration, waveform (optional)
  * Breathwork: synced animation + instruction
  * Quote: centered text with author (if present)
* Description or guidance paragraph
* Action Buttons:

  * Favorite / Unfavorite
  * Delete (only for user-added tools)

## 🎨 UI Guidelines

* Match the calm, immersive style of the app
* Use soft edges and subtle gradients matching Spiral tag (e.g., Green tools use soft green tones)
* Breathwork animations should follow the ideal parasympathetic rhythm (6 breaths/min by default)
* Quote tools should use typographic focus with visual calm

## 🔁 Connected Features

* Favorite state is stored and synced
* Deletion allowed only for tools with `source: "user"`
* Media load event can optionally trigger tracking (for future insights)
* From here, user can also start the tool immediately after a reflection

## 📥 Data Reference

Tools are loaded from:

* System tools: `/library/{toolId}`
* User tools: `/users/{uid}/library/{toolId}`

## 🧪 Testing Notes

* Favorite/unfavorite updates instantly
* Delete button appears only for `source: "user"`
* Audio/breath tools preload efficiently
* Quote formatting adapts well to various lengths

