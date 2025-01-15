import { useState } from "react";
import { View } from "react-native";

import { Image } from "@/assets/images";
import { Button, ModalProps, Template, Text } from "@/components/ui";
import { STATUS_BAR_HEIGHT } from "@/components/ui/templates/base-screen";
import { navigationRef } from "@/navigation";
import { RouteStackParams } from "@/navigation/routes";
import { Service } from "@/services";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";
import { Intl } from "@/utils/intl";

const utils = Utils.Constants.Text.authenticated.pix.keys;
const t = Utils.Constants.Text.t;
const Texts = utils.create.portability;
const ButtonTexts = utils.confirmationButtons;
const ModalTexts = Texts.modal;

export function HandleKeyAlreadyRegistered({
  modalRef,
  type,
  value,
}: {
  modalRef: ModalProps["CustomBottomSheet"]["ref"];
  type: string;
  value: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleRequestPortability(key: string) {
    setLoading(true);
    Service.Pix.Key.requestPortability(key).finally(() => {
      setLoading(false);
      modalRef?.onClose();
      navigationRef.navigate("PixNewKeyPortability" as never);
    });
  }

  return (
    <View
      style={{
        width: theme.size.full,
        gap: theme.spacing.xxs,
      }}
    >
      <View style={{ gap: theme.spacing.xxxs }}>
        <Text.Base
          style={{
            textAlign: "center",
            fontSize: theme.font.size.md,
            lineHeight: 30,
          }}
        >
          {t(ModalTexts.title, { type })}
        </Text.Base>

        <Text.Base
          style={{
            textAlign: "center",
            lineHeight: 24,
            fontWeight: theme.font.weight.medium,
            fontFamily: theme.font.family.medium,
            fontSize: theme.font.size.xxs,
            color: theme.color.white["064"],
          }}
        >
          {ModalTexts.description}
        </Text.Base>

        <View style={{ gap: theme.spacing.xxxs }}>
          <Button.Base
            isLoading={loading}
            textProps={{ color: theme.color.white[100] }}
            onPress={() => handleRequestPortability(value)}
            style={{ backgroundColor: theme.color.secondary.normal }}
            title={t(ModalTexts.buttons.yes, { type })}
          />
          <Button.Base
            variant="unfilled"
            onPress={() => {
              navigationRef.goBack();
              modalRef?.onClose();
            }}
            textProps={{ color: theme.color.secondary.normal }}
            title={t(ModalTexts.buttons.no, { type })}
          />
        </View>
      </View>
    </View>
  );
}

const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 7);
const portabilityExpirationDate =
  Intl.DateHelper.getLocaleDateString(currentDate);

const mock_data = {
  type: Utils.Constants.Text.authenticated.pix.keys.keyTypes
    .national_registration,
  value: "123.123.123-12",
  bankName: "Nubank",
  date: portabilityExpirationDate,
};

export function Portability({
  navigation,
  route,
}: RouteStackParams<"PixNewKeyPortability">) {
  const { type, value, bankName, date } = route.params || mock_data;

  const description = t(Texts.description, {
    field: type,
    value,
    bank_name: bankName,
    date,
  });

  return (
    <Template.Base
      asBackgroundImage={{
        source: "home",
      }}
    >
      <Image.CaktoShareScreen
        svg={{ style: { marginTop: STATUS_BAR_HEIGHT } }}
      />
      <View
        style={{
          flex: 1,
          gap: theme.spacing.xxs,
          justifyContent: "center",
        }}
      >
        <View style={{ gap: theme.spacing.nano }}>
          <Text.Base style={{ fontSize: theme.font.size.lg, lineHeight: 36 }}>
            {Texts.title}
          </Text.Base>
          <Text.Highlight
            unhighlightedTextStyle={{
              fontWeight: theme.font.weight.medium,
              lineHeight: 24,
              fontSize: theme.font.size.xxs,
              fontFamily: theme.font.family.medium,
              color: theme.color.white["064"],
            }}
            highlightedTextStyle={{
              lineHeight: 24,
              fontSize: theme.font.size.xxs,
            }}
            text={description}
          />
        </View>
        <Button.Base
          onPress={() => {
            navigation.navigate("Home");
          }}
          title={ButtonTexts.backToHome}
          style={{ backgroundColor: theme.color.secondary.normal }}
        />
        <Button.Base
          variant="unfilled"
          onPress={() => {
            navigation.reset({
              routes: [{ name: "Home" }, { name: "PixHome" }],
              index: 1,
            });
          }}
          title={ButtonTexts.backToPixArea}
          style={{ borderColor: "transparent" }}
        />
      </View>
    </Template.Base>
  );
}
