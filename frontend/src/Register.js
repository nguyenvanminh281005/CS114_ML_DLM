import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from './Auth.module.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, mockRegister, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
  
    try {
      // Validate form fields
      if (!name || !email || !password || !confirmPassword) {
        setErrorMsg('Thiếu thông tin đăng ký');
        setIsLoading(false);
        return;
      }
  
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setErrorMsg('Email không hợp lệ');
        setIsLoading(false);
        return;
      }
  
      if (password !== confirmPassword) {
        setErrorMsg('Mật khẩu không khớp');
        setIsLoading(false);
        return;
      }
  
      if (password.length < 6) {
        setErrorMsg('Mật khẩu phải có ít nhất 6 ký tự');
        setIsLoading(false);
        return;
      }
  
      console.log('Đang gửi request đăng ký...');
      
      // Sử dụng hàm register từ AuthContext thay vì tự gửi request
      const userData = await register(name, email, password);
      console.log('Đăng ký thành công:', userData);
  
      // Chuyển hướng đến trang dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Lỗi:', err);
      setErrorMsg(err.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h2>Create Account</h2>
          <p>Sign up for Parkinson's Prediction Tool</p>
        </div>

        {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className={styles.input}
            />
          </div>

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
              placeholder="Create a password"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className={styles.input}
            />
          </div>

          <button 
            type="submit" 
            className={styles.authButton}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>Already have an account? <Link to="/login">Log In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;