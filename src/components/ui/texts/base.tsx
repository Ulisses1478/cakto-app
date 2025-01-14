import React from "react";
import { Text, TextProps as RNTextProps, TextStyle } from "react-native";

import { theme } from "@/styles/theme";

export interface BaseTextProps extends Omit<RNTextProps, "style" | "children"> {
  style?: TextStyle;
  children: string | React.ReactNode;
}

export function Base(props: BaseTextProps) {
  const { style, ...rest } = props;
  return (
    <Text
      style={{
        fontFamily: theme.font.family.bold,
        color: theme.color.white[100],
        fontSize: theme.font.size.xs,
        ...style,
      }}
      {...rest}
    >
      {props.children}
    </Text>
  );
}
