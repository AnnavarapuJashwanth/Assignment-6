import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !email || !password) {
      alert("Please enter all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful. Please log in.");
        navigate("/login", { state: { signupSuccess: true } });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        /><br />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br />
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}

export default Signup;
