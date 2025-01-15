import { View } from "react-native";

import { Image } from "@/assets/images";
import { Button, Template, Text } from "@/components/ui";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const t = Utils.Constants.Text.t;
const Texts = Utils.Constants.Text.authenticated.pix.keys;

export function Confirmation({
  navigation,
  route,
}: RouteStackParams<"PixNewKeyConfirmation">) {
  const { type } = route.params;
  return (
    <Template.Base asBackgroundImage={{ source: "home" }}>
      <Image.CaktoShareScreen />
      <View
        style={{ flex: 1, justifyContent: "center", gap: theme.spacing.xxxs }}
      >
        <Image.Success.CheckCircleLarge />
        <Text.Base
          style={{
            fontSize: theme.font.size.lg,
            lineHeight: 36,
          }}
        >
          {t(Texts.create.confirmationTitle, { type })}
        </Text.Base>
        <View style={{ gap: theme.spacing.xxxs }}>
          <Button.Base
            textProps={{ color: theme.color.white[100] }}
            onPress={() => navigation.popTo("Home")}
            style={{ backgroundColor: theme.color.secondary.normal }}
            title={Texts.confirmationButtons.backToHome}
          />
          <Button.Base
            variant="unfilled"
            onPress={() => {
              navigation.reset({
                index: 1,
                routes: [{ name: "Home" }, { name: "PixHome" }],
              });
            }}
            style={{ borderColor: "transparent" }}
            title={Texts.confirmationButtons.backToPixArea}
          />
        </View>
      </View>
    </Template.Base>
  );
}
