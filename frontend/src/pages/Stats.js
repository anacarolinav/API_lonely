import React from 'react';
import './style.css';

const App = () => {
  return (
    <div className="container">
      <div className="button">
        <span>Médias por peso</span>
      </div>
      <div className="button">
        <span>Médias por centro</span>
      </div>
      <div className="button">
        <span>Barras por médico</span>
      </div>
      <div className="button">
        <span>Circular</span>
      </div>
    </div>
  );
};

export default App;
