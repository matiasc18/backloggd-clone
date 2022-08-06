import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import LoadingBar from '../components/LoadingBar';
// import loginStyles from '../styles/authPage.module.css';

const Login = () => {
  // Form input states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Error message
  const [errorMessage, setErrorMessage] = useState('');

  // For setting focus on first input field
  const userRef = useRef();

  // For handling auth / re-routing
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Sets focus on the username field at page startup
  useEffect(() => {
    window.scrollTo(0, 0);
    userRef.current.focus();
  }, []);

  // Clear error message when user edits username/password
  useEffect(() => {
    // setErrorMessage('');
  }, [username, password]);

  // Redux auth state (with user from server response)
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  // Runs whenever redux auth state changes
  useEffect(() => {
    // Sets error message equal to error message from server response
    if (isError) {
      setErrorMessage(message);
    }

    // Redirect the user to the dashboard once registered
    if (isSuccess || user) {
      navigate('/');
    }

    // Reset auth state
    dispatch(reset);
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // Submit form when submit button hit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, password };
    dispatch(login(userData));
  };

  return (
    <main id="auth-page">
      <div id="form-container">
        <h1 id="auth-title">Login</h1>
        <form id="login-form" className="auth-form" autoComplete="off" onSubmit={ handleSubmit }>
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
          { errorMessage !== '' && <span id="error-message">{ errorMessage }</span> }
          <button id="auth-submit" form="login-form" disabled={(username && password) ? false : true}>Submit</button>
          <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
        </form>
        { isLoading && <LoadingBar /> }
      </div>
    </main>
  )
}

export default Login;