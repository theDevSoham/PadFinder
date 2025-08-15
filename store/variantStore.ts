import { create } from "zustand";

type VariantType =
  | keyof typeof import("@/constants/Colors").default.light.scheme_colors
  | "default";

interface VariantState {
  currentVariant?: VariantType;
  setVariant: (variant?: VariantType) => void;
}

export const useVariantStore = create<VariantState>((set) => ({
  currentVariant: undefined,
  setVariant: (variant) => set({ currentVariant: variant }),
}));
