import { useEffect, useRef, useState } from "react";
import { Animated, Modal, View } from "react-native";
import { Image } from "@/assets/images";
import { theme } from "@/styles/theme";
import { Text } from "../texts";
import { Button } from "../buttons";
import { AnimatedOverlay } from "./animated-overlay";

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
  const { isVisible = false, onClose, ...rest } = props;
  const [slideAnimation] = useState(new Animated.Value(300));
  const [showModal, setShowModal] = useState(false);
  const data = useRef<Partial<BottomSheetProps> | null>(null);

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

  useEffect(() => {
    if (isVisible) {
      setShowModal(true);
      data.current = { ...rest };
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowModal(false);
        data.current = null;
      });
    }
  }, [isVisible]);

  if (!showModal) return null;

  return (
    <Modal
      visible={showModal}
      transparent
      onRequestClose={onClose}
      animationType="none"
    >
      <AnimatedOverlay
        isVisible={isVisible}
        onPress={onClose}
        backgroundColor={theme.color.gray["064"]}
      />
      <Animated.View
        style={{
          transform: [{ translateY: slideAnimation }],
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
      </Animated.View>
    </Modal>
  );
}
