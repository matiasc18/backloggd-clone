import React, { useState, useEffect, useRef } from 'react';
import { USER_REGEX, PASS_REGEX, EMAIL_REGEX } from '../api/utils';
import '../styles/signupPage.css';
import axios from '../api/axios';

const SignupPage = () => {
  // For setting focus on first input field
  const userRef = useRef();
  // For screen reader error messages
  const errRef = useRef();

  // Form input states + validation states + input focus status states
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

  // Error message
  const [message, setMessage] = useState('');

  // Sets focus on the username field at page startup
  useEffect(() => {
    userRef.current.focus();
  }, []);

  //* Input validation
  // Validate username
  useEffect(() => {
    setvalidUsername(USER_REGEX.test(username));
  }, [username]);

  // Validate password + confirmPassword
  useEffect(() => {
    setvalidPassword(PASS_REGEX.test(password));
    setValidConfirm(password === confirmPassword);
  }, [password, confirmPassword]);

  // Validate email
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  // Clear error message when user edits input
  useEffect(() => {
    setMessage('');
  }, [username, email, password, confirmPassword]);
  //* Input validation end

  // Submit form when submit button hit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Invalid username
    if (!validUsername) {
      setMessage(`Invalid username`);
      return;
    }
    // Invalid email
    if (!validEmail) {
      setMessage('Invalid email');
      return;
    }
    // Invalid password
    if (!validPassword) {
      setMessage('Invalid password');
      return;
    }
    // Passwords do not match
    if (!validConfirm) {
      setMessage('Passwords do not match');
      return;
    }

    const user = { username, email, password };

    try {
      const response = await axios.request({
        method: 'post',
        url: '/users/register',
        data: user
      });

      setMessage('User successfully registered');
      console.log(response.data);

    } catch(err) {
        // Username / email already in use
        if (err.response.status === 409)
          setMessage(err.response.data.error);
        else 
          setMessage('Registration failed');
        // errRef.current.focus();
    }
  };

  return (
    <section id="auth-page">
      <div id="form-container">
        <h1 id="auth-title">Register</h1>
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
          { message && <span ref={ errRef } id="error-message" aria-live="assertive">{ message }</span> }
          {/* Disable submit button until all fields are filled */}
          <button id="auth-submit" form="auth-form" disabled={(username && email && password && confirmPassword) ? false : true}>Submit</button>
          {/* <span>Already have an account? <a href="/login">Log In</a></span> */}
        </form>
      </div>
    </section>
  )
};

export default SignupPage;