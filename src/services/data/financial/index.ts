import { api } from "@/services/api";

interface BalanceProps {
  balance: number;
  pending: number;
}

export interface FinancialProps {
  Balance: {
    Get: BalanceProps;
  };
  Company: {
    Get: CompanyProps;
  };
}

interface CompanyProps {
  email: string;
  cpf: string;
  birthDate: string | null;
  motherName: string | null;
  cep: string | null;
  street: string | null;
  number: string | null;
  neighborhood: string | null;
  completeName: string | null;
  verificationDocumentType: string | null;
}

export type KeyOfCompanyProps = keyof CompanyProps;

class Financial {
  async getBalance(): Promise<BalanceProps> {
    const response = await api.get("/financial/balance/");
    return response.data;
  }

  async getCompany(): Promise<CompanyProps> {
    const response = await api.get("/financial/company/");
    response.data.email = response.data.user.email;
    return response.data;
  }
}

export default new Financial();
