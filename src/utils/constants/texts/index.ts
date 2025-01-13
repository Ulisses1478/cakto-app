import {
  start,
  login,
  forgotPassword,
  confirmResetCode,
  resetPassword,
  authenticated,
} from "./screens";
import { Utils } from "./utils";

export const Text = Object.freeze({
  start,
  login,
  forgotPassword,
  confirmResetCode,
  resetPassword,
  authenticated,
  t: Utils.translate,
});
