import { ScrollViewProps, ViewStyle } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

export interface TemplateBaseProps<T = undefined> extends SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  isLoading?: boolean;
  asBackgroundImage?: {
    source: T;
  } | null;
  scrollViewProps?:
    | (Omit<ScrollViewProps, "contentContainerStyle" | "style"> & {
        wrapWithScrollView?: boolean;
        style?: ScrollViewProps["style"];
        contentContainerStyle?: ScrollViewProps["contentContainerStyle"];
        footer?: React.ReactNode;
      })
    | null;
  keyboardIsOpen?: boolean;
  canGoBack?: boolean;
  goBack?: () => void | null;
}
