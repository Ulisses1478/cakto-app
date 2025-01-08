import React from "react";
import { Dimensions, View } from "react-native";

import { Base, BaseButtonProps } from "./base";

import { theme } from "@/styles/theme";

interface SubmitButtonProps extends BaseButtonProps {
  border?: {
    width?: number;
    color: string;
    marginBottom?: number;
  };
}

export function Submit(props: SubmitButtonProps) {
  const {
    border = {
      color: theme.color.gray["700"],
      width: theme.borderWidth.hairline,
      marginBottom: theme.spacing.xxs,
    },
    style,
    ...rest
  } = props;

  border.color = border.color || theme.color.gray["700"];
  border.width = border.width || theme.borderWidth.hairline;
  border.marginBottom = border.marginBottom || theme.spacing.xxs;

  return (
    <>
      <View
        style={{
          width: theme.size.full,
          borderWidth: theme.borderWidth.hairline,
          borderColor: theme.color.gray["700"],
          marginBottom: theme.spacing.xxs,
        }}
      />

      <Base
        style={{
          marginHorizontal: theme.spacing.xxs,
          width: Dimensions.get("window").width - theme.spacing.xxs * 2,
          alignSelf: "center",
          marginBottom: theme.spacing.xxs,
          backgroundColor: theme.color.secondary.normal,
          ...style,
        }}
        {...rest}
      />
    </>
  );
}
