import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SignupPage from './components/SignupPage';
import Games from './components/Games';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<SignupPage />} />
          <Route path='/games' element={<Games />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
