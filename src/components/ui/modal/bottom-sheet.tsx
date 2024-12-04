import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { Image } from "@/assets/images";
import { theme } from "@/styles/theme";
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

export interface BottomSheetRef {
  onClose: () => void;
  onOpen: (value: BottomSheetProps) => void;
}

export const BottomSheet = forwardRef(
  (props: BottomSheetProps, ref: React.ForwardedRef<BottomSheetRef>) => {
    const { isVisible = false, onClose, ...rest } = props;
    const [showModal, setShowModal] = useState(false);
    const data = useRef<BottomSheetProps | null>(null);

    function handleOnClose() {
      setShowModal(false);
      onClose?.();
    }

    useImperativeHandle(ref, () => ({
      onClose: handleOnClose,
      onOpen: (value: BottomSheetProps) => {
        // TODO: Fix this hack for iOS modal animation
        setTimeout(() => setShowModal(true), 50);
        data.current = value;
      },
    }));

    const colorScheme =
      data.current?.scheme === "warning"
        ? { title: theme.color.yellow.alert, button: theme.color.yellow.alert }
        : {
            title: theme.color.secondary.bright,
            button: theme.color.secondary.normal,
          };

    const icon =
      data.current?.scheme === "warning" ? (
        <Image.Warning.Triangle />
      ) : (
        <Image.Success.CheckCircle />
      );

    return (
      <Modal
        isVisible={showModal}
        onBackdropPress={handleOnClose}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        renderToHardwareTextureAndroid
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionOutTiming={1}
        backdropColor={theme.color.gray["064"]}
        style={{ margin: 0 }}
      >
        <View
          style={{
            padding: theme.spacing.xxs,
            backgroundColor: theme.color.gray[900],
            width: theme.size.full,
            alignItems: "center",
            borderTopLeftRadius: theme.borderRadius.md,
            borderTopRightRadius: theme.borderRadius.md,
            position: "absolute",
            bottom: 0,
          }}
        >
          {icon}
          <View
            style={{ gap: theme.spacing.nano, marginTop: theme.spacing.xxxs }}
          >
            {data.current?.title && (
              <Text.Base
                style={{
                  color: colorScheme.title,
                  fontSize: theme.font.size.md,
                  textAlign: "center",
                }}
              >
                {data.current.title}
              </Text.Base>
            )}
            {data.current?.description && (
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
                {data.current.description}
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
            {typeof data.current?.onSubmit === "function" &&
              data.current?.onSubmitText && (
                <Button.Base
                  title={data.current.onSubmitText}
                  textProps={{ color: theme.color.gray[900] }}
                  style={{ backgroundColor: colorScheme.button }}
                  onPress={data.current?.onSubmit}
                />
              )}
            {typeof data.current?.onCancel === "function" &&
              data.current?.onCancelText && (
                <Button.Base
                  variant="unfilled"
                  title={data.current.onCancelText}
                  textProps={{ color: colorScheme.button }}
                  onPress={data.current.onCancel}
                />
              )}
          </View>
        </View>
      </Modal>
    );
  }
);
