import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import { useAppStore } from "../../../../../../store";
import { useSocket } from "../../../../../../context/socketContext";

function MessageBar() {
    const emojiRef = useRef();
    const socket = useSocket();
    const [emojiPicker, setEmojiPicker] = useState(false);
    const [message, setMessage] = useState("");
    const { selectedChatType, selectedChatData, userInfo } = useAppStore();

    useEffect(() => {
        function handleClickOutside(e) {
            if (emojiRef.current && !emojiRef.current.contains(e.target)) {
                setEmojiPicker(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [emojiRef]);

    const handleEmoji = (emoji) => {
        setMessage((msg) => msg + emoji.emoji);
    };

    const handleSendMessage = () => {
        if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
                sender: userInfo.id,
                content: message,
                recipient: selectedChatData._id,
                messageType: "text",
                fileURL:undefined
            });
        }
        // Clear the message after sending
        setMessage("");
    };

    return (
        <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-5 gap-6 ">
            <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    className="flex-1 p-5 bg-transparent focus:border-none focus:outline-none"
                    placeholder="Enter Message"
                />
                <button
                    className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
                >
                    <GrAttachment className="text-2xl" />
                </button>
                <div className="relative">
                    <button
                        onClick={() => {
                            setEmojiPicker(true);
                        }}
                        className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
                    >
                        <RiEmojiStickerLine className="text-2xl" />
                    </button>
                    <div className="absolute bottom-16 right-0 " ref={emojiRef}>
                        <EmojiPicker
                            theme="dark"
                            open={emojiPicker}
                            onEmojiClick={handleEmoji}
                            autoFocusSearch={false}
                        />
                    </div>
                </div>
            </div>
            <button
                onClick={handleSendMessage}
                className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all bg-[#8417ff] hover:bg-[#741bda] rounded-md flex justify-center items-center p-5 "
            >
                <IoSend className="text-2xl" />
            </button>
        </div>
    );
}

export default MessageBar;