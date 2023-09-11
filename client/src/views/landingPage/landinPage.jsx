import React from 'react';
import './landing.modules.css';
import { Link } from 'react-router-dom';
function LandingPage() {
  return (
    <div className='fondito'>
      <div className='container'>
        <h2 className='h2'>Welcome !! to Gaming website</h2>
        <Link to="/home">
          <button className='btn'>Let's Play</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
