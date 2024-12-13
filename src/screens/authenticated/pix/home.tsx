import { Alert, Pressable, TouchableOpacity, View } from "react-native";

import { Image } from "@/assets/images";
import { Template, Text } from "@/components/ui";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const Texts = Utils.Constants.Text.authenticated.pix.home;

const options = [
  {
    label: Texts.options.send,
    icon: <Image.Pix.Send />,
    onPress: () => {
      Alert.alert(Texts.options.send);
    },
  },
  {
    label: Texts.options.receive,
    icon: <Image.Pix.Receive />,
    onPress: () => {
      Alert.alert(Texts.options.receive);
    },
  },
  {
    label: Texts.options.copyAndPaste,
    icon: <Image.Pix.CopyAndPaste />,
    onPress: () => {
      Alert.alert(Texts.options.copyAndPaste);
    },
  },
  {
    label: Texts.options.readQrCode,
    icon: <Image.Pix.ReadQrCode />,
    onPress: () => {
      Alert.alert(Texts.options.readQrCode);
    },
  },
];

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
        footer: (
          <Pressable
            style={{
              flexDirection: "row",
              gap: theme.spacing.nano,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => Alert.alert(Texts.myKeys)}
          >
            <Image.Pix.Key />
            <Text.Base style={{ textAlign: "center" }}>
              {Texts.myKeys}
            </Text.Base>
          </Pressable>
        ),
      }}
    >
      <View style={{ gap: theme.spacing.xxs, marginTop: theme.spacing.xs }}>
        <View style={{ gap: theme.spacing.nano }}>
          <Text.Base style={{ fontSize: theme.font.size.lg, lineHeight: 36 }}>
            {Texts.title}
          </Text.Base>
          <Text.Base
            style={{
              fontSize: theme.font.size.xxs,
              fontWeight: theme.font.weight.regular,
              lineHeight: 21,
              fontFamily: theme.font.family.regular,
            }}
          >
            {Texts.description}
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
              onPress={option.onPress}
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
            onPress={() => Alert.alert(Texts.randomKey)}
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
                fontSize: theme.font.size.xxs,
                fontWeight: theme.font.weight.regular,
                fontFamily: theme.font.family.regular,
              }}
            >
              d123123asdasdqweqwe
            </Text.Base>
          </TouchableOpacity>
        </View>
      </View>
    </Template.Base>
  );
}
