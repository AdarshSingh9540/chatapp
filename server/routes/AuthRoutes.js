import { Router } from "express";
import { signup,login, getUserInfo,updateProile, addProfileImage, removeProfileImage, logOut } from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import multer from "multer"


const authRoutes  = Router();
const upload =multer({dest:"uploads/profiles/"})
authRoutes.post("/signup",signup);
authRoutes.post("/login",login);
authRoutes.get('/user-info',verifyToken,getUserInfo)
authRoutes.post('/update-profile',verifyToken,updateProile)
// authRoutes.post('/add-profile-image',verifyToken,addProfileImage)
authRoutes.post('/add-profile-image',verifyToken,upload.single("profile-image"),addProfileImage);
authRoutes.delete('/remove-profile-image',verifyToken,removeProfileImage)
authRoutes.post("/logout",logOut)

export default authRoutes;