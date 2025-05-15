# BLE Connection Screen – VibeWise

## 🧭 Purpose

The BLE Connection screen helps users pair and manage their Polar H10 heart rate monitor. It ensures that biometric sessions (HRV, Vibe score) can only be started once the device is properly connected. It accounts for platform-specific support (mobile vs. PWA) and guides the user through scanning, selecting, and confirming the BLE device.

## ✨ Structure

* **Device Scan Section**:

  * Scan for devices button
  * Spinner/loading while scanning
  * List of available BLE devices (device name, signal strength)

* **Connection Status**:

  * Connected Device Name (if active)
  * Signal icon or "Connected" label
  * Disconnect button

* **Error/Info States**:

  * If Web Bluetooth not supported → show info card: “BLE not available in this browser. Please use mobile app.”
  * If no devices found → show retry option

* **Navigation Options**:

  * From HRV session: Show "Reconnect to Polar H10" CTA
  * From Settings: Show full BLE management screen

## 🎨 UI Guidelines

* Calm and functional interface
* Use motion sparingly during scan to communicate activity
* Clearly distinguish connected vs available devices
* Subtle fallback warning when browser/device doesn’t support BLE

## 📥 Data Storage

* Store connection status in memory/session state (not Firestore)
* Optional: last connected timestamp stored in `/users/{uid}/settings`

```json
{
  "ble_last_connected": "2025-05-15T12:41:00Z"
}
```

## 🔁 Connected Features

* Required for HRV Session screen
* Connection status used to enable/disable biometric actions
* Last used device optionally cached locally for auto-reconnect

## 🧪 Testing Notes

* Ensure BLE connection works only on supported devices (mobile + Chrome)
* Verify that disconnected states are gracefully handled
* Auto-reconnect tries the last known device if available
* Ensure error messaging is user-friendly (e.g., "Make sure your device is on and nearby")
