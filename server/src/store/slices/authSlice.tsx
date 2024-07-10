export const createAuthSlice = (set: any) => ({
    userInfo: undefined as any,
    setUserInfo: (userInfo: any) => set({ userInfo }),
});
