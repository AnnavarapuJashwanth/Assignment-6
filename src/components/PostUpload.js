import React, { useState } from 'react';
import axios from 'axios';
import './PostUpload.css';

const PostUpload = ({ userId, username }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const handlePost = async () => {
    if (!image || !caption) {
      alert("Please fill in both caption and image.");
      return;
    }

    console.log("Uploading post with:", { userId, caption, image });

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('caption', caption);
    formData.append('image', image); // This must match multer field name

    try {
      const res = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log("✅ Upload successful:", res.data);
      alert("Post uploaded successfully!");
      setCaption('');
      setImage(null);
    } catch (err) {
      console.error("❌ Upload error:", err.response?.data || err.message);
      alert("Failed to upload post. Please check the console for details.");
    }
  };

  return (
    <div className="post-upload">
      <h2>Create a Post</h2>
      <input
        type="text"
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          style={{ width: '200px', marginTop: '10px', borderRadius: '8px' }}
        />
      )}
      <button onClick={handlePost}>Upload</button>
    </div>
  );
};

export default PostUpload;
