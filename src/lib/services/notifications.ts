import { browser } from '$app/environment';
import { LocalNotifications } from '@capacitor/local-notifications';
import type { ScheduleOptions, LocalNotificationSchema } from '@capacitor/local-notifications';

// Define Capacitor types for TypeScript
declare global {
  interface Window {
    Capacitor?: {
      Plugins?: {
        LocalNotifications?: typeof LocalNotifications;
        // Use unknown instead of any for better type safety
        [key: string]: unknown;
      };
      isNative?: boolean;
      // Use unknown instead of any for better type safety
      [key: string]: unknown;
    };
  }
}

// Platform detection
const isPlatformWeb = () => {
  if (!browser) return false;
  // Check if we're in a browser and not in Capacitor
  return typeof window !== 'undefined' && !isPlatformNative();
};

const isPlatformNative = () => {
  if (!browser) return false;
  
  try {
    // More reliable check for Capacitor environment
    return (
      typeof window !== 'undefined' &&
      window.Capacitor !== undefined &&
      // Either explicitly isNative is true, or we're in a mobile environment with Capacitor
      (window.Capacitor.isNative === true || 
       (window.Capacitor.Plugins !== undefined && 
        window.Capacitor.platform !== 'web'))
    );
  } catch (e) {
    console.error('Error in isPlatformNative:', e);
    return false;
  }
};

// Notification ID generation - ensure it's within Java int limits (2147483647)
export const generateNotificationId = (): number => {
  return Math.abs(new Date().getTime() % 2000000000);
};

// Check notification permission
export const checkNotificationPermission = async (): Promise<string> => {
  try {
    if (isPlatformWeb()) {
      // Web platform
      if ('Notification' in window) {
        return Notification.permission;
      }
      return 'unsupported';
    } else if (isPlatformNative()) {
      // Native platform
      const { display } = await LocalNotifications.checkPermissions();
      return display;
    }
    return 'unsupported';
  } catch (error) {
    console.error('Error checking notification permission:', error);
    return 'unsupported';
  }
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<string> => {
  try {
    if (isPlatformWeb()) {
      // Web platform
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        return permission;
      }
      return 'unsupported';
    } else if (isPlatformNative()) {
      // Native platform
      const { display } = await LocalNotifications.requestPermissions();
      return display;
    }
    return 'unsupported';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return 'denied';
  }
};

// Check if notifications are supported
export const areNotificationsSupported = (): boolean => {
  if (!browser) return false;
  
  try {
    if (isPlatformWeb()) {
      return 'Notification' in window;
    } else if (isPlatformNative()) {
      // For Capacitor, first check if the plugin is registered
      if (typeof window !== 'undefined' && 
          window.Capacitor !== undefined && 
          window.Capacitor.Plugins !== undefined) {
        
        // Check if LocalNotifications plugin is available
        // This should work even if the property is accessed differently
        const plugins = window.Capacitor.Plugins;
        return 'LocalNotifications' in plugins;
      }
    }
  } catch (e) {
    console.error('Error checking for notification support:', e);
  }
  
  return false;
};

