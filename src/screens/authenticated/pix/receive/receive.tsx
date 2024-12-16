import * as Clipboard from "expo-clipboard";
import { Alert, TouchableOpacity, View } from "react-native";

import { Image } from "@/assets/images";
import { Button, Template, Text } from "@/components/ui";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const Texts = Utils.Constants.Text.authenticated.pix;

const mock_pix_key = "29d2fdda-76b8-4cd4-820e-39b50103a1f4";

export function Receive({ navigation }: RouteStackParams<"PixReceive">) {
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
          gap: theme.spacing.xxs,
          marginTop: BACK_BUTTON_HEIGHT + theme.spacing.xs,
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
          <Text.Base style={{ fontSize: theme.font.size.lg }}>
            {Texts.receive.title}
          </Text.Base>

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
                }}
              >
                {" "}
                {mock_pix_key}
              </Text.Base>
            </Text.Base>
          </TouchableOpacity>
        </View>
        <Image.Minus />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: theme.size.full,
            padding: theme.spacing.xxxs,
            borderWidth: theme.borderWidth.hairline,
            borderColor: theme.color.white["024"],
            borderRadius: theme.borderRadius.sm,
          }}
          onPress={() => navigation.navigate("PixReceiveCustomValue")}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: theme.spacing.base,
            }}
          >
            <Image.Edit />
            <Text.Base>{Texts.receive.customValue}</Text.Base>
          </View>
          <Image.Chevron.Right
            path={{ stroke: theme.color.secondary.normal }}
          />
        </TouchableOpacity>
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
