import { theme } from "@/styles/theme";
import React from "react";
import { Text, TextStyle } from "react-native";

interface TextProps {
  style?: TextStyle;
  children: string | React.ReactNode;
}

export function Base(props: TextProps) {
  const { style } = props;
  return (
    <Text
      style={{
        fontFamily: theme.font.family.bold,
        color: theme.color.white[100],
        fontSize: theme.font.size.xs,
        ...style,
      }}
    >
      {props.children}
    </Text>
  );
}
