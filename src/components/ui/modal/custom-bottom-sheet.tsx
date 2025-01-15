import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Platform, View } from "react-native";
import Modal from "react-native-modal";

import { theme } from "@/styles/theme";

export interface CustomBottomSheetProps {
  children?: React.ReactNode;
  isVisible?: boolean;
  onClose?: () => void;
}

export interface CustomBottomSheetRef {
  onClose: () => void;
  onOpen: (value: CustomBottomSheetProps) => void;
}

export const CustomBottomSheet = forwardRef(
  (
    _: CustomBottomSheetProps,
    ref: React.ForwardedRef<CustomBottomSheetRef>
  ) => {
    const [showModal, setShowModal] = useState(false);
    const data = useRef<CustomBottomSheetProps | null>(null);

    function handleOnClose() {
      setShowModal(false);
      data?.current?.onClose?.();
      setTimeout(() => {
        data.current = null;
      }, 350);
    }

    useImperativeHandle(
      ref,
      () => ({
        onClose: handleOnClose,
        onOpen: (value: CustomBottomSheetProps) => {
          // TODO: Fix this hack for iOS modal animation
          setTimeout(() => setShowModal(true), 50);
          data.current = value;
        },
      }),
      [data]
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
            paddingBottom:
              Platform.OS === "ios" ? theme.spacing.sm : theme.spacing.xxs,
          }}
        >
          {data.current?.children}
        </View>
      </Modal>
    );
  }
);
