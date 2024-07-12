import { create } from 'zustand';
import { createAuthSlice } from './slices/authSlice';
import { AppState } from '../types';

export const useAppStore = create<AppState>((...a) => ({
  ...createAuthSlice(...a),
}));