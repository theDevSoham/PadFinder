import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { spaceXStorage } from "./mmkv";
import { Launch } from "@/types/LaunchServiceTypes";

export interface ISpaceXStore {
  isFirstTime: "first_time" | "not_first" | "individual";
  toggleFirstTime: (current: "first_time" | "not_first" | "individual") => void;

  favourites: Launch[];
  addFavourite: (launch: Launch) => void;
  removeFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
}
// store/exampleStore.ts

const useSpaceXStorage = create<ISpaceXStore>()(
  persist(
    (set, get) => ({
      isFirstTime: "first_time",
      toggleFirstTime: (current) => set((state) => ({ isFirstTime: current })),
      favourites: [],
      addFavourite: (launch) =>
        set((state) => {
          if (state.favourites.find((l) => l.id === launch.id)) return state;
          return { favourites: [...state.favourites, launch] };
        }),
      removeFavourite: (id) =>
        set((state) => ({
          favourites: state.favourites.filter((l) => l.id !== id),
        })),
      isFavourite: (id) => {
        return get().favourites.some((l) => l.id === id);
      },
    }),
    {
      name: "space-x-storage",
      storage: createJSONStorage(() => spaceXStorage),
    }
  )
);

export default useSpaceXStorage;
export type SpaceXStore = ReturnType<typeof useSpaceXStorage>;
