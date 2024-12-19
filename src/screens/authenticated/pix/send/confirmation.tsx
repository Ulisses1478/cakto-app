import { TouchableOpacity, View } from "react-native";

import { Image } from "@/assets/images";
import { Button, Template, Text } from "@/components/ui";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const IntlNumber = Utils.Intl.Number;
const handleCurrency = IntlNumber.formatCurrency;
const Texts = Utils.Constants.Text.authenticated.pix.send.confirmation;
const mock_receiver = "Jhon Doe";

export function Confirmation({
  navigation,
  route,
}: RouteStackParams<"PixSendConfirmation">) {
  const unparsedValue = Number(route.params?.value) || 0;
  const pixValue = handleCurrency(unparsedValue / 100);
  // const pixKey = route.params.pixKey;
  const bankAccount = route.params.bankAccount;

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
          <Button.Base
            title={Texts.buttons.transfer.replace("{value}", pixValue)}
            style={{ backgroundColor: theme.color.secondary.normal }}
          />
        ),
      }}
    >
      <View
        style={{
          gap: theme.spacing.xxs,
          marginTop: BACK_BUTTON_HEIGHT,
          flex: 1,
          width: theme.size.full,
        }}
      >
        <View style={{ gap: theme.spacing.nano }}>
          <Text.Base
            style={{
              fontSize: theme.font.size.md,
              lineHeight: 20,
              fontWeight: theme.font.weight.medium,
              fontFamily: theme.font.family.medium,
              color: theme.color.white["080"],
            }}
          >
            {Texts.title}
          </Text.Base>
          <Text.Base style={{ fontSize: theme.font.size.xl, lineHeight: 32 }}>
            {pixValue}
          </Text.Base>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: theme.spacing.quarck,
              gap: theme.spacing.nano,
            }}
          >
            <Image.Edit path={{ stroke: theme.color.secondary.bright }} />
            <Text.Base
              style={{
                fontSize: theme.font.size.xxs,
                color: theme.color.secondary.bright,
              }}
            >
              {Texts.edit}
            </Text.Base>
          </TouchableOpacity>
        </View>

        <View style={{ gap: theme.spacing.nano }}>
          <Text.Base
            style={{
              fontWeight: theme.font.weight.medium,
              fontFamily: theme.font.family.medium,
              color: theme.color.white["080"],
            }}
          >
            {Texts.to}
          </Text.Base>
          <Text.Base style={{ fontSize: theme.font.size.lg }}>
            {mock_receiver}
          </Text.Base>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: theme.spacing.base,
              paddingVertical: theme.spacing.nano,
              gap: theme.spacing.nano,
              marginTop: theme.spacing.quarck,
              backgroundColor: theme.color.white["012"],
              borderRadius: theme.borderRadius.sm,
            }}
          >
            <Image.Chat />
            <Text.Base style={{ color: theme.color.secondary.bright }}>
              {Texts.message}
            </Text.Base>
          </TouchableOpacity>
        </View>

        <View>
          <Text.Base
            style={{
              fontWeight: theme.font.weight.medium,
              fontFamily: theme.font.family.medium,
              color: theme.color.white["080"],
            }}
          >
            {Texts.cpf}
          </Text.Base>
          <Text.Base>***.000.000-**</Text.Base>
        </View>
        <View>
          <Text.Base
            style={{
              fontWeight: theme.font.weight.medium,
              fontFamily: theme.font.family.medium,
              color: theme.color.white["080"],
            }}
          >
            {Texts.bank}
          </Text.Base>
          <Text.Base>{bankAccount.name}</Text.Base>
        </View>
        <View>
          <Text.Base
            style={{
              fontWeight: theme.font.weight.medium,
              fontFamily: theme.font.family.medium,
              color: theme.color.white["080"],
            }}
          >
            {Texts.agency}
          </Text.Base>
          <Text.Base>1</Text.Base>
        </View>
        <View>
          <Text.Base
            style={{
              fontWeight: theme.font.weight.medium,
              fontFamily: theme.font.family.medium,
              color: theme.color.white["080"],
            }}
          >
            {Texts.account}
          </Text.Base>
          <Text.Base>125641-6</Text.Base>
        </View>
      </View>
    </Template.Base>
  );
}
