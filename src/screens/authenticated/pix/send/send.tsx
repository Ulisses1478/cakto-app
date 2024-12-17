import { useState } from "react";
import { Alert, View } from "react-native";

import { Button, Flex, Template, Text, TextInput } from "@/components/ui";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const IntlNumber = Utils.Intl.Number;
const handleCurrency = IntlNumber.formatCurrency;
const Texts = Utils.Constants.Text.authenticated.pix;
const mock_total_value = Math.random() * 10 * 1000;

export function Send({ navigation }: RouteStackParams<"PixSend">) {
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
      }}
    >
      <View
        style={{
          gap: theme.spacing.xxxs,
          marginTop: BACK_BUTTON_HEIGHT,
          flex: 1,

          width: theme.size.full,
        }}
      >
        <View
          style={{
            gap: theme.spacing.nano,
            width: theme.size.full,
          }}
        >
          <Text.Base style={{ fontSize: theme.font.size.md, lineHeight: 30 }}>
            {Texts.send.home.title}
          </Text.Base>
          <Flex>
            <Text.Base
              style={{
                fontSize: theme.font.size.xxs,
                lineHeight: 21,
                fontWeight: theme.font.weight.regular,
                fontFamily: theme.font.family.regular,
              }}
            >
              {Texts.send.home.description}
            </Text.Base>
            <Text.Base
              style={{
                fontSize: theme.font.size.xxs,
                lineHeight: 21,
              }}
            >
              {handleCurrency(mock_total_value)}
            </Text.Base>
          </Flex>
        </View>
        <TextInput.Base
          value={value}
          onChangeText={(text) => {
            const numbers = IntlNumber.getOnlyNumbers(text);
            setValue(
              handleCurrency(Number(numbers) / 100, {
                minimumFractionDigits: 2,
              })
            );
          }}
          placeholder="R$ 0,00"
          maxLength={17}
          keyboardType="number-pad"
          style={{ width: theme.size.full }}
        />
      </View>
      <View style={{ gap: theme.spacing.base }}>
        <Button.Base
          title={Texts.send.home.buttons.continue}
          style={{
            backgroundColor: theme.color.secondary.normal,
            marginBottom: theme.spacing.base,
          }}
          onPress={() => Alert.alert("Continuar")}
        />
      </View>
    </Template.Base>
  );
}
