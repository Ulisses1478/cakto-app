import { useRef, useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  View,
  TextInput as RNTextInput,
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
  const [feedbackProps, setFeedbackProps] = useState<
    ModalProps["BottomSheet"] | null
  >(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const modalRef = useRef<ModalProps["BottomSheet"]["ref"]>(null);

  const { handleLogin } = ContextHook.useAuth();

  const passwordInputRef = useRef<RNTextInput>(null);

  async function login() {
    setIsLoading(true);
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
    console.log("em construção");
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
    >
      {navigation.canGoBack() && (
        <Button.Back onPress={() => navigation.pop()} />
      )}
      <Modal.BottomSheet ref={modalRef} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: navigation.canGoBack() ? 90 : 0,
          justifyContent: navigation.canGoBack() ? "flex-start" : "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
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
              onChangeText={(email) =>
                setCredentials({ ...credentials, email })
              }
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
            />
          </View>
          <View style={{ gap: theme.spacing.xxxs }}>
            <Button.Base
              title={Utils.Constants.Text.login.login}
              variant="filled"
              textProps={{ color: theme.color.secondary.normal }}
              onPress={login}
            />
            <Button.Base
              onPress={() => console.log("em construção")}
              title={Utils.Constants.Text.login.forgotPassword}
              variant="unfilled"
            />
          </View>
        </View>
      </ScrollView>
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
    </Template.Base>
  );
}
