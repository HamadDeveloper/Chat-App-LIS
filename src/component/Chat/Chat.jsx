import React, { useEffect, useState, useCallback } from 'react';
import socketIO from "socket.io-client";
import closeIcon from '../images/closeIcon.png';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import sendLogo from  '../images/send.png';

const ENDPOINT = 'http://localhost:5173/'; // Make sure this matches your WebSocket server port
let socket;

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ['websocket'] });
    setSocketConnected(true);

    socket.on('connect', () => {
      setId(socket.id);
    });

    socket.on('Welcome', ({ data }) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('userJoined', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('leave', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('sendMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.emit('customDisconnect');  // Ensure your server handles 'customDisconnect'
      socket.off();
    }
  }, []);

  const sendMessage = useCallback((message) => {
    if (message.trim()) {
      socket.emit('message', { message, id });
    }
  }, [id]);

  const send = () => {
    const message = document.getElementById('chatInput').value;
    sendMessage(message);
    document.getElementById('chatInput').value = "";
  };

  return (
    <div className='chatPage'>
      <div className='chatContainer'>
        <div className="header">
          <h2>Chat App</h2>
          <a href="/"> <img src={closeIcon} alt='close' /></a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => 
            <Message 
              key={i}
              user={item.id === id ? '' : item.user}
              message={item.message}
              classs={item.id === id ? 'right' : 'left'}
            />
          )}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input 
            onKeyDown={(event) => event.key === 'Enter' ? send() : null} 
            type="text" 
            id="chatInput" 
          />
          <button onClick={send} className='sendBtn'>
            <img src={sendLogo} alt="send logo" />
          </button>
        </div>
      </div>
    </div> 
  );
}

export default Chat;
