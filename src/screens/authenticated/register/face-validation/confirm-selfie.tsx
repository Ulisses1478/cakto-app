import { View } from "react-native";

import { Image } from "@/assets/images";
import { Button, Template, Text } from "@/components/ui";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const Texts =
  Utils.Constants.Text.authenticated.register.faceValidation.confirmSelfie;
export function ConfirmSelfie({
  navigation,
}: RouteStackParams<"RegisterFaceValidationConfirmSelfie">) {
  return (
    <Template.Base>
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <View style={{ gap: theme.spacing.xs }}>
          <Image.CaktoShareScreen
            svg={{ style: { marginTop: theme.spacing.xs } }}
          />

          <Text.Base style={{ fontSize: theme.font.size.lg, lineHeight: 24 }}>
            {Texts.title}
          </Text.Base>

          <View
            style={{
              width: theme.size.full,
              height: 345,
              borderWidth: theme.borderWidth.thin,
              borderColor: theme.color.white["100"],
              borderRadius: theme.borderRadius.md,
              backgroundColor: theme.color.white["080"],
            }}
          />
        </View>
        <View style={{ gap: theme.spacing.xxxs }}>
          <Button.Base
            textProps={{ color: theme.color.secondary.normal }}
            title={Texts.buttons.continue}
            onPress={() => {
              navigation.popTo("Home");
            }}
          />
          <Button.Base
            variant="unfilled"
            onPress={() => {
              navigation.popTo("Home");
            }}
            title={Texts.buttons.retake}
          />
        </View>
      </View>
    </Template.Base>
  );
}
