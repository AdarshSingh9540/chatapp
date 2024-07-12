// src/slices/authSlice.ts
import { StateCreator } from 'zustand';
import { AuthSlice, UserInfo } from '../../types';
export const createAuthSlice: StateCreator<AuthSlice> = (set, get, api) => ({
  userInfo: null,
  setUserInfo: (userInfo: UserInfo | null) => set({ userInfo }),
});
