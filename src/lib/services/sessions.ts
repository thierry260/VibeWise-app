import { db } from '$lib/firebase';
import { doc, collection, addDoc, updateDoc, getDoc, getDocs, query, where, orderBy, limit as firestoreLimit, Timestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { User } from 'firebase/auth';

// Session types
export type MoodLevel = 'high' | 'neutral' | 'low';

export interface BaseSession {
  type: string;
  timestamp: string;
  createdAt: string;
}

export interface Reflection extends BaseSession {
  type: 'reflection';
  mood: string[];
  mood_level: MoodLevel;
  text: string;
  tags: string[];
  audio_url?: string;
  voice_insight?: {
    tone: string;
    confidence: number;
  };
}

export interface BalconyExperiment extends BaseSession {
  type: 'balcony';
  parent_reflection_id: string;
  pattern: string;
  truth: string;
  delay_minutes: number;
}

export interface HRVSession extends BaseSession {
  type: 'hrv_session';
  start: string;
  end: string;
  duration_seconds: number;
  avg_hr: number;
  avg_rmssd: number;
  vibe_score: number;
  chart_data: Array<{
    timestamp: string;
    hr: number;
    rmssd: number;
    vibe: number;
  }>;
  rr_intervals?: number[];
}

export type Session = Reflection | BalconyExperiment | HRVSession;

// Create a new reflection
export const createReflection = async (
  user: User,
  reflection: Omit<Reflection, 'type' | 'createdAt'>
): Promise<{ success: boolean; id?: string; error?: any }> => {
  try {
    const sessionData: Reflection = {
      ...reflection,
      type: 'reflection',
      createdAt: new Date().toISOString(),
    };

    const sessionsRef = collection(db, 'users', user.uid, 'sessions');
    const docRef = await addDoc(sessionsRef, sessionData);
    
    // Update summary document
    const summaryRef = doc(db, 'users', user.uid, 'private', 'summary');
    const summarySnap = await getDoc(summaryRef);
    
    if (summarySnap.exists()) {
      await updateDoc(summaryRef, {
        latest_reflection_timestamp: reflection.timestamp,
        reflection_count: (summarySnap.data().reflection_count || 0) + 1,
        updatedAt: new Date().toISOString(),
      });
    }

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating reflection:', error);
    return { success: false, error };
  }
};

// Upload audio recording for reflection
export const uploadAudioRecording = async (
  user: User,
  audioBlob: Blob
): Promise<{ success: boolean; url?: string; error?: any }> => {
  try {
    const storage = getStorage();
    const audioFileName = `${user.uid}/audio/${Date.now()}.webm`;
    const audioRef = ref(storage, audioFileName);
    
    await uploadBytes(audioRef, audioBlob);
    const downloadUrl = await getDownloadURL(audioRef);
    
    return { success: true, url: downloadUrl };
  } catch (error) {
    console.error('Error uploading audio:', error);
    return { success: false, error };
  }
};

// Analyze voice tone (mock implementation for now)
export const analyzeVoiceTone = async (
  audioUrl: string
): Promise<{ success: boolean; tone?: string; confidence?: number; error?: any }> => {
  try {
    // Mock implementation - in a real app, this would call an AI service
    const tones = ['optimistic', 'calm', 'frustrated', 'anxious', 'confident', 'neutral'];
    const randomTone = tones[Math.floor(Math.random() * tones.length)];
    const randomConfidence = parseFloat((0.7 + Math.random() * 0.3).toFixed(2));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { 
      success: true, 
      tone: randomTone, 
      confidence: randomConfidence 
    };
  } catch (error) {
    console.error('Error analyzing voice tone:', error);
    return { success: false, error };
  }
};

// Create a new balcony experiment
export const createBalconyExperiment = async (
  user: User,
  balcony: Omit<BalconyExperiment, 'type' | 'createdAt'>
): Promise<{ success: boolean; id?: string; error?: any }> => {
  try {
    const sessionData: BalconyExperiment = {
      ...balcony,
      type: 'balcony',
      createdAt: new Date().toISOString(),
    };

    const sessionsRef = collection(db, 'users', user.uid, 'sessions');
    const docRef = await addDoc(sessionsRef, sessionData);
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating balcony experiment:', error);
    return { success: false, error };
  }
};

// Create a new HRV session
export const createHRVSession = async (
  user: User,
  hrvSession: Omit<HRVSession, 'type' | 'createdAt'>
): Promise<{ success: boolean; id?: string; error?: any }> => {
  try {
    const sessionData: HRVSession = {
      ...hrvSession,
      type: 'hrv_session',
      createdAt: new Date().toISOString(),
    };

    const sessionsRef = collection(db, 'users', user.uid, 'sessions');
    const docRef = await addDoc(sessionsRef, sessionData);
    
    // Update summary document
    const summaryRef = doc(db, 'users', user.uid, 'private', 'summary');
    const summarySnap = await getDoc(summaryRef);
    
    if (summarySnap.exists()) {
      // Calculate 7-day average RMSSD if we have enough data
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const hrvSessionsQuery = query(
        collection(db, 'users', user.uid, 'sessions'),
        where('type', '==', 'hrv_session'),
        where('timestamp', '>=', sevenDaysAgo.toISOString()),
        orderBy('timestamp', 'desc')
      );
      
      const hrvSessionsSnap = await getDocs(hrvSessionsQuery);
      let totalRMSSD = hrvSession.avg_rmssd;
      let sessionCount = 1;
      
      hrvSessionsSnap.forEach(doc => {
        const session = doc.data() as HRVSession;
        if (session.avg_rmssd) {
          totalRMSSD += session.avg_rmssd;
          sessionCount++;
        }
      });
      
      const avgRMSSD7d = totalRMSSD / sessionCount;
      
      await updateDoc(summaryRef, {
        latest_vibe_score: hrvSession.vibe_score,
        avg_rmssd_7d: avgRMSSD7d,
        hrv_session_count: (summarySnap.data().hrv_session_count || 0) + 1,
        updatedAt: new Date().toISOString(),
      });
    }

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating HRV session:', error);
    return { success: false, error };
  }
};

// Get a reflection by ID
export const getReflectionById = async (
  user: User,
  reflectionId: string
): Promise<{ success: boolean; reflection?: Reflection; error?: any }> => {
  try {
    const reflectionRef = doc(db, 'users', user.uid, 'sessions', reflectionId);
    const reflectionSnap = await getDoc(reflectionRef);
    
    if (reflectionSnap.exists() && reflectionSnap.data().type === 'reflection') {
      return { 
        success: true, 
        reflection: reflectionSnap.data() as Reflection 
      };
    }
    
    return { 
      success: false, 
      error: 'Reflection not found' 
    };
  } catch (error) {
    console.error('Error getting reflection:', error);
    return { success: false, error };
  }
};

// Get recent sessions (for history view)
export const getRecentSessions = async (
  user: User,
  limit: number = 10
): Promise<{ success: boolean; sessions?: Array<Session & { id: string }>; error?: any }> => {
  try {
    const sessionsQuery = query(
      collection(db, 'users', user.uid, 'sessions'),
      orderBy('timestamp', 'desc'),
      firestoreLimit(limit)
    );
    
    const sessionsSnap = await getDocs(sessionsQuery);
    const sessions: Array<Session & { id: string }> = [];
    
    sessionsSnap.forEach(doc => {
      const session = doc.data() as Session;
      sessions.push({
        ...session,
        id: doc.id
      });
    });
    
    return { success: true, sessions };
  } catch (error) {
    console.error('Error getting recent sessions:', error);
    return { success: false, error };
  }
};

// Get a session by ID
export const getSessionById = async (
  user: User,
  sessionId: string
): Promise<{ success: boolean; session?: Session & { id: string }; error?: any }> => {
  try {
    const sessionRef = doc(db, 'users', user.uid, 'sessions', sessionId);
    const sessionSnap = await getDoc(sessionRef);
    
    if (sessionSnap.exists()) {
      return { 
        success: true, 
        session: {
          ...sessionSnap.data() as Session,
          id: sessionSnap.id
        }
      };
    }
    
    return { 
      success: false, 
      error: 'Session not found' 
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return { success: false, error };
  }
};

// Check if a balcony experiment exists for a reflection
export const getBalconyForReflection = async (
  user: User,
  reflectionId: string
): Promise<{ success: boolean; balcony?: BalconyExperiment & { id: string }; error?: any }> => {
  try {
    const balconyQuery = query(
      collection(db, 'users', user.uid, 'sessions'),
      where('type', '==', 'balcony'),
      where('parent_reflection_id', '==', reflectionId)
    );
    
    const balconySnap = await getDocs(balconyQuery);
    
    if (!balconySnap.empty) {
      const balconyDoc = balconySnap.docs[0];
      return { 
        success: true, 
        balcony: {
          ...balconyDoc.data() as BalconyExperiment,
          id: balconyDoc.id
        }
      };
    }
    
    return { success: false, error: 'No balcony experiment found for this reflection' };
  } catch (error) {
    console.error('Error getting balcony experiment:', error);
    return { success: false, error };
  }
};

// Update an existing balcony experiment
export const updateBalconyExperiment = async (
  user: User,
  balconyId: string,
  balconyData: Partial<Omit<BalconyExperiment, 'type' | 'createdAt'>>
): Promise<{ success: boolean; error?: any }> => {
  try {
    const balconyRef = doc(db, 'users', user.uid, 'sessions', balconyId);
    
    await updateDoc(balconyRef, {
      ...balconyData,
      updatedAt: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating balcony experiment:', error);
    return { success: false, error };
  }
};
