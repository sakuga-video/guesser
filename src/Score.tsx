import React from 'react';

const Score = ({score, max_score}: {score: number, max_score: number}) => <p id="score" className="controls">Correct: {score}/{max_score}</p>

export default Score;