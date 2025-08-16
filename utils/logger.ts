// logger.ts
import { MMKV } from "react-native-mmkv";

interface LogEntry {
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
}

const MAX_LOGS = 500;
const storage = new MMKV({ id: "appLogs" });
let inMemoryLogs: LogEntry[] = [];

// Load persisted logs
const persisted = storage.getString("logs");
if (persisted) {
  try {
    inMemoryLogs = JSON.parse(persisted);
  } catch {}
}

// Persist logs helper
const persistLogs = () => storage.set("logs", JSON.stringify(inMemoryLogs));

// Save original console methods
const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

// Core logging function
export const log = (level: "info" | "warn" | "error", ...args: any[]) => {
  const message = args.map(String).join(" ");
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
  };

  // Add to in-memory logs
  inMemoryLogs.push(entry);

  // Rotate if needed
  if (inMemoryLogs.length > MAX_LOGS) {
    inMemoryLogs = inMemoryLogs.slice(inMemoryLogs.length - MAX_LOGS);
  }

  // Persist logs
  persistLogs();

  // Print to console using **original console methods** only
  if (level === "info") originalLog(message);
  else if (level === "warn") originalWarn(message);
  else originalError(message);
};

// Get and clear logs
export const getLogs = (): LogEntry[] => inMemoryLogs;
export const clearLogs = () => {
  inMemoryLogs = [];
  persistLogs();
};

// Safe console overrides
export const setupLogger = () => {
  console.log = (...args: any[]) => log("info", ...args);
  console.warn = (...args: any[]) => log("warn", ...args);
  console.error = (...args: any[]) => log("error", ...args);
};
