import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";

import { mountOptions } from "./options";
import { HandleNewKey } from "../new-key/options";
import { icons_by_type, KeyProps } from "../utils";

import { Image } from "@/assets/images";
import {
  Button,
  Flex,
  Modal,
  ModalProps,
  Template,
  Text,
  toast,
} from "@/components/ui";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";
import { RouteStackParams } from "@/navigation/routes";
import { Service, ServiceEnums } from "@/services";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const t = Utils.Constants.Text.t;
const Texts = Utils.Constants.Text.authenticated.pix.keys;

interface ListKeyProps {
  id: string;
  type: KeyProps["type"];
  label: string;
  value: string;
  status: KeyProps["status"];
  onPress: () => void;
}

const KEY_ENUM = ServiceEnums.Pix.Key;
const MAX_KEYS = 5;

export function Home({ navigation }: RouteStackParams<"PixHome">) {
  const modalRef = useRef<ModalProps["CustomBottomSheet"]["ref"]>(null);
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState<ListKeyProps[]>([]);

  async function handleDelete(key: string) {
    // TODO: remover chave da lista via API
    const response = await Service.Pix.Key.delete(key);
    setKeys((d) => d.filter((k) => k.id !== key));

    const toastType = response.success
      ? toast.status.SUCCESS
      : toast.status.ERROR;
    toast.use(response.data.message, toastType);
  }

  useEffect(() => {
    Service.Pix.Key.get()
      .then((response) => {
        setKeys(mountOptions(response, modalRef.current, handleDelete));
      })
      .finally(() => setLoading(false));
  }, []);

  const currentKeyTypes = keys
    .filter((key) => key.type !== ServiceEnums.Pix.Key.PIX_KEY_TYPES.RANDOM)
    .map((key) => key.type);

  return (
    <Template.Base
      asBackgroundImage={{
        source: "home",
      }}
      isLoading={loading}
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
              {Texts.home.title}
            </Text.Base>
            <Text.Base
              style={{
                fontSize: theme.font.size.xxxs,
                fontWeight: theme.font.weight.regular,
                lineHeight: 21,
                fontFamily: theme.font.family.regular,
              }}
            >
              {Texts.home.description}
            </Text.Base>
          </View>
          {!loading && (
            <>
              <Text.Base
                style={{
                  fontSize: theme.font.size.xxxs,
                  fontWeight: theme.font.weight.medium,
                  fontFamily: theme.font.family.medium,
                  color: theme.color.white["050"],
                }}
              >
                {t(Texts.home.subtitle, {
                  current: keys.length,
                  total: MAX_KEYS,
                })}
              </Text.Base>

              <ScrollView
                contentContainerStyle={{
                  gap: theme.spacing.xxs,
                  height: theme.size.full,
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                {keys.map((key) => {
                  const menuDotIsDisabled =
                    key.status !== KEY_ENUM.PIX_KEY_STATUS.OPEN;

                  if (key.status === KEY_ENUM.PIX_KEY_STATUS.DELETED)
                    return null;
                  return (
                    <Flex
                      style={{
                        justifyContent: "space-between",
                      }}
                      key={key.id}
                    >
                      <Flex
                        style={{
                          gap: theme.spacing.xxxs,
                          flex: 1,
                        }}
                      >
                        {icons_by_type[key.type]()}
                        <View style={{ gap: theme.spacing.nano, flex: 1 }}>
                          <Text.Base style={{ fontSize: theme.font.size.xxs }}>
                            {key.label}
                          </Text.Base>
                          <Text.Base
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              fontSize: theme.font.size.xxs,
                              fontWeight: theme.font.weight.regular,
                              fontFamily: theme.font.family.regular,
                              color: theme.color.white["064"],
                            }}
                          >
                            {key.value}
                          </Text.Base>
                          {key.status ===
                            ServiceEnums.Pix.Key.PIX_KEY_STATUS
                              .WAITING_FOR_TRANSFER_ACCEPTANCE && (
                            <View
                              style={{
                                backgroundColor: theme.color.yellow.alert,
                                borderRadius: theme.borderRadius.pill,
                                width: "81%",
                                paddingHorizontal: theme.spacing.base,
                                paddingVertical: theme.spacing.quarck,
                              }}
                            >
                              <Text.Base
                                style={{
                                  fontSize: theme.font.size.xxs,
                                  fontWeight: theme.font.weight.medium,
                                  fontFamily: theme.font.family.medium,
                                  color: theme.color.gray["800"],
                                }}
                              >
                                {Texts.home.waitingForPortability}
                              </Text.Base>
                            </View>
                          )}
                        </View>
                      </Flex>
                      <TouchableOpacity
                        onPress={key.onPress}
                        disabled={menuDotIsDisabled}
                        style={{ opacity: menuDotIsDisabled ? 0.5 : 1 }}
                      >
                        <Image.MenuDot />
                      </TouchableOpacity>
                    </Flex>
                  );
                })}
              </ScrollView>
            </>
          )}
        </View>

        <Button.Base
          onPress={() => {
            modalRef.current?.onOpen({
              children: (
                <HandleNewKey
                  modalRef={modalRef.current}
                  currentKeyTypes={currentKeyTypes}
                />
              ),
            });
          }}
          style={{ backgroundColor: theme.color.secondary.normal }}
          title={Texts.home.buttons.addKey}
          disabled={loading || MAX_KEYS === keys.length}
          leftIcon={<Image.Plus />}
        />
      </View>
    </Template.Base>
  );
}
