import { api } from "@/services/api";

interface UserGetUnparsedResponse {
  email: string;
  first_name: string;
  last_name: string | null;
  picture: string | null;
  cpf: string | null;
  totalSales: number;
  nextAward: {
    target_sales: number;
  };
}

interface UserProps {
  firstName: string;
  lastName: string | null;
  picture: string | null;
  email: string;
  cpf: string | null;
}

export interface UserGetResponse {
  user: UserProps;
  revenue: {
    current: number;
    total: number;
  };
}

function userMapper(data: UserGetUnparsedResponse): UserGetResponse {
  return {
    user: {
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      picture: data.picture,
      cpf: data.cpf,
    },
    revenue: {
      current: data.totalSales || 0,
      total: data.nextAward.target_sales || 10_000,
    },
  };
}

class User {
  async get(): Promise<UserGetResponse> {
    const response = await api.get("/user/");
    return userMapper(response.data);
  }
}

export default new User();
