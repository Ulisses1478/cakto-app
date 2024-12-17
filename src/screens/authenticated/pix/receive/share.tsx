import * as Clipboard from "expo-clipboard";
import { Alert, TouchableOpacity, View } from "react-native";

import { Image } from "@/assets/images";
import { Button, Template, Text } from "@/components/ui";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const IntlNumber = Utils.Intl.Number;
const handleCurrency = IntlNumber.formatCurrency;
const Texts = Utils.Constants.Text.authenticated.pix;
const mock_pix_key = "29d2fdda-76b8-4cd4-820e-39b50103a1f4";

export function Share({
  navigation,
  route,
}: RouteStackParams<"PixReceiveShare">) {
  const unparsedValue = Number(route.params?.value) || 0;
  const value = handleCurrency(unparsedValue / 100);
  const hasValidValue = unparsedValue > 0;

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
      headerProps={{
        title: Texts.receive.title,
        rightIcon: (
          <TouchableOpacity
            style={{ zIndex: 1 }}
            onPress={() => navigation.popTo("Home")}
          >
            <Image.Home />
          </TouchableOpacity>
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
            gap: theme.spacing.xxxs,
            width: theme.size.full,
            alignItems: "center",
          }}
        >
          <Image.Pix.MockQrCode />

          <TouchableOpacity
            onPress={() => Clipboard.setStringAsync(mock_pix_key)}
          >
            <Text.Base
              numberOfLines={1}
              style={{
                fontSize: theme.font.size.xxs,
                marginTop: theme.spacing.base,
              }}
            >
              {Texts.randomKey}
              <Text.Base
                style={{
                  fontWeight: theme.font.weight.medium,
                  fontFamily: theme.font.family.medium,
                  fontSize: theme.font.size.xxxs,
                  color: theme.color.white["064"],
                }}
              >
                {" "}
                {mock_pix_key}
              </Text.Base>
            </Text.Base>
          </TouchableOpacity>
          {hasValidValue && (
            <View style={{ gap: theme.spacing.quarck, alignItems: "center" }}>
              <Text.Base style={{ fontSize: theme.font.size.lg }}>
                {value}
              </Text.Base>
              <Text.Base
                style={{
                  color: theme.color.white["064"],
                  fontSize: theme.font.size.xxxs - 2,
                  fontFamily: theme.font.family.regular,
                  fontWeight: theme.font.weight.regular,
                }}
              >
                {Texts.receive.confirmation.descriptionWithValue}
              </Text.Base>
            </View>
          )}
        </View>
      </View>
      <View style={{ gap: theme.spacing.base }}>
        <Button.Base
          title={Texts.receive.buttons.shareQrCode}
          style={{ backgroundColor: theme.color.secondary.normal }}
          onPress={() => Alert.alert("Compartilhar QR code")}
        />
        <Button.Base
          variant="unfilled"
          title={Texts.receive.buttons.shareCopyAndPaste}
          onPress={() => Alert.alert("Compartilhar Pix Copia e Cola")}
        />
      </View>
    </Template.Base>
  );
}
