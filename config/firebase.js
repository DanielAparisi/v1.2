import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

// Firebase config - Using fallback approach for compatibility
const getExtraConfig = () => {
  // Try the newer expoConfig first, then fall back to manifest
  const extra = Constants.expoConfig?.extra || Constants.manifest?.extra;
  
  if (!extra) {
    console.error('No extra config found in Constants');
    console.log('Available Constants:', Object.keys(Constants));
  }
  
  return extra;
};

const extra = getExtraConfig();

const firebaseConfig = {
  apiKey: extra?.apiKey,
  authDomain: extra?.authDomain,
  projectId: extra?.projectId,
  storageBucket: extra?.storageBucket,
  messagingSenderId: extra?.messagingSenderId,
  appId: extra?.appId,
  databaseURL: extra?.databaseURL
};

// Debug: Log the configuration to verify it's reading correctly
console.log('Firebase Config Check:', {
  constantsAvailable: !!Constants,
  expoConfig: !!Constants.expoConfig,
  manifest: !!Constants.manifest,
  extra: !!extra,
  apiKey: extra?.apiKey ? 'Found' : 'Missing',
  authDomain: extra?.authDomain ? 'Found' : 'Missing',
  projectId: extra?.projectId ? 'Found' : 'Missing'
});

// Validate that we have the required config
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('Firebase configuration is missing required fields!');
  console.error('Config values:', firebaseConfig);
  throw new Error('Firebase configuration is incomplete. Check your app.json extra section.');
}

// initialize firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
}); 
export const database = getFirestore();