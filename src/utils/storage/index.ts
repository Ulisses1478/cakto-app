import AsyncStorage from "@react-native-async-storage/async-storage";

enum Keys {
  AUTH = "@cakto/auth",
  HIDE_VALUE = "@cakto/hide_value",
  PIN_TRIES = "@cakto/pin_tries",
}

async function getItem<T = undefined>(key: Keys): Promise<T | null> {
  const value = (await AsyncStorage.getItem(key)) || null;
  if (!value) return null;
  return JSON.parse(value);
}

async function setItem(key: Keys, value: unknown): Promise<void> {
  const data = typeof value === "string" ? value : JSON.stringify(value);
  await AsyncStorage.setItem(key, data);
}

async function removeItem(key: Keys): Promise<void> {
  await AsyncStorage.removeItem(key);
}

export const Storage = Object.freeze({
  getItem,
  setItem,
  removeItem,
  Keys,
});
