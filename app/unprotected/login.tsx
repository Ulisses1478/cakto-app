import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import {
  Linking,
  Pressable,
  ScrollView,
  View,
  TextInput as RNTextInput,
  Alert,
} from "react-native";
import { Button, ModalProps, Template, Text, TextInput } from "@/components/ui";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";
import { useRef, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackProps, setFeedbackProps] = useState<
    ModalProps["BottomSheet"] | null
  >(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordInputRef = useRef<RNTextInput>(null);

  function handleCloseBottomSheet() {
    setFeedbackProps(null);
  }

  async function login() {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const success = Math.random() > 0.5;

      if (!success) {
        setFeedbackProps(feedBackWarningProps);
        return;
      }

      Alert.alert("Em construção");
    } finally {
      setIsLoading(false);
    }
  }

  const feedBackWarningProps = {
    title: Utils.Constants.Text.login.warning.title,
    description: Utils.Constants.Text.login.warning.description,
    onCancel: () => {
      handleCloseBottomSheet();
      Alert.alert("Em construção");
    },
    onSubmitText: Utils.Constants.Text.login.warning.onSubmitText,
    onCancelText: Utils.Constants.Text.login.warning.onCancelText,
    scheme: "warning",
  } as ModalProps["BottomSheet"];

  return (
    <Template.Base
      style={{
        paddingTop: theme.spacing.sm,
      }}
      isLoading={isLoading}
      bottomSheet={{
        props: feedbackProps,
        onClose: handleCloseBottomSheet,
        onSubmit: handleCloseBottomSheet,
      }}
    >
      {router.canGoBack() && <Button.Back onPress={() => router.back()} />}

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 90,
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
              value={email}
              onChangeText={setEmail}
            />
            <TextInput.Base
              ref={passwordInputRef}
              label={Utils.Constants.Text.login.passwordLabel}
              placeholder={Utils.Constants.Text.login.passwordPlaceholder}
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={login}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
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
              onPress={() =>
                router.push(Utils.Constants.Routes.unprotected.forgotPassword)
              }
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
