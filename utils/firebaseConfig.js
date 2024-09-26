// utils/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Import Firestore
import { getAuth } from 'firebase/auth'; // Import Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7gRmqRtGwoMvcI0qB7mdeJZf_gRjNTcY",
  authDomain: "password-game-cd450.firebaseapp.com",
  projectId: "password-game-cd450",
  storageBucket: "password-game-cd450.appspot.com",
  messagingSenderId: "782974730404",
  appId: "1:782974730404:web:f817d6cd245229195f2631"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
