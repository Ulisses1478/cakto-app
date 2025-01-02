import {
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  ButtonProps as RNButtonProps,
  ActivityIndicator,
  Keyboard,
} from "react-native";

import { Text } from "../texts";

import { theme } from "@/styles/theme";

const baseButtonProps = {
  height: theme.size.xl,
  width: theme.size.full,
  borderRadius: theme.borderRadius.pill,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  gap: theme.spacing.nano,
};

const filledButtonProps = {
  backgroundColor: theme.color.white[100],
};

const unfilledButtonProps = {
  borderColor: theme.color.white[100],
  borderWidth: theme.borderWidth.thin,
  backgroundColor: "transparent",
};

function getStyleByVariant(
  variant: ButtonProps["variant"],
  style?: ViewStyle
): ViewStyle {
  if (variant === "filled") {
    return {
      ...baseButtonProps,
      ...filledButtonProps,
      ...style,
    } as ViewStyle;
  }

  if (variant === "unfilled") {
    return {
      ...baseButtonProps,
      ...unfilledButtonProps,
      ...style,
    } as ViewStyle;
  }

  return baseButtonProps as ViewStyle;
}

interface ButtonProps extends RNButtonProps {
  title: string;
  style?: ViewStyle;
  textProps?: TextStyle;
  variant?: "filled" | "unfilled";
  isLoading?: boolean;
  leftIcon?: React.ReactNode | null;
}

export function Base(props: ButtonProps) {
  const {
    title,
    style: unparsedStyle,
    textProps,
    variant = "filled",
    isLoading = false,
    disabled = false,
    leftIcon = null,
    onPress,
    ...rest
  } = props;

  const style = unparsedStyle || {};
  style.opacity = style.opacity || isLoading || disabled ? 0.5 : 1;
  const buttonProps = getStyleByVariant(variant, style);

  if (variant === "unfilled" && textProps?.color) {
    buttonProps.borderColor = textProps.color;
  }

  return (
    <TouchableOpacity
      disabled={isLoading || disabled}
      {...rest}
      onPress={(event) => {
        if (typeof onPress === "function") {
          onPress(event);
          if (Keyboard.isVisible()) {
            Keyboard.dismiss();
          }
        }
      }}
      style={buttonProps}
    >
      {leftIcon}
      <Text.Base style={textProps}>{title}</Text.Base>
      {isLoading && (
        <ActivityIndicator
          size="small"
          color={textProps?.color || theme.color.secondary.normal}
        />
      )}
    </TouchableOpacity>
  );
}
