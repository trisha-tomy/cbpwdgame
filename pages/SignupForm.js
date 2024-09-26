import { useState, useEffect } from 'react';
import { db, auth } from '../utils/firebaseConfig'; // Import Firebase config and auth
import { useRouter } from 'next/router';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'; // Import functions from Firestore
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import to listen to authentication state and sign out
import styles from '../app/SignupForm.module.css';
import "../app/globals.css"

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    enrollment: '',
    phone: '',
    year: '',
    branch: '',
  });

  const [userId, setUserId] = useState(null); // State to store user ID
  const [userEmail, setUserEmail] = useState(''); // State to store user email
  const router = useRouter();

  // Check user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set the user ID if the user is authenticated
        setUserEmail(user.email); // Set the user email from Google Authentication
      } else {
        console.log('No user is signed in.');
        router.push('/invalid-entry'); // Change to your login route
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const enrollment_no = formData.enrollment;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userId) {
      alert('User is not authenticated. Please log in again.');
      return;
    }
  
    // Validate phone number
    if (formData.phone.length !== 10) {
      alert('Phone number must be 10 digits long.');
      return;
    }
  
    try {
      // Check if the user has already submitted the form
      const userDocRef = doc(db, 'users', userId); // Assuming you have a users collection
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists() && userDoc.data().hasSubmitted) {
        alert('You have already submitted the form.');
        await signOut(auth); // Sign out the user
        router.push('/login'); // Redirect to your desired route
        return; // Prevent further execution
      }
  
      // Check if the enrollment number already exists in Firestore
      const studentDocRef = doc(db, 'recruitment-phase1', formData.enrollment);
      const studentDoc = await getDoc(studentDocRef);
  
      if (studentDoc.exists()) {
        alert('This enrollment number has already been submitted.');
        await signOut(auth); // Sign out the user
        router.push('/login'); // Redirect to your desired route
        return; // Prevent further execution
      }
  
      // Store user data in Firestore
      await setDoc(studentDocRef, {
        Name: formData.name,
        EnrollmentNumber: formData.enrollment,
        PhoneNumber: formData.phone,
        Year: Number(formData.year),
        Branch: formData.branch,
        Email: userEmail,
        UserId: userId,
      });
  
      // Update user's submission status
      await setDoc(userDocRef, { hasSubmitted: true }, { merge: true });
  
      // Show success alert
      alert('Details successfully submitted!');
  
      // Sign out the user
      await signOut(auth);
      router.push('/login'); // Change to your desired route
  
    } catch (error) {
      console.error('Error saving details:', error);
  
      // Check if the student document exists
      const studentDoc = await getDoc(studentDocRef);
      
      // If no entry is found with the enrollment number
      if (!studentDoc.exists()) {
        alert('No entry found with your enrollment number. Please try again.'); // Redirect to Google Auth
        router.push('/login'); // Change to your Google Auth route
      } else {
        alert('Error saving details. Please try again.'); // Show error alert
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Signup Form</h2>
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
        <select
          className={styles.select}
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
          className={styles.select}
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
        <button className={styles.button} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignupForm;