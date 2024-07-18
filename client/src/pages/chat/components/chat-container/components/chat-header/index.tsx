
import {RiCloseFill} from "react-icons/ri"
import { useAppStore } from "../../../../../../store"
import { Avatar } from "../../../../../../components/ui/avatar";
function ChatHeader() {
  const {closeChat,selectedChatData, selectedChatType} = useAppStore();
  return (
    <div className="h-[10vh]  border-b-2  border-[#2f303b] flex  items-center justify-center">
        <div className="flex gap-5 items-center w-full justify-between mx-2 md:mx-4 lg:mx-6">
            <div className="flex gap-3 items-center justify-center ">
            <div className="w-12 h-12 relative mr-1">
                                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                        {
                                            <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center rounded-full justify-center ${selectedChatData?.color}`}>
                                                {selectedChatData?.firstName ? selectedChatData?.firstName?.charAt(0) : selectedChatData?.email.charAt(0)}
                                            </div>
                                        }
                                    </Avatar>
                                </div>

                                <div>
                                  {selectedChatType ==="contact" &&
                                  selectedChatData.firstName ?`${selectedChatData?.firstName}` + " "+`${selectedChatData?.lastName}`:selectedChatData.email }
                                </div>
            </div>
            <div className="flex items-center justify-center gap-5">
                <button 
                onClick={closeChat}
                className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all ">
                   <RiCloseFill className="text-3xl" />
                </button>
            </div>
        </div>
    </div>
  )
}

export default ChatHeader