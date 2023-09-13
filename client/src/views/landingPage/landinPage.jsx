import React from 'react';
import styles from './landing.module.css';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {getAllGames} from '../../redux/action/action'
function LandingPage() {
  const allgames=useSelector((state)=>state.allgames)
  const dispatch = useDispatch();
  const handleclicktoHome=()=>{
    dispatch(getAllGames(allgames))
  }
  return (
    <div className={styles.fondito}>
      <div className={styles.container}>
        <h2 className={styles.h2}>Welcome !! to Gaming website</h2>
        <Link to="/home">
          <button className={styles.btn} onClick={handleclicktoHome}>Let's Play</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
