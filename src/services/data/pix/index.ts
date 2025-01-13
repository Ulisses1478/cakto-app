import Key, { PIX_KEY_STATUS, PIX_KEY_TYPES, PixKeyGetResponse } from "./key";

export const Pix = {
  Key,
};

export const PixEnums = {
  Key: { PIX_KEY_STATUS, PIX_KEY_TYPES },
};

export interface PixProps {
  Key: {
    Get: PixKeyGetResponse;
  };
}
