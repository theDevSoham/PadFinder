import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";

type ButtonVariant =
  | "default"
  | "ghost"
  | "primary"
  | "secondary"
  | "link"
  | "linkButton";

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: any;
}

export default function ThemedButton({
  title,
  onPress,
  variant = "default",
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const theme = useColorScheme() ?? "light";

  // Resolve colors based on variant
  const backgroundColor =
    variant === "primary"
      ? Colors[theme].scheme_colors.primary
      : variant === "secondary"
      ? Colors[theme].scheme_colors.secondary
      : variant === "ghost" || variant === "link" || variant === "linkButton"
      ? "transparent"
      : Colors[theme].background;

  const borderColor =
    variant === "ghost"
      ? Colors[theme].text
      : variant === "primary"
      ? Colors[theme].scheme_colors.primary
      : variant === "secondary"
      ? Colors[theme].scheme_colors.secondary
      : "transparent";

  const textVariant =
    variant === "primary"
      ? "default"
      : variant === "secondary"
      ? "default"
      : variant === "ghost"
      ? "default"
      : variant === "link" || variant === "linkButton"
      ? "primary"
      : "default";

  const borderWidth = variant === "ghost" ? 1 : 0;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        { backgroundColor, borderColor, borderWidth },
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        variant={textVariant as any}
        style={[
          styles.text,
          variant === "link" && styles.linkText,
          variant === "linkButton" && styles.linkButtonText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  linkText: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
  linkButtonText: {
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
