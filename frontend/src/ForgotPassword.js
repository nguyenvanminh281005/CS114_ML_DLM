import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Vui lòng nhập email của bạn');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Đây là nơi bạn sẽ gọi API đặt lại mật khẩu của bạn
      // Ví dụ: await api.sendPasswordResetEmail(email);
      
      // Giả lập một API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.');
      setEmail('');
    } catch (error) {
      console.error(error);
      setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <div className={styles.forgotPasswordCard}>
        <h2 className={styles.title}>Quên mật khẩu</h2>
        <p className={styles.instruction}>Nhập email của bạn để nhận link đặt lại mật khẩu</p>
        
        {message && <div className={styles.successMessage}>{message}</div>}
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className={styles.formInput}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton} 
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Gửi yêu cầu đặt lại mật khẩu'}
          </button>
        </form>
        
        <div className={styles.links}>
          <Link to="/login" className={styles.backLink}>Quay lại đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;