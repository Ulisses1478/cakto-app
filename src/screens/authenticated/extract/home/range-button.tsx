import { TouchableOpacity } from "react-native";

import { Text } from "@/components/ui";
import { theme } from "@/styles/theme";

interface RangeButtonStyleProps {
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
}

function getSelectedButtonStyle(props: RangeButtonStyleProps) {
  const { isSelected, isFirst, isLast } = props;
  if (!isSelected) {
    return {};
  }

  const baseLeftRadius = {
    borderRightWidth: theme.borderWidth.hairline,
  };

  const baseRightRadius = {
    borderLeftWidth: theme.borderWidth.hairline,
  };

  const middleRadius = {
    borderRightWidth: theme.borderWidth.hairline,
    borderLeftWidth: theme.borderWidth.hairline,
  };

  return {
    backgroundColor: theme.color.white["012"],
    borderColor: theme.color.white["100"],
    ...(isFirst ? baseLeftRadius : {}),
    ...(isLast ? baseRightRadius : {}),
    ...(!isFirst && !isLast ? middleRadius : {}),
  };
}

interface RangeButtonProps {
  text: string;
  onPress: () => void;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export function RangeButton(props: RangeButtonProps) {
  const { text, isSelected, onPress, isFirst, isLast } = props;
  const selectedStyle = getSelectedButtonStyle({
    isSelected,
    isFirst,
    isLast,
  });
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        padding: theme.spacing.base,
        justifyContent: "space-between",
        alignItems: "center",
        ...selectedStyle,
      }}
      onPress={onPress}
    >
      <Text.Base
        style={{
          textAlign: "center",
          color: isSelected
            ? theme.color.white["100"]
            : theme.color.white["080"],
          fontSize: theme.font.size.xxs,
          fontWeight: theme.font.weight.medium,
          fontFamily: theme.font.family.medium,
        }}
      >
        {text}
      </Text.Base>
    </TouchableOpacity>
  );
}
