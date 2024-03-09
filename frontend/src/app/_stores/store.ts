import { create } from "zustand";

interface GlobalState {
  courseListErrors: boolean;
  setCourseListErrors: (val: boolean) => void;
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  courseListErrors: true,
  setCourseListErrors: (val: boolean) => set({ courseListErrors: val })
}));
