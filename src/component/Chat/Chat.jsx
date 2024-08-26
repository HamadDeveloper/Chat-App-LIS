import React, { useEffect } from 'react'
import { user } from '../Join/Join'
import socketIO from "socket.io-client"
import "./chat.css"
import sendLogo from "../images/send.png"
import Message from "../Message/Message"
import ReactScrollToBottom from "react-scroll-to-bottom"
import closeIcon from "../images/closeIcon.png"

let socket;
const ENDPOINT = 'http://localhost:4500/'

const Chat = () => {
  const [id, setid] = useState("")
  const [message, setMessage] = useState([])
  const send=()=>{
    const message = document.getElementById('chatInput').value;
    socket.emit('message',{message,id});
    document.getElementById('chatInput').value = ""
  }

  useEffect(() => {
    const socket = socketIO(ENDPOINT, { transports: ['websocket'] });



    socket.on('connect', () => {
      alert('connected')
      setid(socket.id)
    })
    socket.emit('joined', { user })

    socket.on('Welcome', ({ data }) => {
      setMessage([...message,data]);
      console.log(data.user, data.message);

      socket.on('userJoined', (data) => {
        setMessage([...message,data]);
        console.log(data.user, data.message)
      })
      socket.on('leave', (data) => {
        setMessage([...message,data]);
        console.log(data.user, data.message)
      })
    })

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [])


  useEffect(() => {
    socket.on('sendMessage', (data) => {
      setMessage([...message, data]);
      console.log(data.user,data.message,data.id);
    })
    return () => {
      socket.off();
    }
  }, [messages])
  

  return (
    <div className='chatPage'>
      <div className='chatContainer'>
        <div className="header">
          <h2>Chat App</h2>
          <img src={closeIcon} alt='close' />
        </div>
        <ReactScrollToBottom className="chatBox">
          {message.map((item,i)=> <Message user = {item.id === id?'':item.user} message={item.message} classs={item.id === id?'right':'left'}/>)}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input type="text" id="chatInput" />
          <button onClick={send} className='sendBtn'><img src={sendLogo} alt="send logo" /></button>
        </div>

      </div>
    </div>
  )
}

export default Chat
