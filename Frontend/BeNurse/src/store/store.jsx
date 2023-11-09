import { create } from "zustand";
import moment from "moment";

export const useLoginStore = create((set) => ({
  isLogin: false,
  Login: () => set((state) => ({ isLogin: true })),
  Logout: () => set((state) => ({ isLogin: false })),
}));

export const useDateStore = create((set) => ({
  selectedDate: moment(),
  setSelectedDate: (date) => {
    set((state) => ({ selectedDate: date }));
  },
}));

export const usePatientStore = create((set) => ({
  selectedPatient: {},
  setSelectedPatient: (patient) => {
    set((state) => ({ selectedPatient: patient }));
  },
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
  selectedID: null,
  setSelectedID: (id) => {
    set((state) => ({
      selectedID: id,
    }));
  },

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

export const useModalStore = create((set) => ({
  isModal: false,
  OpenModal: (category) => {
    set((state) => ({
      isModal: category,
    }));
  },
  CloseModal: () => {
    set((state) => ({
      isModal: false,
    }));
  },
}));

export const useAdminStore = create((set) => ({
  schedule: null,
  setSchedule: (newSchedule) => {
    set(() => ({
      schedule: newSchedule,
    }));
  },
  selectedDate: null,
  setSelectedDate: (date) => {
    set(() => ({
      selectedDate: date,
    }));
  },
}));

export const useOffDateStore = create((set) => ({
  selectedDates: [],
  setSelectedDates: (updateFunction) => {
    set((state) => ({ selectedDates: updateFunction(state.selectedDates) }));
  },
}));

export const useWardStore = create((set) => ({
  wardId: null,
  setWardId: (id) => {
    set(() => ({
      wardId: id,
    }));
  },
}));

export const useHandoverSetStore = create((set) => ({
  handoverSetId: null,
  setHandoverSetId: (id) => set({ handoverSetId: id }),
}));

export const useInviteStore = create((set) => ({
  isComplete: false,
  setIsComplete: (state) => {
    set(() => ({
      isComplete: state,
    }));
  },
}));
