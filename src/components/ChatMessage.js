import React from 'react';
import './ChatMessage.css';

function ChatMessage({ sender, text }) {
  return (
    <div className={`chat-message ${sender === 'user' ? 'user' : 'bot'}`}>
      <div className="message-bubble">
        <span>{text}</span>
      </div>
    </div>
  );
}

export default ChatMessage;
