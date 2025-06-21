// 📁 src/pages/Login.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (location.state?.signupSuccess) {
      alert("Signup successful. Please login.");
    }
  }, [location.state]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log("📦 Backend login response:", data);

      if (res.ok && data.user?._id) {
        // ✅ Store only user object
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("isLoggedIn", "true");

        navigate("/"); // Go to profile
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img
          src="https://i0.wp.com/technode.com/wp-content/uploads/2025/05/Screenshot-2025-05-09-at-5.16.29%E2%80%AFPM.png?fit=1344,1046&ssl=1"
          alt="preview1"
        />
      </div>

      <div className="login-right">
        <div className="login-box">
          <h1 className="logo-text">Instagram</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Log in</button>

          <div className="separator"><span>OR</span></div>

          <p className="signup-text">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
