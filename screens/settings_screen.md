# Settings Screen – VibeWise

## 🧭 Purpose

The Settings screen allows users to manage their account, interface preferences, and biometric device settings. It supports light/dark mode toggling, login method overview, BLE reconnection, and personal customization of mood scale behavior.

## ✨ Structure

* **Account Section**:

  * Email address or Google account name
  * Option to sign out

* **Appearance Settings**:

  * Light/Dark mode toggle (auto system default optional)

* **Mood & Reflection Preferences**:

  * Mood scale preference (Abraham-Hicks vs. Custom)
  * Option to hide/show emotion descriptions

* **Device Settings**:

  * BLE connection status (Polar H10)
  * Reconnect button (mobile only)
  * BLE support warning if on unsupported PWA browser

* **Legal / App Info** (optional):

  * Version number
  * Terms of use / Privacy policy

## 🎨 UI Guidelines

* Clean, form-style layout with grouped sections
* Soft toggles and drop-downs where needed
* System-consistent dark/light theme previews

## 📥 Data Storage

Stored in `/users/{uid}/settings`:

```json
{
  "theme": "dark",
  "mood_scale": "abraham-hicks",
  "emotion_descriptions_visible": true,
  "ble_last_connected": "2025-05-14T17:04:00Z"
}
```

## 🔁 Connected Features

* Theme setting applied globally on app load
* Mood scale used in Reflect screen
* BLE reconnect used in HRV Session screen (mobile only)

## 🧪 Testing Notes

* Reconnect button hidden on unsupported platforms
* Toggle state persists correctly
* Sign out redirects to login screen
* Theme change is reactive (without reload)
