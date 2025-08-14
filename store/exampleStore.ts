import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { exampleStorage } from "./mmkv";

export interface IExampleStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}
// store/exampleStore.ts

const useExampleStore = create<IExampleStore>()(
  persist(
    (set, get) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: "example-storage",
      storage: createJSONStorage(() => exampleStorage),
    }
  )
);

export default useExampleStore;
export type ExampleStore = ReturnType<typeof useExampleStore>;
