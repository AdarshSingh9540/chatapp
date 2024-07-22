import { Server as SocketIoServer } from "socket.io";
import Message from "./db/Message.js";

const setupSocket = (server) => {
    console.log("Setting up Socket.IO server");
    const io = new SocketIoServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,
        },
        transports: ['websocket', 'polling']
    });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`Client disconnected: ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    };

    const sendMessage= async(message)=>{
        const senderSocketId =userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);

        const createdMessage = await Message.create(message);

        const messageData = await Message.findById(createdMessage._id)
        .populate("sender","id email firstName lastName color")
        .populate("recipient","id email firstName lastName color")
            

        if(recipientSocketId){
            io.to(recipientSocketId).emit("recieveMessage",messageData);
        }``

        if(senderSocketId){
            io.to(senderSocketId).emit("recieveMessage",messageData);
        }

        }

    io.on("connection", (socket) => {
        console.log("New socket connection:", socket.id);
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with socket id: ${socket.id}`);
        } else {
            console.log("User id not provided");
        }
        
        socket.on("sendMessage",sendMessage)
        socket.on("disconnect", () => disconnect(socket));
    });

    io.on("connect_error", (err) => {
        console.log("Socket connection error:", err.message);
    });
};

export default setupSocket;