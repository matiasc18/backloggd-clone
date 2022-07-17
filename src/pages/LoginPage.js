import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/signupPage.css';
import axios from '../api/axios';

const Login = () => {
  // For setting focus on first input field
  const userRef = useRef();
  // For screen reader error messages
  const errRef = useRef();

  // Form input states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Error message
  const [message, setMessage] = useState('');

  // Sets focus on the username field at page startup
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Clear error message when user edits username/password
  useEffect(() => {
    setMessage('');
  }, [username, password]);

  // Submit form when submit button hit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { username, password };

    try {
      // Axios request + set message to successful login message
      const response = await axios.request({
        method: 'post',
        url: '/users/login',
        data: user
        // withCredentials: true
      });

      setMessage(response?.data?.message);
      console.log(response);

      // Get accessToken from response
      const accessToken = response?.data?.accessToken;

    } catch(err) {
        if (!err?.response?.data)
          setMessage('No server response');
        // Username / Password incorrect
        else if (err?.response?.data?.message)
          setMessage(err.response.data.message);
        else
          setMessage('Login failed');
        // errRef.current.focus();
      }
  };

  return (
    <div id="auth-page">
      <div id="form-container">
        <h1 id="auth-title">Login</h1>
        <form id="auth-form" autoComplete="off" onSubmit={ handleSubmit }>
          <div className="input-group">
            <input 
              type="text" 
              id="username" 
              ref={ userRef }
              className="auth-input" 
              placeholder="Username" 
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username" className="auth-label">Username</label>
          </div>
          <div className="input-group">
            <input 
              type="password" 
              id="password"
              className="auth-input" 
              placeholder="Password" 
              required 
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className="auth-label">Password</label>
          </div>
          {/* If theres an error message, display it */}
          { message && <span ref={ errRef } id="error-message" aria-live="assertive">{ message }</span> }
          <button id="auth-submit" form="auth-form" disabled={(username && password) ? false : true}>Submit</button>
          <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login;