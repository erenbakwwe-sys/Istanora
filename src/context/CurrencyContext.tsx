'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency, formatPrice, convertPrice } from '@/lib/currency';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (amountUSD: number) => string;
  convert: (amountUSD: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({
  children,
  defaultCurrency = 'USD',
  locale = 'ar'
}: {
  children: React.ReactNode;
  defaultCurrency?: Currency;
  locale?: string;
}) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    // If locale is Arabic, default to SAR for Gulf audience or USD
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vibest_currency') as Currency;
      if (saved) return saved;
    }
    return locale === 'ar' ? 'SAR' : defaultCurrency;
  });

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    if (typeof window !== 'undefined') {
      localStorage.setItem('vibest_currency', c);
    }
  };

  const format = (amountUSD: number) => formatPrice(amountUSD, currency, locale);
  const convert = (amountUSD: number) => convertPrice(amountUSD, currency);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
