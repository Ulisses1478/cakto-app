import { Image, TouchableOpacity } from "react-native";
import { Text } from "../texts";
import { theme } from "@/styles/theme";

interface AvatarProps {
  uri?: string | null;
  fallback?: string;
}

export function Avatar(props: AvatarProps) {
  const { uri, fallback } = props;
  return (
    <TouchableOpacity
      style={{
        height: theme.size.lg,
        width: theme.size.lg,
        borderRadius: theme.borderRadius.pill,
        borderWidth: theme.borderWidth.hairline,
        borderColor: theme.color.secondary.normal,
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
        <Text.Base>{fallback || "C"}</Text.Base>
      )}
    </TouchableOpacity>
  );
}
