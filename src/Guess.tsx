import React from 'react';

const Guess = () => (
    <div id="main-controls" className="controls">
    <input list="tags" autoComplete="off" placeholder="Guess the title" />
    <datalist id="tags"></datalist>
  </div>
);

export default Guess;