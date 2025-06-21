import React, { useState, useEffect } from 'react';
import './Post.css';

const Post = ({ post }) => {
  console.log("Post data:", post); // ✅ Debug: Check if this logs multiple times unnecessarily

  const [profileImageSrc, setProfileImageSrc] = useState('http://localhost:5000/uploads/profiles/default-profile.png');

  useEffect(() => {
    if (post?.userId?.profileImage) {
      setProfileImageSrc(`http://localhost:5000${post.userId.profileImage}`);
    }
  }, [post]);

  return (
    <div className="post">
      <div className="post-header">
        <img
          className="profile-pic"
          src={profileImageSrc}
          alt="user"
          onError={(e) => {
            e.target.onerror = null;
            setProfileImageSrc('http://localhost:5000/uploads/profiles/default-profile.png');
          }}
        />
        <h4>{post.userId?.username || 'Unknown'}</h4>
      </div>

      <img
        src={`http://localhost:5000${post.imageUrl}`}
        alt="post"
        className="post-img"
      />

      <div className="post-info">
        <p>{post.caption}</p>
        <p className="timestamp">{new Date(post.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Post;
