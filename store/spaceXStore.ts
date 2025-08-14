import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { spaceXStorage } from "./mmkv";

export interface ISpaceXStore {
  isFirstTime: boolean;
  toggleFirstTime: () => void;
}
// store/exampleStore.ts

const useSpaceXStorage = create<ISpaceXStore>()(
  persist(
    (set, get) => ({
      isFirstTime: true,
      toggleFirstTime: () =>
        set((state) => ({ isFirstTime: !state.isFirstTime })),
    }),
    {
      name: "space-x-storage",
      storage: createJSONStorage(() => spaceXStorage),
    }
  )
);

export default useSpaceXStorage;
export type SpaceXStore = ReturnType<typeof useSpaceXStorage>;
