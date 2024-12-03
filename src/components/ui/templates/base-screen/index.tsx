import { theme } from "@/styles/theme";
import { ImageBackground, ViewStyle } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { Modal, ModalProps } from "../../modal";

const BGImages = {
  home: require("@/assets/images/bg-home.png"),
};

interface TemplateBaseProps extends SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  isLoading?: boolean;
  asBackgroundImage?: {
    source: keyof typeof BGImages;
  } | null;
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
    asBackgroundImage = null,
    ...rest
  } = props;

  function baseChildren() {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            backgroundColor: !!asBackgroundImage
              ? "transparent"
              : theme.color.secondary.normal,
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

  return (
    <>
      {!!asBackgroundImage ? (
        <ImageBackground
          style={{
            flex: 1,
            height: theme.size.full,
            width: theme.size.full,
          }}
          resizeMode="cover"
          source={BGImages[asBackgroundImage.source]}
        >
          {baseChildren()}
        </ImageBackground>
      ) : (
        baseChildren()
      )}
    </>
  );
}
