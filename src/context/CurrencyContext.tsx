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

const VALID_CURRENCIES: Currency[] = ['USD', 'EUR', 'SAR', 'AED', 'TRY'];

export function CurrencyProvider({
  children,
  defaultCurrency = 'USD',
  locale = 'ar'
}: {
  children: React.ReactNode;
  defaultCurrency?: Currency;
  locale?: string;
}) {
  // Always initialize with predictable server-matching value to prevent hydration crashes
  const [currency, setCurrencyState] = useState<Currency>(
    locale === 'ar' ? 'SAR' : defaultCurrency
  );

  // Safely restore saved preference on client mount inside try-catch (guarded against Safari Private Mode)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('istanora_currency') as Currency;
        if (saved && VALID_CURRENCIES.includes(saved)) {
          setCurrencyState(saved);
        }
      }
    } catch {
      // Storage access blocked or restricted (e.g., Safari private browsing) - fail silently
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('istanora_currency', c);
      }
    } catch {
      // Ignore storage write errors on restricted devices
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
