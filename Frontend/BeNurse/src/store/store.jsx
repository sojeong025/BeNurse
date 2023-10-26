import { create } from "zustand";

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

const useLoginStore = create((set) => ({
  isLogin: false,
  Login: () => set((state) => ({ isLogin: true })),
  Logout: () => set((state) => ({ isLogin: false })),
}));
