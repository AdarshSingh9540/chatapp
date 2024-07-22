import {Router} from "express"
import {verifyToken} from "../middleware/AuthMiddleware.js"
import { getMessages } from "../controllers/MessagesController";

const messagesRoute = Router();

messagesRoute.post("/get-messages", verifyToken, getMessages);
export default messagesRoute;