import { useEffect, useRef, useState } from "react";
import {
  Alert,
  View,
  TextInput as RNTextInput,
  AppState,
  AppStateStatus,
  Keyboard,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import {
  Button,
  Modal,
  ModalProps,
  Template,
  Text,
  TextInput,
} from "@/components/ui";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";
import { RouteStackParams } from "@/navigation/routes";

const TOKEN_LENGTH = 6;

const feedBackWarningProps = {
  title: Utils.Constants.Text.confirmResetCode.warning.title,
  description: Utils.Constants.Text.confirmResetCode.warning.description,
  onSubmitText: Utils.Constants.Text.confirmResetCode.warning.onSubmitText,
  scheme: "warning",
} as ModalProps["BottomSheet"]["props"];

export function ConfirmResetCode({
  navigation,
  route,
}: RouteStackParams<"ConfirmResetCode">) {
  const email = route.params.email || "";
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(",,,,,");
  const [isFocused, setIsFocused] = useState(false);
  const [appState, setAppState] = useState({
    current: AppState.currentState,
    prev: AppState.currentState,
  });
  const codeInputRefs = Array.from({ length: 6 }).map(() =>
    useRef<RNTextInput>(null)
  );

  const modalRef = useRef<ModalProps["BottomSheet"]["ref"]>(null);

  async function handleFillCodeFromClipboard() {
    const text = await Clipboard.getStringAsync();
    const onlyNumbers = text.replace(/\D/g, "");
    if (text.length === TOKEN_LENGTH && onlyNumbers.length === TOKEN_LENGTH) {
      const unparsedCode = text.split("").join(",");
      setCode(unparsedCode);
      codeInputRefs[5]?.current?.focus();
      codeInputRefs[5].current?.blur();
    }
  }

  function handleAppStateChange(nextAppState: AppStateStatus) {
    setAppState({
      current: nextAppState,
      prev: appState.current,
    });

    if (nextAppState === "active") {
      handleFillCodeFromClipboard();
    }
  }

  useEffect(() => {
    handleFillCodeFromClipboard();
    const appStateSubscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  async function sendVerificationCode() {
    setIsFocused(false);
    setIsLoading(true);
    Keyboard.dismiss();

    const parsedToken = code.split(",").join("");
    const onlyNumbers = parsedToken.replace(/\D/g, "");
    try {
      const hasInvalidTokenLength =
        !parsedToken || parsedToken.length < TOKEN_LENGTH;

      const hasInvalidToken = !onlyNumbers || onlyNumbers.length < TOKEN_LENGTH;

      if (hasInvalidTokenLength || hasInvalidToken) {
        modalRef.current?.onOpen(feedBackWarningProps);
        return;
      }

      navigation.navigate("ResetPassword", { token: parsedToken, email });
    } finally {
      setIsLoading(false);
    }
  }

  feedBackWarningProps.onSubmit = () => {
    modalRef.current?.onClose();
  };

  return (
    <Template.Base
      style={{
        paddingTop: theme.spacing.sm,
      }}
      isLoading={isLoading}
      goBack={() => navigation.goBack()}
      canGoBack={navigation.canGoBack()}
      keyboardIsOpen={isFocused}
      scrollViewProps={{
        wrapWithScrollView: true,
      }}
    >
      <Modal.BottomSheet ref={modalRef} />
      <View>
        <View style={{ gap: theme.spacing.nano }}>
          <Text.Base style={{ fontSize: theme.font.size.lg }}>
            {Utils.Constants.Text.confirmResetCode.title}
          </Text.Base>
          <Text.Base
            style={{
              fontWeight: theme.font.weight.medium,
              fontFamily: theme.font.family.medium,
              fontSize: theme.font.size.xs,
              lineHeight: 24,
            }}
          >
            {Utils.Constants.Text.confirmResetCode.description.replace(
              "#email#",
              email
            )}
          </Text.Base>
        </View>
        <View style={{ gap: theme.spacing.nano, marginTop: theme.size.md }}>
          <Text.Base style={{ fontSize: theme.font.size.xxs }}>
            {Utils.Constants.Text.confirmResetCode.securityCode}
          </Text.Base>
          <View style={{ gap: theme.spacing.base, flexDirection: "row" }}>
            {code.split(",").map((digit, index) => {
              const inputRef = codeInputRefs[index];
              return (
                <TextInput.Base
                  ref={inputRef}
                  key={index}
                  style={{
                    width: theme.size.lg + 2.83,
                    height: theme.size.lg,
                    paddingHorizontal: theme.spacing.xxxs,
                    textAlign: "center",
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  keyboardType="number-pad"
                  placeholder={inputRef.current?.isFocused() ? "" : "0"}
                  value={digit}
                  maxLength={2}
                  onChangeText={(value) => {
                    const parsedValue = value.length > 1 ? value[1] : value;
                    setCode((prev) =>
                      prev
                        .split(",")
                        .map((item, i) => (i === index ? parsedValue : item))
                        .join(",")
                    );

                    if (parsedValue && index < TOKEN_LENGTH - 1) {
                      codeInputRefs[index + 1].current?.focus();
                    }

                    if (Number(parsedValue) && index === TOKEN_LENGTH - 1) {
                      codeInputRefs[index].current?.blur();
                    }
                  }}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace" && index > 0) {
                      codeInputRefs[index - 1].current?.focus();
                    }
                  }}
                />
              );
            })}
          </View>
        </View>
        <View style={{ gap: theme.spacing.xxxs, marginTop: theme.spacing.sm }}>
          <Button.Base
            title={Utils.Constants.Text.confirmResetCode.verify}
            variant="filled"
            textProps={{ color: theme.color.secondary.normal }}
            onPress={sendVerificationCode}
          />
          <Button.Base
            title={Utils.Constants.Text.confirmResetCode.resendCode}
            variant="unfilled"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </Template.Base>
  );
}
