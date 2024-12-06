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

interface TextInputProps extends RNTextInputProps {
  label?: string;
  style?: TextStyle;
  textProps?: TextStyle;
  focusedStyle?: {
    style?: TextStyle;
    placeholderTextColor?: string;
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

  const flexDirection = secureTextEntry ? "row" : "column";

  function handleInputFocus(focus: boolean) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsFocused(focus);
  }

  return (
    <View style={{ gap: theme.spacing.nano }}>
      {label && (
        <Text.Base style={{ fontSize: theme.font.size.xxs, ...textProps }}>
          {label}
        </Text.Base>
      )}
      <View style={{ flexDirection: flexDirection }}>
        <TextInput
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
          {...(secureTextEntry ? basePasswordProps : {})}
          secureTextEntry={secureTextEntry && !showPassword}
          {...rest}
        />
        {secureTextEntry && (
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
