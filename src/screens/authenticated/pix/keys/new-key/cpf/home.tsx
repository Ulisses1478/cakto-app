import { useRef, useState } from "react";
import { View } from "react-native";

import { icons_by_type } from "../../utils";
import { HandleKeyAlreadyRegistered } from "../portability";

import {
  Button,
  Flex,
  Modal,
  ModalProps,
  Template,
  Text,
} from "@/components/ui";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";
import { ContextHook } from "@/contexts";
import { RouteStackParams } from "@/navigation/routes";
import { Service, ServiceEnums } from "@/services";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const utils = Utils.Constants.Text.authenticated.pix.keys;
const Texts = utils.create.cpf.home;

export function Home({ navigation }: RouteStackParams<"Home">) {
  const { auth } = ContextHook.useAuth();
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<ModalProps["CustomBottomSheet"]["ref"]>(null);

  async function handleCreate(key: string) {
    setLoading(true);

    // TODO: Integrar API
    const random = Math.floor(Math.random() * 10);
    const openPortability = random % 2 === 0;
    if (openPortability) {
      modalRef?.current?.onOpen({
        children: (
          <HandleKeyAlreadyRegistered
            modalRef={modalRef.current}
            type={
              Utils.Constants.Text.authenticated.pix.keys.keyTypes
                .national_registration
            }
            value={auth?.user?.cpf ?? ""}
          />
        ),
      });
      setLoading(false);
      return;
    }

    Service.Pix.Key.create(key).finally(() => {
      setLoading(false);
      navigation.navigate("PixNewKeyConfirmation", {
        type: utils.keyTypes.national_registration,
      });
    });
  }

  return (
    <Template.Base
      asBackgroundImage={{
        source: "home",
      }}
      canGoBack={navigation.canGoBack()}
      goBack={() => navigation.goBack()}
    >
      <Modal.CustomBottomSheet ref={modalRef} />
      <View
        style={{
          marginTop: BACK_BUTTON_HEIGHT,
          justifyContent: "space-between",
          gap: theme.spacing.xxs,
          flex: 1,
        }}
      >
        <View style={{ flex: 1, gap: theme.spacing.xxs }}>
          <View style={{ gap: theme.spacing.nano }}>
            <Text.Base style={{ fontSize: theme.font.size.lg, lineHeight: 36 }}>
              {Texts.title}
            </Text.Base>
            <Text.Base
              style={{
                fontSize: theme.font.size.xxxs,
                fontWeight: theme.font.weight.regular,
                lineHeight: 21,
                fontFamily: theme.font.family.regular,
              }}
            >
              {Texts.description}
            </Text.Base>
          </View>
          <Flex style={{ gap: theme.spacing.xxxs }}>
            {icons_by_type[ServiceEnums.Pix.Key.PIX_KEY_TYPES.CPF]()}
            <View>
              <Text.Base style={{ fontSize: theme.font.size.xxs }}>
                {Texts.label}
              </Text.Base>
              <Text.Base
                style={{
                  fontSize: theme.font.size.xxs,
                  fontWeight: theme.font.weight.regular,
                  fontFamily: theme.font.family.regular,
                  color: theme.color.white["080"],
                }}
              >
                {Utils.Intl.Others.CPF(auth?.user?.cpf ?? "-")}
              </Text.Base>
            </View>
          </Flex>
        </View>
        <View style={{ gap: theme.spacing.xxxs }}>
          <Text.Base
            style={{
              fontSize: theme.font.size.xxxs,
              fontWeight: theme.font.weight.regular,
              lineHeight: 21,
              fontFamily: theme.font.family.regular,
              color: theme.color.gray["400"],
            }}
          >
            {Texts.footerDescription}
          </Text.Base>
          <Button.Base
            isLoading={loading}
            onPress={() => {
              handleCreate(auth?.user?.cpf ?? "");
            }}
            title={Texts.buttons.register}
            style={{ backgroundColor: theme.color.secondary.normal }}
          />
        </View>
      </View>
    </Template.Base>
  );
}
