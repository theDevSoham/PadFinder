// stores/useLoaderStore.ts
import { create } from "zustand";

type LoaderStore = {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

export const useLoaderStore = create<LoaderStore>((set) => ({
  isLoading: false,
  showLoader: () => set({ isLoading: true }),
  hideLoader: () => set({ isLoading: false }),
}));
