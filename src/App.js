import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Create from './pages/Create';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Explore from './pages/Explore';
import Reels from './pages/Reels';
import Notifications from './pages/Notifications';
import MetaAI from './pages/MetaAI';
import Threads from './pages/Threads';
import More from './pages/More';
function App() {
  return (
    <div>
      <Router>
        <Routes>
     <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/Signup" element={<Signup />} />
         <Route path="/Search" element={<Search />} />
          <Route path="/create" element={<Create />} />
          <Route path ="/profile"element={<Profile />} />
          <Route path = "/messages" element={<Messages />} />
          <Route path = "/explore" element={<Explore />} />
          <Route path = "/reels" element={<Reels/>} />
          <Route path = "/notifications" element={<Notifications/>} />
          <Route path = "/meta-ai" element={<MetaAI/>} />
          <Route path = "/threads" element={<Threads/>} />
          <Route path = "/more" element={<More/>} />
          
        </Routes>
      </Router>
    </div>
  )
}

export default App
