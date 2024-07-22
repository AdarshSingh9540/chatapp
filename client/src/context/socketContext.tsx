import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { HOST } from "../utils/constant";
import { useAppStore } from "../store";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socket = useRef(null);
    const { userInfo,  addMessage } = useAppStore();

    useEffect(() => {
        if (userInfo) {
            console.log("Attempting to connect to server at:", HOST);
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id },
                transports: ['websocket', 'polling']
            });

            socket.current.on("connect", () => {
                console.log("Connected to server");
            });

            // socket.current.on("connect_error", (error) => {
            //     console.error("Connection error:", error.message);
            // });

            // socket.current.on("disconnect", () => {
            //     console.log("Disconnected from server");
            // });

            socket.current.on("recieveMessage", (message) => {
                console.log("Received message:", message);
                addMessage(message)
                
               
            });

         const handleRecieveMessages= (message) =>{
            const {selectedChatData,selectedChatType} = useAppStore.getState();

            if(selectedChatType!==undefined && (selectedChatData._id === message.sender._id || selectedChatData._id===message.recipient._id))
                {
                    console.log("rec",message)
                addMessage(message)
            }
         }

            return () => {
                socket.current.disconnect();
                // if (socket.current) {
                //     console.log("Disconnecting from server");
                //     socket.current.disconnect();
                // }
            };
        }
    }, [userInfo]);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
};
