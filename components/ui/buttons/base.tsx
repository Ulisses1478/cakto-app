import {
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  ButtonProps as RNButtonProps,
} from "react-native";
import { Text } from "../texts";
import { theme } from "@/styles/theme";

const baseButtonProps = {
  height: theme.size.xl,
  width: theme.size.full,
  borderRadius: theme.borderRadius.pill,
  alignItems: "center",
  justifyContent: "center",
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
}

export function Base(props: ButtonProps) {
  const { title, style, textProps, variant = "filled", ...rest } = props;

  const buttonProps = getStyleByVariant(variant, style);

  if (variant === "unfilled" && textProps?.color) {
    buttonProps.borderColor = textProps.color;
  }

  return (
    <TouchableOpacity {...rest} style={buttonProps}>
      <Text.Base style={textProps}>{title}</Text.Base>
    </TouchableOpacity>
  );
}