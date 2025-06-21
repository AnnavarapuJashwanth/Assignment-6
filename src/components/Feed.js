import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => {
        console.log("📥 Posts fetched:", res.data); // Debug log
        setPosts(res.data);
      })
      .catch(err => {
        console.error("❌ Error fetching posts:", err);
      });
  }, []);

  return (
    <div className="feed">
      {posts.length === 0 ? (
        <p style={{ color: "white", textAlign: "center" }}>No posts yet.</p>
      ) : (
        posts.map(post => (
          <Post key={post._id} post={post} />
        ))
      )}
    </div>
  );
};

export default Feed;
