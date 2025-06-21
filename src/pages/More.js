// More.js
import React, { useEffect, useState } from 'react';
import './More.css';
import {
  FiSettings,
  FiActivity,
  FiBookmark,
  FiMoon,
  FiMessageSquare,
  FiUser,
  FiLogOut
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function More({ onClose }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Sync dark mode to body class and localStorage
useEffect(() => {
  // Ensure class update after current render cycle
  setTimeout(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    console.log('Updated body class:', document.body.className);
  }, 0);

  localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
}, [darkMode]);


  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="more-popup-container" onClick={onClose}>
      <div className="more-popup fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="popup-item"><FiSettings /> Settings</div>
        <div className="popup-item"><FiActivity /> Your Activity</div>
        <div className="popup-item"><FiBookmark /> Saved</div>

        {/* Appearance toggle */}
        <div className="popup-item switch-appearance">
          <FiMoon />
           <span>{darkMode ? '🌙 Dark Mode' : '🌞 Light Mode'}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(prev => !prev)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="popup-item"><FiMessageSquare /> Report a problem</div>
        <hr />
        <div className="popup-item"><FiUser /> Switch accounts</div>
        <div className="popup-item logout" onClick={handleLogout}>
          <FiLogOut /> Log out
        </div>
      </div>
    </div>
  );
}

export default More;
