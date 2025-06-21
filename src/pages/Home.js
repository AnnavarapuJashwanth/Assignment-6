import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidenav from '../components/sidenav';
import Feed from '../components/Feed';
import RightSidebar from '../components/RightSidebar';
import PostUpload from '../components/PostUpload';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [showPostUpload, setShowPostUpload] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleCreateClick = () => {
     navigate("/create");
  };

  const handleCloseUpload = () => {
    setShowPostUpload(false);
  };

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  return (
    <div className="home">
      <button onClick={handleLogout}>Logout</button>

      <div className="layout">
        <Sidenav onCreateClick={handleCreateClick} />
        <div className="center">
          <Feed />
        </div>
        <div className="right">
          <RightSidebar />
        </div>
      </div>

      {showPostUpload && (
        <div className="post-upload-popup">
          <PostUpload userId={userId} username={username} />
          <button onClick={handleCloseUpload}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Home;
