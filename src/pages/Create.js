// Create.js
import React from 'react';
import Sidenav from '../components/sidenav';
import PostUpload from '../components/PostUpload';
import './Create.css';

const Create = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const username = user?.username;

  return (
    <div className="create-layout">
      <Sidenav />
      <div className="create-content">
        <PostUpload userId={userId} username={username} />
      </div>
    </div>
  );
};

export default Create;
