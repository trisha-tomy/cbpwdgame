// utils/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Import Firestore
import { getAuth } from 'firebase/auth'; // Import Auth

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };