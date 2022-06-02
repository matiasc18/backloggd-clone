import React from 'react';
import '../styles/landingPage.css';

const LandingPage = () => {
  return (
    <div className="container">
      <div className="title">Sign Up</div>
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">First Name</span>
            <input type="text" placeholder="Enter your first name" required/>
          </div>
          <div className="input-box">
            <span className="details">Last Name</span>
            <input type="text" placeholder="Enter your last name" required/>
          </div>
          <div className="input-box">
            <span className="details">Username</span>
            <input type="text" placeholder="Enter your username" required/>
          </div>
          <div className="input-box">
            <span className="details">Email</span>
            <input type="email" placeholder="Enter your email" required/>
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input type="password" placeholder="Enter your password" required/>
          </div>
          <div className="input-box">
            <span className="details">Confirm Password</span>
            <input type="password" placeholder="Confirm your password" required/>
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Sign Up!" />
        </div>
      </form>
    </div>
  )
}

export default LandingPage;

/* 

<div id="signup-page">
      <form id="signup-form">
        <div id="signup-title"><h2>Create Account</h2></div>
          <div id="username-input">
            <label for="username" className="form-label">Username</label>
            <input id="username" type="text" placeholder="Username"/>
          </div>
          <div id="name-input">
            <label for="first-name" className="form-label">First Name</label>
            <input id="first-name" type="text" placeholder="First Name"/>
            <label for="last-name" className="form-label">Last Name</label>
            <input id="last-name" type="text" placeholder="Last Name"/>
          </div>
          <div id="email-input">
            <label for="email" className="form-label">Email</label>
            <input id="email" type="email" placeholder="Email"/>
          </div>
          <div id="password-input">
            <label for="password" className="form-label">Password</label>
            <input id="password" type="password" placeholder="Password"/>
            <label for="confirm-password" className="form-label">Confirm Password</label>
            <input id="confirm-password" type="password" placeholder="Confirm Password"/>
          </div>
      </form>
    </div>

*/