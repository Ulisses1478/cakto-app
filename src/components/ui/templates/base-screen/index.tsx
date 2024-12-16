import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleProp,
  ScrollView,
  FlexStyle,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { TemplateBaseProps } from "./types";
import { Button } from "../../buttons";
import { Modal } from "../../modal";

import { theme } from "@/styles/theme";

const BGImages = {
  home: require("@/assets/images/bg-home.png"),
};

function handleFlexView(canGoBack: boolean, isFocused: boolean) {
  const flex: Partial<StyleProp<FlexStyle>> = {
    justifyContent: "flex-start",
    flexGrow: 1,
  };

  if ((canGoBack || !canGoBack) && !isFocused) {
    flex.justifyContent = "center";
  } else {
    flex.justifyContent = "flex-start";
  }

  return flex;
}

export const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
export const BACK_BUTTON_HEIGHT = STATUS_BAR_HEIGHT + theme.spacing.xxs;

// TODO: Create a listener for keyboard open/close
export function Base(props: TemplateBaseProps<keyof typeof BGImages>) {
  const {
    children,
    style,
    isLoading = false,
    asBackgroundImage = null,
    scrollViewProps = {
      wrapWithScrollView: false,
      contentContainerStyle: {},
      style: {},
    },
    keyboardAvoindgViewProps = {
      style: {},
    },
    canGoBack = false,
    goBack = null,
    keyboardIsOpen = false,
    ...rest
  } = props;

  function baseChildren() {
    return (
      <>
        {isLoading && <Modal.Loading />}
        {children}
      </>
    );
  }

  if (scrollViewProps?.wrapWithScrollView) {
    scrollViewProps.style = scrollViewProps.style || {};
    scrollViewProps.contentContainerStyle =
      scrollViewProps.contentContainerStyle || {};

    scrollViewProps.contentContainerStyle = {
      ...handleFlexView(canGoBack, keyboardIsOpen),
      ...(scrollViewProps.contentContainerStyle as object),
    };
  }

  function wrapper() {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            backgroundColor: asBackgroundImage
              ? "transparent"
              : theme.color.secondary.normal,
            flex: 1,
            paddingHorizontal: theme.spacing.xxs,
            gap: theme.spacing.xl,
            ...style,
            position: "relative",
          }}
          {...rest}
        >
          {canGoBack && typeof goBack === "function" && !keyboardIsOpen && (
            <Button.Back
              onPress={goBack}
              style={{
                position: "absolute",
                top: BACK_BUTTON_HEIGHT,
                left: theme.spacing.xxs,
              }}
            />
          )}

          {scrollViewProps?.wrapWithScrollView ? (
            <>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={scrollViewProps.contentContainerStyle}
                style={scrollViewProps.style}
                {...scrollViewProps}
              >
                {baseChildren()}
              </ScrollView>
              {scrollViewProps.footer}
            </>
          ) : (
            baseChildren()
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const { style: keyboardAvoidingViewStyle = {}, ...keyboardAvoidingViewRest } =
    keyboardAvoindgViewProps;

  const WithLinearBackground = (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#000000", "#00A168", "#1a202c"]}
      start={{ x: -3.5, y: 3.5 }}
      end={{
        x: 1,
        y: 0.8,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // @ts-expect-error
        style={{ flex: 1, ...keyboardAvoidingViewStyle }}
        {...keyboardAvoidingViewRest}
      >
        {wrapper()}
      </KeyboardAvoidingView>
    </LinearGradient>
  );

  return <>{asBackgroundImage ? WithLinearBackground : wrapper()}</>;
}

// FIXME: Aguardando cliente definir para deixar o background como imagem ou linear gradient
// <ImageBackground
//   style={{
//     flex: 1,
//     height: theme.size.full,
//     width: theme.size.full,
//   }}
//   resizeMode="cover"
//   source={BGImages[asBackgroundImage.source]}
// >
//   {wrapper()}
// </ImageBackground>
