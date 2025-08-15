import {
  Text as DefaultText,
  View as DefaultView,
  TextStyle,
} from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";
import { useVariantStore } from "@/store/variantStore";
import ThemedButton from "./ThemedButton";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  /**
   * Optional variant to use colors from `scheme_colors`
   * e.g. "primary", "secondary", "alt", "other"
   */
  variant?: keyof typeof Colors.light.scheme_colors | "default";
};

type HeadingSizes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type TextProps = ThemeProps &
  DefaultText["props"] & {
    textSize?: HeadingSizes;
    /**
     * Multiplier applied to h1-h6 sizes if provided
     */
    multiple?: number;
  };

export type ViewProps = ThemeProps & DefaultView["props"];

// Preset heading sizes
const headingSizes: Record<HeadingSizes, number> = {
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
};

export function useThemeColor(
  props: {
    light?: string;
    dark?: string;
    variant?: keyof typeof Colors.light.scheme_colors | "default";
  },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const currentVariant = useVariantStore((state) => state.currentVariant);
  const variant = props.variant ?? currentVariant;

  // Handle "default" variant explicitly
  if (variant === "default") {
    return Colors[theme].text;
  }

  // Handle scheme colors
  if (variant && Colors[theme].scheme_colors[variant]) {
    return Colors[theme].scheme_colors[variant];
  }

  const colorFromProps = props[theme];
  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName];
}

export function Text(props: TextProps) {
  const {
    style,
    lightColor,
    darkColor,
    variant,
    textSize,
    multiple = 1,
    ...otherProps
  } = props;

  const color = useThemeColor(
    { light: lightColor, dark: darkColor, variant },
    "text"
  ) as string;

  let fontSize: number | undefined;
  let fontWeight: TextStyle["fontWeight"] | undefined;

  if (textSize) {
    fontSize = headingSizes[textSize] * multiple;

    // Apply font weight rules for specific headings
    if (textSize === "h1") {
      fontWeight = "700";
    } else if (textSize === "h2") {
      fontWeight = "600";
    } else if (textSize === "h3") {
      fontWeight = "500";
    }
  }

  return (
    <DefaultText
      style={[{ color, fontSize, fontWeight }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, variant, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor, variant },
    "background"
  ) as string;

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const Button = ThemedButton;
