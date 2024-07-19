import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";
import { types } from "util";

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,

    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:false,
    },
    messageType:{
        type:String,
        enum:["text","file"],
        required:true,
    },
    content:{
        type:String,
        required:function(){
            return this.messageType === "text";
        },
    },
    timeStamp:{
        type:Date,
        default:Date.now,
    }

})

const Message = mongoose.model("Message",messageSchema);

export default {
    Message
}

