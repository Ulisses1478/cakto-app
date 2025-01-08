import * as Clipboard from "expo-clipboard";
import { Alert, Pressable, TouchableOpacity, View } from "react-native";

import { Image } from "@/assets/images";
import { Template, Text } from "@/components/ui";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";

const Texts = Utils.Constants.Text.authenticated.pix;

const options = [
  {
    label: Texts.home.options.send,
    icon: <Image.Pix.Send />,
    route: "PixSend",
  },
  {
    label: Texts.home.options.receive,
    icon: <Image.Pix.Receive />,
    route: "PixReceive",
  },
  {
    label: Texts.home.options.copyAndPaste,
    icon: <Image.Pix.CopyAndPaste />,
    route: "PixSendCopyAndPaste",
  },
  {
    label: Texts.home.options.readQrCode,
    icon: <Image.Pix.ReadQrCode />,
    route: "",
  },
];

const mock_pix_key = "29d2fdda-76b8-4cd4-820e-39b50103a1f4";

export function Home({ navigation }: RouteStackParams<"PixHome">) {
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
          marginTop: BACK_BUTTON_HEIGHT,
          justifyContent: "space-between",
          gap: theme.spacing.xxs,
        }}
      >
        <View style={{ gap: theme.spacing.xxs }}>
          <View style={{ gap: theme.spacing.nano }}>
            <Text.Base style={{ fontSize: theme.font.size.lg, lineHeight: 36 }}>
              {Texts.home.title}
            </Text.Base>
            <Text.Base
              style={{
                fontSize: theme.font.size.xxs,
                fontWeight: theme.font.weight.regular,
                lineHeight: 21,
                fontFamily: theme.font.family.regular,
              }}
            >
              {Texts.home.description}
            </Text.Base>
          </View>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: theme.size.full,
              flex: 1,
            }}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                onPress={() => {
                  if (!option.route) {
                    Alert.alert(option.label);
                    return;
                  }

                  navigation.navigate(option.route as never);
                }}
                key={option.label}
                style={{
                  gap: theme.spacing.nano,
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  marginTop: index > 1 ? theme.spacing.xxxs : 0,
                  maxWidth: 170,
                }}
              >
                <View
                  style={{
                    backgroundColor: theme.color.secondary.dark,
                    paddingVertical: theme.spacing.base,
                    paddingHorizontal: theme.spacing.base,
                    borderRadius: theme.borderRadius.base,
                    alignItems: "center",
                  }}
                >
                  <View>{option.icon}</View>
                </View>
                <Text.Base
                  style={{
                    fontSize: theme.font.size.xxxs,
                    fontWeight: theme.font.weight.medium,
                    fontFamily: theme.font.family.medium,
                    textAlign: "center",
                  }}
                >
                  {option.label}
                </Text.Base>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={{
              gap: theme.spacing.xxxs,
              alignItems: "center",
              marginTop: theme.spacing.base,
            }}
          >
            <View
              style={{
                backgroundColor: theme.color.white[100],
                borderRadius: theme.borderRadius.base,
                padding: theme.spacing.xxxs + 4,
              }}
            >
              <Image.Pix.MockQrCode />
            </View>

            <TouchableOpacity
              // TODO: Colocar feedback
              onPress={() => Clipboard.setStringAsync(mock_pix_key)}
              style={{
                padding: theme.spacing.base,
                borderRadius: theme.borderRadius.sm,
                backgroundColor: theme.color.white["008"],
                width: theme.size.full,
                alignItems: "center",
                gap: theme.spacing.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: theme.spacing.nano,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image.Pix.Copy />
                <Text.Base style={{ fontSize: theme.font.size.xxs }}>
                  {Texts.randomKey}
                </Text.Base>
              </View>
              <Text.Base
                style={{
                  fontSize: theme.font.size.xxxs,
                  fontWeight: theme.font.weight.regular,
                  fontFamily: theme.font.family.regular,
                }}
              >
                {mock_pix_key}
              </Text.Base>
            </TouchableOpacity>
          </View>
        </View>

        <Pressable
          style={{
            flexDirection: "row",
            gap: theme.spacing.nano,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => Alert.alert(Texts.home.myKeys)}
        >
          <Image.Pix.Key />
          <Text.Base style={{ textAlign: "center" }}>
            {Texts.home.myKeys}
          </Text.Base>
        </Pressable>
      </View>
    </Template.Base>
  );
}
