import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Only import SVG web polyfill on web platform
if (Platform.OS === 'web') {
  // @ts-ignore
  import('react-native-svg-web');
}

// Create a storage adapter that works across platforms
const storage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      } else {
        return await AsyncStorage.getItem(key);
      }
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },
  
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
      } else {
        await AsyncStorage.setItem(key, value);
      }
    } catch (error) {
      console.error('Error writing to storage:', error);
    }
  },
  
  removeItem: async (key: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  }
};

// Make storage available globally
global.localStorage = storage;

export default function Providers({ children }: { children: React.ReactNode }) {
  return children;
}