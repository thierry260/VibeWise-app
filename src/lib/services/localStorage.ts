import { browser } from '$app/environment';
import { Filesystem, Directory } from '@capacitor/filesystem';
import type { User } from 'firebase/auth';

// Check if we're running in Capacitor environment
const isCapacitorApp = (): boolean => {
  return browser && typeof (window as Window & { Capacitor?: unknown }).Capacitor !== 'undefined';
};

// IndexedDB setup for web
const DB_NAME = 'vibewise-local';
const STORE_NAME = 'audio-recordings';
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

// Initialize IndexedDB
const initIndexedDB = (): Promise<IDBDatabase> => {
  if (!browser) {
    return Promise.reject(new Error('IndexedDB is only available in browser environment'));
  }

  if (dbPromise) {
    return dbPromise;
  }

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Error opening IndexedDB:', event);
      reject(new Error('Could not open IndexedDB'));
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });

  return dbPromise;
};

// Save audio to IndexedDB (web)
const saveToIndexedDB = async (
  userId: string,
  audioBlob: Blob,
  audioId: string
): Promise<string> => {
  try {
    const db = await initIndexedDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    // Create a record with the blob and metadata
    const record = {
      id: audioId,
      userId,
      blob: audioBlob,
      timestamp: Date.now(),
      mimeType: audioBlob.type
    };

    return new Promise((resolve, reject) => {
      const request = store.put(record);

      request.onsuccess = () => {
        // Create a blob URL for immediate playback
        const blobUrl = URL.createObjectURL(audioBlob);
        resolve(blobUrl);
      };

      request.onerror = (event) => {
        console.error('Error saving to IndexedDB:', event);
        reject(new Error('Failed to save audio to IndexedDB'));
      };
    });
  } catch (error) {
    console.error('IndexedDB save error:', error);
    throw error;
  }
};

// Get audio from IndexedDB (web)
export const getFromIndexedDB = async (audioId: string): Promise<Blob | null> => {
  try {
    console.log('Getting audio from IndexedDB with ID:', audioId);
    const db = await initIndexedDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get(audioId);

      request.onsuccess = () => {
        const record = request.result;
        if (record) {
          console.log('Found audio record in IndexedDB:', record.id);
          resolve(record.blob);
        } else {
          console.warn('Audio record not found in IndexedDB:', audioId);
          resolve(null);
        }
      };

      request.onerror = (event) => {
        console.error('Error retrieving from IndexedDB:', event);
        reject(new Error('Failed to retrieve audio from IndexedDB'));
      };
    });
  } catch (error) {
    console.error('IndexedDB get error:', error);
    return null;
  }
};

// Save audio to Capacitor Filesystem (mobile)
const saveToFilesystem = async (
  userId: string,
  audioBlob: Blob,
  audioId: string
): Promise<string> => {
  try {
    // Convert blob to base64 data
    const base64Data = await blobToBase64(audioBlob);
    
    // Determine file extension based on MIME type
    const fileExtension = audioBlob.type.includes('webm') ? 'webm' : 
                          audioBlob.type.includes('mp4') ? 'm4a' : 
                          audioBlob.type.includes('mp3') ? 'mp3' : 'audio';
    
    // Create a path for the audio file
    const filePath = `${userId}/audio/${audioId}.${fileExtension}`;
    
    // Save the file to device storage
    await Filesystem.writeFile({
      path: filePath,
      data: base64Data,
      directory: Directory.Data,
      recursive: true
    });
    
    // Store the file path without the file:// prefix for consistent handling
    const storagePath = filePath;
    console.log('Audio saved to filesystem at path:', storagePath);
    
    return storagePath;
  } catch (error) {
    console.error('Filesystem save error:', error);
    throw error;
  }
};

// Helper to convert Blob to base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;
      // Remove the data URL prefix (e.g., "data:audio/webm;base64,")
      const base64Content = base64data.split(',')[1];
      resolve(base64Content);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Get audio from Capacitor Filesystem (mobile)
