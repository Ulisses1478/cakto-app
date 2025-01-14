import { TouchableOpacity, View } from "react-native";

import { icons_by_type } from "../utils";

import { Flex, ModalProps, Text } from "@/components/ui";
import { navigationRef } from "@/navigation";
import { ServiceEnums } from "@/services";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const Texts = Utils.Constants.Text.authenticated.pix.keys;

const options = [
  {
    id: "1",
    label: Texts.keyTypes.national_registration,
    type: ServiceEnums.Pix.Key.PIX_KEY_TYPES.CPF,
    onPress: (cb: any) => {
      cb("PixNewKeyCpfHome");
    },
  },
  {
    id: "2",
    label: Texts.keyTypes.phone_number,
    type: ServiceEnums.Pix.Key.PIX_KEY_TYPES.PHONE_NUMBER,
    onPress: (cb: any) => {},
  },
  {
    id: "3",
    label: Texts.keyTypes.email,
    type: ServiceEnums.Pix.Key.PIX_KEY_TYPES.EMAIL,
    onPress: (cb: any) => {},
  },
  {
    id: "4",
    label: Texts.keyTypes.key.replace("{{value}}", Texts.keyTypes.evp),
    type: ServiceEnums.Pix.Key.PIX_KEY_TYPES.RANDOM,
    onPress: (cb: any) => {
      cb("PixNewKeyRandomHome");
    },
  },
];

export function HandleNewKey({
  modalRef,
}: {
  modalRef: ModalProps["CustomBottomSheet"]["ref"];
}) {
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
            lineHeight: 20,
          }}
        >
          {Texts.create.title}
        </Text.Base>

        <Text.Base
          style={{
            textAlign: "center",
            lineHeight: 24,
            fontWeight: theme.font.weight.medium,
            fontFamily: theme.font.family.medium,
            fontSize: theme.font.size.xxs,
          }}
        >
          {Texts.create.description}
        </Text.Base>

        <View style={{ gap: theme.spacing.nano }}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => {
                option.onPress(function (route: string) {
                  modalRef?.onClose();
                  navigationRef.navigate(route as never);
                });
              }}
            >
              <Flex
                style={{
                  gap: theme.spacing.xxxs,
                  paddingHorizontal: theme.spacing.xxxs,
                  paddingVertical: theme.spacing.base,
                }}
              >
                {icons_by_type[option.type]()}
                <Text.Base
                  style={{
                    fontWeight: theme.font.weight.medium,
                    fontFamily: theme.font.family.medium,
                  }}
                >
                  {option.label}
                </Text.Base>
              </Flex>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
