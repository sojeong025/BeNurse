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

export const useBottomSheetStore = create((set) => ({
  isEditActivated: false,
  updateLink: "",
  deleteLink: "",
  ActivateEdit: (updateLink, deleteLink) => {
    set((state) => ({
      isEditActivated: true,
      updateLink: updateLink,
      deleteLink: deleteLink,
    }));
  },
  DeactivateEdit: () => {
    set((state) => ({
      isEditActivated: false,
      updateLink: "",
      deleteLink: "",
    }));
  },
}));
