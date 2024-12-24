import { TouchableOpacity, View } from "react-native";

import { Image } from "@/assets/images";
import { Button, Template, Text, TextInput } from "@/components/ui";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const IntlNumber = Utils.Intl.Number;
const handleCurrency = IntlNumber.formatCurrency;
const Texts = Utils.Constants.Text.authenticated.pix;
const mock_pix_key = "29d2fdda-76b8-4cd4-820e-39b50103a1f4";

export function Confirmation({
  navigation,
  route,
}: RouteStackParams<"PixReceiveConfirmation">) {
  const unparsedValue = Number(route.params?.value) || 0;
  const value = handleCurrency(unparsedValue / 100);
  const hasValidValue = unparsedValue > 0;

  const buttonWithValue = Texts.receive.confirmation.buttons.withValue.replace(
    "{value}",
    value
  );
  const buttonWithoutValue = Texts.receive.confirmation.buttons.withoutValue;

  const buttonTitle = Texts.receive.confirmation.buttons.create.replace(
    "{value}",
    hasValidValue ? buttonWithValue : buttonWithoutValue
  );

  return (
    <Template.Base
      asBackgroundImage={{
        source: "home",
      }}
      canGoBack={navigation.canGoBack()}
      goBack={() => navigation.goBack()}
      keyboardAvoindgViewProps={{
        behavior: undefined,
      }}
      headerProps={{
        title: Texts.receive.confirmation.title,
      }}
      scrollViewProps={{
        wrapWithScrollView: true,
        footer: (
          <Button.Base
            onPress={() =>
              navigation.navigate("PixReceiveShare", {
                value: route.params.value,
              })
            }
            title={buttonTitle}
            style={{
              backgroundColor: theme.color.secondary.normal,
              marginBottom: theme.spacing.xxs,
            }}
          />
        ),
      }}
    >
      <View
        style={{
          gap: theme.spacing.xxs,
          marginTop: BACK_BUTTON_HEIGHT,
          flex: 1,
          alignItems: "center",
          width: theme.size.full,
        }}
      >
        <View
          style={{
            borderRadius: theme.borderRadius.pill,
            width: theme.size.lg,
            height: theme.size.lg,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.color.white["024"],
          }}
        >
          <Image.Pix.CircleDollarSign />
        </View>
        <View style={{ gap: theme.spacing.quarck, alignItems: "center" }}>
          {hasValidValue && (
            <Text.Base style={{ fontSize: theme.font.size.md }}>
              {value}
            </Text.Base>
          )}
          <Text.Base
            style={{
              color: theme.color.white["064"],
              fontSize: theme.font.size.xxxs - 2,
              fontFamily: theme.font.family.regular,
              fontWeight: theme.font.weight.regular,
            }}
          >
            {hasValidValue
              ? Texts.receive.confirmation.descriptionWithValue
              : Texts.receive.confirmation.descriptionWithoutValue}
          </Text.Base>
        </View>
        {navigation.canGoBack() && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text.Base
              style={{
                fontSize: theme.font.size.xxs,
                color: theme.color.secondary.normal,
              }}
            >
              {Texts.receive.confirmation.buttons.edit}
            </Text.Base>
          </TouchableOpacity>
        )}
        <View style={{ width: theme.size.full }}>
          <Text.Base>{Texts.randomKey}</Text.Base>
          <Text.Base
            style={{
              color: theme.color.white["064"],
              fontSize: theme.font.size.xxxs - 2,
              fontFamily: theme.font.family.regular,
              fontWeight: theme.font.weight.regular,
            }}
          >
            {mock_pix_key}
          </Text.Base>
        </View>

        <View style={{ width: theme.size.full }}>
          <TextInput.Base
            label={Texts.receive.confirmation.inputMessageLabel}
            placeholder={Texts.receive.confirmation.inputMessagePlaceholder}
            returnKeyType="done"
            bottomRightProps={{
              text: Texts.receive.confirmation.optional,
            }}
            maxLength={25}
          />
        </View>
      </View>
    </Template.Base>
  );
}
