// ScoreDisplay.js

import React from 'react';
import './ScoreCard.css';

var remarks = "";

const ScoreCard = ({ score }) => {
  if (score > 200) {
    remarks = "Excellent Job!";
  } else if (score > 150) {
    remarks = "Good Job!";
  } else if (score > 75) {
    remarks = "Decent Job!"
  } else {
    remarks = "Poor Job!";
  }
  return (
    <div className="score-container">
      <p className='player-score'>{remarks}</p>
      <p className="player-score">Your Score: {score} Pts.</p>
    </div>
  );
};

export default ScoreCard;