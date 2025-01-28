import React, { useState, useEffect } from 'react';
import '../styles/LoadingScreen.css';

const LoadingScreen = () => {
  const [showArc, setShowArc] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [startExit, setStartExit] = useState(false);

  useEffect(() => {
    // Show arc slightly after initial render
    setTimeout(() => setShowArc(true), 200);
    // Show plus sign after arc animation starts
    setTimeout(() => setShowPlus(true), 1000);
    // Begin exit animation
    setTimeout(() => setStartExit(true), 2200);
    // Clean up elements
    setTimeout(() => {
      setShowLogo(false);
      setShowArc(false);
      setShowPlus(false);
    }, 2700);
  }, []);

  return (
    <div className={`intro-container ${startExit ? 'fade-out' : ''}`}>
      <div className="animation-wrapper">
        <div className="logo-container">
          {showLogo && <h1 className="logo-text">WBRH</h1>}
        </div>
        {showArc && (
          <div className="arc-container">
            <div className="arc" />
          </div>
        )}
        {showPlus && (
          <div className="plus-container">
            <h1 className="plus-text">+</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;