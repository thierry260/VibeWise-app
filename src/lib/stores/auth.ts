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

// Initialize auth state listener
if (typeof window !== 'undefined') {
  onAuthStateChanged(
    auth as Auth,
    (user) => {
      authStore.set({
        user,
        loading: false,
        error: null,
      });
    },
    (error) => {
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
