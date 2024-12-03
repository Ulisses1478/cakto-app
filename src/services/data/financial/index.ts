import { api } from "@/services/api";

interface BalanceProps {
  balance: number;
  pending: number;
}

export interface FinancialProps {
  Balance: {
    Get: BalanceProps;
  };
}

class Financial {
  async getBalance(): Promise<BalanceProps> {
    const response = await api.get("/financial/balance/");
    return response.data;
  }
}

export default new Financial();
