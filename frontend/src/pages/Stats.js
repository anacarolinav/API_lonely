import React from 'react';
import "../style.css";
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="container">
      <Link to="/stats1" className="button">
        <span>Médias da proveniencia</span>
      </Link>
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
