export const createChatSlice = (set,get,api) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],
    setSelectedChatType: (selectedChatType: any) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData: any) => set({ selectedChatData }),
    setSelectedChatMessages: (selectedChatMessages: any) => set({ selectedChatMessages }),
    closeChat: () => set({ selectedChatData: undefined, selectedChatType: undefined, selectedChatMessages: [] })
});
