import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AppContext'; // Assuming you have an auth context

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineDoctors, setOnlineDoctors] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    if (!user || !token) return;

    // Initialize socket connection
    const newSocket = io('http://localhost:3000', {
      path: '/socket.io',
      auth: { token },
      withCredentials: true
    });

    setSocket(newSocket);

    // Socket event listeners
    newSocket.on('connect', () => {
      console.log('Connected to chat server');
    });

    newSocket.on('chat-history', (history) => {
      setMessages(history);
    });

    newSocket.on('new-message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('online-doctors', (doctors) => {
      setOnlineDoctors(doctors);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user, token]);

  const joinChat = (chatId) => {
    if (socket && chatId) {
      socket.emit('join-chat', { chatId });
      setActiveChat(chatId);
    }
  };

  const sendMessage = (content) => {
    if (socket && activeChat && content.trim()) {
      socket.emit('send-message', { 
        chatId: activeChat, 
        content 
      });
    }
  };

  return (
    <ChatContext.Provider value={{ 
      socket, 
      activeChat, 
      messages, 
      onlineDoctors, 
      joinChat, 
      sendMessage, 
      setActiveChat 
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);