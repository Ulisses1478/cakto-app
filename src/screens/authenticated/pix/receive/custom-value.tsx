import { useState } from "react";
import { View } from "react-native";

import { Image } from "@/assets/images";
import { Button, Flex, Template, Text, TextInput } from "@/components/ui";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const handleCurrency = Utils.Intl.Number.formatCurrency;
const Texts = Utils.Constants.Text.authenticated.pix;

export function CustomValue({
  navigation,
}: RouteStackParams<"PixReceiveCustomValue">) {
  const [value, setValue] = useState(handleCurrency(0));
  return (
    <Template.Base
      asBackgroundImage={{
        source: "home",
      }}
      canGoBack={navigation.canGoBack()}
      goBack={() => navigation.goBack()}
      scrollViewProps={{
        wrapWithScrollView: true,
        footer: (
          <View
            style={{
              gap: theme.spacing.xxxs,
              width: theme.size.full,
              marginBottom: theme.spacing.xs,
            }}
          >
            <Flex
              style={{
                backgroundColor: theme.color.white["012"],
                borderRadius: theme.borderRadius.sm,
                padding: theme.spacing.nano,
                gap: theme.spacing.nano,
              }}
            >
              <Image.Warning.Alert />
              <Text.Base
                style={{
                  fontSize: theme.font.size.xxxs,
                  fontFamily: theme.font.family.regular,
                  fontWeight: theme.font.weight.regular,
                }}
              >
                {Texts.customValue.information}
              </Text.Base>
            </Flex>

            <Button.Base
              onPress={() => console.log("Continuar")}
              title={Texts.customValue.buttons.continue}
              style={{ backgroundColor: theme.color.secondary.normal }}
            />
          </View>
        ),
      }}
    >
      <View
        style={{
          gap: theme.spacing.xxs,
          marginTop: BACK_BUTTON_HEIGHT + theme.spacing.xs,
          flex: 1,
          alignItems: "center",
          width: theme.size.full,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            gap: theme.spacing.xxxs,
            width: theme.size.full,
            alignItems: "center",
          }}
        >
          <Text.Base style={{ fontSize: theme.font.size.lg }}>
            {Texts.customValue.title}
          </Text.Base>

          <TextInput.Base
            style={{
              fontSize: theme.font.size.lg,
              borderWidth: 0,
              borderBottomWidth: theme.borderWidth.hairline,
              minWidth: 180,
              color: theme.color.secondary.normal,
              padding: theme.spacing.nano,
              textAlign: "center",
            }}
            placeholder="R$ 0,00"
            value={value}
            onChangeText={(t) => {
              // TODO: ajustar a aparição de 3 decimais após a virgula
              const number = t.replace(/\D/g, "");
              setValue(
                handleCurrency(Number(number) / 100, {
                  minimumFractionDigits: 2,
                })
              );
            }}
            maxLength={17}
            placeholderTextColor={theme.color.secondary.normal}
            keyboardType="number-pad"
            keyboardAppearance="dark"
            returnKeyType="done"
            autoFocus
          />
          <Text.Base
            style={{
              color: theme.color.white["064"],
              fontSize: theme.font.size.xxxs - 2,
              fontFamily: theme.font.family.regular,
              fontWeight: theme.font.weight.regular,
            }}
          >
            {Texts.customValue.description}
          </Text.Base>
        </View>
      </View>
    </Template.Base>
  );
}
