import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Storage } from "@/utils/storage";

interface PinProviderProps {
  getRemainingTime: () => { minutes: string; seconds: string };
  pinAttempts: PinAttemptsProps;
  isBlocked: () => boolean;
  updateRetries: (data: Partial<PinAttemptsProps>) => void;
  PIN_TRIES: number;
}

const TEN_MINUTES = 10_000 * 60;
const PIN_TRIES = 3;

interface PinAttemptsProps {
  value: number;
  blockedAt: number;
  unblockAt: number;
}

const PinContext = createContext({} as PinProviderProps);

export function PinProvider({ children }: { children: ReactNode }) {
  const [pinAttempts, setPinAttempts] = useState<PinAttemptsProps>({
    value: 0,
    blockedAt: 0,
    unblockAt: 0,
  });

  async function getValueFromStorage() {
    const current = await Storage.getItem<PinAttemptsProps>(
      Storage.Keys.PIN_TRIES
    );
    const parse = current ?? { value: 0, blockedAt: 0, unblockAt: 0 };
    if (
      pinAttempts.unblockAt > pinAttempts.blockedAt &&
      Date.now() >= pinAttempts.unblockAt
    ) {
      parse.blockedAt = 0;
      parse.value = 0;
      parse.unblockAt = 0;
    }

    setPinAttempts(parse);
  }

  useEffect(() => {
    const interval = setInterval(getValueFromStorage, TEN_MINUTES);
    return () => clearInterval(interval);
  }, []);

  function getRemainingTime() {
    if (pinAttempts.blockedAt === 0) {
      return { minutes: "0", seconds: "0" };
    }
    const now = Date.now();
    const remainingTime = Math.max(pinAttempts.unblockAt - now, 0);

    const totalSeconds = Math.floor(remainingTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return { minutes: formattedMinutes, seconds: formattedSeconds };
  }

  function updateRetries(data: Partial<PinAttemptsProps>) {
    data.value = data.value ?? 0;
    data.blockedAt = data.blockedAt ?? pinAttempts.blockedAt ?? 0;
    data.unblockAt = data.unblockAt ?? pinAttempts.unblockAt ?? 0;
    const mustBlock = data.value >= PIN_TRIES;
    const now = Date.now();
    const parse = {
      value: data.value,
      blockedAt: mustBlock ? now : 0,
      unblockAt: Date.now() + TEN_MINUTES,
    };
    setPinAttempts(parse);
    Storage.setItem(Storage.Keys.PIN_TRIES, parse);
  }

  function isBlocked() {
    if (
      pinAttempts.unblockAt > pinAttempts.blockedAt &&
      Date.now() >= pinAttempts.unblockAt
    ) {
      updateRetries({
        value: 0,
        blockedAt: 0,
      });
      return false;
    }
    return true;
  }

  return (
    <PinContext.Provider
      value={{
        pinAttempts,
        getRemainingTime,
        isBlocked,
        PIN_TRIES,
        updateRetries,
      }}
    >
      {children}
    </PinContext.Provider>
  );
}

export function usePin() {
  return useContext(PinContext);
}
