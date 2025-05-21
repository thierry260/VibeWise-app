import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendSignInLinkToEmail, 
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut as firebaseSignOut,
  type User
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  type DocumentData,
  type Firestore
} from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA0a6fl6UvnfHzJoxSBV5tN5qoFkbYE8qE",
  authDomain: "vibewise-main.firebaseapp.com",
  projectId: "vibewise-main",
  storageBucket: "vibewise-main.firebasestorage.app",
  messagingSenderId: "368570660510",
  appId: "1:368570660510:web:511cb61ec0d44f14ed6d8f",
  measurementId: "G-0ZX7Q579ER"
};

// Initialize Firebase
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Analytics } from 'firebase/analytics';

let firebaseApp: FirebaseApp | undefined;
let auth: Auth;
let db: Firestore;
let analytics: Analytics | undefined;

if (typeof window !== 'undefined') {
  // Client-side only code
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
    
    // Initialize Analytics only in browser environment
    if (typeof window !== 'undefined') {
      isSupported().then(yes => {
        if (yes && firebaseApp) {
          analytics = getAnalytics(firebaseApp);
        }
      });
    }
  } else {
    firebaseApp = getApps()[0];
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
    
    if (typeof window !== 'undefined') {
      isSupported().then(yes => {
        if (yes && firebaseApp) {
          analytics = getAnalytics(firebaseApp);
        }
      });
    }
  }
}

const googleProvider = new GoogleAuthProvider();
// Add scopes for Google OAuth
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Detect platform
const isPlatformWeb = () => {
  return typeof window !== 'undefined' && 
         !window.navigator.userAgent.includes('VibeWise') && 
         !window.location.href.includes('capacitor');
};

// Auth functions
export const signInWithGoogle = async () => {
  try {
    console.log('Starting Google sign-in process');
    console.log('Platform detection - is web:', isPlatformWeb());
    
    // For web platform, use popup authentication
    if (isPlatformWeb()) {
      console.log('Using web authentication flow with popup');
      const result = await signInWithPopup(auth, googleProvider);
      await createUserProfileIfNeeded(result.user);
      return { success: true, user: result.user };
    } else {
      // For mobile app, use custom URL construction for deep linking
      console.log('Using mobile authentication flow with custom URL');
      // This will use the intent filters in AndroidManifest.xml for mobile
      const result = await signInWithPopup(auth, googleProvider);
      await createUserProfileIfNeeded(result.user);
      return { success: true, user: result.user };
    }
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return { success: false, error };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error signing in with email:', error);
    return { success: false, error };
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfileIfNeeded(result.user);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error signing up with email:', error);
    return { success: false, error };
  }
};

export const sendMagicLink = async (email: string, redirectUrl: string) => {
  const actionCodeSettings = {
    url: redirectUrl,
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    // Save the email for after the redirect
    window.localStorage.setItem('emailForSignIn', email);
    return { success: true };
  } catch (error) {
    console.error('Error sending magic link:', error);
    return { success: false, error };
  }
};

export const signInWithMagicLink = async (email: string, href: string) => {
  try {
    if (isSignInWithEmailLink(auth, href)) {
      let emailToUse = email || window.localStorage.getItem('emailForSignIn');
      
      if (!emailToUse) {
        // If we're still missing the email, prompt the user for it
        emailToUse = window.prompt('Please provide your email for confirmation');
      }
      
      if (!emailToUse) {
        return { success: false, error: new Error('Email is required') };
      }
      
      const result = await signInWithEmailLink(auth, emailToUse, href);
      // Clear the email from storage
      window.localStorage.removeItem('emailForSignIn');
      
      // Create user profile if it's a new user
      if (result.user) {
        await createUserProfileIfNeeded(result.user);
      }
      
      return { success: true, user: result.user };
    }
    return { success: false, error: new Error('Invalid magic link') };
  } catch (error) {
    console.error('Error signing in with magic link:', error);
    return { success: false, error };
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error };
  }
};

// User profile management
const createUserProfileIfNeeded = async (user: User) => {
  if (!user) return;
  
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    // Create user profile
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email?.split('@')[0] || 'User',
      photoURL: user.photoURL || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    
    // Create user settings
    const settingsRef = doc(db, 'users', user.uid, 'private', 'settings');
    await setDoc(settingsRef, {
      theme: 'system', // Default to system theme
      notificationEnabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    
    // Create user summary
    const summaryRef = doc(db, 'users', user.uid, 'private', 'summary');
    await setDoc(summaryRef, {
      totalSessions: 0,
      streakDays: 0,
      lastSessionDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
};

export { auth, db, analytics };
