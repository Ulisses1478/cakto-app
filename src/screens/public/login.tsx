import { useRef, useState } from "react";
import {
  Linking,
  Pressable,
  View,
  TextInput as RNTextInput,
  Keyboard,
} from "react-native";
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
import { ContextHook } from "@/contexts";
import { RouteStackParams } from "@/navigation/routes";

const feedBackWarningProps = {
  title: Utils.Constants.Text.login.warning.title,
  description: Utils.Constants.Text.login.warning.description,
  onSubmitText: Utils.Constants.Text.login.warning.onSubmitText,
  onCancelText: Utils.Constants.Text.login.warning.onCancelText,
  scheme: "warning",
} as ModalProps["BottomSheet"]["props"];

export function Login({ navigation }: RouteStackParams<"Login">) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const modalRef = useRef<ModalProps["BottomSheet"]["ref"]>(null);

  const { handleLogin } = ContextHook.useAuth();

  const passwordInputRef = useRef<RNTextInput>(null);

  async function login() {
    setIsLoading(true);
    setIsFocused(false);
    Keyboard.dismiss();
    try {
      const { success } = await handleLogin(credentials);

      if (!success) {
        modalRef.current?.onOpen(feedBackWarningProps);
        return;
      }

      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    } finally {
      setIsLoading(false);
    }
  }

  feedBackWarningProps.onCancel = () => {
    navigation.navigate("ForgotPassword", { email: credentials.email });
    modalRef.current?.onClose();
  };

  feedBackWarningProps.onSubmit = () => {
    modalRef.current?.onClose();
  };

  return (
    <Template.Base
      style={{
        paddingTop: theme.spacing.sm,
      }}
      isLoading={isLoading}
      goBack={() => navigation.pop()}
      canGoBack={navigation.canGoBack()}
      keyboardIsOpen={isFocused}
      scrollViewProps={{
        wrapWithScrollView: true,
        footer: (
          <Pressable
            onPress={async () => {
              if (await Linking.canOpenURL(Utils.Constants.Url.register)) {
                Linking.openURL(Utils.Constants.Url.register);
              }
            }}
          >
            <Text.Base style={{ textAlign: "center" }}>
              {Utils.Constants.Text.login.register}
            </Text.Base>
          </Pressable>
        ),
      }}
    >
      <Modal.BottomSheet ref={modalRef} />
      <View style={{ gap: theme.spacing.sm }}>
        <Text.Base style={{ fontSize: theme.font.size.lg }}>
          {Utils.Constants.Text.login.title}
        </Text.Base>
        <View style={{ gap: theme.spacing.xxxs }}>
          <TextInput.Base
            keyboardType="email-address"
            label={Utils.Constants.Text.login.emailLabel}
            placeholder={Utils.Constants.Text.login.emailPlaceholder}
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
            autoCapitalize="none"
            value={credentials.email}
            onChangeText={(email) => setCredentials({ ...credentials, email })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <TextInput.Base
            ref={passwordInputRef}
            label={Utils.Constants.Text.login.passwordLabel}
            placeholder={Utils.Constants.Text.login.passwordPlaceholder}
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={login}
            autoCapitalize="none"
            value={credentials.password}
            onChangeText={(password) =>
              setCredentials({ ...credentials, password })
            }
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
        <View style={{ gap: theme.spacing.xxxs }}>
          <Button.Base
            title={Utils.Constants.Text.login.login}
            variant="filled"
            textProps={{ color: theme.color.secondary.normal }}
            onPress={login}
            isLoading={isLoading}
          />
          <Button.Base
            onPress={() =>
              navigation.navigate("ForgotPassword", {
                email: credentials.email,
              })
            }
            title={Utils.Constants.Text.login.forgotPassword}
            variant="unfilled"
          />
        </View>
      </View>
    </Template.Base>
  );
}
