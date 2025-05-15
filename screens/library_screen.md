# Library Screen – VibeWise

## 🧭 Purpose

The Library screen gives users access to curated and personal tools that help elevate their vibe and support inner growth. These tools include meditations, breathing exercises, inspirational quotes, and user-uploaded content. Users can explore by Spiral phase or favorite tools, and after a reflection, a random tool is offered through the Divine ToolChooser.

## ✨ Structure

* Featured Tools section (random or system-recommended)
* Filter bar:

  * Spiral Phase (e.g., Green, Yellow)
  * Tool Type (e.g., Meditation, Breathing, Quote)
  * Favorites toggle
* Scrollable tool list:

  * Thumbnail, title, short description, icon
  * Clickable to open tool detail view

## 🎨 UI Guidelines

* Light, soothing layout with vibrant accents per Spiral level
* Icons or thumbnails per tool type
* Cards with subtle hover/focus animations
* Display Divine-suggested tools with small sparkle or halo indicator

## 🧰 Tool Types (System-defined + user-added)

* Guided Meditation (audio)
* Breathwork Exercise (visual/audio sync)
* Quote (text)
* Soundscape (audio)
* User-uploaded (any type, tagged by user)

## ❤️ Favorites & Personalization

* Users can mark tools as favorites
* System tools: permanent, cannot be deleted
* User-added tools: editable and removable

## 📥 Tool Data Structure

Stored under `/users/{uid}/library/{toolId}` or system tools under `/library/{toolId}`

```json
{
  "title": "6-Minute Reset",
  "type": "breathing",
  "source": "system", // or "user"
  "tags": ["Blue", "Calm"],
  "media_url": "...",
  "description": "Slow 6-breaths/min breathwork to rebalance after stress",
  "duration": 360,
  "is_favorite": true
}
```

## 🔁 Connected Features

* After a reflection, Divine ToolChooser selects a random tool
* Vibe score + Spiral phase influence what tools appear in Featured
* Tool usage stats (optional) stored for insights and future filtering

## 🧪 Testing Notes

* Ensure system tools are immutable and user tools editable
* Divine ToolChooser must avoid repeat suggestions from last 3 logs
* Ensure all filters work independently and in combination
* Ensure media loads and plays efficiently across devices
