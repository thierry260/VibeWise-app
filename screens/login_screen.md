# Login Screen – VibeWise

## 🧭 Purpose

The Login screen is the entry point for all users. It ensures secure authentication via Firebase and supports three streamlined sign-in methods: Google, Email + Password, and Magic Link. Login is required to access any part of the app.

## ✨ Structure

* App logo and tagline (e.g., "Welcome to VibeWise – Align your inner world")
* Authentication options:

  * Sign in with Google (OAuth)
  * Sign in with Email + Password
  * Sign in with Magic Link (email-only, no password)
* Toggle between **Login** and **Register**
* Terms notice (e.g., “By continuing, you agree to our Privacy Policy”)

## 🎨 UI Guidelines

* Simple, beautiful, centered layout
* Rounded buttons with app gradient (#4D44B3 → #BF469A)
* Minimalist form fields with clear labels
* Use of Firebase Auth UI or custom wrapper depending on styling needs

## 🔐 Auth Methods (via Firebase)

1. **Google Login** (preferred on mobile)
2. **Email + Password** (with optional registration step)
3. **Magic Link** (send one-time sign-in link to email)

## 🔁 Connected Features

* After login:

  * Fetch or create `/users/{uid}/summary` and `/settings`
  * Navigate user to Home screen
* Prevent access to app routes until authenticated
* Syncs theme and preferences from settings document

## 🧪 Testing Notes

* Auth state persists after refresh and across app launches
* Magic Link handles return URLs correctly
* Login fails gracefully with helpful errors (e.g., wrong password, expired link)
* After logout, user is redirected to login screen
