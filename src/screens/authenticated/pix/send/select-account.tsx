import { ScrollView, TouchableOpacity, View } from "react-native";

import { Image } from "@/assets/images";
import { Avatar, Flex, Template, Text } from "@/components/ui";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const IntlNumber = Utils.Intl.Number;
const handleCurrency = IntlNumber.formatCurrency;
const Texts = Utils.Constants.Text.authenticated.pix.send.selectBankAccount;

const mock_receiver = "Jhon Doe";

function generateRandomId() {
  return String(Date.now() + Number(Math.random() * 1000));
}

const mock_accounts = [
  { id: generateRandomId(), name: "Cakto" },
  { id: generateRandomId(), name: "Banco do Brasil" },
  { id: generateRandomId(), name: "Nubank" },
  { id: generateRandomId(), name: "C6 Bank" },
  { id: generateRandomId(), name: "Banco Inter" },
  { id: generateRandomId(), name: "Itaú" },
  { id: generateRandomId(), name: "Bradesco" },
];

export function SelectBankAccount({
  navigation,
  route,
}: RouteStackParams<"PixSendSelectBankAccount">) {
  const pixKey = route.params.pixKey;
  const unparsedValue = Number(route.params?.value) || 0;
  const pixValue = handleCurrency(unparsedValue / 100);

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
          gap: theme.spacing.xxxs,
          marginTop: BACK_BUTTON_HEIGHT,
          flex: 1,
          width: theme.size.full,
        }}
      >
        <Flex style={{ gap: theme.spacing.xxxs }}>
          <Avatar fallback={mock_receiver} scheme="dark" />
          <Text.Base style={{ fontSize: theme.font.size.sm }}>
            {mock_receiver}
          </Text.Base>
        </Flex>
        <Flex style={{ gap: theme.spacing.quarck }}>
          <Text.Base
            style={{
              color: theme.color.white["064"],
              fontWeight: theme.font.weight.regular,
              fontFamily: theme.font.family.regular,
            }}
          >
            {Texts.description}
          </Text.Base>
          <Text.Base>{pixValue}</Text.Base>
        </Flex>
        <Text.Base style={{ lineHeight: 24 }}>{Texts.title}</Text.Base>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              gap: theme.spacing.xxxs,
              marginBottom: 50,
            }}
          >
            {mock_accounts.map((account) => (
              <TouchableOpacity
                key={account.id}
                style={{
                  flexDirection: "row",
                  gap: theme.spacing.xxxs,
                  alignItems: "center",
                  backgroundColor: theme.color.secondary.dark,
                  padding: theme.spacing.xxxs,
                  borderRadius: theme.borderRadius.sm,
                }}
                onPress={() =>
                  navigation.navigate("PixSendConfirmation", {
                    pixKey,
                    value: IntlNumber.getOnlyNumbers(pixValue),
                    bankAccount: account,
                  })
                }
              >
                <Image.Pix.Icon24 />
                <View style={{ gap: theme.spacing.quarck }}>
                  <Text.Base>{account.name}</Text.Base>
                  <Text.Base
                    style={{
                      color: theme.color.white["064"],
                      fontWeight: theme.font.weight.regular,
                      fontFamily: theme.font.family.regular,
                    }}
                  >
                    {pixKey}
                  </Text.Base>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </Template.Base>
  );
}
