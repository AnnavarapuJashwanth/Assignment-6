// 📁 src/pages/Profile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import SideNav from '../components/sidenav';
import './Profile.css';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("user"));
      return raw?.user || raw || null;
    } catch {
      return null;
    }
  });

  const [userDetails, setUserDetails] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const fetchUserDetails = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/profile/${userId}`);
      setUserDetails(res.data);
      setProfileImage(`http://localhost:5000${res.data.profileImage}`);
      localStorage.setItem("user", JSON.stringify(res.data)); // update localStorage
      setUser(res.data); // update user state
    } catch (err) {
      console.error("Failed to load user profile:", err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchUserDetails(user._id);
    }
  }, [user?._id]);

  useEffect(() => {
    if (user?._id) {
      axios.get(`http://localhost:5000/api/posts/user/${user._id}`)
        .then(res => {
          const myPosts = res.data.filter(p => p.userId?._id === user._id);
          setPosts(myPosts);
        })
        .catch(err => console.error("Error loading user posts:", err));
    }
  }, [user]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!user || !user._id) {
      alert("User not logged in");
      return;
    }

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      await axios.patch(
        `http://localhost:5000/api/profile/update-profile-image/${user._id}`,
        formData
      );

      setSelectedFile(null);
      fetchUserDetails(user._id); // refetch updated profile
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload profile image");
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideNav />

      <div className="profile-container" style={{ marginLeft: '220px', padding: '20px', flex: 1 }}>
        <div className="profile-header">
          <div className="profile-pic">
            <img
              src={profileImage || '/default-profile.png'}
              alt="profile"
            />
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <button onClick={handleUpload} className="upload-btn">Upload</button>
          </div>

          <div className="profile-info">
            <h2>{userDetails?.username || 'Unknown User'}</h2>
            <p>{userDetails?.email || 'No email'}</p>
            <div className="profile-stats">
              <span><strong>{posts.length}</strong> posts</span>
              <span><strong>0</strong> followers</span>
              <span><strong>0</strong> following</span>
            </div>
          </div>
        </div>

        <hr className="divider" />

        <div className="profile-posts">
          {posts.length === 0 ? (
            <p style={{ color: 'white', textAlign: 'center' }}>No posts yet.</p>
          ) : (
            posts.map(post => <Post key={post._id} post={post} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
