import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware/persist";

export const MMKVStorage = new MMKV({
  id: "example-storage",
  //   encryptionKey: "your-encryption-key-here",
});

export const MMKVSpaceXStorage = new MMKV({
  id: "space-x-storage",
  //   encryptionKey: "your-encryption-key-here",
});

export const exampleStorage: StateStorage = {
  setItem: (key, value) => {
    return MMKVStorage.set(key, value);
  },
  getItem: (key) => {
    const value = MMKVStorage.getString(key);
    return value ? value : null;
  },
  removeItem: async (key) => {
    return MMKVStorage.delete(key);
  },
};

export const spaceXStorage: StateStorage = {
  setItem: (key, value) => {
    return MMKVStorage.set(key, value);
  },
  getItem: (key) => {
    const value = MMKVStorage.getString(key);
    return value ? value : null;
  },
  removeItem: async (key) => {
    return MMKVStorage.delete(key);
  },
};
