import React from 'react';
import '../styles/signupPage.css';

const SignupPage = () => {
  return (
    <div id="signup-page">
      <div id="form-container">
        <h1 id="signup-title">Register</h1>
        <form id="signup-form" autoComplete="off">
          <div className="input-group">
            <input id="username" className="signup-input" type="" placeholder="Username" required/>
            <label htmlFor="username" className="signup-label">Username</label>
          </div>
          <div className="input-group">
            <input id="email" className="signup-input" type="email" placeholder="Email" autoComplete="on" required/>
            <label htmlFor="email" className="signup-label">Email</label>
          </div>
          <div className="input-group">
            <input id="password" className="signup-input" type="password" placeholder="Password" required/>
            <label htmlFor="password" className="signup-label">Password</label>
          </div>
          <div className="input-group">
            <input id="confirmPassword" className="signup-input" type="password" placeholder="Confirm Password" required/>
            <label htmlFor="confirmPassword" className="signup-label">Confirm Password</label>
          </div>
          <button id="signup-submit" type="submit" form="signup-form">Submit</button>
          <span>Already have an account? <a href="/login">Log In</a></span>
        </form>
      </div>
    </div>
  )
}

export default SignupPage;