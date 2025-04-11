import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from './Home.module.css'; // Import CSS module
import Login from './Login';  // Import Login component
import Register from './Register';  // Import Register component
import { useNavigate } from 'react-router-dom';

// Component About đơn giản hóa cho trang Home
const SimpleAbout = () => {
  const { currentUser } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [authType, setAuthType] = useState('login'); // 'login' hoặc 'register'

  const openPopup = (type) => {
    setAuthType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.simpleAbout}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1>Hiểu Về Bệnh Parkinson</h1>
          <p className={styles.lead}>Công cụ hỗ trợ phát hiện và theo dõi sớm các dấu hiệu bệnh Parkinson</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.card}>
            <h2>Bệnh Parkinson là gì?</h2>
            <p>Bệnh Parkinson là một rối loạn thần kinh thoái hóa tiến triển, ảnh hưởng đến hệ thống vận động của cơ thể. Bệnh phát triển do sự suy giảm tế bào thần kinh trong một vùng não gọi là chất đen (substantia nigra), dẫn đến giảm sản xuất dopamine - một chất dẫn truyền thần kinh quan trọng.</p>
            
            <div className={styles.infoBox}>
              <p><strong>Số liệu thống kê:</strong> Bệnh Parkinson ảnh hưởng đến hơn 10 triệu người trên toàn cầu. Tại Việt Nam, ước tính có khoảng 100.000 người mắc bệnh này.</p>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Dấu hiệu chính</h2>
            <div className={styles.symptomsGrid}>
              <div className={styles.symptomItem}>
                <h3>Run rẩy (Tremor)</h3>
                <p>Thường bắt đầu ở một tay hoặc ngón tay và xảy ra khi nghỉ ngơi.</p>
              </div>
              
              <div className={styles.symptomItem}>
                <h3>Cứng cơ (Rigidity)</h3>
                <p>Cứng cơ ở tay, chân và thân người, gây khó khăn khi cử động.</p>
              </div>
              
              <div className={styles.symptomItem}>
                <h3>Chậm vận động</h3>
                <p>Giảm tốc độ cử động và khó bắt đầu các động tác.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.ctaSection}>
        <Link to="/about" className={styles.btnPrimary}>Tìm hiểu thêm</Link>
        {currentUser ? (
          <Link to="/dashboard" className={styles.btnSecondary}>Dự đoán ngay</Link>
        ) : (
          <button onClick={() => openPopup('login')} className={styles.btnSecondary}>Dự đoán ngay</button>
        )}
      </div>
    </div>
  );
};



function Home() {
  const { currentUser, logout } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();  
  const [authType, setAuthType] = useState('login'); // 'login' hoặc 'register'
  const handleLogout = () => { logout(); navigate('/home'); };
  const openPopup = (type) => {
    setAuthType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.homeContainer}>
      {/* Header với nút đăng nhập/đăng ký */}
      <header className={styles.homeHeader}>
        <h1>Parkinson's Disease Prediction</h1>
        <div className={styles.authButtons}>
          {!currentUser ? (
            <>
              <button onClick={() => openPopup('login')} className={styles.btnPrimary}>Đăng nhập</button>
              <button onClick={() => openPopup('register')} className={styles.btnSecondary}>Đăng ký</button>
            </>
          ) : (
            <div className={styles.profileContainer}>
              <button className={styles.logoutButton} onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
      </header>

      {/* Nội dung chính - phiên bản đơn giản của About */}
      <main className={styles.homeContent}>
        <SimpleAbout />
      </main>

      <footer className={styles.homeFooter}>
        <p>&copy; Nguyen Van Minh</p>
      </footer>

        {/* Hiển thị popup Login hoặc Register */}
        {showPopup && (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
            <button className={styles.modalCloseBtn} onClick={closePopup}>
                &times;
            </button>
            {authType === 'login' ? (
                <Login onClose={closePopup} />
            ) : (
                <Register onClose={closePopup} />
            )}
            </div>
        </div>
        )}
    </div>
  );
}

export default Home;