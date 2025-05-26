import { db } from '$lib/firebase';
import { doc, collection, getDoc, setDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import type { Session, Reflection, BalconyExperiment } from './sessions';

// Spiral phase types
export type SpiralPhase = 'Beige' | 'Purple' | 'Red' | 'Blue' | 'Orange' | 'Green' | 'Yellow' | 'Turquoise';

// Spiral history entry
export interface SpiralHistoryEntry {
  phase: SpiralPhase;
  entered_at: string;
}

// Intention interface
export interface Intention {
  phase: SpiralPhase;
  intention: string;
  set_at: string;
}

// Pattern insight interface
export interface PatternInsight {
  type: 'tag_pattern' | 'limiting_belief' | 'truth' | 'phase_transition';
  description: string;
  count: number;
  related_phase?: SpiralPhase;
  related_tags?: string[];
}

// Get user journey data in a single batch
export const getUserJourneyData = async (
  user: User
): Promise<{
  success: boolean;
  currentPhase?: SpiralPhase;
  spiralHistory?: SpiralHistoryEntry[];
  intention?: Intention;
  error?: unknown;
}> => {
  try {
    // Create references for both documents
    const summaryRef = doc(db, 'users', user.uid, 'private', 'summary');
    const spiralHistoryRef = doc(db, 'users', user.uid, 'journey', 'spiral_history');
    const intentionRef = doc(db, 'users', user.uid, 'journey', 'intention');

    // Get all documents in a single batch
    const [summarySnap, spiralHistorySnap, intentionSnap] = await Promise.all([
      getDoc(summaryRef),
      getDoc(spiralHistoryRef),
      getDoc(intentionRef)
    ]);

    // Extract current phase from summary
    const currentPhase = summarySnap.exists()
      ? (summarySnap.data().current_spiral_phase as SpiralPhase) || 'Green' // Default to Green if not set
      : 'Green';

    // Extract spiral history
    let spiralHistory = spiralHistorySnap.exists()
      ? (spiralHistorySnap.data()?.entries as SpiralHistoryEntry[]) || []
      : [];

    // Initialize spiral history if empty but we have a current phase
    if (spiralHistory.length === 0 && summarySnap.exists() && currentPhase) {
      try {
        console.log('No spiral history found. Creating initial entry with phase:', currentPhase);
        
        // Get timestamp from summary or use current time
        const timestamp = summarySnap.data()?.updatedAt || new Date().toISOString();
        console.log('Using timestamp for initial entry:', timestamp);
        
        const initialEntry: SpiralHistoryEntry = {
          phase: currentPhase,
          entered_at: timestamp
        };
        
        // Add the initial entry to Firestore
        await setDoc(spiralHistoryRef, {
          entries: [initialEntry]
        });
        
        // Update our local copy
        spiralHistory = [initialEntry];
        console.log('Successfully initialized spiral history with entry:', initialEntry);
      } catch (initError) {
        console.error('Failed to initialize spiral history:', initError);
        // Continue with empty history rather than failing completely
      }
    } else if (spiralHistory.length === 0) {
      console.log('No spiral history and no valid summary data to initialize from.');
    } else {
      console.log('Spiral history already exists with', spiralHistory.length, 'entries');
    }

    // Extract intention for current phase
    const intention = intentionSnap.exists() && intentionSnap.data().phase === currentPhase
      ? intentionSnap.data() as Intention
      : undefined;

    return {
      success: true,
      currentPhase,
      spiralHistory,
      intention
    };
  } catch (error) {
    console.error('Error getting user journey data:', error);
    return { success: false, error };
  }
};

// Set or update user intention for current phase
export const setUserIntention = async (
  user: User,
  phase: SpiralPhase,
  intentionText: string
): Promise<{ success: boolean; error?: unknown }> => {
  try {
    const intentionRef = doc(db, 'users', user.uid, 'journey', 'intention');

    const intention: Intention = {
      phase,
      intention: intentionText,
      set_at: new Date().toISOString()
    };

    await setDoc(intentionRef, intention);

    return { success: true };
  } catch (error) {
    console.error('Error setting user intention:', error);
    return { success: false, error };
  }
};

// Analyze user patterns from sessions
export const analyzeUserPatterns = async (
  user: User,
  daysLimit: number = 60
): Promise<{
  success: boolean;
  patterns?: PatternInsight[];
  error?: unknown;
}> => {
  try {
    // Calculate the date limit
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - daysLimit);
    
    // Query for reflection and balcony sessions
    const sessionsQuery = query(
      collection(db, 'users', user.uid, 'sessions'),
      where('type', 'in', ['reflection', 'balcony']),
      where('timestamp', '>=', dateLimit.toISOString()),
      orderBy('timestamp', 'desc')
    );
    
    let sessionsSnap;
    try {
      sessionsSnap = await getDocs(sessionsQuery);
    } catch (indexError) {
      // Handle Firestore index error gracefully
      console.error('Firestore index error. You need to create the following index:', indexError);
      console.log('Please create an index for: collection("sessions").where("type", "in", ["reflection", "balcony"]).orderBy("timestamp")');
      
      if (indexError instanceof Error && indexError.message.includes('index')) {
        const indexMatch = indexError.message.match(/https:\/\/console\.firebase\.google\.com[^\s]+/);
        if (indexMatch) {
          console.log('Create the index here:', indexMatch[0]);
        }
      }
      
      // Return default patterns while index is being created
      return { 
        success: true, 
        patterns: [{
          type: 'tag_pattern',
          description: 'Creating Firestore index. Please try again in a few minutes.',
          count: 0
        }] 
      };
    }
    
    // Collect data for analysis
    const reflections: Reflection[] = [];
    const balconySessions: BalconyExperiment[] = [];
    
    sessionsSnap.forEach(doc => {
      const session = doc.data() as Session;
      if (session.type === 'reflection') {
        reflections.push(session as Reflection);
      } else if (session.type === 'balcony') {
        balconySessions.push(session as BalconyExperiment);
      }
    });
    
    // Get current spiral phase for context
    const summaryRef = doc(db, 'users', user.uid, 'private', 'summary');
    const summarySnap = await getDoc(summaryRef);
    const currentPhase = summarySnap.exists() 
      ? (summarySnap.data().current_spiral_phase as SpiralPhase) || 'Green'
      : 'Green';
    
    // Analyze patterns
    const patterns: PatternInsight[] = [];
    
    // 1. Analyze tags from reflections
    const tagCounts: Record<string, number> = {};
    reflections.forEach(reflection => {
      if (reflection.tags && Array.isArray(reflection.tags)) {
        reflection.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    
    // Add top tags as patterns
    const sortedTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    
    sortedTags.forEach(([tag, count]) => {
      patterns.push({
        type: 'tag_pattern',
        description: `You often reflect on "${tag}" during your ${currentPhase} phase.`,
        count,
        related_phase: currentPhase,
        related_tags: [tag]
      });
    });
    
    // 2. Analyze limiting beliefs from balcony sessions
    const beliefCounts: Record<string, number> = {};
    balconySessions.forEach(balcony => {
      if (balcony.pattern) {
        const belief = balcony.pattern.toLowerCase();
        beliefCounts[belief] = (beliefCounts[belief] || 0) + 1;
      }
    });
    
    // Add top limiting beliefs as patterns
    const sortedBeliefs = Object.entries(beliefCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);
    
    sortedBeliefs.forEach(([belief, count]) => {
      patterns.push({
        type: 'limiting_belief',
        description: `A recurring limiting belief: "${belief}"`,
        count
      });
    });
    
    // 3. Analyze truths from balcony sessions
    const truthCounts: Record<string, number> = {};
    balconySessions.forEach(balcony => {
      if (balcony.truth) {
        const truth = balcony.truth.toLowerCase();
        truthCounts[truth] = (truthCounts[truth] || 0) + 1;
      }
    });
    
    // Add top truths as patterns
    const sortedTruths = Object.entries(truthCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);
    
    sortedTruths.forEach(([truth, count]) => {
      patterns.push({
        type: 'truth',
        description: `A recurring insight: "${truth}"`,
        count
      });
    });
    
    // If no patterns were found, add a default message
    if (patterns.length === 0) {
      patterns.push({
        type: 'tag_pattern',
        description: 'Continue logging reflections to reveal your patterns.',
        count: 0
      });
    }
    
    return { success: true, patterns };
  } catch (error) {
    console.error('Error analyzing user patterns:', error);
    return { 
      success: false, 
      error,
      patterns: [{
        type: 'tag_pattern',
        description: 'Error analyzing patterns. Please try again later.',
        count: 0
      }]
    };
  }
};

// Get spiral phase color
export const getSpiralPhaseColor = (phase: SpiralPhase): string => {
  const colors: Record<SpiralPhase, string> = {
    'Beige': '#d4c5aa',
    'Purple': '#9b59b6',
    'Red': '#e74c3c',
    'Blue': '#5f8eb8',
    'Orange': '#f7a04b',
    'Green': '#77b28c',
    'Yellow': '#f1c40f',
    'Turquoise': '#1abc9c'
  };

  return colors[phase] || '#77b28c'; // Default to Green if phase not found
};

// Get spiral phase description
export const getSpiralPhaseDescription = (phase: SpiralPhase): string => {
  const descriptions: Record<SpiralPhase, string> = {
    'Beige': 'Survival-oriented, focused on immediate needs',
    'Purple': 'Tribal, magical thinking, tradition-bound',
    'Red': 'Impulsive, egocentric, heroic',
    'Blue': 'Purpose-driven, orderly, principled',
    'Orange': 'Achievement-oriented, strategic, competitive',
    'Green': 'Community-focused, egalitarian, harmony-seeking',
    'Yellow': 'Systemic, integrative, flexible',
    'Turquoise': 'Holistic, global view, compassionate'
  };

  return descriptions[phase] || 'Exploring your current consciousness level';
};
