import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "../texts";
import { theme } from "@/styles/theme";

interface AvatarProps {
  uri?: string | null;
  fallback?: string;
  onPress?: () => void;
  scheme?: "normal" | "dark";
}

export function Avatar(props: AvatarProps) {
  const { uri, fallback, onPress, scheme = "normal" } = props;

  // Caso exista fallback, pegar a primeira letra do primeiro nome.
  // Caso tiver 2 nomes, pegar a primeira letra de cada nome
  // limitar a 2 nomes.
  const initials = fallback
    ?.split(" ")
    .slice(0, 2)
    .map((name) => name[0]);

  // Caso exista fallback, juntar as iniciais
  const parsedInitials = initials?.slice(0, 2)?.join(".").toUpperCase();

  const color = theme.color.secondary[scheme];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: theme.size.lg,
        width: theme.size.lg,
        borderRadius: theme.borderRadius.pill,
        borderWidth: theme.borderWidth.hairline,
        borderColor: color,
        overflow: "hidden",
      }}
    >
      {uri ? (
        <Image
          source={{ uri }}
          height={theme.size.lg}
          width={theme.size.lg}
          alt="Avatar do cliente"
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            backgroundColor: color,
            height: theme.size.full,
          }}
        >
          <Text.Base style={{ textAlign: "center" }}>
            {parsedInitials || "C"}
          </Text.Base>
        </View>
      )}
    </TouchableOpacity>
  );
}
