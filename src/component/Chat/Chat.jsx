import React, { useEffect } from 'react'
import {user} from '../Join/Join'
import socketIO from "socket.io-client"
import "./chat.css"
import sendLogo from "../images/send.png"


const ENDPOINT = 'http://localhost:4500/'

const Chat = () => {

  const socket = socketIO(ENDPOINT,{transports:['websocket']});

   

useEffect(() => {
  socket.on('connect',()=>{
    alert('connected')
   })
   socket.emit('joined',{ user })

   socket.on('Welcome',({data})=>{
    console.log(data.user,data.message);

    socket.on('userJoined',(data)=>{
      console.log(data.user,data.message)
    })

   })

  return () => {
    
  }
}, [socket])


  return (
    <div className='chatPage'>
      <div className='chatContainer'>
        <div className="header"></div>
          <div className="chatBox"></div>
          <div className="inputBox">
            <input type="text"  id="chatInput" />
            <button className='sendBtn'><img src={sendLogo} alt="send logo" /></button>
          </div>
        
      </div>
    </div>
  )
}

export default Chat
