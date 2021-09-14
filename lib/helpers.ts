export const formatCurrency = (amount: string | number, currency: string) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    currencyDisplay: "code",
  })
    .format(+amount)
    .replace(/\D00(?=\D*$)/, "");

export const formatUnitPrice = (
  variantUnitPrice: any,
  unitPriceMeasurement: any
) =>
  !!variantUnitPrice && !!unitPriceMeasurement
    ? `${formatCurrency(
        variantUnitPrice.amount,
        variantUnitPrice.currencyCode
      )} / ${unitPriceMeasurement.quantityUnit}`
    : null;
