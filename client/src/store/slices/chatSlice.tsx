import { StateCreator } from 'zustand';

interface Message {
  timestamp: string;
  sender: { _id: string; email: string; color: number; firstName: string; lastName: string; };
  recipient: { _id: string; email: string; color: number; firstName: string; lastName: string; };
  messageType: string;
  content: string;
}

interface ChatState {
  selectedChatType?: string;
  selectedChatData?: any;
  selectedChatMessages: Message[];
}

interface ChatActions {
  setSelectedChatType: (selectedChatType: string) => void;
  setSelectedChatData: (selectedChatData: any) => void;
  setSelectedChatMessages: (selectedChatMessages: Message[]) => void;
  closeChat: () => void;
  addMessage: (message: Message) => void;
}

export const createChatSlice: StateCreator<ChatState & ChatActions> = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],

  setSelectedChatType: (selectedChatType: string) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData: any) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages: Message[]) => set({ selectedChatMessages }),

  closeChat: () => set({ selectedChatData: undefined, selectedChatType: undefined, selectedChatMessages: [] }),


  addMessage: (message: Message) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;
  
    set({ selectedChatMessages: [
      ...selectedChatMessages,
      {
        ...message,
        recipient: selectedChatType === "channel" ? message.recipient : message.recipient._id,
        sender: selectedChatType === "channel" ? message.sender : message.sender._id,
      }
    ] });
  }
  
});
