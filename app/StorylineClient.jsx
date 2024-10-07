'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../utils/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import styles from './Storyline.module.css';

export default function StorylineClient() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      alert('Failed to sign in with Google. Please try again.');
    }
  };

  const handleStartGame = () => {
    if (user) {
      router.push('/PasswordGame');
    } else {
      alert('Please sign in with Google before starting the game.');
    }
  };

  return (
    <>
      {!user ? (
        <button className={styles.startButton} onClick={handleGoogleSignIn}>
          Sign in with Google to Begin
        </button>
      ) : (
        <button className={styles.startButton} onClick={handleStartGame}>
          Begin the Trials!
        </button>
      )}
    </>
  );
}