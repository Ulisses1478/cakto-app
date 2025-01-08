import { forwardRef, useState } from "react";
import {
  View,
  TextInput,
  TextStyle,
  TextInputProps as RNTextInputProps,
  Pressable,
  LayoutAnimation,
} from "react-native";

import { Text } from "../texts";

import { Image } from "@/assets/images";
import { theme } from "@/styles/theme";

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  style?: TextStyle;
  textProps?: TextStyle;
  disabled?: boolean;
  focusedStyle?: {
    style?: TextStyle;
    placeholderTextColor?: string;
  };
  bottomRightProps?: {
    style?: TextStyle;
    onPress?: () => void;
    text?: string;
  };
}

function dynamicStyles(
  isFocused: boolean,
  focusedStyle?: TextInputProps["focusedStyle"]
) {
  if (isFocused) {
    return {
      style: {
        borderColor: theme.color.white[100],
        color: theme.color.white[100],
        ...focusedStyle?.style,
      },
      placeholderTextColor:
        focusedStyle?.placeholderTextColor || theme.color.white[100],
    };
  }

  return {
    style: {
      borderColor: theme.color.white["064"],
      color: theme.color.white[100],
    },
    placeholderTextColor: theme.color.white["064"],
  };
}

function TextInputBase(props: TextInputProps, ref: any) {
  const {
    style,
    label,
    textProps,
    focusedStyle,
    secureTextEntry = false,
    onFocus,
    onBlur,
    bottomRightProps,
    disabled = false,
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { style: inputStyle, placeholderTextColor } = dynamicStyles(isFocused);

  const basePasswordProps: RNTextInputProps = {
    autoCorrect: false,
    autoCapitalize: "none",
    enablesReturnKeyAutomatically: true,
    textContentType: "password",
  };

  const isPassword = secureTextEntry && rest.keyboardType !== "number-pad";

  const flexDirection = isPassword ? "row" : "column";

  function handleInputFocus(focus: boolean) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsFocused(focus);
  }

  return (
    <View style={{ gap: theme.spacing.quarck }}>
      {label && (
        <Text.Base style={{ fontSize: theme.font.size.xxs, ...textProps }}>
          {label}
        </Text.Base>
      )}
      <View style={{ flexDirection }}>
        <TextInput
          readOnly={disabled}
          ref={ref}
          style={{
            fontFamily: theme.font.family.medium,
            fontWeight: theme.font.weight.medium,
            borderWidth: theme.borderWidth.hairline,
            borderRadius: theme.borderRadius.sm,
            height: theme.size.lg,
            width: theme.size.full,
            paddingLeft: theme.spacing.xxxs,
            paddingRight: theme.spacing.xxxs,
            position: "relative",
            ...inputStyle,
            ...style,
          }}
          onFocus={(value) => {
            handleInputFocus(true);
            onFocus?.(value);
          }}
          onBlur={(value) => {
            handleInputFocus(false);
            setShowPassword(false);
            onBlur?.(value);
          }}
          placeholderTextColor={placeholderTextColor}
          {...(isPassword ? basePasswordProps : {})}
          secureTextEntry={isPassword && !showPassword}
          {...(rest.keyboardType === "number-pad"
            ? { returnKeyType: "done" }
            : {})}
          keyboardAppearance="dark"
          {...rest}
        />
        {bottomRightProps?.text && (
          <Text.Base
            style={{
              color: theme.color.white["064"],
              fontSize: theme.font.size.xxxs - 2,
              fontFamily: theme.font.family.regular,
              fontWeight: theme.font.weight.regular,
              textAlign: "right",
              ...bottomRightProps.style,
            }}
            onPress={bottomRightProps.onPress}
          >
            {bottomRightProps.text}
          </Text.Base>
        )}
        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: theme.spacing.base,
              top: theme.spacing.base,
            }}
          >
            {!showPassword ? <Image.Eye.Open /> : <Image.Eye.Close />}
          </Pressable>
        )}
      </View>
    </View>
  );
}

export const Base = forwardRef(TextInputBase);
