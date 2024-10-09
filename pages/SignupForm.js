// SignupForm.js

import { useState, useEffect } from 'react';
import { db, auth } from '../utils/firebaseConfig';
import { useRouter } from 'next/router';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import styles from '../app/SignupForm.module.css';
import Head from 'next/head';
import "../app/globals.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    enrollment: '',
    phone: '',
    year: '',
    branch: '',
  });

  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [gameCompleted, setGameCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setUserEmail(user.email);
        
        // Check if the game has been completed
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().gameCompleted) {
          setGameCompleted(true);
        } else {
          // If game not completed, redirect to the game page
          router.push('/PasswordGame');
        }
      } else {
        router.push('https://celestialbiscuit.vercel.app/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('User is not authenticated. Please log in again.');
      return;
    }

    if (!gameCompleted) {
      alert('Please complete the game before submitting the form.');
      return;
    }

    if (formData.phone.length !== 10) {
      alert('Phone number must be 10 digits long.');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists() && userDoc.data().hasSubmitted) {
        alert('Form already submitted.');
        await signOut(auth);
        router.push('https://celestialbiscuit.vercel.app/');
        return;
      }

      const studentDocRef = doc(db, 'recruitment-phase1', formData.enrollment);
      const studentDoc = await getDoc(studentDocRef);

      if (studentDoc.exists()) {
        alert('Enrollment number already submitted.');
        await signOut(auth);
        router.push('https://celestialbiscuit.vercel.app/');
        return;
      }

      await setDoc(studentDocRef, {
        Name: formData.name,
        EnrollmentNumber: formData.enrollment,
        PhoneNumber: formData.phone,
        Year: Number(formData.year),
        Branch: formData.branch,
        Email: userEmail,
        UserId: userId,
      });

      await setDoc(userDocRef, { hasSubmitted: true }, { merge: true });

      alert('Details successfully submitted!');
      await signOut(auth);
      router.push('https://celestialbiscuit.vercel.app/');

    } catch (error) {
      console.error('Error saving details:', error);
      alert('Error saving details. Try again.');
    }
  };

  if (!gameCompleted) {
    return <div>Please complete the game before filling out this form.</div>;
  }

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Quicksand:wght@300;400;700&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h2 className={styles.title}>Signup Form</h2>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
            <input
              className={styles.input}
              type="text"
              name="enrollment"
              placeholder="Enrollment Number (xxxxxxxxxxx)"
              pattern="^[0-9]{11}$"
              onChange={handleChange}
              required
            />
            <input
              className={styles.input}
              type="tel"
              name="phone"
              placeholder="Phone Number (10 digits)"
              pattern="^[0-9]{10}$"
              onChange={handleChange}
              required
            />
            <div className={styles.inlineFields}>
              <select
                className={`${styles.select} ${styles.inlineField}`}
                name="year"
                onChange={handleChange}
                required
              >
                <option value="" disabled selected>Select Year</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
              <select
                className={`${styles.select} ${styles.inlineField}`}
                name="branch"
                onChange={handleChange}
                required
              >
                <option value="" disabled selected>Select Branch</option>
                <option value="CSE-AI">CSE-AI</option>
                <option value="CSE">CSE</option>
                <option value="ECE-AI">ECE-AI</option>
                <option value="ECE">ECE</option>
                <option value="IT">IT</option>
                <option value="AI-ML">AI-ML</option>
                <option value="MAE">MAE</option>
                <option value="DMAM">DMAM</option>
              </select>
            </div>
            <button className={styles.button} type="submit">Submit</button>
          </form>
        </div>
        <footer className={styles.footer}>© 2024 Celestial Biscuit</footer>
      </div>
    </>
  );
};

export default SignupForm;
