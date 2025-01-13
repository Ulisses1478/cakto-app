import { Toast } from "toastify-react-native";

import { theme } from "@/styles/theme";

const TOAST_STYLES = {
  text: {
    fontSize: theme.font.size.xxxs,
    color: theme.color.white["100"],
  },
  container: {
    backgroundColor: theme.color.gray["800"],
    borderRadius: theme.borderRadius.sm,
  },
};

const TOAST_STATUS = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARN: "warn",
};

const TOAST_POSITION = {
  TOP: "top",
  BOTTOM: "bottom",
};

function use(
  message: string,
  type = TOAST_STATUS.SUCCESS,
  position = TOAST_POSITION.TOP
) {
  // @ts-ignore
  Toast[type](message, position);
}

export const toast = Object.freeze({
  use,
  styles: TOAST_STYLES,
  status: TOAST_STATUS,
  position: TOAST_POSITION,
});
