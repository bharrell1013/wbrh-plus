// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAfXsCy2f7J20x8FmI0QOilG3QofFeMXqE",
  authDomain: "wbrh-plus.firebaseapp.com",
  projectId: "wbrh-plus",
  storageBucket: "wbrh-plus.firebasestorage.app",
  messagingSenderId: "514731751933",
  appId: "1:514731751933:web:dde9bf761e708b50468194"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services and export them
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Export the app instance as well if needed
export default app;