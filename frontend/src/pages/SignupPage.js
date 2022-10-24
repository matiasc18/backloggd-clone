import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { USER_REGEX, PASS_REGEX, EMAIL_REGEX } from '../api/utils';
import { register, reset } from '../features/auth/authSlice';
import LoadingBar from '../components/LoadingBar';

const SignupPage = () => {
  // For setting focus on first input field
  const userRef = useRef();
  
  // For re-routing / redux dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Input + validation + input focus states
  const [username, setUsername] = useState('');
  const [validUsername, setvalidUsername] = useState(false);
  const [usernameFocus, setusernameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setvalidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [validConfirm, setValidConfirm] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  // Scrolls to top and sets focus on username field
  useEffect(() => {
    // window.scrollTo(0, 0);
    userRef.current.focus();
  }, []);

  // Input validation
  useEffect(() => {
    setvalidUsername(USER_REGEX.test(username));
    setValidEmail(EMAIL_REGEX.test(email));
    setvalidPassword(PASS_REGEX.test(password));
    setValidConfirm(password === confirmPassword);
  }, [username, email, password, confirmPassword]);

  // Clear error message when input changes
  useEffect(() => {
    setErrorMessage('');
  }, [username, email, password, confirmPassword]);

  // Redux auth state
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  // Runs whenever redux auth state changes
  useEffect(() => {
    if (isError)
      setErrorMessage(message);

    // Redirect the user to dashboard once registered
    if (isSuccess || user) {
      navigate('/');
    }

    // Reset auth state
    // dispatch(reset);
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // Attempt signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = { username, email, password };

    // Check inputs
    if (!validUsername)
      setErrorMessage(`Invalid username`);
    else if (!validEmail)
      setErrorMessage('Invalid email');
    else if (!validPassword)
      setErrorMessage('Invalid password');
    else if (!validConfirm)
      setErrorMessage('Passwords do not match');
    else
      dispatch(register(userData));
  };

  return (
    <main id="auth-page">
      <div id="form-container">
        <h1 id="auth-title">Register</h1>
        <form id="signup-form" className="auth-form" autoComplete="off" onSubmit={ handleSubmit }>
          <div className="input-group">
            <input 
              type="text" 
              id="username"
              ref={ userRef }
              className="auth-input" 
              placeholder="Username" 
              required
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setusernameFocus(true)}
              onBlur={() => setusernameFocus(false)}
            />
            <label htmlFor="username" className="auth-label">Username</label>
            {/* Display username requirements until valid username typed */}
            { usernameFocus && !validUsername && 
              <ul className="input-instructions">
                <li>Must begin with a letter</li>
                <li>4 to 24 characters</li>
                <li>Letters, numbers, dashes, underscores</li>
              </ul> 
            }
          </div>
          <div className="input-group">
            <input 
              type="email" 
              id="email" 
              className="auth-input" 
              placeholder="Email" 
              autoComplete="on" 
              required 
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email" className="auth-label">Email</label>
          </div>
          <div className="input-group">
            <input 
              type="password" 
              id="password"
              className="auth-input" 
              placeholder="Password" 
              required 
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <label htmlFor="password" className="auth-label">Password</label>
            {/* Display password requirements until valid password typed */}
            { passwordFocus && !validPassword && 
              <ul className="input-instructions">
                <li>8 to 24 characters</li>
                <li>Must contain upper and lowercase letters</li>
                <li>Must contain at least one number</li>
                <li>Must contain at least one special character (!@#$%)</li>
              </ul> 
            }
          </div>
          <div className="input-group">
            <input 
              type="password" 
              id="confirmPassword" 
              className="auth-input"
              placeholder="Confirm Password" 
              required 
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword" className="auth-label">Confirm Password</label>
          </div>
          {/* If theres an error message, display it */}
          { errorMessage && <span className="error-message">{ errorMessage }</span> }
          {/* Disable submit button until all fields are filled */}
          <button id="auth-submit" form="signup-form" disabled={(username && email && password && confirmPassword) ? false : true}>Submit</button>
          <span>Already have an account? <Link to="/login">Log In</Link></span>
        </form>
        { isLoading && <LoadingBar /> }
      </div>
    </main>
  )
};

export default SignupPage;