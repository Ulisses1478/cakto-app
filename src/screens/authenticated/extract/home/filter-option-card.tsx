import { TouchableOpacity, View } from "react-native";

import { Flex, Text } from "@/components/ui";
import { theme } from "@/styles/theme";

function IconCard(props: { children: React.ReactNode }) {
  return (
    <View
      style={{
        backgroundColor: theme.color.secondary.dark,
        paddingVertical: theme.spacing.base,
        paddingHorizontal: theme.spacing.base,
        borderRadius: theme.borderRadius.base,
        alignItems: "center",
        width: theme.size.lg,
        height: theme.size.lg,
        justifyContent: "center",
      }}
    >
      <View>{props.children}</View>
    </View>
  );
}

interface FilterOptionCardProps {
  icon: React.ReactElement;
  label: string;
  index: number;
  onPress: (data?: any) => void;
}

export function FilterOptionCard(props: FilterOptionCardProps) {
  const { index, label, icon, onPress } = props;
  return (
    <TouchableOpacity key={index} style={{ width: "50%" }} onPress={onPress}>
      <Flex
        style={{
          width: theme.size.full,
          alignItems: "center",
          gap: theme.spacing.nano,
          marginTop: index > 1 ? theme.spacing.xxxs : 0,
          maxWidth: 170,
        }}
      >
        <IconCard>{icon}</IconCard>
        <Text.Base
          style={{
            fontSize: theme.font.size.xxxs,
            fontWeight: theme.font.weight.medium,
            fontFamily: theme.font.family.medium,
            textAlign: "left",
          }}
        >
          {label}
        </Text.Base>
      </Flex>
    </TouchableOpacity>
  );
}
