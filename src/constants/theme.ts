export type ThemeColorsType = {
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  secondaryText: string;
  highlight: string;
};

// Color pallete
export const Colors = {
  // Primary colors
  primary: {
    50: "#e6f7ff",
    100: "#bae7ff",
    200: "#91d5ff",
    300: "#69c0ff",
    400: "#40a9ff",
    500: "#1890ff", // Main primary color
    600: "#096dd9",
    700: "#0050b3",
    800: "#003a8c",
    900: "#002766",
  },

  // Neutral colors
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },

  // Semantic colors
  success: "#52c41a",
  warning: "#faad14",
  error: "#f5222d",
  info: "#1890ff",

  // Theme colors
  light: {
    background: "#ffffff",
    card: "#ffffff",
    text: "#000000",
    border: "#e5e5e5",
    notification: "#1890ff",
    secondaryText: "#737373",
    highlight: "#f5f5f5",
  } as ThemeColorsType,

  dark: {
    background: "#000000",
    card: "#171717",
    text: "#ffffff",
    border: "#404040",
    notification: "#1890ff",
    secondaryText: "#a3a3a3",
    highlight: "#262626",
  } as ThemeColorsType,
};

// Typography
export const Typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },
  fontWeights: {
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing
export const Spacing = {
  "0": 0,
  "0.5": 2,
  "1": 4,
  "2": 8,
  "3": 12,
  "4": 16,
  "5": 20,
  "6": 24,
  "8": 32,
  "10": 40,
  "12": 48,
  "16": 64,
  "20": 80,
  "24": 96,
  "32": 128,
};

// Border radius
export const BorderRadius = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
  "2xl": 16,
  "3xl": 24,
  full: 9999,
};

export type ShadowType = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

// Shadows
export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  } as ShadowType,
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  } as ShadowType,
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  } as ShadowType,
};

// Math-specific constants
export const MathConstants = {
  equationTypes: {
    linear: "Linear Equation",
    quadratic: "Quadratic Equation",
    trigonometric: "Trigonometric Equation",
    calculus: "Calculus Problem",
  },

  // Default equations for examples
  defaultEquations: {
    linear: "2x + 3 = 7",
    quadratic: "x² - 4x - 5 = 0",
    trigonometric: "4 sin θ cos θ = 2 sin θ",
    calculus: "∫ x² dx",
  },
};
