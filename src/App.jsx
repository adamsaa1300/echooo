import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Load from localStorage or use default values
  const loadFromStorage = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  };

  const [textNotifications, setTextNotifications] = useState(loadFromStorage('textNotifications', true));
  const [emailNotifications, setEmailNotifications] = useState(loadFromStorage('emailNotifications', true));
  const [messageNotifications, setMessageNotifications] = useState(loadFromStorage('messageNotifications', true));
  const [darkMode, setDarkMode] = useState(loadFromStorage('darkMode', false));
  const [blockSilentNotifications, setBlockSilentNotifications] = useState(loadFromStorage('blockSilentNotifications', true));
  const [blockSilentCalls, setBlockSilentCalls] = useState(loadFromStorage('blockSilentCalls', true));

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Save to localStorage whenever a setting changes
  useEffect(() => {
    localStorage.setItem('textNotifications', JSON.stringify(textNotifications));
  }, [textNotifications]);

  useEffect(() => {
    localStorage.setItem('emailNotifications', JSON.stringify(emailNotifications));
  }, [emailNotifications]);

  useEffect(() => {
    localStorage.setItem('messageNotifications', JSON.stringify(messageNotifications));
  }, [messageNotifications]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('blockSilentNotifications', JSON.stringify(blockSilentNotifications));
  }, [blockSilentNotifications]);

  useEffect(() => {
    localStorage.setItem('blockSilentCalls', JSON.stringify(blockSilentCalls));
  }, [blockSilentCalls]);

  const handleChangePassword = () => {
    if (newPassword && newPassword === confirmPassword) {
      alert('Password changed successfully!');
      // هنا ممكن تحفظ في localStorage لو عايز (لكن كلمة السر الحقيقية ما بتنحفظش كده أبدًا في التطبيقات الحقيقية)
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      alert('New passwords do not match!');
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Header */}
      <div className="settings-header">
        <button className="back-button">←</button>
        <h1>Settings</h1>
      </div>

      <div className="settings-content">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-avatar">
            <div className="avatar-circle"></div>
          </div>
          <div className="profile-info">
            <h2>Ahmed123</h2>
            <p>ahmed123@example.com</p>
          </div>
        </div>

        {/* Notifications */}
        <div className="section">
          <h3 className="section-title">Notifications</h3>
          <div className="toggle-item">
            <span>App Notifications</span>
            <label className="switch">
              <input type="checkbox" checked={textNotifications} onChange={() => setTextNotifications(!textNotifications)} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="toggle-item">
            <span>Email Notifications</span>
            <label className="switch">
              <input type="checkbox" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="toggle-item">
            <span>Message Notifications</span>
            <label className="switch">
              <input type="checkbox" checked={messageNotifications} onChange={() => setMessageNotifications(!messageNotifications)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Appearance */}
        <div className="section">
          <h3 className="section-title">Appearance</h3>
          <div className="toggle-item">
            <span>Dark Mode</span>
            <label className="switch">
              <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        

        {/* Change Password */}
        <div className="section">
          <h3 className="section-title">Change Password</h3>
          <div className="password-form">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleChangePassword}>Change Password</button>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="section">
          <h3 className="section-title">Privacy & Security</h3>
          <div className="toggle-item">
            <span>Private Account</span>
            <label className="switch">
              <input type="checkbox" checked={blockSilentNotifications} onChange={() => setBlockSilentNotifications(!blockSilentNotifications)} />
              <span className="slider"></span>
            </label>
          </div>
         
        

        </div>

        
      </div>
    </div>
  );
}

export default App;