export const getFromFilesystem = async (filePath: string): Promise<Blob | null> => {
  try {
    console.log('Reading file from filesystem, original path:', filePath);
    
    // Handle different path formats
    let cleanPath = filePath;
    
    // If it's a full file:// URI, extract just the path part
    if (filePath.startsWith('file://')) {
      // For Android, we need to remove the file:// prefix and any app-specific path
      cleanPath = filePath.replace(/^file:\/\/\/data\/user\/\d+\/com\.vibewise\.app\/files\//, '');
    }
    
    // If the path still contains the user ID and 'audio', make sure we're just using that relative path
    const match = cleanPath.match(/([\w-]+\/audio\/[\w.-]+)/);
    if (match && match[1]) {
      cleanPath = match[1];
    }
    
    console.log('Cleaned path for filesystem read:', cleanPath);
    
    const result = await Filesystem.readFile({
      path: cleanPath,
      directory: Directory.Data
    });
    
    console.log('Successfully read file from filesystem');
    
    // Determine MIME type from file extension
    const fileExtension = filePath.split('.').pop()?.toLowerCase();
    let mimeType = 'audio/webm';
    
    if (fileExtension === 'mp3') {
      mimeType = 'audio/mp3';
    } else if (fileExtension === 'm4a') {
      mimeType = 'audio/mp4';
    }
    
    console.log('Using MIME type:', mimeType);
    
    // Convert base64 to blob
    // Ensure result.data is a string before passing to base64ToBlob
    const blob = base64ToBlob(typeof result.data === 'string' ? result.data : String(result.data), mimeType);
    return blob;
  } catch (error) {
    console.error('Filesystem read error:', error);
    return null;
  }
};

// Helper to convert base64 to Blob
const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteArrays = [];
  
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  
  return new Blob(byteArrays, { type: mimeType });
};

// Main function to save audio locally
export const saveAudioLocally = async (
  user: User,
  audioBlob: Blob
): Promise<{ success: boolean; url?: string; localPath?: string; error?: unknown }> => {
  try {
    // Generate a unique ID for the audio file
    const audioId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    console.log('Saving audio with ID:', audioId);
    
    if (isCapacitorApp()) {
      // Mobile: Save to Capacitor Filesystem
      console.log('Detected Capacitor app, saving to filesystem');
      const filePath = await saveToFilesystem(user.uid, audioBlob, audioId);
      
      // Store the path in a format that we can consistently use later
      const storagePath = filePath;
      console.log('Audio saved to filesystem, path:', storagePath);
      
      return { 
        success: true, 
        url: storagePath, 
        localPath: storagePath 
      };
    } else {
      // Web: Save to IndexedDB
      console.log('Detected web app, saving to IndexedDB');
      const blobUrl = await saveToIndexedDB(user.uid, audioBlob, audioId);
      const storagePath = `indexeddb://${STORE_NAME}/${audioId}`;
      
      console.log('Audio saved to IndexedDB, path:', storagePath, 'URL:', blobUrl);
      
      return { 
        success: true, 
        url: storagePath, // Store the path, not the blob URL which is temporary
        localPath: storagePath 
      };
    }
  } catch (error) {
    console.error('Error saving audio locally:', error);
    return { success: false, error };
  }
};

// Get audio from local storage (handles both IndexedDB and Filesystem)
export const getAudioFromLocalStorage = async (
  audioPath: string
): Promise<{ success: boolean; url?: string; error?: unknown }> => {
  try {
    console.log('Getting audio from local storage, path:', audioPath);
    
    // Check if this is an IndexedDB path
    if (audioPath.startsWith('indexeddb://')) {
      console.log('Audio is stored in IndexedDB');
      // Extract the store name and key
      const [, storeName, key] = audioPath.match(/indexeddb:\/\/([^/]+)\/(.+)/) || [];
      
      if (!storeName || !key) {
        throw new Error(`Invalid IndexedDB path: ${audioPath}`);
      }
      
      console.log(`Retrieving from IndexedDB - Store: ${storeName}, Key: ${key}`);
      
      // Get from IndexedDB
      const blob = await getFromIndexedDB(key);
      
      if (!blob) {
        throw new Error(`Audio not found in IndexedDB: ${key}`);
      }
      
      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);
      console.log('Created blob URL for IndexedDB audio:', blobUrl);
      return { success: true, url: blobUrl };
    } else {
      console.log('Audio is stored in Filesystem');
      
      // Handle different path formats for Filesystem
      const filePath = audioPath;
      
      // If we have a full URI with the app package path, use it directly
      if (!audioPath.startsWith('file://') && !audioPath.includes('/data/user/')) {
        console.log('Using relative path for Filesystem');
      }
      
      console.log('Retrieving from Filesystem, path:', filePath);
      
      // Get from Filesystem
      const blob = await getFromFilesystem(filePath);
      
      if (!blob) {
        throw new Error(`Audio not found in Filesystem: ${filePath}`);
      }
      
      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);
      console.log('Created blob URL for Filesystem audio:', blobUrl);
      return { success: true, url: blobUrl };
    }
  } catch (error) {
    console.error('Error getting audio from local storage:', error);
    return { success: false, error };
  }
};

// Check if a path is a local storage path
export const isLocalStoragePath = (path: string): boolean => {
  // Check for various types of local paths
  const isLocal = path.startsWith('indexeddb://') || 
                  path.startsWith('file://') || 
                  path.includes('/data/user/') || 
                  (!path.startsWith('http://') && !path.startsWith('https://') && 
                   !path.startsWith('gs://') && !path.startsWith('firebase://'));
  
  console.log(`Path check: ${path} is ${isLocal ? 'local' : 'remote'}`);
  return isLocal;
};
