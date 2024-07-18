import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js'
import contactRoutes from './routes/ContactRoute.js';



dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))

app.use("/uploads/profile",express.static("uploads/profile"));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth/',authRoutes)
app.use("/api/contacts",contactRoutes)

app.listen(PORT,() =>{
    console.log(`port is running on ${PORT}`)
})

mongoose.connect(databaseURL).then(()=>{
    console.log("Database connect successflul!")
}).catch((err) =>{
    console.log(err)
})