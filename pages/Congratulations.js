import React from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation
import styles from '../app/Storyline.module.css'; // Import the corresponding CSS
import { auth, db } from '../utils/firebaseConfig';

const Congratulations = () => {
  const router = useRouter(); // Initialize the router

  async function HandleFillDetails() {
    const user = auth.currentUser;
    if (user) {
        router.push('/SignupForm'); 
    } else {
      alert('You are not logged in.');
      router.push('https://cb-genesis.vercel.app/');
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.storyContent}>
        <h1 className={styles.title}>Congratulations, Meridian!</h1>
        <p className={styles.paragraph}>
        You&apos;ve successfully cracked the password and unlocked the key to becoming the best version of yourself. 
            Welcome to Celestial Biscuit—the elite circle of the best of the best! 
            Your journey through this exclusive knowledge is just beginning, and even more exciting secrets await your discovery!
        </p>
        <button className={styles.startButton} onClick={HandleFillDetails}>
          Fill your details!
        </button>
      </div>
    </div>
  );
};

export default Congratulations;