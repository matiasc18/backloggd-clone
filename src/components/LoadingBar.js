import React from 'react';
import '../styles/loadingBar.css';

const LoadingBar = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loaderBar"></div>
      </div>
    </div>
  )
}

export default LoadingBar;