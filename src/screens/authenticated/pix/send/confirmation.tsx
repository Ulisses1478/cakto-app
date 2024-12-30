import { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { Image } from "@/assets/images";
import {
  Button,
  Flex,
  Modal,
  ModalProps,
  Template,
  Text,
} from "@/components/ui";
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
  const unparsedPixValue = handleCurrency(unparsedValue / 100);
  const pixKey = route.params.pixKey;
  const bankAccount = route.params.bankAccount;
  const [value, setValue] = useState(unparsedPixValue);
  const [pixValue, setPixValue] = useState(unparsedPixValue);
  const [message, setMessage] = useState("");

  const modalRef = useRef<ModalProps["EditInfo"]["ref"]>(null);

  function handleEditMessage() {
    setValue(message);
    modalRef.current?.onOpen({
      isCurrency: false,
      title: Texts.modals.editMessage.title,
      onSubmitText: Texts.modals.editMessage.buttons.saveMessage,
      onSubmit: (currentValue: string) => {
        setMessage(currentValue);
        modalRef.current?.onClose();
      },
      textInputProps: {
        autoFocus: true,
        maxLength: 140,
        placeholder: Texts.modals.editMessage.inputPlaceholder,
      },

      description: (
        <View style={{ gap: theme.spacing.xxxs, maxWidth: theme.size.full }}>
          <Flex style={{ gap: theme.spacing.quarck, flexWrap: "wrap" }}>
            <Text.Base
              style={{
                fontSize: theme.font.size.xxs,
                lineHeight: 21,
                fontWeight: theme.font.weight.regular,
                fontFamily: theme.font.family.regular,
              }}
            >
              {Texts.modals.editMessage.description}
            </Text.Base>
            <Text.Base
              style={{
                fontSize: theme.font.size.xxs,
                lineHeight: 21,
              }}
            >
              {mock_receiver}
            </Text.Base>
            <Text.Base
              style={{
                fontSize: theme.font.size.xxs,
                lineHeight: 21,
                fontWeight: theme.font.weight.regular,
                fontFamily: theme.font.family.regular,
              }}
            >
              {Texts.modals.editMessage.subDescription}
            </Text.Base>
          </Flex>
        </View>
      ),
    });
  }

  function handleEditPixValue() {
    setValue(handleCurrency(Number(IntlNumber.getOnlyNumbers(pixValue)) / 100));
    modalRef.current?.onOpen({
      isCurrency: true,
      title: Texts.modals.editValue.title,
      onSubmitText: Texts.modals.editValue.buttons.updateValue,
      onSubmit: (currentValue: string) => {
        setPixValue(
          handleCurrency(Number(IntlNumber.getOnlyNumbers(currentValue)) / 100)
        );
        modalRef.current?.onClose();
      },
      textInputProps: {
        keyboardType: "number-pad",
        autoFocus: true,
        maxLength: 17,
      },
      inputFeedback: Texts.modals.editValue.warning.text,
      hasFeedback: (data) => {
        if (!data) return true;
        const numbers = IntlNumber.removeLeadingZeros(
          IntlNumber.getOnlyNumbers(data)
        );
        return Number(numbers) === 0;
      },

      description: (
        <View style={{ gap: theme.spacing.xxxs }}>
          <Flex style={{ gap: theme.spacing.quarck }}>
            <Text.Base
              style={{
                fontSize: theme.font.size.xxs,
                lineHeight: 21,
                fontWeight: theme.font.weight.regular,
                fontFamily: theme.font.family.regular,
              }}
            >
              {Texts.modals.editValue.description}
            </Text.Base>
            <Text.Base
              style={{
                fontSize: theme.font.size.xxs,
                lineHeight: 21,
              }}
            >
              R$ 10,982,00
            </Text.Base>
          </Flex>
        </View>
      ),
    });
  }

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
            onPress={() =>
              navigation.navigate("PixSendTypePassword", {
                pixKey,
                value: IntlNumber.getOnlyNumbers(pixValue),
                message,
                bankAccount,
              })
            }
            title={Texts.buttons.transfer.replace("{value}", pixValue)}
            style={{ backgroundColor: theme.color.secondary.normal }}
          />
        ),
      }}
    >
      <Modal.EditInfo
        ref={modalRef}
        inputValue={value}
        setInputValue={setValue}
      />
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
            onPress={handleEditPixValue}
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
              gap: theme.spacing.nano,
              ...(message.length && {
                paddingHorizontal: theme.spacing.base,
                paddingVertical: theme.spacing.nano,
                marginTop: theme.spacing.quarck,
                backgroundColor: theme.color.white["012"],
                borderRadius: theme.borderRadius.sm,
              }),
            }}
            onPress={handleEditMessage}
          >
            {message.length ? (
              <Image.Edit path={{ stroke: theme.color.secondary.bright }} />
            ) : (
              <Image.Chat />
            )}
            <Text.Base
              style={{ color: theme.color.secondary.bright, marginRight: 12 }}
              numberOfLines={1}
            >
              {message.length ? message : Texts.message}
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
