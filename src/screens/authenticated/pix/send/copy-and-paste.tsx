import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";

import { Button, Template, Text, TextInput } from "@/components/ui";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const Texts = Utils.Constants.Text.authenticated.pix.send.copyAndPaste;

const mock_pix_key = "29d2fdda-76b8-4cd4-820e-39b50103a1f4";

export function CopyAndPaste({ navigation }: RouteStackParams<"PixSend">) {
  const [value, setValue] = useState("");

  function handleSubmit(data: string) {
    if (!data) {
      return;
    }

    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }

    // TODO: Ao integrar com backend, preciso enviar a instituição financeira e demais dados como valor, etc...
    const mock_value = Math.floor(Math.random() * 10);
    navigation.navigate("PixSendConfirmation", {
      pixKey: mock_pix_key,
      value: String(mock_value),
      canEditFromAutomaticSource: mock_value === 0,
      bankAccount: { id: "1", name: "Cakto" },
      fromAutomaticSource: true,
    });
  }

  useEffect(() => {
    Clipboard.hasStringAsync().then((has) => {
      if (has) {
        Clipboard.getStringAsync().then((text) => {
          if (text.includes("GOV")) {
            setValue(text);
            if (Keyboard.isVisible()) {
              Keyboard.dismiss();
            }
          }
        });
      }
    });
  }, []);

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
            {Texts.title}
          </Text.Base>

          <TextInput.Base
            value={value}
            onChangeText={setValue}
            placeholder={Texts.inputPlaceholder}
            style={{
              width: theme.size.full,
            }}
            onSubmitEditing={() => handleSubmit(value)}
            returnKeyType="send"
          />
        </View>
      </View>
      <View style={{ gap: theme.spacing.base }}>
        <Button.Base
          disabled={!value?.includes("GOV")}
          title={Texts.buttons.continue}
          style={{
            backgroundColor: theme.color.secondary.normal,
            marginBottom: theme.spacing.base,
          }}
          onPress={() => handleSubmit(value)}
        />
      </View>
    </Template.Base>
  );
}
