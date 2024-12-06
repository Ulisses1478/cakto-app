import React from "react";
import { theme } from "@/styles/theme";
import {
  ImageBackground,
  StyleProp,
  ScrollView,
  FlexStyle,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { Modal } from "../../modal";
import { Button } from "../../buttons";
import { TemplateBaseProps } from "./types";

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
            backgroundColor: !!asBackgroundImage
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
                top: Constants.statusBarHeight + theme.spacing.xxs,
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

  return (
    <>
      {!!asBackgroundImage ? (
        <ImageBackground
          style={{
            flex: 1,
            height: theme.size.full,
            width: theme.size.full,
          }}
          resizeMode="cover"
          source={BGImages[asBackgroundImage.source]}
        >
          {wrapper()}
        </ImageBackground>
      ) : (
        wrapper()
      )}
    </>
  );
}
