import { handleMockResponse } from "@/services/api";

export enum PIX_KEY_TYPES {
  "RANDOM" = "evp",
  "CPF" = "national_registration",
  "PHONE_NUMBER" = "phone_number",
  "EMAIL" = "email",
}

export enum PIX_KEY_STATUS {
  "OPEN" = "OPEN",
  "WAITING_FOR_TRANSFER_ACCEPTANCE" = "WAITING_FOR_RESOLUTION",
  "DELETED" = "HISTORY",
}

const mock_key_types = Object.values(PIX_KEY_TYPES);
const mock_key_status = Object.values(PIX_KEY_STATUS);
const mock_key_data = {
  [PIX_KEY_TYPES.RANDOM]: "29d2fdda-76b8-4cd4-820e-39b50103a1f4",
  [PIX_KEY_TYPES.CPF]: "123.456.789-00",
  [PIX_KEY_TYPES.PHONE_NUMBER]: "(11) 99999-9999",
  [PIX_KEY_TYPES.EMAIL]: "gabriel.pedro@ubistart.com",
};

function generateKeys() {
  return Array.from({ length: 4 }).map((_, i) => {
    return {
      key: mock_key_data[mock_key_types[i]],
      key_type: mock_key_types[i] as PIX_KEY_TYPES,
      key_status: mock_key_status[
        Math.floor(Math.random() * 1)
      ] as PIX_KEY_STATUS,
    };
  });
}

export interface PixKeyGetResponse {
  key: string;
  type: PIX_KEY_TYPES;
  status: PIX_KEY_STATUS;
}

function keysMapper(data: PixKeyGetUnparsedResponse[]): PixKeyGetResponse[] {
  return data.map((key) => ({
    key: key.key,
    type: key.key_type,
    status: key.key_status,
  }));
}

interface PixKeyGetUnparsedResponse {
  key: string;
  key_type: PIX_KEY_TYPES;
  key_status: PIX_KEY_STATUS;
}

class Key {
  async get(): Promise<PixKeyGetResponse[]> {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));

    return keysMapper(generateKeys());
  }

  async delete(key: string) {
    const fetcher = () =>
      new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));

    return handleMockResponse(fetcher);
  }

  async requestPortability(key: string) {
    const fetcher = () =>
      new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));

    return handleMockResponse(fetcher);
  }

  async create(key: string) {
    const fetcher = () =>
      new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));

    return handleMockResponse(fetcher);
  }
}

export default new Key();
