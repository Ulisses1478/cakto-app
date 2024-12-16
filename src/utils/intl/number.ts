function formatCurrency(
  value?: number,
  options?: Partial<Intl.NumberFormatOptions>
) {
  value = value || 0;
  return Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
    ...options,
  }).format(value);
}

function formatToThousands(value?: number) {
  value = value || 0;

  if (value < 1000) {
    return `R$${value}`;
  }

  const formattedValue = (value / 1000).toFixed(1);

  return `R$${
    formattedValue.endsWith(".0") ? formattedValue.slice(0, -2) : formattedValue
  }k`;
}

export const Number = Object.freeze({
  formatCurrency,
  formatToThousands,
});
