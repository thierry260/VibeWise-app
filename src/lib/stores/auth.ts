import { writable } from 'svelte/store';
import { onAuthStateChanged, type Auth, type User } from 'firebase/auth';
import { auth } from '$lib/firebase';

type AuthStore = {
  user: User | null;
  loading: boolean;
  error: Error | null;
};

// Create auth store
export const authStore = writable<AuthStore>({
  user: null,
  loading: true,
  error: null,
});

// Initialize auth state listener with a timeout to prevent long loading times
if (typeof window !== 'undefined') {
  // Set a timeout to ensure loading state doesn't get stuck
  const authTimeout = setTimeout(() => {
    authStore.update(state => {
      // Only update if still loading
      if (state.loading) {
        console.log('Auth loading timed out, forcing ready state');
        return {
          ...state,
          loading: false
        };
      }
      return state;
    });
  }, 5000); // 5 second timeout
  
  // Set up the normal auth listener
  onAuthStateChanged(
    auth as Auth,
    (user) => {
      clearTimeout(authTimeout);
      authStore.set({
        user,
        loading: false,
        error: null,
      });
    },
    (error) => {
      clearTimeout(authTimeout);
      console.error('Auth state error:', error);
      authStore.update((state) => ({
        ...state,
        loading: false,
        error,
      }));
    }
  );
}

// Helper function to get the current user
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth as Auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      (error) => {
        unsubscribe();
        reject(error);
      }
    );
  });
};

export default authStore;
