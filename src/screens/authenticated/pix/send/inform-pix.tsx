import { useState } from "react";
import { Alert, View } from "react-native";

import { Button, Template, Text, TextInput } from "@/components/ui";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const IntlNumber = Utils.Intl.Number;
const handleCurrency = IntlNumber.formatCurrency;
const Texts = Utils.Constants.Text.authenticated.pix;

let timeoutRef: any = null;
const TIME_TO_SHOW_ERROR_MESSAGE = 3000;

function handleChangeText(text: string) {
  const numbers = IntlNumber.getOnlyNumbers(text);
  if (Utils.Validators.CPF(numbers)) {
    return { value: Utils.Intl.Others.CPF(numbers), error: false, type: "CPF" };
  }

  if (Utils.Validators.Telephone(numbers)) {
    return {
      value: Utils.Intl.Others.Telephone(numbers),
      error: false,
      type: "telefone",
    };
  }

  if (Utils.Validators.CNPJ(numbers)) {
    return {
      value: Utils.Intl.Others.CNPJ(numbers),
      error: false,
      type: "CNPJ",
    };
  }

  if (Utils.Validators.Email(text) || text.includes("@")) {
    return { value: text, error: false, type: "e-mail" };
  }

  if (Utils.Validators.PartialUUIDv4(text)) {
    return { value: text, error: false, type: null };
  }

  if (Utils.Validators.UUIDv4(text)) {
    return { value: text, error: false, type: "chave" };
  }

  return { value: text, error: true, type: null };
}

interface PixProps {
  key: string;
  type: string | null;
}

export function InformPix({
  navigation,
  route,
}: RouteStackParams<"PixSendInformPix">) {
  const unparsedValue = Number(route.params?.value) || 0;
  const pixValue = handleCurrency(unparsedValue / 100);
  const [pix, setPix] = useState<PixProps>({
    key: "",
    type: null,
  });

  const [error, setError] = useState(false);

  const buttonTexts = Texts.send.informPix.buttons;
  const buttonTitle = pix.type
    ? buttonTexts.sendTo.replace("{value}", pix.type)
    : buttonTexts.continue;

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
            {Texts.send.informPix.title.replace("{value}", pixValue)}
          </Text.Base>
          <Text.Base
            style={{
              fontSize: theme.font.size.xxs,
              lineHeight: 21,
              fontWeight: theme.font.weight.regular,
              fontFamily: theme.font.family.regular,
            }}
          >
            {Texts.send.informPix.description}
          </Text.Base>
        </View>
        <TextInput.Base
          value={pix.key}
          onChangeText={(text) => {
            if (timeoutRef) {
              clearTimeout(timeoutRef);
              timeoutRef = null;
            }

            const { value, error: _error, type } = handleChangeText(text);

            if (_error) {
              timeoutRef = setTimeout(
                () => setError(true),
                TIME_TO_SHOW_ERROR_MESSAGE
              );
            } else {
              setError(false);
            }
            setPix({ key: value, type });
          }}
          placeholder="Nome, CPF/CNPJ ou chave Pix"
          autoCapitalize="none"
          autoComplete="off"
          style={{ width: theme.size.full }}
        />
        {error && (
          <View
            style={{
              paddingHorizontal: theme.spacing.xxxs,
              paddingVertical: theme.spacing.nano,
              borderRadius: theme.borderRadius.sm,
              backgroundColor: theme.color.white["012"],
            }}
          >
            <Text.Base
              style={{
                fontSize: theme.font.size.xxs,
                lineHeight: 21,
                fontWeight: theme.font.weight.medium,
                fontFamily: theme.font.family.medium,
              }}
            >
              {Texts.send.informPix.invalidPix}
            </Text.Base>
          </View>
        )}
      </View>
      <View style={{ gap: theme.spacing.base }}>
        <Button.Base
          title={buttonTitle}
          style={{
            backgroundColor: theme.color.secondary.normal,
            marginBottom: theme.spacing.base,
          }}
          disabled={error || !pix.type}
          onPress={() => Alert.alert("Continuar")}
        />
      </View>
    </Template.Base>
  );
}
