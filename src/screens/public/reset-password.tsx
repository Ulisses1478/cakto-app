import { useRef, useState } from "react";
import { View, TextInput as RNTextInput, Keyboard } from "react-native";
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
import { Image } from "@/assets/images";
import { Service } from "@/services";
import { RouteStackParams } from "@/navigation/routes";

const feedBackWarningInvalidPasswordProps = {
  title: Utils.Constants.Text.resetPassword.warning.invalidPassword.title,
  description:
    Utils.Constants.Text.resetPassword.warning.invalidPassword.description,
  onCancelText:
    Utils.Constants.Text.resetPassword.warning.invalidPassword.onCancel,
  scheme: "warning",
} as ModalProps["BottomSheet"]["props"];

const feedBackWarningBadRequestProps = {
  title: Utils.Constants.Text.resetPassword.warning.badRequest.title,
  description:
    Utils.Constants.Text.resetPassword.warning.badRequest.description,
  onCancelText: Utils.Constants.Text.resetPassword.warning.badRequest.onCancel,
  scheme: "warning",
} as ModalProps["BottomSheet"]["props"];

const feedBackSuccessProps = {
  title: Utils.Constants.Text.resetPassword.success.title,
  description: Utils.Constants.Text.resetPassword.success.description,
  onSubmitText: Utils.Constants.Text.resetPassword.success.onSubmitText,
  scheme: "success",
} as ModalProps["BottomSheet"]["props"];

const MIN_PASSWORD_LENGTH = 8;

export function ResetPassword({
  navigation,
  route,
}: RouteStackParams<"ResetPassword">) {
  const { token, email } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const modalRef = useRef<ModalProps["BottomSheet"]["ref"]>(null);

  async function resetPassword() {
    setIsFocused(false);
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      const hasInvalidPasswordLength =
        !password || password.length < MIN_PASSWORD_LENGTH;
      const passwordMismatch = password !== confirmPassword;
      const isBadPassword = !Utils.Constants.Regex.password.test(password);

      if (hasInvalidPasswordLength || passwordMismatch || isBadPassword) {
        modalRef.current?.onOpen(feedBackWarningInvalidPasswordProps);
        return;
      }

      const { success } = await Service.Auth.changePassword({
        password,
        token,
      });

      if (!success) {
        modalRef.current?.onOpen(feedBackWarningBadRequestProps);
      } else {
        modalRef.current?.onOpen(feedBackSuccessProps);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function comparePasswords(firstField: string, secondField: string) {
    if (!secondField) return false;

    // Determina o tamanho menor entre as duas strings
    const maxLength = Math.max(firstField.length, secondField.length);
    let passwordUnmatch = false;

    for (let i = 0; i < maxLength; i++) {
      if (firstField[i] && secondField[i] && firstField[i] !== secondField[i]) {
        passwordUnmatch = true;
        break;
      }
    }

    if (secondField.length > firstField.length) {
      return true;
    }

    return passwordUnmatch;
  }

  const confirmPasswordInputRef = useRef<RNTextInput>(null);

  feedBackWarningInvalidPasswordProps.onCancel = () => {
    modalRef.current?.onClose();
  };

  feedBackWarningBadRequestProps.onCancel = () => {
    navigation.popTo("ForgotPassword", { email });
    modalRef.current?.onClose();
  };

  feedBackWarningBadRequestProps.onClose = () => {
    navigation.popTo("ForgotPassword", { email });
  };

  feedBackSuccessProps.onSubmit = () => {
    navigation.popTo("Login");
    modalRef.current?.onClose();
  };

  feedBackSuccessProps.onClose = () => {
    navigation.popTo("Login");
  };
  return (
    <Template.Base
      style={{
        paddingTop: theme.spacing.sm,
      }}
      isLoading={isLoading}
      keyboardIsOpen={isFocused}
      scrollViewProps={{
        wrapWithScrollView: true,
      }}
    >
      <Modal.BottomSheet ref={modalRef} />
      <View>
        <View style={{ gap: theme.spacing.nano }}>
          <Text.Base style={{ fontSize: theme.font.size.lg }}>
            {Utils.Constants.Text.resetPassword.title}
          </Text.Base>
          <Text.Base
            style={{
              fontWeight: theme.font.weight.medium,
              fontFamily: theme.font.family.medium,
              fontSize: theme.font.size.xs,
              lineHeight: 24,
            }}
          >
            {Utils.Constants.Text.resetPassword.description}
          </Text.Base>
        </View>
        <View style={{ gap: theme.spacing.nano, marginTop: theme.size.md }}>
          <View style={{ gap: theme.spacing.xxs }}>
            <TextInput.Base
              label={Utils.Constants.Text.resetPassword.passwordLabel}
              placeholder={
                Utils.Constants.Text.resetPassword.passwordPlaceholder
              }
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={password}
              onChangeText={setPassword}
            />
            <View style={{ gap: theme.spacing.base }}>
              <TextInput.Base
                ref={confirmPasswordInputRef}
                label={Utils.Constants.Text.resetPassword.confirmPasswordLabel}
                placeholder={
                  Utils.Constants.Text.resetPassword.confirmPasswordPlaceholder
                }
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={resetPassword}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              {comparePasswords(password, confirmPassword) && (
                <View
                  style={{
                    borderRadius: theme.borderRadius.sm,
                    paddingVertical: theme.spacing.xxxs,
                    flexDirection: "row",
                    gap: theme.spacing.xxxs,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.color.white[100],
                  }}
                >
                  <Image.Warning.X />
                  <Text.Base
                    style={{
                      color: theme.color.red.negative,
                      fontSize: theme.font.size.xxs,
                    }}
                  >
                    {Utils.Constants.Text.resetPassword.passwordUnmatch}
                  </Text.Base>
                </View>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            gap: theme.spacing.xxxs,
            marginTop: theme.spacing.sm,
          }}
        >
          <Button.Base
            title={Utils.Constants.Text.resetPassword.changePassword}
            variant="filled"
            textProps={{ color: theme.color.secondary.normal }}
            onPress={resetPassword}
            isLoading={isLoading}
          />
        </View>
      </View>
    </Template.Base>
  );
}
