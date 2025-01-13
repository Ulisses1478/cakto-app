import { StackScreenProps } from "@react-navigation/stack";

import { Home, Pix, Register } from "../screens/authenticated";
import {
  Splash,
  Start,
  Login,
  ForgotPassword,
  ConfirmResetCode,
  ResetPassword,
} from "../screens/public";
import { ServiceProps } from "../services";

export type StackParams = {
  Splash: undefined;
  Start: undefined;
  Login: undefined;
  ForgotPassword: { email?: string };
  ConfirmResetCode: { email: string };
  ResetPassword: { token: string; email?: string };
  Home: undefined;
  PixHome: undefined;
  PixReceive: undefined;
  PixReceiveCustomValue: undefined;
  PixReceiveConfirmation: { value?: string };
  PixReceiveShare: { value?: string };
  PixSend: undefined;
  PixSendInformPix: { value: string };
  PixSendSelectBankAccount: { value: string; pixKey: string };
  PixSendConfirmation: {
    value: string;
    pixKey: string;
    bankAccount: { id: string; name: string };
    canEditFromAutomaticSource?: boolean;
  };
  PixSendTypePassword: {
    value: string;
    pixKey: string;
    bankAccount: { id: string; name: string };
    message?: string;
  };
  PixSendShareTransfer: {
    value: string;
    pixKey: string;
    bankAccount: { id: string; name: string };
    message?: string;
  };
  PixSendCopyAndPaste: undefined;
  PixSendReadQRCode: undefined;
  RegisterHome: undefined;
  RegisterEditData: {
    company: ServiceProps["Financial"]["Company"]["Get"];
  };
  RegisterFaceValidationHome: undefined;
  RegisterFaceValidationConfirmSelfie: undefined;
  PixKeysHome: undefined;
};

type RouteStack<T> = Record<
  string,
  {
    name: keyof T;
    component: any;
    protected: boolean;
    gestureEnabled?: boolean;
  }
>;

export const ROUTES = Object.freeze({
  splash: {
    name: "Splash",
    component: Splash,
    protected: false,
  },
  start: {
    name: "Start",
    component: Start,
    protected: false,
  },
  login: {
    name: "Login",
    component: Login,
    protected: false,
  },
  forgotPassword: {
    name: "ForgotPassword",
    component: ForgotPassword,
    protected: false,
  },
  confirmResetCode: {
    name: "ConfirmResetCode",
    component: ConfirmResetCode,
    protected: false,
  },
  resetPassword: {
    name: "ResetPassword",
    component: ResetPassword,
    protected: false,
  },
  home: {
    name: "Home",
    component: Home,
    protected: true,
    gestureEnabled: false,
  },
  pixHome: {
    name: "PixHome",
    component: Pix.Home,
    protected: true,
  },
  pixReceive: {
    name: "PixReceive",
    component: Pix.Receive.Home,
    protected: true,
  },
  pixReceiveCustomValue: {
    name: "PixReceiveCustomValue",
    component: Pix.Receive.CustomValue,
    protected: true,
  },
  pixReceiveConfirmation: {
    name: "PixReceiveConfirmation",
    component: Pix.Receive.Confirmation,
    protected: true,
  },
  pixReceiveShare: {
    name: "PixReceiveShare",
    component: Pix.Receive.Share,
    protected: true,
  },
  pixSend: {
    name: "PixSend",
    component: Pix.Send.Home,
    protected: true,
  },
  pixSendInformPix: {
    name: "PixSendInformPix",
    component: Pix.Send.InformPix,
    protected: true,
  },
  pixSendSelectBankAccount: {
    name: "PixSendSelectBankAccount",
    component: Pix.Send.SelectBankAccount,
    protected: true,
  },
  pixSendConfirmation: {
    name: "PixSendConfirmation",
    component: Pix.Send.Confirmation,
    protected: true,
  },
  pixSendTypePassword: {
    name: "PixSendTypePassword",
    component: Pix.Send.TypePassword,
    protected: true,
    gestureEnabled: false,
  },
  pixSendShareTransfer: {
    name: "PixSendShareTransfer",
    component: Pix.Send.Share,
    protected: true,
    gestureEnabled: false,
  },
  pixSendCopyAndPaste: {
    name: "PixSendCopyAndPaste",
    component: Pix.Send.CopyAndPaste,
    protected: true,
  },
  pixSendReadQRCode: {
    name: "PixSendReadQRCode",
    component: Pix.Send.ReadQRCode,
    protected: true,
  },
  registerHome: {
    name: "RegisterHome",
    component: Register.Home,
    protected: true,
  },
  registerEditData: {
    name: "RegisterEditData",
    component: Register.EditData,
    protected: true,
  },
  registerFaceValidationHome: {
    name: "RegisterFaceValidationHome",
    component: Register.FaceValidation.Home,
    protected: true,
  },
  registerRegisterFaceValidationConfirmSelfie: {
    name: "RegisterFaceValidationConfirmSelfie",
    component: Register.FaceValidation.ConfirmSelfie,
    protected: true,
  },
  pixKeysHome: {
    name: "PixKeysHome",
    component: Pix.Keys.Home,
    protected: true,
  },
}) as RouteStack<StackParams>;

export type RouteStackParams<NavigatorId extends keyof StackParams> =
  StackScreenProps<StackParams, NavigatorId>;
