import { useState } from "react";
import { Share, TouchableOpacity, View } from "react-native";

import { Image } from "@/assets/images";
import { Button, Flex, ModalProps, Text } from "@/components/ui";
import { ServiceProps } from "@/services";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const Texts = Utils.Constants.Text.authenticated.pix.keys;

function HandleDeleteKey({
  value,
  label,
  handleDelete,
  modalRef,
}: {
  value: string;
  label: string;
  handleDelete: (value: string) => Promise<void>;
  modalRef: ModalProps["CustomBottomSheet"]["ref"];
}) {
  let text = Texts.delete.description.replace("{{value}}", `${label} ${value}`);

  const [loading, setLoading] = useState(false);

  if (value.length > 20) {
    text = text.replace("?", "");
  }

  return (
    <View
      style={{
        width: theme.size.full,
        gap: theme.spacing.xxs,
      }}
    >
      <View style={{ gap: theme.spacing.xxxs }}>
        <Image.Trash.Medium style={{ alignSelf: "center" }} />
        <Text.Base
          style={{
            color: theme.color.red.negative_ligther,
            textAlign: "center",
            fontSize: theme.font.size.md,
            lineHeight: 20,
          }}
        >
          {Texts.delete.title}
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
          {text}
        </Text.Base>

        <View style={{ gap: theme.spacing.xxxs }}>
          <Button.Base
            isLoading={loading}
            textProps={{ color: theme.color.white[100] }}
            onPress={async () => {
              setLoading(true);
              handleDelete(value).finally(() => {
                setLoading(false);
                modalRef?.onClose();
              });
            }}
            style={{ backgroundColor: theme.color.red.negative_ligther }}
            title={Texts.delete.buttons.yes}
          />
          <Button.Base
            variant="unfilled"
            onPress={() => modalRef?.onClose()}
            style={{ borderColor: "transparent" }}
            title={Texts.delete.buttons.no}
          />
        </View>
      </View>
    </View>
  );
}

function HandleOptions(props: {
  data: ServiceProps["Pix"]["Key"]["Get"];
  modalRef: ModalProps["CustomBottomSheet"]["ref"] | null;
  handleDelete: (value: string) => Promise<void>;
}) {
  const { data, modalRef, handleDelete } = props;
  const label = Texts.keyTypes[data.type as keyof typeof Texts.keyTypes];
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
          {Texts.keyTypes.key.replace("{{value}}", Texts.keyTypes[data.type])}
        </Text.Base>
        <View
          style={{
            backgroundColor: theme.color.gray["800"],
            padding: theme.spacing.nano,
            borderRadius: theme.borderRadius.sm,
          }}
        >
          <Text.Base
            numberOfLines={1}
            style={{
              textAlign: "center",
              color: theme.color.gray["400"],
              lineHeight: 24,
              fontWeight: theme.font.weight.medium,
              fontFamily: theme.font.family.medium,
            }}
          >
            {data.key}
          </Text.Base>
        </View>
      </View>
      <View style={{ gap: theme.spacing.xxxs }}>
        <TouchableOpacity
          onPress={() => {
            Share.share({
              message: data.key,
            }).finally(() => modalRef?.onClose());
          }}
        >
          <Flex
            style={{
              paddingVertical: theme.spacing.nano,
              gap: theme.spacing.xxxs,
              width: theme.size.full,
            }}
          >
            <Image.Share />
            <Text.Base
              style={{
                fontWeight: theme.font.weight.medium,
                fontFamily: theme.font.family.medium,
              }}
            >
              {Texts.options.shareKey}
            </Text.Base>
          </Flex>
        </TouchableOpacity>
        <TouchableOpacity>
          <Flex
            style={{
              paddingVertical: theme.spacing.nano,
              gap: theme.spacing.xxxs,
              width: theme.size.full,
            }}
          >
            <Image.QRCode />
            <Text.Base
              style={{
                fontWeight: theme.font.weight.medium,
                fontFamily: theme.font.family.medium,
              }}
            >
              {Texts.options.createQRCode}
            </Text.Base>
          </Flex>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            modalRef?.onClose();
            setTimeout(() => {
              modalRef?.onOpen({
                children: (
                  <HandleDeleteKey
                    value={data.key}
                    label={label}
                    handleDelete={handleDelete}
                    modalRef={modalRef}
                  />
                ),
              });
            }, 150);
          }}
        >
          <Flex
            style={{
              paddingVertical: theme.spacing.nano,
              gap: theme.spacing.xxxs,
              width: theme.size.full,
            }}
          >
            <Image.Trash.Small />
            <Text.Base
              style={{
                color: theme.color.red.negative_ligther,
                fontWeight: theme.font.weight.medium,
                fontFamily: theme.font.family.medium,
              }}
            >
              {Texts.options.delete}
            </Text.Base>
          </Flex>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function mountOptions(
  keys: ServiceProps["Pix"]["Key"]["Get"][],
  modalRef: ModalProps["CustomBottomSheet"]["ref"] | null,
  handleDelete: (value: string) => Promise<void>
) {
  return keys.map((data) => {
    const label = Texts.keyTypes[data.type as keyof typeof Texts.keyTypes];
    return {
      id: data.key,
      type: data.type,
      label,
      value: data.key,
      status: data.status,
      onPress: () => {
        modalRef?.onOpen({
          children: (
            <HandleOptions
              data={data}
              modalRef={modalRef}
              handleDelete={handleDelete}
            />
          ),
        });
      },
    };
  });
}
