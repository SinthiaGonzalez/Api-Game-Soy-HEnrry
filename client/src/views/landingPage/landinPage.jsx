import React from 'react';
import styles from './landing.module.css';
import { Link } from 'react-router-dom';
function LandingPage() {
  return (
    <div className={styles.fondito}>
      <div className={styles.container}>
        <h2 className={styles.h2}>Welcome !! to Gaming website</h2>
        <Link to="/home">
          <button className={styles.btn}>Let's Play</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
