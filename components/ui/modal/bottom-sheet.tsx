import { Image } from "@/assets/images";
import { theme } from "@/styles/theme";
import { Alert, Modal, TouchableOpacity, View } from "react-native";
import { Text } from "../texts";
import { Button } from "../buttons";

export interface BottomSheetProps {
  title?: string;
  description?: string;
  scheme?: "warning" | "success";
  onSubmit?: () => void;
  onSubmitText?: string;
  onCancel?: () => void;
  onCancelText?: string;
  isVisible?: boolean;
  onClose?: () => void;
}

export function BottomSheet(props: BottomSheetProps) {
  const {
    title,
    description,
    scheme = "warning",
    onSubmit,
    onSubmitText,
    onCancel,
    onCancelText,
    isVisible = false,
    onClose,
  } = props;

  const colorScheme =
    scheme === "warning"
      ? { title: theme.color.yellow.alert, button: theme.color.yellow.alert }
      : {
          title: theme.color.secondary.bright,
          button: theme.color.secondary.normal,
        };

  const icon =
    scheme === "warning" ? (
      <Image.Warning.Triangle />
    ) : (
      <Image.Success.CheckCircle />
    );

  return (
    <Modal
      visible={isVisible}
      transparent
      onRequestClose={onClose}
      animationType="slide"
    >
      <TouchableOpacity
        onPress={onClose}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: theme.color.gray["064"],
        }}
      >
        <View
          style={{
            padding: theme.spacing.xxs,
            backgroundColor: theme.color.gray[900],
            width: theme.size.full,
            alignItems: "center",
            borderTopLeftRadius: theme.borderRadius.md,
            borderTopRightRadius: theme.borderRadius.md,
          }}
        >
          {icon}
          <View
            style={{ gap: theme.spacing.nano, marginTop: theme.spacing.xxxs }}
          >
            {title && (
              <Text.Base
                style={{
                  color: colorScheme.title,
                  fontSize: theme.font.size.md,
                  textAlign: "center",
                }}
              >
                {title}
              </Text.Base>
            )}
            {description && (
              <Text.Base
                style={{
                  color: theme.color.white[100],
                  fontSize: theme.font.size.xxs,
                  lineHeight: 21,
                  fontFamily: theme.font.family.medium,
                  fontWeight: theme.font.weight.medium,
                  textAlign: "center",
                }}
              >
                {description}
              </Text.Base>
            )}
          </View>
          <View
            style={{
              marginTop: theme.spacing.xxs,
              gap: theme.spacing.xxxs,
              width: theme.size.full,
            }}
          >
            {typeof onSubmit === "function" && onSubmitText && (
              <Button.Base
                title={onSubmitText}
                textProps={{ color: theme.color.gray[900] }}
                style={{ backgroundColor: colorScheme.button }}
                onPress={onSubmit}
              />
            )}
            {typeof onCancel === "function" && onCancelText && (
              <Button.Base
                variant="unfilled"
                title={onCancelText}
                textProps={{ color: colorScheme.button }}
                onPress={onCancel}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
