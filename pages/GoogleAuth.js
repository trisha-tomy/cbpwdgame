import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../utils/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styles from '../app/GoogleAuthScreen.module.css';
import "../app/globals.css"
import Head from 'next/head';

const GoogleAuthScreen = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/SignupForm');
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      alert('Failed to sign in with Google. Please try again.');
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/SignupForm');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Quicksand:wght@300;400;700&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.container}>
        <div className={styles.authContainer}>
          <h1 className={styles.title}>Congratulations, Meridian!</h1>
          <p className={styles.introduction}>You&apos;ve successfully cracked the password and unlocked the key to becoming the best version of yourself. 
            Welcome to Celestial Biscuit—the elite circle of the best of the best! 
            Your journey through this exclusive knowledge is just beginning, and even more exciting secrets await your discovery!

</p>
          <button className={styles.button} onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
        <footer className={styles.footer}>© 2024 Celestial Biscuit</footer>
      </div>
    </>
  );
};

export default GoogleAuthScreen;