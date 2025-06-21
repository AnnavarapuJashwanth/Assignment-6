import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ Set the theme before React mounts — no hooks needed here
const savedMode = localStorage.getItem("darkMode") === "true";
if (savedMode) {
  document.body.classList.add('dark-mode');
} else {
  document.body.classList.remove('dark-mode');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
