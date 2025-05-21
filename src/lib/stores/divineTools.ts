import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';
import { doc, collection, addDoc, getDoc } from 'firebase/firestore';
import { db } from '$lib/firebase';

// Define tool types
export interface DivineTool {
  id: string;
  title: string;
  type: string;
  description: string;
  actionLabel: string;
  route: string;
}

// Placeholder tools
export const divineTools: DivineTool[] = [
  {
    id: "breath-1",
    title: "6-2-8 Breathing",
    type: "app",
    description: "A short breathing technique to calm your system.",
    actionLabel: "Start Breathing",
    route: "/library/breathing-628"
  },
  {
    id: "quote-1",
    title: "You Are Already Whole",
    type: "app",
    description: "Quote to reflect on.",
    actionLabel: "Read Quote",
    route: "/library/quote-1"
  },
  {
    id: "journal-prompt-1",
    title: "Prompt: What am I avoiding?",
    type: "app",
    description: "A journaling insight to deepen your awareness.",
    actionLabel: "Go to Prompt",
    route: "/library/prompt-1"
  }
];

// Create a store for the Divine ToolChooser
interface DivineToolChooserState {
  isVisible: boolean;
  selectedTool: DivineTool | null;
}

const initialState: DivineToolChooserState = {
  isVisible: false,
  selectedTool: null
};

// Create the store
const createDivineToolChooserStore = () => {
  const { subscribe, set, update } = writable<DivineToolChooserState>(initialState);

  return {
    subscribe,
    
    // Show a randomly selected tool
    showRandomTool: () => {
      // Select a random tool from the array
      const randomIndex = Math.floor(Math.random() * divineTools.length);
      const selectedTool = divineTools[randomIndex];
      
      update(state => ({
        isVisible: true,
        selectedTool
      }));
      
      return selectedTool;
    },
    
    // Hide the tool chooser
    hide: () => {
      update(currentState => ({
        ...currentState,
        isVisible: false
      }));
    },
    
    // Reset the store to initial state
    reset: () => set(initialState),
    
    // Log tool interaction to Firestore
    logToolInteraction: async (user: User, toolId: string, action: 'shown' | 'clicked' | 'dismissed') => {
      try {
        if (!user) return;
        
        const logData = {
          toolId,
          action,
          timestamp: new Date().toISOString()
        };
        
        // Add to logs collection
        await addDoc(collection(db, 'users', user.uid, 'tools', 'logs'), logData);
        
        return { success: true };
      } catch (error) {
        console.error('Error logging tool interaction:', error);
        return { success: false, error };
      }
    }
  };
};

// Export the store
export const divineToolChooserStore = createDivineToolChooserStore();

// Check if divine timing is enabled for a user
export const isDivineTimingEnabled = async (user: User): Promise<boolean> => {
  try {
    if (!user) return false;
    
    const userSettingsRef = doc(db, 'users', user.uid, 'private', 'settings');
    const settingsSnap = await getDoc(userSettingsRef);
    
    if (settingsSnap.exists()) {
      return settingsSnap.data().divine_timing_enabled === true;
    }
    
    // Default to true if setting doesn't exist
    return true;
  } catch (error) {
    console.error('Error checking divine timing setting:', error);
    return true; // Default to enabled on error
  }
};
