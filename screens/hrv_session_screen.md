# HRV Session Screen – VibeWise

## 🧭 Purpose

The HRV Session screen allows users to connect their Polar H10 device, monitor live biometric feedback, and gain real-time insight into their physiological state. The session displays a live chart with heart rate, RMSSD (labeled as Balance), and Vibe Score, supported by a guided breathing animation. After ending the session, users must either save or discard the session.

## ✨ Structure

* BLE connection indicator (top right or pre-screen)
* Live chart (uPlot)

  * Heart rate (HR)
  * RMSSD (Balance)
  * Vibe Score (0–100 scale)
* Breathing Guide (overlay animation or under-chart pulse)
* Timer indicator (total session duration)
* Tooltip on chart interaction (hover/tap):

  * X-axis: Time
  * Y-axis: Selected value with label
* Stop Session button (CTA)

## 🎨 UI Guidelines

* Use a clean, low-distraction layout
* Chart in focus with real-time feedback
* Label colors and curves clearly but subtly
* Use animations to guide breath (e.g., pulsing circle or wave bar)
* “Stop Session” CTA should be distinct but elegant

## 🛑 On Stop Session

Display a modal with:

* Mini-summary (avg HR, RMSSD, Vibe Score)
* Prompt: “Save this session or discard it?”
* Two actions:

  * ✅ Save Session → persist data
  * ❌ Discard Session → wipe temporary buffer

## 📥 On Save – Data Structure

```json
{
  "type": "hrv_session",
  "start": "2025-05-15T10:02:00Z",
  "end": "2025-05-15T10:10:00Z",
  "duration_seconds": 480,
  "rr_intervals": [...],
  "avg_hr": 78,
  "avg_rmssd": 34.2,
  "vibe_score": 67,
  "chart_data": [
    {"timestamp": "...", "hr": 80, "rmssd": 32.1, "vibe": 64},
    ...
  ]
}
```

* Save to: `/users/{uid}/sessions/{sessionId}`
* Update user summary:

  * `latest_hrv_score`
  * `latest_vibe_score`
  * `avg_rmssd_7d`

## 🔁 Connected Features

* Chart data used for streak, analytics, Spiral trend analysis
* Vibe Score incorporated in home summary and journey estimations
* Used as potential trigger for Divine ToolChooser (if session > 3 minutes)

## 🧪 Testing Notes

* BLE reconnect handling when connection drops
* Tooltip works across devices
* Chart updates smoothly without memory spikes
* Save/discard logic is bulletproof (no duplicates, no silent fails)
* Breathing guide stays in sync with ideal parasympathetic rhythm (e.g., 6 breaths/min)
