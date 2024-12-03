import { theme } from "@/styles/theme";
import { Text } from "../texts";
import { Image, TouchableOpacity } from "react-native";

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
        <Image source={{ uri }} height={theme.size.lg} width={theme.size.lg} />
      ) : (
        <Text.Base>{fallback || "C"}</Text.Base>
      )}
    </TouchableOpacity>
  );
}
