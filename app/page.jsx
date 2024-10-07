// app/page.jsx
import StorylineClient from './StorylineClient.jsx';
import styles from './Storyline.module.css';

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.storyContent}>
        <h1 className={styles.title}>GENESIS</h1>
        <p className={styles.paragraph}>
          Celestial Biscuit contains ancient and rare knowledge—only accessible by those worthy of the club&apos;s secrets. 
          The Guardians have set complex password puzzles to protect this knowledge. You&apos;ve been chosen to face the trials and crack the password, 
          gaining access to the wisdom of the celestial founders, the key to being in the top 1%.
        </p>
        <p className={styles.paragraph}>
          Are you ready to unlock the secrets?
        </p>
        <StorylineClient />
      </div>
    </div>
  );
}