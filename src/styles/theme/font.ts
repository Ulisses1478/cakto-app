const size = {
  xxxs: 12,
  xxs: 14,
  xs: 16,
  sm: 18,
  md: 20,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

const family = {
  light: "SpaceGrotesk_300Light",
  regular: "SpaceGrotesk_400Regular",
  medium: "SpaceGrotesk_500Medium",
  semiBold: "SpaceGrotesk_600SemiBold",
  bold: "SpaceGrotesk_700Bold",
} as const;

const weight = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
} as const;

export const font = Object.freeze({
  size,
  family,
  weight,
});
