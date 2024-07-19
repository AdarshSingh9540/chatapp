import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js'
import contactRoutes from './routes/ContactRoute.js';
import setupSocket from './socket.js';
import http from 'http';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8787;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use("/uploads/profile", express.static("uploads/profile"));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth/', authRoutes)
app.use("/api/contacts", contactRoutes)

const server = http.createServer(app);

setupSocket(server);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(databaseURL).then(() => {
    console.log("Database connection successful!");
}).catch((err) => {
    console.log(err);
});