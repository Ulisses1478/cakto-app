import { View } from "react-native";

import { Image } from "@/assets/images";
import { Button, Template, Text } from "@/components/ui";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const Texts = Utils.Constants.Text.authenticated.register.faceValidation.home;
export function Home({
  navigation,
}: RouteStackParams<"RegisterFaceValidationHome">) {
  return (
    <Template.Base>
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <View style={{ gap: theme.spacing.xs }}>
          <Image.CaktoShareScreen
            svg={{ style: { marginTop: theme.spacing.xs } }}
          />

          <View style={{ gap: theme.spacing.nano }}>
            <Text.Base style={{ fontSize: theme.font.size.lg, lineHeight: 24 }}>
              {Texts.title}
            </Text.Base>
            <Text.Base
              style={{
                lineHeight: 24,
                fontFamily: theme.font.family.medium,
                fontWeight: theme.font.weight.medium,
                fontSize: theme.font.size.xxs,
              }}
            >
              {Texts.description}
            </Text.Base>
          </View>
          <View>
            {Texts.instrunctions.map((instruction, index) => (
              <Text.Base
                key={index}
                style={{
                  fontWeight: theme.font.weight.medium,
                  fontFamily: theme.font.family.medium,
                  lineHeight: 24,
                }}
              >
                {instruction}
              </Text.Base>
            ))}
          </View>
        </View>
        <Button.Base
          onPress={() =>
            navigation.navigate("RegisterFaceValidationConfirmSelfie")
          }
          textProps={{ color: theme.color.secondary.normal }}
          title={Texts.buttons.continue}
        />
      </View>
    </Template.Base>
  );
}
