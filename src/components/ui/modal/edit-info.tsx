import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import Modal from "react-native-modal";

import { Button } from "../buttons";
import { TextInput, TextInputProps } from "../text-inputs";
import { Text } from "../texts";

import { Image } from "@/assets/images";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

export interface EditInfoProps {
  title?: string;
  description?: React.ReactNode;
  onSubmit?: (data: string) => void;
  onSubmitText?: string;
  isVisible?: boolean;
  onClose?: () => void;
  inputValue?: string;
  setInputValue?: (value: string) => void;
  inputFeedback?: string;
  hasFeedback?: (data?: string) => boolean;
  textInputProps?: TextInputProps;
  isCurrency?: boolean;
}

export interface EditInfoRef {
  onClose: () => void;
  onOpen: (value: EditInfoProps) => void;
}

const IntlNumber = Utils.Intl.Number;

export const EditInfo = forwardRef(
  (props: EditInfoProps, ref: React.ForwardedRef<EditInfoRef>) => {
    const [showModal, setShowModal] = useState(false);
    const data = useRef<EditInfoProps | null>(null);
    const { inputValue, setInputValue } = props;

    function handleOnClose() {
      setShowModal(false);
      data?.current?.onClose?.();
      if (Keyboard.isVisible()) {
        Keyboard.dismiss();
      }
      setTimeout(() => {
        data.current = null;
      }, 350);
    }

    useImperativeHandle(
      ref,
      () => ({
        onClose: handleOnClose,
        onOpen: (value: EditInfoProps) => {
          // TODO: Fix this hack for iOS modal animation
          setTimeout(() => setShowModal(true), 50);
          data.current = value;
        },
      }),
      [data]
    );

    const currentValue = data.current?.isCurrency
      ? IntlNumber.formatCurrency(
          Number(IntlNumber.getOnlyNumbers(inputValue)) / 100
        )
      : inputValue;

    const showFeedbackMessage =
      typeof data.current?.hasFeedback === "function" &&
      data.current?.hasFeedback(inputValue);

    const buttonIsDisabled = data.current?.isCurrency
      ? Number(
          IntlNumber.removeLeadingZeros(IntlNumber.getOnlyNumbers(inputValue))
        ) === 0
      : false;

    const textInputProps = data.current?.textInputProps;
    const showCharacterCount =
      textInputProps?.maxLength &&
      textInputProps?.keyboardType !== "number-pad";

    return (
      <Modal
        isVisible={showModal}
        onBackdropPress={handleOnClose}
        renderToHardwareTextureAndroid
        // animationInTiming={300}
        backdropColor={theme.color.gray["900"]}
        style={{ margin: 0 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            flex: 1,
            backgroundColor: theme.color.gray[900],
            paddingBottom: theme.spacing.xxs,
          }}
        >
          <Button.Back
            onPress={handleOnClose}
            style={{
              marginTop: theme.spacing.md,
              marginLeft: theme.spacing.xxs,
            }}
          >
            <Image.X />
          </Button.Back>
          <ScrollView
            contentContainerStyle={{
              backgroundColor: theme.color.gray[900],
              width: theme.size.full,
              height: theme.size.full,
              paddingTop: theme.spacing.xxs,
              gap: theme.spacing.xxxs,
              justifyContent: "space-between",
              paddingBottom: theme.spacing.sm,
            }}
          >
            <View
              style={{
                paddingHorizontal: theme.spacing.xxs,
                gap: theme.spacing.xxxs,
              }}
            >
              <View style={{ gap: theme.spacing.nano }}>
                {data.current?.title && (
                  <Text.Base
                    style={{
                      fontSize: theme.font.size.md,
                      lineHeight: 30,
                    }}
                  >
                    {data.current.title}
                  </Text.Base>
                )}
                {data.current?.description && data.current.description}

                <TextInput.Base
                  value={currentValue}
                  onChangeText={setInputValue}
                  {...textInputProps}
                  {...(showCharacterCount && {
                    bottomRightProps: {
                      text: `${inputValue?.length || 0}/${
                        textInputProps.maxLength
                      }`,
                    },
                  })}
                />

                {showFeedbackMessage && data.current?.inputFeedback && (
                  <Text.Base
                    style={{
                      fontSize: theme.font.size.xxxs,
                      color: theme.color.yellow.alert,
                    }}
                  >
                    {data.current.inputFeedback}
                  </Text.Base>
                )}
              </View>
            </View>
          </ScrollView>
          {typeof data.current?.onSubmit === "function" &&
            data.current?.onSubmitText && (
              <>
                <View
                  style={{
                    width: theme.size.full,
                    borderWidth: theme.borderWidth.hairline,
                    borderColor: theme.color.gray["700"],
                    marginBottom: theme.spacing.xxs,
                  }}
                />

                <Button.Base
                  title={data.current.onSubmitText}
                  textProps={{ color: theme.color.white["100"] }}
                  style={{
                    backgroundColor: theme.color.secondary.normal,
                    marginHorizontal: theme.spacing.xxs,
                    width:
                      Dimensions.get("window").width - theme.spacing.xxs * 2,
                    alignSelf: "center",
                    marginBottom: theme.spacing.xxs,
                  }}
                  disabled={buttonIsDisabled}
                  onPress={() => {
                    data.current?.onSubmit?.(inputValue!);
                  }}
                />
              </>
            )}
        </KeyboardAvoidingView>
      </Modal>
    );
  }
);
