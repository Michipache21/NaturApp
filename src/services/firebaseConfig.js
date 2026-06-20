import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyC53ZlCfF7Ehsf_O8oBJRaO2D1xAFObrpI",
  authDomain: "naturapp-b8a40.firebaseapp.com",
  projectId: "naturapp-b8a40",
  storageBucket: "naturapp-b8a40.firebasestorage.app",
  messagingSenderId: "74837078603",
  appId: "1:74837078603:web:6a8727f84a07d3791c93ce",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});