import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AppContext';
import { createChat, getChatHistory } from '../api/chatApi';

const ChatPage = () => {
  const { user } = useAuth();
  const { 
    activeChat, 
    messages, 
    sendMessage, 
    joinChat, 
    onlineDoctors 
  } = useChat();
  const [messageInput, setMessageInput] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Start a new chat with a doctor
  const startChat = async (doctorId) => {
    try {
      const chat = await createChat(user._id, doctorId);
      setSelectedDoctor(doctorId);
      joinChat(chat._id);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      sendMessage(messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="doctor-list">
        <h3>Available Doctors</h3>
        <ul>
          {onlineDoctors.map(doctor => (
            <li 
              key={doctor._id} 
              className={selectedDoctor === doctor._id ? 'selected' : ''}
              onClick={() => startChat(doctor._id)}
            >
              <div className="doctor-info">
                <span className="name">{doctor.name}</span>
                <span className="specialization">{doctor.specialization}</span>
                <span className="status-dot online"></span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-area">
        {activeChat ? (
          <>
            <div className="messages">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`message ${msg.sender === user._id ? 'sent' : 'received'}`}
                >
                  <div className="message-content">{msg.content}</div>
                  <div className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="message-form">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
              />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Select a doctor to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;