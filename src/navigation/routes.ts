import { StackScreenProps } from "@react-navigation/stack";
import {
  Splash,
  Start,
  Login,
  ForgotPassword,
  ConfirmResetCode,
  ResetPassword,
} from "../screens/public";
import { Home, Pix } from "@/screens/authenticated";

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
};

type RouteStack<T> = Record<
  string,
  { name: keyof T; component: any; protected: boolean }
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
}) as RouteStack<StackParams>;

export type RouteStackParams<NavigatorId extends keyof StackParams> =
  StackScreenProps<StackParams, NavigatorId>;
