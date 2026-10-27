import pricingData from '@data/pricing.json';

export type Currency = 'USD' | 'EUR' | 'SAR' | 'AED' | 'TRY';

export const CURRENCY_SYMBOLS: Record<Currency, string> = pricingData.currencySymbols as Record<Currency, string>;
export const CURRENCY_RATES: Record<Currency, number> = pricingData.currencyRates as Record<Currency, number>;

export function convertPrice(amountInUSD: number, targetCurrency: Currency): number {
  const rate = CURRENCY_RATES[targetCurrency] || 1;
  const converted = amountInUSD * rate;
  // Round to clean integer
  if (targetCurrency === 'TRY') {
    return Math.round(converted / 10) * 10;
  }
  return Math.round(converted);
}

export function formatPrice(amountInUSD: number, currency: Currency, locale: string = 'ar'): string {
  const value = convertPrice(amountInUSD, currency);
  const symbol = CURRENCY_SYMBOLS[currency] || '$';

  if (locale === 'ar') {
    if (currency === 'USD') return `$${value}`;
    if (currency === 'EUR') return `€${value}`;
    if (currency === 'SAR') return `${value} ر.س`;
    if (currency === 'AED') return `${value} د.إ`;
    if (currency === 'TRY') return `${value} ₺`;
    return `${value} ${symbol}`;
  }

  if (currency === 'USD') return `$${value}`;
  if (currency === 'EUR') return `€${value}`;
  return `${value} ${symbol}`;
}
