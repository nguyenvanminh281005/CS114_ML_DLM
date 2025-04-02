import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from './Profile.module.css';

function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoBack = () => navigate('/dashboard');
  const handleLogout = () => { logout(); navigate('/login'); };
  
  const handleEditToggle = () => {
    if (isEditing) saveChanges();
    else setIsEditing(true);
  };

  const saveChanges = () => {
    if (!name.trim()) {
      setErrorMessage('Name cannot be empty');
      return;
    }
    
    const updatedUser = { ...currentUser, name, email };
    localStorage.setItem('parkinsonsAppUser', JSON.stringify(updatedUser));
    
    setSuccessMessage('Profile updated successfully');
    setErrorMessage('');
    setIsEditing(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      localStorage.removeItem('parkinsonsAppUser');
      localStorage.removeItem(`predictionHistory_${currentUser.id}`);
      logout();
      navigate('/login');
    }
  };

  const cancelEdit = () => {
    setName(currentUser?.name || '');
    setEmail(currentUser?.email || '');
    setIsEditing(false);
    setErrorMessage('');
  };

  return (
    <div className={styles.profileContainer}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={handleGoBack}>← Back to Dashboard</button>
        <button className={styles.logoutButton} onClick={handleLogout}>Log Out</button>
      </header>

      <div className={styles.profileCard}>
        <h1>Your Profile</h1>
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

        <div className={styles.profileForm}>
          <div className={styles.formGroup}>
            <label>Name</label>
            {isEditing ? (
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
            ) : (
              <div className={styles.profileInfo}>{currentUser?.name}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            {isEditing ? (
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
            ) : (
              <div className={styles.profileInfo}>{currentUser?.email}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Member Since</label>
            <div className={styles.profileInfo}>{new Date(currentUser?.createdAt).toLocaleDateString()}</div>
          </div>
        </div>

        <div className={styles.profileActions}>
          {isEditing ? (
            <>
              <button className={styles.cancelButton} onClick={cancelEdit}>Cancel</button>
              <button className={styles.saveButton} onClick={handleEditToggle}>Save Changes</button>
            </>
          ) : (
            <button className={styles.editButton} onClick={handleEditToggle}>Edit Profile</button>
          )}
        </div>

        <div className={styles.dangerZone}>
          <h3>Danger Zone</h3>
          <button className={styles.deleteButton} onClick={handleDeleteAccount}>Delete Account</button>
          <p className={styles.warningText}>This will permanently delete your account and all associated data.</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;