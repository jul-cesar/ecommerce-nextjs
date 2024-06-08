const CURRENCY_FORMATTER = new Intl.NumberFormat("es-CO", {
  currency: "COP",
  style: "currency",
  minimumFractionDigits: 0,
});

export const formatCurrency = (amount: number) => {
  return CURRENCY_FORMATTER.format(amount);
};

const NUMBER_FORMATTER = new Intl.NumberFormat("es-CO");

export const formatNumber = (number: number) => {
  return NUMBER_FORMATTER.format(number);
};
