import { writable } from 'svelte/store';
import type { SpiralPhase, SpiralHistoryEntry, Intention, PatternInsight } from '$lib/services/journey';

// Define the journey store state interface
interface JourneyState {
  currentPhase: SpiralPhase;
  spiralHistory: SpiralHistoryEntry[];
  intention: Intention | undefined;
  patterns: PatternInsight[];
  lastFetched: number | null;
  loading: boolean;
  error: Error | null;
}

// Create initial state
const initialState: JourneyState = {
  currentPhase: 'Green',
  spiralHistory: [],
  intention: undefined,
  patterns: [],
  lastFetched: null,
  loading: false,
  error: null
};

// Create the journey store
function createJourneyStore() {
  const { subscribe, set, update } = writable<JourneyState>(initialState);

  return {
    subscribe,
    
    // Set journey data
    setJourneyData: (
      currentPhase: SpiralPhase, 
      spiralHistory: SpiralHistoryEntry[], 
      intention: Intention | undefined
    ) => {
      update(state => ({
        ...state,
        currentPhase,
        spiralHistory,
        intention,
        lastFetched: Date.now()
      }));
    },
    
    // Set patterns data
    setPatterns: (patterns: PatternInsight[]) => {
      update(state => ({
        ...state,
        patterns,
        lastFetched: Date.now()
      }));
    },
    
    // Set loading state
    setLoading: (loading: boolean) => {
      update(state => ({
        ...state,
        loading
      }));
    },
    
    // Set error state
    setError: (error: Error | null) => {
      update(state => ({
        ...state,
        error
      }));
    },
    
    // Reset store to initial state
    reset: () => {
      set(initialState);
    }
  };
}

// Export the journey store
export const journeyStore = createJourneyStore();
