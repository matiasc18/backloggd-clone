import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import LoadingBar from '../components/LoadingBar';
import loginStyles from '../styles/authPage.module.css';

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
    userRef.current.focus();
  }, []);

  // Clear error message when user edits username/password
  useEffect(() => {
    setErrorMessage('');
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
    <section id={loginStyles["auth-page"]}>
      <div id={loginStyles["form-container"]}>
        <h1 id={loginStyles["auth-title"]}>Login</h1>
        <form id="login-form" className={loginStyles["auth-form"]} autoComplete="off" onSubmit={ handleSubmit }>
          <div className={loginStyles["input-group"]}>
            <input 
              type="text" 
              id="username" 
              ref={ userRef }
              className={loginStyles["auth-input"]} 
              placeholder="Username" 
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username" className={loginStyles["auth-label"]}>Username</label>
          </div>
          <div className={loginStyles["input-group"]}>
            <input 
              type="password" 
              id="password"
              className={loginStyles["auth-input"]}
              placeholder="Password" 
              required 
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className={loginStyles["auth-label"]}>Password</label>
          </div>
          {/* If theres an error message, display it */}
          { errorMessage && <span id={loginStyles["error-message"]}>{ errorMessage }</span> }
          <button id={loginStyles["auth-submit"]} form="login-form" disabled={(username && password) ? false : true}>Submit</button>
          <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
        </form>
        { isLoading && <LoadingBar /> }
      </div>
    </section>
  )
}

export default Login;