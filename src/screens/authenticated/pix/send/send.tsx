import { useRef, useState } from "react";
import { Alert, Keyboard, View, TextInput as RNTextInput } from "react-native";

import {
  Button,
  Flex,
  Modal,
  ModalProps,
  Template,
  Text,
  TextInput,
} from "@/components/ui";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const IntlNumber = Utils.Intl.Number;
const handleCurrency = IntlNumber.formatCurrency;
const Texts = Utils.Constants.Text.authenticated.pix;
const mock_total_value = Math.random() * 10 * 1000;

const feedBackWarningProps = {
  // title: Texts.send.home.warning.title,
  description: Texts.send.home.warning.description,
  onSubmitText: Texts.send.home.warning.onSubmitText,
  scheme: "warning",
} as ModalProps["BottomSheet"]["props"];

export function Send({ navigation }: RouteStackParams<"PixSend">) {
  const [value, setValue] = useState(handleCurrency(0));
  const inputRef = useRef<RNTextInput>(null);
  const modalRef = useRef<ModalProps["BottomSheet"]["ref"]>(null);

  function handleValue(value: string) {
    Keyboard.dismiss();
    const numbers = Number(IntlNumber.getOnlyNumbers(value));
    if (numbers <= 0) {
      modalRef.current?.onOpen(feedBackWarningProps);
      return;
    }

    navigation.navigate("PixSendInformPix", {
      value: IntlNumber.getOnlyNumbers(value),
    });
  }

  feedBackWarningProps.onSubmit = () => {
    modalRef.current?.onClose();
    inputRef.current?.focus();
  };

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
      <Modal.BottomSheet
        ref={modalRef}
        onCancel={() => {
          inputRef.current?.focus();
        }}
      />
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
          ref={inputRef}
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
          style={{
            width: theme.size.full,
          }}
          autoFocus
        />
      </View>
      <View style={{ gap: theme.spacing.base }}>
        <Button.Base
          title={Texts.send.home.buttons.continue}
          style={{
            backgroundColor: theme.color.secondary.normal,
            marginBottom: theme.spacing.base,
          }}
          onPress={() => handleValue(value)}
        />
      </View>
    </Template.Base>
  );
}
