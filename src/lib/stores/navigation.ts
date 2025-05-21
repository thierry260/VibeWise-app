import { writable, derived } from 'svelte/store';
import { page } from '$app/stores';

// Routes where navigation should be hidden
const hiddenNavigationRoutes = [
  '/login',
  '/register',
  '/onboarding',
  '/hrv-session/active', // For when HRV session is in focus mode
  '/balcony'             // For balcony insight screen
];

// Create a store for any manual overrides
export const navigationVisibility = writable({
  forceHide: false,
  forceShow: false
});

// Derived store that determines if navigation should be shown
export const showNavigation = derived(
  [page, navigationVisibility],
  ([$page, $navigationVisibility]) => {
    // If there's a manual override, respect it
    if ($navigationVisibility.forceHide) return false;
    if ($navigationVisibility.forceShow) return true;
    
    // Check if current route is in the hidden routes list
    const currentPath = $page.url.pathname;
    
    // Check for exact matches
    if (hiddenNavigationRoutes.includes(currentPath)) {
      return false;
    }
    
    // Check for route patterns
    for (const route of hiddenNavigationRoutes) {
      // If route ends with a wildcard (/*), check if the current path starts with the route base
      if (route.endsWith('/*') && currentPath.startsWith(route.slice(0, -2))) {
        return false;
      }
    }
    
    // Default to showing navigation
    return true;
  }
);

// Helper functions to manually control navigation visibility
export function hideNavigation() {
  navigationVisibility.update(state => ({ ...state, forceHide: true }));
}

export function showNavigationForce() {
  navigationVisibility.update(state => ({ ...state, forceShow: true }));
}

export function resetNavigationOverrides() {
  navigationVisibility.set({ forceHide: false, forceShow: false });
}
