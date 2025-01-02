import { Number } from "./number";

function CPF(cpf: string): string {
  cpf = Number.getOnlyNumbers(cpf);
  if (cpf.length !== 11) return cpf;
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function CNPJ(cnpj: string): string {
  cnpj = Number.getOnlyNumbers(cnpj);
  if (cnpj.length !== 14) return "Invalid CNPJ";
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

function Telephone(telephone: string) {
  telephone = Number.getOnlyNumbers(telephone);

  return telephone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

export const Others = {
  CPF,
  CNPJ,
  Telephone,
};
