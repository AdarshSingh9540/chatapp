import { useEffect, useRef } from "react";
import { useAppStore } from "../../../../../../store";
import moment from "moment";
import { apiClient } from "../../../../../../lib/api-client";
import { GET_ALL_MESSAGES_ROUTE } from "../../../../../../utils/constant";

interface Message {
  timeStamp: string;
  sender: { _id: string; email: string; color: number; firstName: string; lastName: string; };
  recipient: { _id: string; email: string; color: number; firstName: string; lastName: string; };
  messageType: string;
  content: string;
}

function ChatContainer() {
  const { selectedChatType, selectedChatData, selectedChatMessages, setSelectedChatMessages } = useAppStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(GET_ALL_MESSAGES_ROUTE, {
          id: selectedChatData._id
        }, { withCredentials: true });

        console.log("API Response:", response);

        if (response.data && Array.isArray(response.data.messages)) {
          setSelectedChatMessages(response.data.messages);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    if (selectedChatData?._id && selectedChatType === "contact") {
      getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    console.log("Selected Chat Messages:", selectedChatMessages);
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const renderMessage = (): JSX.Element[] => {
    let lastDate: string | null = null;

    if (!Array.isArray(selectedChatMessages)) {
      console.error("selectedChatMessages is not an array:", selectedChatMessages);
      return [];
    }

    console.log("Rendering messages:", selectedChatMessages);

    return selectedChatMessages.map((message: Message, index: number) => {
      const messageDate = moment(message.timeStamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timeStamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDmMessage(message)}
        </div>
      );
    });
  };

  const renderDmMessage = (message: Message): JSX.Element => (
    <div
      className={`${message.sender._id === selectedChatData._id ? "text-left" : "text-right"}`}>
      {message.messageType === "text" && (
        <div
          className={`${message.sender._id !== selectedChatData._id ? "bg-white text-black" : "bg-white text-black"} border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}
      <div className="text-xs text-gray-600">{moment(message.timeStamp).format("LT")}</div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[64vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessage()}
      <div ref={scrollRef} />
    </div>
  );
}

export default ChatContainer;
