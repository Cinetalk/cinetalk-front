import { create } from "zustand";

interface ScrollStore {
  hasScrolledPast: boolean;
  setHasScrolledPast: (status: boolean) => void;
}

const useScrollStore = create<ScrollStore>((set) => ({
  hasScrolledPast: false,
  setHasScrolledPast: (status) => set(() => ({ hasScrolledPast: status })),
}));

export default useScrollStore;
