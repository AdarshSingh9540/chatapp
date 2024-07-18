import { create } from 'zustand';
import { createAuthSlice } from './slices/authSlice';
import { AppState } from '../types';
import { createChatSlice } from './slices/chatSlice';

export const useAppStore = create<AppState>((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));