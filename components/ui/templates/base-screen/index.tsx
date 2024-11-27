import { theme } from "@/styles/theme";
import { ViewStyle } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { Modal, ModalProps } from "../../modal";

interface TemplateBaseProps extends SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  isLoading?: boolean;
  bottomSheet?: {
    props: ModalProps["BottomSheet"] | null;
    onSubmit?: () => void;
    onClose: () => void;
  } | null;
}

export function Base(props: TemplateBaseProps) {
  const {
    children,
    style,
    isLoading = false,
    bottomSheet = null,
    ...rest
  } = props;

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          backgroundColor: theme.color.secondary.normal,
          flex: 1,
          gap: theme.spacing.xl,
          paddingLeft: theme.spacing.xxs,
          paddingRight: theme.spacing.xxs,
          ...style,
        }}
        {...rest}
      >
        <Modal.BottomSheet
          {...bottomSheet?.props}
          isVisible={!!bottomSheet?.props}
          onSubmit={bottomSheet?.onSubmit}
          onClose={bottomSheet?.onClose}
        />
        {isLoading && <Modal.Loading />}
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
