import { useRef, useState } from "react"
import { GrAttachment } from "react-icons/gr"
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

function MessageBar() {
    const emojiRef = useRef();
    const [emojiPicker ,setEmojiPicker] = useState(false);
    const [message , setMessage] = useState("");

    const handleEmoji = (emoji) =>{
        setEmojiPicker((msg)=> msg+emoji.emoji);
    }

 
    const handleSendMessage = ()=>{

    }
  return (
    // <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw]  lg:w-[70vw] xl:w-[80vw] w-full  ">
      
    // </div>
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-5 gap-6 ">
        <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
            <input type="text"
            value={message}
            onChange={(e)=>{
                setMessage(e.target.value)
            }}
            className="flex-1 p-5 bg-transparent focus:border-none focus:outline-none " 
             placeholder="Enter Message "/>
             <button  
            //  onClick={}
             className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                <GrAttachment className="text-2xl"/>

             </button>
             <div className="relative">
             <button  
             onClick={
                () =>{
                    setEmojiPicker(true)
                }
             }
             className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                <RiEmojiStickerLine className="text-2xl"/>

             </button>

             <div className="absolute bottom-16 right-0 ">
                   {/* <EmojiPicker/> */}
             </div>

             </div>
        </div>
        <button 
        onClick={handleSendMessage}
        className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all bg-[#8417ff] hover:bg-[#741bda]  rounded-md flex justify-center items-center p-5 ">
                <IoSend className="text-2xl"/>
             </button>

    </div>
  )

}

export default MessageBar