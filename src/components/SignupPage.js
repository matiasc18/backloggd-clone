import React from 'react';
import '../styles/signupPage.css';

const SignupPage = () => {
  return (
    <main className="landing-page">
      <div id="signup-container">
        <h1 id="signup-title">Sign Up</h1>
        <hr />
        <form action="#" id="signup-form">
          {/* First Name and Last Name */}
          <div className="double-input">
            <div>
              <label for="first-name" className="form-label">First Name</label>
              <input className="signup-input" id="first-name" type="text"/>
            </div>
            <div>
              <label for="last-name" className="form-label">Last Name</label>
              <input className="signup-input" id="last-name" type="text"/>
            </div>
          </div>
          {/* Email */}
          <div>
            <label for="email" className="form-label">Email</label>
            <input className="signup-input" id="email" type="email"/>
          </div>
          {/* Password and Confirm Password */}
          <div>
            <label for="password" className="form-label">Password</label>
            <input className="signup-input" id="password" type="password"/>
          </div>
          <div>
            <label for="confirm-password" className="form-label">Confirm Password</label>
            <input className="signup-input" id="confirm-password" type="password"/>
          </div>
        </form>
        <button className="form-button" type="submit" form="signup-form" value="Submit">Submit</button>
      </div>
    </main>
  )
}

export default SignupPage;