import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// * Potential icons
// * FaAngleDown (Down, Left, Up, Right)
// * FaAngleDoubleUp (Down, Left, Up, Right)
// * FaBars
// * FaChevronRight (Down, Left, Up, Right)
// * FaEllipsisH (H, V)
// * FaPowerOff
// * FaSlidersH
// * FaSortDown (Down, Up)