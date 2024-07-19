import { Server as SocketIoServer } from "socket.io";

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

    io.on("connection", (socket) => {
        console.log("New socket connection:", socket.id);
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with socket id: ${socket.id}`);
        } else {
            console.log("User id not provided");
        }

        socket.on("disconnect", () => disconnect(socket));
    });

    io.on("connect_error", (err) => {
        console.log("Socket connection error:", err.message);
    });
};

export default setupSocket;