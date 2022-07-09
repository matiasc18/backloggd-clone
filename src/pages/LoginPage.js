import React from 'react';
import '../styles/loginPage.css';

const Login = () => {
  return (
    <div id="login-page">
      <div id="form-container">
        <h1 id="login-title">Login</h1>
        <form id="login-form" autoComplete="off">
          <div className="input-group">
            <input id="username" className="login-input" type="" placeholder="Username" required/>
            <label htmlFor="username" className="login-label">Username</label>
          </div>
          <div className="input-group">
            <input id="password" className="login-input" type="password" placeholder="Password" required/>
            <label htmlFor="password" className="login-label">Password</label>
          </div>
          <button id="login-submit" type="submit" form="login-form">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login;