// Send a test notification
export const sendTestNotification = async ({ 
  title = 'Divine Timing', 
  body = 'Take a breath and notice how you feel right now.'
}: {
  title?: string;
  body?: string;
}): Promise<{ success: boolean; error?: unknown }> => {
  try {
    console.log('Sending test notification...');
    
    // Detailed debugging for platform detection
    console.log('Platform detection - is web:', isPlatformWeb());
    console.log('Platform detection - is native:', isPlatformNative());
    
    // Log Capacitor object properties
    if (typeof window !== 'undefined' && window.Capacitor) {
      console.log('Capacitor object exists');
      console.log('Capacitor.isNative:', window.Capacitor.isNative);
      console.log('Capacitor.platform:', window.Capacitor.platform);
      console.log('Capacitor.Plugins exists:', !!window.Capacitor.Plugins);
      
      if (window.Capacitor.Plugins) {
        console.log('Available plugins:', Object.keys(window.Capacitor.Plugins));
        console.log('LocalNotifications exists:', 'LocalNotifications' in window.Capacitor.Plugins);
      }
    } else {
      console.log('Capacitor object not found in window');
    }
    
    // Log notification support
    console.log('Notifications supported:', areNotificationsSupported());
    
    if (isPlatformWeb()) {
      // Web platform
      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          const notification = new Notification(title, {
            body,
            icon: '/favicon.png',
            tag: 'divine-timing-test'
          });
          
          notification.onclick = () => {
            window.focus();
            notification.close();
          };
          
          console.log('Web notification sent successfully');
          return { success: true };
        } else {
          console.error('Notification permission not granted');
          return { success: false, error: 'Permission not granted' };
        }
      } else {
        console.error('Web Notifications API not supported');
        return { success: false, error: 'Notifications not supported' };
      }
    } else if (isPlatformNative()) {
      // Native platform
      const notificationId = generateNotificationId();
      
      // Check permission first
      const permissionStatus = await LocalNotifications.checkPermissions();
      if (permissionStatus.display !== 'granted') {
        const requestResult = await LocalNotifications.requestPermissions();
        if (requestResult.display !== 'granted') {
          console.error('Native notification permission not granted');
          return { success: false, error: 'Permission not granted' };
        }
      }
      
      // Schedule the notification to show immediately
      await LocalNotifications.schedule({
        notifications: [
          {
            id: notificationId,
            title,
            body,
            largeBody: body,
            summaryText: 'Divine Timing',
            smallIcon: 'ic_stat_icon',
            iconColor: '#4D44B3',
            sound: 'divine_timing.wav',
            schedule: { at: new Date(Date.now() + 1000) }
          }
        ]
      });
      
      console.log('Native notification sent successfully');
      return { success: true };
    }
    
    console.error('Unknown platform or environment');
    return { success: false, error: 'Unknown platform' };
  } catch (error) {
    console.error('Error sending test notification:', error);
    return { success: false, error };
  }
};

// Schedule a notification for later
export const scheduleNotification = async ({
  title,
  body,
  scheduledTime,
  id
}: {
  title: string;
  body: string;
  scheduledTime: Date;
  id?: number;
}): Promise<{ success: boolean; error?: unknown }> => {
  try {
    const notificationId = id || generateNotificationId();
    
    if (isPlatformNative()) {
      // Native platform
      await LocalNotifications.schedule({
        notifications: [
          {
            id: notificationId,
            title,
            body,
            largeBody: body,
            summaryText: 'Divine Timing',
            smallIcon: 'ic_stat_icon',
            iconColor: '#4D44B3',
            schedule: { at: scheduledTime }
          }
        ]
      });
      
      return { success: true };
    } else if (isPlatformWeb()) {
      // Web platform - can't schedule for later directly, but we can use setTimeout
      // This is just for testing purposes - web notifications can't be scheduled when the app is closed
      if ('Notification' in window && Notification.permission === 'granted') {
        const delay = scheduledTime.getTime() - Date.now();
        if (delay > 0) {
          setTimeout(() => {
            const notification = new Notification(title, {
              body,
              icon: '/favicon.png',
              tag: `divine-timing-${notificationId}`
            });
            
            notification.onclick = () => {
              window.focus();
              notification.close();
            };
          }, delay);
        }
        
        return { success: true };
      }
      
      return { success: false, error: 'Web notifications not supported or permission not granted' };
    }
    
    return { success: false, error: 'Unknown platform' };
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return { success: false, error };
  }
};

// Initialize notifications
export const initializeNotifications = async (): Promise<void> => {
  if (isPlatformNative()) {
    try {
      // Register for notification events
      LocalNotifications.addListener('localNotificationReceived', (notification) => {
        console.log('Notification received:', notification);
      });
      
      LocalNotifications.addListener('localNotificationActionPerformed', (notificationAction) => {
        console.log('Notification action performed:', notificationAction);
      });
      
      console.log('Native notifications initialized');
    } catch (error) {
      console.error('Error initializing native notifications:', error);
    }
  }
};

// Export a default object with all functions
export default {
  generateNotificationId,
  checkNotificationPermission,
  requestNotificationPermission,
  areNotificationsSupported,
  sendTestNotification,
  scheduleNotification,
  initializeNotifications,
  isPlatformWeb,
  isPlatformNative
};
