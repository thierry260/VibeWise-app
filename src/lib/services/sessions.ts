import { db } from '$lib/firebase';
import { doc, collection, addDoc, updateDoc, getDoc, getDocs, query, where, orderBy, limit as firestoreLimit, startAfter, QueryConstraint, QueryDocumentSnapshot } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { saveAudioLocally } from './localStorage';

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
  audio_storage?: 'local' | 'cloud';
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
  vibe_interpretation?: {
    emoji: string;
    label: string;
  };
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
): Promise<{ success: boolean; id?: string; error?: unknown }> => {
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

// Store audio recording locally for reflection
export const uploadAudioRecording = async (
  user: User,
  audioBlob: Blob
): Promise<{ success: boolean; url?: string; storage?: 'local' | 'cloud'; error?: unknown }> => {
  try {
    console.log('Starting audio upload process - LOCAL ONLY MODE');
    
    // IMPORTANT: We are ONLY using local storage, NOT Firebase Storage
    const result = await saveAudioLocally(user, audioBlob);
    
    if (result.success && result.url) {
      console.log('Successfully saved audio locally:', result.url);
      return { 
        success: true, 
        url: result.url, 
        storage: 'local' // Always set to local to ensure we don't use Firebase
      };
    } else {
      console.error('Failed to save audio locally:', result.error);
      throw new Error(result.error ? String(result.error) : 'Failed to save audio locally');
    }
  } catch (error) {
    console.error('Error storing audio locally:', error);
    return { success: false, error };
  }
};

// Analyze voice tone (mock implementation for now)
export const analyzeVoiceTone = async (
  audioInput: Blob | string
): Promise<{ success: boolean; tone?: string; confidence?: number; error?: unknown }> => {
  try {
    // Mock implementation - in a real app, this would call an AI service
    // We can accept either a Blob (for local audio) or a URL string (for cloud audio)
    
    // Log what type of input we received for debugging
    console.log('Analyzing voice tone with input type:', typeof audioInput === 'string' ? 'URL' : 'Blob');
    
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
): Promise<{ success: boolean; id?: string; error?: unknown }> => {
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
): Promise<{ success: boolean; id?: string; error?: unknown }> => {
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
): Promise<{ success: boolean; reflection?: Reflection; error?: unknown }> => {
  try {
    const reflectionRef = doc(db, 'users', user.uid, 'sessions', reflectionId);
    const reflectionSnap = await getDoc(reflectionRef);
    
    if (reflectionSnap.exists() && reflectionSnap.data().type === 'reflection') {
      // Get the reflection data
      const reflectionData = reflectionSnap.data() as Reflection;
      
      // Check if the reflection has an audio URL and is stored locally
      if (reflectionData.audio_url && reflectionData.audio_storage === 'local') {
        // The audio is stored locally, so we don't need to do anything special
        // The LocalAudioPlayer component will handle retrieving the audio
        console.log('Reflection has locally stored audio:', reflectionData.audio_url);
      }
      
      return { 
        success: true, 
        reflection: reflectionData 
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
): Promise<{ success: boolean; sessions?: Array<Session & { id: string }>; error?: unknown }> => {
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

// Filter interface for session history
export interface SessionFilters {
  types?: string[];
  spiralPhase?: string;
  moodLevel?: MoodLevel;
  tags?: string[];
  searchText?: string;
}

// Get filtered sessions with pagination
export const getFilteredSessions = async (
  user: User,
  filters: SessionFilters = {},
  limit: number = 10,
  lastDoc?: QueryDocumentSnapshot<unknown>
): Promise<{ 
  success: boolean; 
  sessions?: Array<Session & { id: string }>; 
  lastDoc?: QueryDocumentSnapshot<unknown>;
  hasMore?: boolean;
  error?: unknown 
}> => {
  try {
    // Start with base collection reference
    const queryConstraints: QueryConstraint[] = [
      orderBy('timestamp', 'desc')
    ];
    
    // Apply server-side filters for optimized queries
    // 1. Filter by session type (if specified)
    if (filters.types && filters.types.length > 0) {
      queryConstraints.push(where('type', 'in', filters.types));
    }
    
    // 2. Filter by mood level (if specified)
    if (filters.moodLevel) {
      queryConstraints.push(where('mood_level', '==', filters.moodLevel));
    }
    
    // 3. Add pagination cursor if we have a last document
    if (lastDoc) {
      // Use startAfter for pagination
      queryConstraints.push(firestoreLimit(limit));
    } else {
      // First page
      queryConstraints.push(firestoreLimit(limit + 1)); // Fetch one extra to check if there are more
    }
    
    // Build the query
    const sessionsRef = collection(db, 'users', user.uid, 'sessions');
    let sessionsQuery = query(sessionsRef, ...queryConstraints);
    
    // Add cursor for pagination if we have a last document
    if (lastDoc) {
      sessionsQuery = query(sessionsQuery, startAfter(lastDoc));
    }
    
    // Execute query
    const sessionsSnap = await getDocs(sessionsQuery);
    const sessions: Array<Session & { id: string }> = [];
    let newLastDoc: QueryDocumentSnapshot<unknown> | undefined = undefined;
    
    // Process results
    sessionsSnap.forEach((doc) => {
      const docIndex = sessions.length;
      // If this is the extra document we fetched to check for more, don't include it
      if (!lastDoc && docIndex === limit) {
        return;
      }
      
      // Update the last document reference for pagination
      newLastDoc = doc;
      
      const session = doc.data() as Session;
      sessions.push({
        ...session,
        id: doc.id
      });
    });
    
    // Apply client-side filters that aren't indexed in Firestore
    let filteredSessions = sessions;
    
    // 1. Filter by spiral phase (client-side)
    if (filters.spiralPhase) {
      filteredSessions = filteredSessions.filter(session => {
        // For reflections and HRV sessions, check the spiral phase if it exists
        // Need to use type assertion since spiral_phase is not in the base Session type
        const sessionWithPhase = session as unknown as { spiral_phase?: string };
        return sessionWithPhase.spiral_phase === filters.spiralPhase;
      });
    }
    
    // 2. Filter by tags (client-side)
    if (filters.tags && filters.tags.length > 0) {
      filteredSessions = filteredSessions.filter(session => {
        // Only reflections have tags
        if (session.type !== 'reflection') return false;
        
        const reflection = session as Reflection;
        // Check if any of the selected tags match
        return filters.tags!.some(tag => reflection.tags.includes(tag));
      });
    }
    
    // 3. Filter by search text (client-side)
    if (filters.searchText && filters.searchText.trim() !== '') {
      const searchLower = filters.searchText.toLowerCase().trim();
      filteredSessions = filteredSessions.filter(session => {
        // Search in reflection text
        if (session.type === 'reflection') {
          const reflection = session as Reflection;
          return reflection.text.toLowerCase().includes(searchLower);
        }
        // Search in balcony pattern or truth
        else if (session.type === 'balcony') {
          const balcony = session as BalconyExperiment;
          return (
            balcony.pattern.toLowerCase().includes(searchLower) ||
            balcony.truth.toLowerCase().includes(searchLower)
          );
        }
        return false;
      });
    }
    
    // Determine if there are more results
    const hasMore = !lastDoc && sessionsSnap.size > limit;
    
    return { 
      success: true, 
      sessions: filteredSessions,
      lastDoc: newLastDoc,
      hasMore
    };
  } catch (error) {
    console.error('Error getting filtered sessions:', error);
    return { success: false, error };
  }
};

// Get all unique tags from user's reflections
export const getUserTags = async (
  user: User
): Promise<{ success: boolean; tags?: string[]; error?: unknown }> => {
  try {
    // Query reflections only
    const reflectionsQuery = query(
      collection(db, 'users', user.uid, 'sessions'),
      where('type', '==', 'reflection')
    );
    
    const reflectionsSnap = await getDocs(reflectionsQuery);
    const tagSet = new Set<string>();
    
    // Collect all unique tags
    reflectionsSnap.forEach(doc => {
      const reflection = doc.data() as Reflection;
      if (reflection.tags && Array.isArray(reflection.tags)) {
        reflection.tags.forEach(tag => tagSet.add(tag));
      }
    });
    
    return { success: true, tags: Array.from(tagSet).sort() };
  } catch (error) {
    console.error('Error getting user tags:', error);
    return { success: false, error };
  }
};

// Get a session by ID
export const getSessionById = async (
  user: User,
  sessionId: string
): Promise<{ success: boolean; session?: Session & { id: string }; error?: unknown }> => {
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
): Promise<{ success: boolean; balcony?: BalconyExperiment & { id: string }; error?: unknown }> => {
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
): Promise<{ success: boolean; error?: unknown }> => {
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
