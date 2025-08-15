import React, { useEffect } from "react";
import { ViewStyle, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { useVariantStore } from "@/store/variantStore";

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  paddingHorizontal?: number;
  paddingVertical?: number;
  variant?: keyof typeof import("@/constants/Colors").default.light.scheme_colors;
}

export default function Container({
  children,
  style,
  paddingHorizontal = 20,
  paddingVertical = 30,
  variant,
}: ContainerProps) {
  const setVariant = useVariantStore((state) => state.setVariant);

  useEffect(() => {
    setVariant(variant);
    return () => setVariant(undefined); // reset when unmounts
  }, [variant]);

  return (
    <View
      variant={variant}
      style={[styles.container, { paddingHorizontal, paddingVertical }, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
