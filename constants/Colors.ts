const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,

    scheme_colors: {
      primary: "#00416d", // Deep blue
      secondary: "#f1733e", // Vibrant orange
      alt: "#e0e0e0", // Light gray alt surface
      other: "#4cafef", // Accent/example
      ghost: "transparent", // Transparent background for ghost buttons/cards
    },
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,

    scheme_colors: {
      primary: "#00416d", // Keep same for brand consistency
      secondary: "#f1733e",
      alt: "#222222", // Dark gray alt surface
      other: "#4cafef", // Accent/example
      ghost: "transparent", // Transparent in dark mode as well
    },
  },
};
