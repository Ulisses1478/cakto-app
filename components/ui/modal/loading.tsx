import { ActivityIndicator, Modal, View } from "react-native";
import { Text } from "../texts";
import { theme } from "@/styles/theme";

export function Loading() {
  const loadingText = "Carregando\nPor favor, aguarde";
  return (
    <Modal visible transparent>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.color.gray["064"],
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.color.gray[900],
            borderRadius: theme.borderRadius.md,
            gap: theme.spacing.xxs,
            paddingTop: theme.spacing.xs,
            paddingBottom: theme.spacing.xs,
            paddingLeft: theme.spacing.xxs,
            paddingRight: theme.spacing.xxs,
          }}
        >
          <ActivityIndicator
            size="large"
            color={theme.color.secondary.normal}
          />
          <Text.Base style={{ textAlign: "center", lineHeight: 24 }}>
            {loadingText}
          </Text.Base>
        </View>
      </View>
    </Modal>
  );
}
