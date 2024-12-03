import { StackScreenProps } from "@react-navigation/stack";
import {
  Splash,
  Start,
  Login,
} from "../screens/public";
import { Home } from "@/screens/authenticated";

export type StackParams = {
  Splash: undefined;
  Start: undefined;
  Login: undefined;
  Home: undefined;
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
  home: {
    name: "Home",
    component: Home,
    protected: true,
  },
}) as RouteStack<StackParams>;

export type RouteStackParams<NavigatorId extends keyof StackParams> =
  StackScreenProps<StackParams, NavigatorId>;
