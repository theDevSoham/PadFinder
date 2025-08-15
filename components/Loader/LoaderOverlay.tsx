import { useLoaderStore } from "@/store/loaderStore"; // update path
import React from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

export const LoaderOverlay = () => {
  const isLoading = useLoaderStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    elevation: 9999,
  },
  loaderBox: {
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: 20,
    borderRadius: 10,
  },
});
