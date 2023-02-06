import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../../features/auth/authSlice';
import LoadingBar from '../../components/LoadingBar/index.js';

const Login = () => {
  // For setting focus on first input field
  const userRef = useRef();

  // For re-routing / redux dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Scrolls to top and sets focus on username field
  useEffect(() => {
    // window.scrollTo(0, 0);
    userRef.current.focus();
  }, []);

  // Clear error message when input changes
  useEffect(() => {
    setErrorMessage('');
  }, [username, password]);

  // Redux auth state
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  // Runs whenever redux auth state changes
  useEffect(() => {
    if (isError)
      setErrorMessage(message);

    // Redirect the user to dashboard once registered
    if (isSuccess || user)
      navigate('/');

    // Reset auth state
    // dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // Attempt login
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
          { errorMessage && <span className="error-message">{ errorMessage }</span> }
          <button id="auth-submit" form="login-form" disabled={(username && password) ? false : true}>Submit</button>
          <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
        </form>
        { isLoading && <LoadingBar /> }
      </div>
    </main>
  )
}

export default Login;