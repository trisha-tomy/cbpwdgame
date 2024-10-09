'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../utils/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import styles from '../app/page.module.css';
import PasswordBox from '../components/PasswordBox';
import RuleBox from '../components/RuleBox';
import ruleList, { sort_rules } from '../rules/rules';
import "../app/globals.css"

export default function Home() {
  const [pswd, setPswd] = useState('');
  const [ruleState, setRuleState] = useState([]);
  const max_unlocked_rules = useRef(0);
  const pswdBoxRef = useRef(null);
  const [aaParent, aaEnableAnimations] = useAutoAnimate();
  const [allSolved, setAllSolved] = useState(false);

  const router = useRouter(); // Initialize useRouter for redirection


  useEffect(() => {
    // Disable right-click
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });

    // Disable F12 and Ctrl+Shift+I
    document.addEventListener('keydown', (event) => {
      if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
        event.preventDefault();
      }
    });

    // Monitor console access
    let devtoolsOpen = false;
    const element = new window.Image(); // Use the native Image constructor
    Object.defineProperty(element, 'id', {
      get: function () {
        devtoolsOpen = true;
      }
    });

    setInterval(() => {
      devtoolsOpen = false;
      console.log(element);
      if (devtoolsOpen) {
        alert('Please do not inspect the page.');
      }
    }, 1000);

    return () => {
      // Clean up event listeners
      document.removeEventListener('contextmenu', (event) => {
        event.preventDefault();
      });
      document.removeEventListener('keydown', (event) => {
        if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
          event.preventDefault();
        }
      });
    };
  }, []);


  // Initialization of rule numbers
  useEffect(() => {
    for (let i = 0; i < ruleList.length; i++) {
      ruleList[i].num = i + 1;
    }
    max_unlocked_rules.current = 0;
    setRuleState(ruleList);
  }, []);

  // Callback on textbox change, check rules along with setPswd
  function setPswdAndCheckRules(txt) {
    setPswd(txt);
    checkRules(txt);
  }

  // Check rules loop
  function checkRules(txt) {
    if (ruleState.length === 0) return;

    let rules = [...ruleState];

    // Base case, first rule
    if (!rules[0].unlocked && txt.length > 0) {
      rules[0].unlocked = true;
      max_unlocked_rules.current++;
    }

    let solved_count = 0;
    for (let i = 0; i < rules.length; i++) {
      if (i === max_unlocked_rules.current) {
        if (solved_count === max_unlocked_rules.current) {
          rules[i].unlocked = true;
          max_unlocked_rules.current++;
        } else {
          break;
        }
      }

      rules[i].correct = rules[i].check(txt);
      if (rules[i].correct) {
        solved_count++;
      }
    }

    setRuleState(rules);
    if (solved_count === rules.length) {
      setAllSolved(true);
      handleGameCompletion();
    } else {
      setAllSolved(false);
    }
  }

  async function handleGameCompletion() {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { gameCompleted: true }, { merge: true });
      
      // Delay redirect by 1.5 seconds after the message is shown
      setTimeout(() => {
        router.push('/Congratulations');
      }, 1500);
    } else {
      alert('You are not logged in.');
      router.push('https://cb-genesis.vercel.app/');
      console.error('User not authenticated');
    }
  }

  function shakePasswordBox(boolean) {
    if (boolean) {
      pswdBoxRef.current.classList.add('shake');
    } else {
      pswdBoxRef.current.classList.remove('shake');
    }
  }

  function regenerateRule(num) {
    console.log('regenerate', num);
    num--; // Change to rule index
    let rules = [...ruleState];
    if ('regenerate' in rules[num]) {
      rules[num].regenerate();
      setRuleState(rules);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <Image src="/cb_icon_biscuit.svg" width={60} height={110} alt="" />
          <div className={styles.title_text}>CELESTIAL BISCUIT</div>
        </div>

        <PasswordBox pswd={pswd} setPswd={setPswdAndCheckRules} ref={pswdBoxRef} />
        <div style={{ color: 'white' }}>Level: {max_unlocked_rules.current}</div>
        <div ref={aaParent}>
          {allSolved && (
            <RuleBox
              heading={'Congratulations!'}
              msg={'You have successfully created a password. 🎉🎉'}
              correct={true}
            />
          )}
          {ruleState
            .filter((r) => r.unlocked)
            .sort(sort_rules)
            .map((r) => {
              return (
                <RuleBox
                  key={r.num}
                  heading={`Rule ${r.num}`}
                  msg={r.msg}
                  correct={r.correct}
                  renderItem={r.renderItem}
                  propsToChild={{
                    pswd,
                    setPswd: setPswdAndCheckRules,
                    shakePasswordBox,
                    regenerateRule,
                    correct: r.correct,
                  }}
                />
              );
            })}
        </div>
      </div>
      <footer className={styles.footer}>
        CELESTIAL BISCUIT IGDTUW ⓒ 2024
        <br />
        This site is inspired by&nbsp;
        <a href="https://neal.fun/password-game/" target="_blank">
          The Password Game
        </a>
        &nbsp; and &nbsp;
        <a href="https://quirkylock.netlify.app/" target="_blank">
          QuirkyLock
        </a>
        <br />
      </footer>
    </>
  );
}