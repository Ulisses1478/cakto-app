import { View, ViewProps } from "react-native";

export function Flex(props: ViewProps) {
  const { style, ...rest } = props;

  const css = {
    flexDirection: "row",
    alignItems: "center",
    // @ts-expect-error
    ...style,
  };

  return <View style={{ ...css }} {...rest} />;
}
