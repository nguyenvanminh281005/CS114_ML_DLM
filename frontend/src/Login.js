import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from './Auth.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    if (!email || !password) {
        setErrorMsg('Please fill in all fields.');
        setIsLoading(false);
        return;
    }

    try {
        console.log("🔍 Gửi request đăng nhập...");
        // Thay đổi: Sử dụng hàm login từ AuthContext
        const userData = await login(email, password);
        console.log("📌 Đăng nhập thành công:", userData);
        
        // Chuyển hướng đến dashboard sau khi đăng nhập thành công
        navigate('/dashboard');
    } catch (err) {
        console.error("❌ Lỗi đăng nhập:", err);
        setErrorMsg(err.message || error || 'Login failed. Please try again.');
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