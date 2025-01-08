import { CommonActions } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  TextInput as RNTextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { Image } from "@/assets/images";
import { Button, Flex, Text, TextInput } from "@/components/ui";
import { ContextHook } from "@/contexts";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const IntlNumber = Utils.Intl.Number;
const Texts = Utils.Constants.Text.authenticated.pix.send.typePassword;
const PIN_LENGTH = 4;

export function TypePassword({
  navigation,
  route,
}: RouteStackParams<"PixSendTypePassword">) {
  const { isBlocked, getRemainingTime, pinAttempts, updateRetries, PIN_TRIES } =
    ContextHook.usePin();
  const pin = ",,,";
  const pinRef = useRef<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(RNTextInput | null)[]>([]);
  const [blockTime, setBlockTime] = useState({ minutes: "10", seconds: "00" });
  const [inputFocused, setInputFocused] = useState(0);

  const goBack = () => {
    if (pinAttempts.value >= PIN_TRIES) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }, { name: "PixHome" }],
        })
      );
    } else {
      navigation.goBack();
    }
  };

  const retryText = Texts.warning.subDescription.replace(
    "{{value}}",
    String(PIN_TRIES - pinAttempts.value)
  );

  const parseRetryText =
    PIN_TRIES - pinAttempts.value > 1 ? retryText : retryText.slice(0, -1);

  const parseBlockTime = Texts.error.description
    .replace("{{value}}", String(PIN_TRIES))
    .replace("{{remaining_time}}", `${blockTime.minutes}:${blockTime.seconds}`);

  useEffect(() => {
    let interval: any = null;
    const minutes = IntlNumber.removeLeadingZeros(
      IntlNumber.getOnlyNumbers(getRemainingTime().minutes)
    );
    const seconds = IntlNumber.removeLeadingZeros(
      IntlNumber.getOnlyNumbers(getRemainingTime().seconds)
    );
    if (isBlocked() && (minutes || seconds)) {
      setBlockTime(getRemainingTime());
      interval = setInterval(() => {
        const remaining = getRemainingTime();
        setBlockTime(remaining);
        if (!isBlocked()) {
          clearInterval(interval);
          updateRetries({
            value: 0,
            blockedAt: 0,
          });
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [pinAttempts.blockedAt]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: theme.color.gray[900],
        paddingBottom: theme.spacing.xxs,
      }}
    >
      <Button.Back
        onPress={goBack}
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
            <Text.Base>{Texts.title}</Text.Base>
            <Text.Base>{Texts.description}</Text.Base>
          </View>

          <Flex style={{ justifyContent: "space-between" }}>
            {pin.split(",").map((digit, index) => {
              const isFocused = inputFocused === index;
              const color = theme.color.white[isFocused ? "100" : "064"];
              return (
                <TouchableWithoutFeedback
                  disabled={pinAttempts.value >= PIN_TRIES}
                  onPress={() => {
                    inputRefs.current[index]?.focus();
                    setInputFocused(index);
                  }}
                  key={index}
                  style={{
                    width: 74.5,
                    height: 74,
                    borderWidth: theme.borderWidth.hairline,
                    borderColor: color,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: theme.borderRadius.sm,
                  }}
                >
                  <Text.Base
                    style={{
                      textAlign: "center",
                      fontSize: theme.font.size.xxs,
                      color,
                    }}
                  >
                    {pinRef.current[index] ? "•" : isFocused ? "" : "*"}
                  </Text.Base>
                </TouchableWithoutFeedback>
              );
            })}
          </Flex>
          {pinAttempts.value > 0 && pinAttempts.value < PIN_TRIES && (
            <View style={{ gap: theme.spacing.nano }}>
              <Text.Base
                style={{
                  fontSize: theme.font.size.md,
                  lineHeight: 20,
                  color: theme.color.yellow.alert,
                }}
              >
                {Texts.warning.title}
              </Text.Base>
              <Flex style={{ gap: theme.spacing.quarck }}>
                <Text.Base
                  style={{
                    fontSize: theme.font.size.xxs,
                    lineHeight: 21,
                    fontWeight: theme.font.weight.medium,
                    fontFamily: theme.font.family.medium,
                  }}
                >
                  {Texts.warning.description}
                </Text.Base>
                <Text.Base
                  style={{
                    fontSize: theme.font.size.xxs,
                    lineHeight: 21,
                    fontWeight: theme.font.weight.medium,
                    fontFamily: theme.font.family.medium,
                    color: theme.color.yellow.alert,
                  }}
                >
                  {parseRetryText}.
                </Text.Base>
              </Flex>
            </View>
          )}
          {pinAttempts.value >= PIN_TRIES && (
            <View style={{ gap: theme.spacing.nano }}>
              <Text.Base
                style={{
                  fontSize: theme.font.size.md,
                  lineHeight: 20,
                  color: theme.color.red.negative,
                }}
              >
                {Texts.error.title}
              </Text.Base>
              <Text.Base
                style={{
                  fontSize: theme.font.size.xxxs,
                  lineHeight: 21,
                  fontWeight: theme.font.weight.medium,
                  fontFamily: theme.font.family.medium,
                }}
              >
                {parseBlockTime}.
              </Text.Base>
            </View>
          )}
          <Flex style={{ justifyContent: "space-between" }}>
            {pin.split(",").map((digit, index) => {
              return (
                <TextInput.Base
                  ref={(r) => {
                    if (r) {
                      inputRefs.current[index] = r as RNTextInput;
                    }
                  }}
                  key={index}
                  style={{
                    opacity: 0,
                  }}
                  disabled={pinAttempts.value >= PIN_TRIES}
                  onChangeText={(value) => {
                    const parsedValue = value.length > 1 ? value[1] : value;
                    pinRef.current[index] = parsedValue;

                    if (parsedValue && index < PIN_LENGTH - 1) {
                      inputRefs.current[index + 1]?.focus();
                      setInputFocused(index + 1);
                    }

                    if (Number(parsedValue) && index === PIN_LENGTH - 1) {
                      if (
                        index === PIN_LENGTH - 1 &&
                        pinRef.current.join("").length === PIN_LENGTH
                      ) {
                        const currentPassword = pinRef.current.join("");
                        // TODO: Implementar lógica para enviar para o backend
                        if (currentPassword !== "1234") {
                          const currentRetries = pinAttempts.value + 1;
                          updateRetries({
                            value: currentRetries,
                          });
                          setBlockTime(getRemainingTime());
                          if (pinAttempts.value < PIN_TRIES) {
                            pinRef.current = [];
                            inputRefs.current[0]?.focus();
                            setInputFocused(0);
                          } else if (pinAttempts.value >= PIN_TRIES) {
                            inputRefs.current[index]?.blur();
                            setInputFocused(-1);
                          }
                        } else {
                          updateRetries({
                            value: 0,
                            blockedAt: 0,
                          });
                          inputRefs.current[index]?.blur();
                          setInputFocused(-1);
                          navigation.navigate(
                            "PixSendShareTransfer",
                            route.params
                          );
                        }
                      }
                    }
                  }}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace" && index > 0) {
                      inputRefs.current[index - 1]?.focus();
                      setInputFocused(index - 1);
                      pinRef.current[index - 1] = "";
                    }
                  }}
                  autoFocus={index === 0}
                  value={digit}
                  keyboardType="number-pad"
                  secureTextEntry
                />
              );
            })}
          </Flex>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
