import jwt from 'jsonwebtoken';
import User from '../db/User.js'
import { compare } from 'bcrypt';
import { rename } from 'fs';
import {renameSync,unlinkSync} from "fs"
const maxAge = 3*24*60*60*1000;

const createToken = (email,userId) =>{
    return jwt.sign({email,userId},process.env.JWT_KEY,{expiresIn:maxAge});
}
export const signup = async(request, response ,next) =>{
    try{
          const {email,password} = request.body;
          if(!email || !password){
            return response.status(400).send("Email and password required");
          }
          const user = await User.create({email,password});
          response.cookie("jwt",createToken(email,user.id),{
            maxAge,
            secure:true,
            samesite:"None",
          });
          return response.status(201).json({user:{
            id:user.id,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            image:user.image,
            profileSetup:user.profileSetup,

          }})
    }catch(error){
            console.log({error});
            return response.status(400).send("Internam server error")
    }
}

export const login = async(request, response ,next) =>{
  try{
        const {email,password} = request.body;
        if(!email || !password){
          return response.status(400).send("Email and password required");
        }
        const user = await User.findOne({email});
        if(!user){
          return response.status(404).send("user is not found")
        }
        const auth = await compare(password,user.password);
        if(!auth){
          return response.status(404).send("password is incorrect")
        }
        response.cookie("jwt",createToken(email,user.id),{
          maxAge,
          secure:true,
          samesite:"None",
        });
        return response.status(200).json(
          {
        user:{
          id:user.id,
          email:user.email,
          firstName:user.firstName,
          lastName:user.lastName,
          image:user.image,
          profileSetup:user.profileSetup,
          firstName:user.firstName,
          lastName:user.lastName,
          image:user.image,
          color:user.color,

        }})
  }catch(error){
          console.log({error});
          return response.status(400).send("Internam server error")
  }
}

export const getUserInfo = async (request, response, next) => {
  try {

    const userData = await User.findById(request.userId);
    if(!userData){
      return response.status(404).send("User is not found");
    }
     return response.status(200).json(
          {
       
          id:userData.id,
          email:userData.email,
          firstName:userData.firstName,
          lastName:userData.lastName,
          image:userData.image,
          profileSetup:userData.profileSetup,
          firstName:userData.firstName,
          lastName:userData.lastName,
          image:userData.image,
          color:userData.color,

        })
    console.log(request.userId);
    // Implement the logic to fetch user info based on request.userId
    const user = await User.findById(request.userId);
    if (!user) {
      return response.status(404).send("User not found");
    }

    return response.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        profileSetup: user.profileSetup,
        color: user.color,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal server error");
  }
};

export const updateProile = async (request, response, next) => {
  try {
    const {userId}=request;
    const {firstName, lastName ,color} =request.body;
    if(!firstName || !lastName || !color){
      return response.status(400).send("FirstName  LastNAme Colore is required");

    }
       const userData = await User.findByIdAndUpdate(
        userId,
        {
        firstName,lastName,color,profileSetup:true,
       },{new:true,runValidators:true})
   
     return response.status(200).json(
          {
       
          id:userData.id,
          email:userData.email,
          firstName:userData.firstName,
          lastName:userData.lastName,
          image:userData.image,
          profileSetup:userData.profileSetup,
          firstName:userData.firstName,
          lastName:userData.lastName,
          image:userData.image,
          color:userData.color,
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal server error");
  }
};

export const addProfileImage = async (request, response, next) => {
  try {
    console.log("Request file:", request.file);
    console.log("Request body:", request.body);

    if (!request.file) {
      return response.status(400).send("File is required");
    }

    if (!request.file.path) {
      return response.status(400).send("File path is missing");
    }

    const date = Date.now();
    let fileName = "uploads/profiles/" + date + request.file.originalname;
    
    console.log("Old path:", request.file.path);
    console.log("New path:", fileName);

    renameSync(request.file.path, fileName);

    const updateUser = await User.findByIdAndUpdate(
      request.userId,
      {
        image: fileName,
      },
      { new: true, runValidators: true }
    );   
    return response.status(200).json({
      image: updateUser.image,
    });
  } catch (error) {
    console.error("Error in addProfileImage:", error);
    return response.status(500).json({ error: error.message });
  }
};



export const removeProfileImage = async (request, response, next) => {
  try {
    const {userId}=request;
    const {firstName, lastName ,color} =request.body;
    if(!firstName || !lastName || !color){
      return response.status(400).send("FirstName  LastNAme Colore is required");

    }
       const userData = await User.findByIdAndUpdate(
        userId,
        {
        firstName,lastName,color,profileSetup:true,
       },{new:true,runValidators:true})
   
     return response.status(200).json(
          {
       
          id:userData.id,
          email:userData.email,
          firstName:userData.firstName,
          lastName:userData.lastName,
          image:userData.image,
          profileSetup:userData.profileSetup,
          firstName:userData.firstName,
          lastName:userData.lastName,
          image:userData.image,
          color:userData.color,
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal server error");
  }
};