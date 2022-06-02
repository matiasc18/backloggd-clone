import React from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import './index.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <LandingPage />
      </main>
    </div>
  );
}

export default App;
