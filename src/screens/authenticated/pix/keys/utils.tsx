import { Image } from "@/assets/images";
import { ServiceEnums } from "@/services";

export interface KeyProps {
  key: string;
  type: "evp" | "email" | "phone_number" | "national_registration";
  status: "OPEN" | "WAITING_FOR_RESOLUTION" | "HISTORY";
}

export const icons_by_type = {
  [ServiceEnums.Pix.Key.PIX_KEY_TYPES.CPF]: () => <Image.Pix.Keys.CPF />,

  [ServiceEnums.Pix.Key.PIX_KEY_TYPES.EMAIL]: () => <Image.Pix.Keys.Email />,
  [ServiceEnums.Pix.Key.PIX_KEY_TYPES.PHONE_NUMBER]: () => (
    <Image.Pix.Keys.Telephone />
  ),
  [ServiceEnums.Pix.Key.PIX_KEY_TYPES.RANDOM]: () => <Image.Pix.Keys.Random />,
} as Record<KeyProps["type"], () => JSX.Element>;
