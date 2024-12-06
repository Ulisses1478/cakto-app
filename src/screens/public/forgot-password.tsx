import { useRef, useState } from "react";
import { Keyboard, View } from "react-native";
import Recaptcha, { RecaptchaRef } from "react-native-recaptcha-that-works";
import { Button, Modal, Template, Text, TextInput } from "@/components/ui";
import { theme } from "@/styles/theme";
import { Service } from "@/services";
import { Utils } from "@/utils";
import { RouteStackParams } from "@/navigation/routes";

export function ForgotPassword({
  navigation,
  route,
}: RouteStackParams<"ForgotPassword">) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(route.params?.email || "");
  const [isFocused, setIsFocused] = useState(false);
  const recaptcha = useRef<RecaptchaRef>(null);

  async function forgotPassword(recaptchaToken: string) {
    setIsFocused(false);
    setIsLoading(true);
    Keyboard.dismiss();
    try {
      await Service.Auth.forgotPassword({
        email,
        recaptchaToken,
      });

      navigation.navigate("ConfirmResetCode", { email });
    } finally {
      setIsLoading(false);
    }
  }

  function callRecaptcha() {
    setIsFocused(false);
    Keyboard.dismiss();
    recaptcha.current?.open();
  }

  return (
    <Template.Base
      style={{
        paddingTop: theme.spacing.sm,
      }}
      isLoading={isLoading}
      keyboardIsOpen={isFocused}
      canGoBack={navigation.canGoBack()}
      goBack={() => navigation.pop()}
      scrollViewProps={{
        wrapWithScrollView: true,
      }}
    >
      <View>
        <Recaptcha
          ref={recaptcha}
          siteKey={process.env.EXPO_PUBLIC_RECAPTCHA_SITE_KEY}
          baseUrl={process.env.EXPO_PUBLIC_RECAPTCHA_SITE_DOMAIN}
          onVerify={forgotPassword}
          size="invisible"
          action={process.env.EXPO_PUBLIC_RECAPTCHA_RECOVERY_ACTION}
          loadingComponent={<Modal.Loading />}
          enterprise
          hideBadge
          lang="pt-BR"
          onLoad={() => {
            setIsLoading(true);
          }}
          onError={(e) => {
            recaptcha.current?.close();
          }}
          onClose={() => {
            setIsLoading(true);
          }}
        />

        <View style={{ gap: theme.spacing.nano }}>
          <Text.Base style={{ fontSize: theme.font.size.lg, lineHeight: 30 }}>
            {Utils.Constants.Text.forgotPassword.title}
          </Text.Base>
          <Text.Base
            style={{
              fontWeight: theme.font.weight.medium,
              fontFamily: theme.font.family.medium,
              fontSize: theme.font.size.xs,
              lineHeight: 24,
            }}
          >
            {Utils.Constants.Text.forgotPassword.description}
          </Text.Base>
        </View>

        <View style={{ gap: theme.spacing.sm, marginTop: theme.spacing.sm }}>
          <TextInput.Base
            keyboardType="email-address"
            label={Utils.Constants.Text.forgotPassword.emailLabel}
            placeholder={Utils.Constants.Text.forgotPassword.emailPlaceholder}
            returnKeyType="send"
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={callRecaptcha}
            autoCapitalize="none"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <Button.Base
            title={Utils.Constants.Text.forgotPassword.sendCode}
            variant="filled"
            textProps={{ color: theme.color.secondary.normal }}
            onPress={callRecaptcha}
            isLoading={isLoading}
          />
        </View>
      </View>
    </Template.Base>
  );
}
