import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfXsCy2f7J20x8FmI0QOilG3QofFeMXqE",
  authDomain: "wbrh-plus.firebaseapp.com",
  projectId: "wbrh-plus",
  storageBucket: "wbrh-plus.firebasestorage.app",
  messagingSenderId: "514731751933",
  appId: "1:514731751933:web:dde9bf761e708b50468194",
  measurementId: "G-LLMBJ49H40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, analytics };
export default app;
