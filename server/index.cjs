import { socket } from 'socket.io-client';
import { user } from '../src/component/Join/Join';

const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const port = 4500 || process.env.PORT;

const users = [{}];


app.use(cors());
app.get("/", (req, res) => {
    res.send("hell its working")
})

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", () => {
    console.log("New Connection")
})
    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        console.log(`${user} has joined`)
        socket.broadcast.emit('userJoined', { user: "Admin", message: ` ${users[socket.id]}User has joined` })
        socket.emit('Welcome', { user: "Admin", message: ` Welcome to the chat ${users[socket.id]}` })

        socket.on('message',({message,id})=>{
            io.emit('sendMessage',{user:users[id],message,id});
        })

    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]} has left`});
    console.log("user let")

});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
