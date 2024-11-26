import { theme } from "@/styles/theme";
import { ViewStyle } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { Modal } from "../../modal";

interface TemplateBaseProps extends SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  isLoading?: boolean;
}

export function Base(props: TemplateBaseProps) {
  const { children, style, isLoading = false, ...rest } = props;

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
        {isLoading && <Modal.Loading />}
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
