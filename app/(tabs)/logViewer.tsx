// LogViewer.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { getLogs, clearLogs } from "@/utils/logger";

interface LogEntry {
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
}

const levelColors: Record<LogEntry["level"], string> = {
  info: "#4caf50", // green
  warn: "#ff9800", // orange
  error: "#f44336", // red
};

// Memoized component for each log item
const LogItem = React.memo(({ item }: { item: LogEntry }) => (
  <View style={styles.logItem}>
    <Text style={styles.timestamp}>
      {new Date(item.timestamp).toLocaleTimeString()}
    </Text>
    <Text style={[styles.level, { color: levelColors[item.level] }]}>
      {item.level.toUpperCase()}
    </Text>
    <Text style={styles.message}>{item.message}</Text>
  </View>
));

const LogViewer: React.FC = () => {
  const [logs, setLogs] = React.useState<LogEntry[]>(getLogs());

  const refreshLogs = () => setLogs(getLogs());

  const handleClear = () => {
    clearLogs();
    refreshLogs();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>App Logs</Text>
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[...logs].reverse()} // newest first
        keyExtractor={(item) => item.timestamp} // unique key
        renderItem={({ item }) => <LogItem item={item} />}
        contentContainerStyle={styles.listContent}
        initialNumToRender={20} // render first 20 items
        maxToRenderPerBatch={20} // batch size
        windowSize={10} // items kept in memory
        removeClippedSubviews={true} // unmount items outside viewport
      />
    </SafeAreaView>
  );
};

export default LogViewer;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1e1e1e" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#333",
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  clearButton: { padding: 8, backgroundColor: "#f44336", borderRadius: 4 },
  clearButtonText: { color: "#fff", fontWeight: "bold" },
  listContent: { padding: 16 },
  logItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#2c2c2c",
    borderRadius: 6,
  },
  timestamp: { fontSize: 12, color: "#aaa", marginBottom: 4 },
  level: { fontWeight: "bold", marginBottom: 4 },
  message: { fontSize: 14, color: "#fff" },
});
