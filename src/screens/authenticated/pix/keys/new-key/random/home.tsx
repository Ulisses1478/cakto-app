import { useState } from "react";
import { View } from "react-native";

import { icons_by_type } from "../../utils";

import { Button, Flex, Template, Text } from "@/components/ui";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";
import { RouteStackParams } from "@/navigation/routes";
import { Service, ServiceEnums } from "@/services";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const t = Utils.Constants.Text.t;
const utils = Utils.Constants.Text.authenticated.pix.keys;
const Texts = utils.create.random.home;

export function Home({ navigation }: RouteStackParams<"PixNewKeyRandomHome">) {
  const [loading, setLoading] = useState(false);

  async function handleCreate(key: string) {
    setLoading(true);
    Service.Pix.Key.create(key).finally(() => {
      setLoading(false);
      navigation.navigate("PixNewKeyConfirmation", {
        type: t(utils.keyTypes.key, { value: utils.keyTypes.evp }),
      });
    });
  }

  return (
    <Template.Base
      asBackgroundImage={{
        source: "home",
      }}
      canGoBack={navigation.canGoBack()}
      goBack={() => navigation.goBack()}
    >
      <View
        style={{
          marginTop: BACK_BUTTON_HEIGHT,
          justifyContent: "space-between",
          gap: theme.spacing.xxs,
          flex: 1,
        }}
      >
        <View style={{ flex: 1, gap: theme.spacing.xxs }}>
          <View style={{ gap: theme.spacing.nano }}>
            <Text.Base style={{ fontSize: theme.font.size.lg, lineHeight: 36 }}>
              {Texts.title}
            </Text.Base>
            <Text.Base
              style={{
                fontSize: theme.font.size.xxxs,
                fontWeight: theme.font.weight.regular,
                lineHeight: 21,
                fontFamily: theme.font.family.regular,
              }}
            >
              {Texts.description}
            </Text.Base>
          </View>
          <Flex style={{ gap: theme.spacing.xxxs }}>
            {icons_by_type[ServiceEnums.Pix.Key.PIX_KEY_TYPES.RANDOM]()}
            <View>
              <Text.Base style={{ fontSize: theme.font.size.xxs }}>
                {Texts.label}
              </Text.Base>
              <Text.Base
                style={{
                  fontSize: theme.font.size.xxxs,
                  fontWeight: theme.font.weight.regular,
                  fontFamily: theme.font.family.regular,
                  color: theme.color.white["080"],
                }}
              >
                1eb7fcc9-98f5-44a8-96e4-f1af2cf54bc8
              </Text.Base>
            </View>
          </Flex>
        </View>

        <Button.Base
          isLoading={loading}
          onPress={() => {
            handleCreate("");
          }}
          title={Texts.buttons.register}
          style={{ backgroundColor: theme.color.secondary.normal }}
        />
      </View>
    </Template.Base>
  );
}
