import { Intl } from "../intl";

// Check if all digits are the same (e.g., "11111111111")
function isSequenceOfSameDigits(value: string): boolean {
  return /^(\d)\1+$/.test(value);
}

function CPF(cpf: string): boolean {
  cpf = Intl.Number.getOnlyNumbers(cpf);
  if (cpf.length !== 11) return false;
  if (isSequenceOfSameDigits(cpf)) return false;

  const calculateCheckDigit = (length: number): number => {
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += (cpf.charCodeAt(i) - 48) * (length + 1 - i);
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  // Calculate the 1st and 2nd check digits
  const firstCheckDigit = calculateCheckDigit(9);
  const secondCheckDigit = calculateCheckDigit(10);

  // Verify if the calculated check digits match the provided ones
  return (
    firstCheckDigit === cpf.charCodeAt(9) - 48 &&
    secondCheckDigit === cpf.charCodeAt(10) - 48
  );
}

function CNPJ(cnpj: string): boolean {
  cnpj = Intl.Number.getOnlyNumbers(cnpj);
  if (cnpj.length !== 14) return false;
  if (isSequenceOfSameDigits(cnpj)) return false;

  // Pesos usados para o cálculo dos dígitos verificadores (corrigidos)
  const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  // Função para calcular um dígito verificador
  const calculateCheckDigit = (length: number): number => {
    let sum = 0;
    for (let i = 0; i < length; i++) {
      const digit = cnpj.charCodeAt(i) - 48;
      const weight = weights[i + (weights.length - length)];
      sum += digit * weight;
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstCheckDigit = calculateCheckDigit(12);
  if (firstCheckDigit !== cnpj.charCodeAt(12) - 48) return false;

  const secondCheckDigit = calculateCheckDigit(13);
  if (secondCheckDigit !== cnpj.charCodeAt(13) - 48) return false;

  return true;
}

function Telephone(telephone: string) {
  telephone = Intl.Number.getOnlyNumbers(telephone);

  if (telephone.length !== 11) return false;
  if (isSequenceOfSameDigits(telephone)) return false;
  return /^(\d{2})9\d{8}$/.test(telephone);
}

function Email(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function PartialUUIDv4(uuid: string): boolean {
  const regex =
    /^([0-9a-fA-F]{0,8}-?|[0-9a-fA-F]{8}-[0-9a-fA-F]{0,4}-?|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{0,3}-?|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{0,3}-?|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}-[0-9a-fA-F]{0,12})$/;

  return regex.test(uuid);
}

function UUIDv4(uuid: string) {
  const regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  return regex.test(uuid);
}

export const Validators = Object.freeze({
  CPF,
  CNPJ,
  Telephone,
  Email,
  PartialUUIDv4,
  UUIDv4,
});
