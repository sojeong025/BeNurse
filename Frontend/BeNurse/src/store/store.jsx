import { create } from "zustand";

export const useLoginStore = create((set) => ({
  isLogin: false,
  Login: () => set((state) => ({ isLogin: true })),
  Logout: () => set((state) => ({ isLogin: false })),
}));

export const useDeviceStore = create((set) => ({
  isListActivated: false,
  ActivateList: () => {
    set((state) => ({ isListActivated: true }));
  },
  DeactivateList: () => {
    set((state) => ({ isListActivated: false }));
  },
}));
