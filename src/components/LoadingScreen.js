import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#0F1014] flex items-center justify-center">
      <div className="text-4xl font-bold text-white relative">
        WBRH
        <span className="absolute text-6xl font-light animate-pulse">+</span>
      </div>
    </div>
  );
};

export default LoadingScreen;