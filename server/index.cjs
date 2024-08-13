import { socket } from 'socket.io-client';

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

    socket.on('joined', ({ user }) => {
        users[socket.id]=user;
        console.log(`${user} has joined`)
    })

    socket.emit('Welcome',{user:"Admin",message:`Welcome to the chat`})
    socket.broadcast.emit('userJoined',{user:"Admin",message:`User has joined`})
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
