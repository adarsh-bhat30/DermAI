import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState('signin'); // 'signin' or 'signup'

  // Signin form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup form state
  const [username, setUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Add your sign-in authentication logic here
    navigate('/');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // TODO: Add your signup logic here
    navigate('/');
  };

  return (
    <div className="login-container">
      {currentState === 'signin' ? (
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Sign In</h2>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

          <p className="signup-link">
            Don’t have an account?{' '}
            <span
              onClick={() => setCurrentState('signup')}
              style={{ cursor: 'pointer', color: '#3182ce' }}
            >
              Sign up
            </span>
          </p>
        </form>
      ) : (
        <form className="login-form" onSubmit={handleSignup}>
          <h2>Sign Up</h2>

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={signupEmail}
            required
            onChange={(e) => setSignupEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={signupPassword}
            required
            onChange={(e) => setSignupPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>

          <p className="signup-link">
            Already have an account?{' '}
            <span
              onClick={() => setCurrentState('signin')}
              style={{ cursor: 'pointer', color: '#3182ce' }}
            >
              Login
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;





