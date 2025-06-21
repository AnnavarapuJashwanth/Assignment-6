import React, { useState, useEffect } from 'react';
import ChatMessage from '../components/ChatMessage';
import './MetaAi.css';

function MetaAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Load from localStorage or hardcode dummy ID
  const userId = JSON.parse(localStorage.getItem('user'))?._id || 'anonymous';

  // Fetch previous chat history from MongoDB
  useEffect(() => {
    fetch('http://localhost:5000/api/chat/history')
      .then(res => res.json())
      .then(data => {
        // Convert MongoDB format to expected format
        const formatted = data.map(chat => ([
          { sender: 'user', text: chat.user },
          { sender: 'bot', text: chat.bot }
        ])).flat();

        setMessages(formatted);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('http://localhost:5000/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, message: input }),
      });

      const data = await res.json();

      if (!data.reply) throw new Error('Invalid reply');

      setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
      setInput('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="meta-ai-container">
      <div className="chat-window">
        <div className="chat-header">Meta AI 🤖</div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <ChatMessage key={index} sender={msg.sender} text={msg.text} />
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default MetaAI;
