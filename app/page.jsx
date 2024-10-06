'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation
import styles from './Storyline.module.css'; // Import the corresponding CSS

const Storyline = () => {
  const router = useRouter(); // Initialize the router

  const handleStartGame = () => {
    router.push('/PasswordGame'); // Redirect to the password game page
  };

  return (
    <div className={styles.container}>
      <div className={styles.storyContent}>
        <h1 className={styles.title}>GENESIS</h1>
        <p className={styles.paragraph}>
          Celestial Biscuit contains ancient and rare knowledge—only accessible by those worthy of the club's secrets. 
          The Guardians have set complex password puzzles to protect this knowledge. You’ve been chosen to face the trials and crack the password, 
          gaining access to the wisdom of the celestial founders, the key to being in the top 1%.
        </p>
        <p className={styles.paragraph}>
          Are you ready to unlock the secrets?
        </p>
        <button className={styles.startButton} onClick={handleStartGame}>
          Begin!
        </button>
      </div>
    </div>
  );
};

export default Storyline;
