import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from './Auth.module.css';
import { login } from './service/auth'; // Đảm bảo bạn đã tạo hàm login này trong services

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    // Validate form
    if (!email || !password) {
      setErrorMsg('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      // Gọi API login từ backend Flask
      const response = await login(email, password);

      if (response.token) {
        // Nếu đăng nhập thành công, chuyển hướng đến trang dashboard
        alert("Login successful!");
        navigate('/dashboard');
      } else {
        // Nếu đăng nhập thất bại, hiển thị thông báo lỗi
        setErrorMsg(response.message || "Login failed!");
      }
    } catch (err) {
      setErrorMsg('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h2>Welcome Back</h2>
          <p>Log in to your Parkinson's Prediction account</p>
        </div>

        {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.forgotPassword}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button 
            type="submit" 
            className={styles.authButton}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;