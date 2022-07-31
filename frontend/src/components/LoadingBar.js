import React from 'react';
import loadingStyles from '../styles/loadingBar.module.css';

const LoadingBar = () => {
  return (
    <div className={loadingStyles["loader-container"]}>
      <div className={loadingStyles["loader"]}>
        <div className={loadingStyles["loader-bar"]}></div>
      </div>
    </div>
  )
}

export default LoadingBar;