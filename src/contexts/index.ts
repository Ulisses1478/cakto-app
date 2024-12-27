import { AuthProvider, useAuth } from "./auth";
import { PinProvider, usePin } from "./pin";

export const Context = Object.freeze({
  AuthProvider,
  PinProvider,
});

export const ContextHook = Object.freeze({ useAuth, usePin });
