const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const Message = require('./models/Message.js'); 
const chatRoutes = require('./routes/chatRoutes.js'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', chatRoutes);

app.get('/', (req, res) => {
    res.send("Chat Server is Running smoothly!");
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('sendMessage', async (data) => {
        try {
            const { sender, text } = data;

            if (!sender || !text) {
                return console.error('Invalid message format received');
            }

            const newMessage = new Message({ sender, text });
            await newMessage.save();

            console.log(`📝 Message saved to DB from [${sender}]: ${text}`);

            io.emit('receiveMessage', newMessage);

        } catch (error) {
            console.error('Failed to handle and save socket message:', error.message);
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});