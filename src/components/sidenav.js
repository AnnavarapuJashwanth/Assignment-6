// src/components/Sidenav.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sidenav.css';
import More from '../pages/More';
// Import the popup
import {
  FaHome, FaSearch, FaCompass, FaVideo,
  FaPaperPlane, FaHeart, FaPlus, FaUser,
  FaCircle, FaLink, FaBars
} from 'react-icons/fa';

const Sidenav = ({ onCreateClick }) => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false); // State to toggle popup

  return (
    <div className="sidenav">
      <h1 className="logo">Instagram</h1>
      <ul className="nav-links">
        <li onClick={() => navigate('/')}><FaHome /> <span>Home</span></li>
        <li onClick={() => navigate('/search')}><FaSearch /> <span>Search</span></li>
        <li onClick={() => navigate('/explore')}><FaCompass /> <span>Explore</span></li>
        <li onClick={() => navigate('/reels')}><FaVideo /> <span>Reels</span></li>
        <li onClick={() => navigate('/messages')}><FaPaperPlane /> <span>Messages</span></li>
        <li onClick={() => navigate('/notifications')}><FaHeart /> <span>Notifications</span></li>

        <li onClick={() => navigate("/create")} style={{ cursor: 'pointer' }}>
          <FaPlus /> <span>Create</span>
        </li>

        <li onClick={() => navigate('/profile')}><FaUser /> <span>Profile</span></li>
      </ul>
      <ul className="bottom-links">
        <li onClick={() => navigate('/meta-ai')}><FaCircle /> <span>MetaAI</span></li>
        <li onClick={() => navigate('/threads')}><FaLink /> <span>Threads</span></li>
        <li onClick={() => setShowMore(true)}><FaBars /> <span>More</span></li>
      </ul>

      {showMore && <More onClose={() => setShowMore(false)} />} {/* Popup here */}
    </div>
  );
};

export default Sidenav;
