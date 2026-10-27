'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useCurrency } from '@/context/CurrencyContext';
import { Currency } from '@/lib/currency';
import destinationsData from '@data/destinations.json';
import pricingData from '@data/pricing.json';
import {
  MapPin,
  Clock,
  Sparkles,
  Coins,
  CreditCard,
  Car,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function Destinations() {
  const t = useTranslations('destinations');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const { currency, setCurrency, format } = useCurrency();

  const [activeFilter, setActiveFilter] = useState<'all' | 'istanbul' | 'daytrip'>('all');

  const filteredDestinations = destinationsData.filter((d) => {
    if (activeFilter === 'all') return true;
    return d.category === activeFilter;
  });

  const currencies: Currency[] = ['USD', 'EUR', 'SAR', 'AED', 'TRY'];

  const handleQuickBook = (destId: string, destName: string, priceUSD: number) => {
    const params = new URLSearchParams({
      pickup: locale === 'ar' ? 'مطار إسطنبول (IST)' : 'Istanbul Airport (IST)',
      dropoff: destName,
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      vehicle: 'vito',
      passengers: '2',
      luggage: '2',
      price: priceUSD.toString()
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <section id="destinations" className="py-20 bg-[#071324] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1A33] border border-[#D4AF37]/40 text-xs font-bold text-amber-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t('badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            {t('subtitle')}
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-gold-gradient text-[#0A1A33] shadow-md shadow-[#D4AF37]/20'
                  : 'bg-[#0A1A33] text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {t('filterAll')}
            </button>
            <button
              onClick={() => setActiveFilter('istanbul')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === 'istanbul'
                  ? 'bg-gold-gradient text-[#0A1A33] shadow-md shadow-[#D4AF37]/20'
                  : 'bg-[#0A1A33] text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {t('filterIstanbul')}
            </button>
            <button
              onClick={() => setActiveFilter('daytrip')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === 'daytrip'
                  ? 'bg-gold-gradient text-[#0A1A33] shadow-md shadow-[#D4AF37]/20'
                  : 'bg-[#0A1A33] text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {t('filterDayTrips')}
            </button>
          </div>
        </div>

        {/* Visual Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => {
            const destName = (dest.name as any)[locale] || dest.name.en;
            const destDesc = (dest.description as any)[locale] || dest.description.en;
            const price = format(dest.startingPriceUSD);

            return (
              <div
                key={dest.id}
                className="rounded-3xl bg-[#0A1A33]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 shadow-xl overflow-hidden flex flex-col group hover:-translate-y-1.5"
              >
                <div className="relative w-full h-44 bg-[#071324] overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={destName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 start-3">
                    <span className="px-2.5 py-1 rounded-lg bg-[#071324]/90 border border-slate-700 text-[11px] font-semibold text-slate-200 flex items-center gap-1 backdrop-blur-md">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      <span>{dest.duration}</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-amber-300 transition-colors">
                      {destName}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {destDesc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-slate-400 font-semibold">
                        {tCommon('startingFrom')}
                      </span>
                      <span className="text-lg font-black text-amber-300">
                        {price}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleQuickBook(dest.id, destName, dest.startingPriceUSD)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-[#0A1A33] text-xs font-black transition-all shadow-md shadow-[#D4AF37]/20"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>{t('action')}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Matrix Table Section */}
        <div className="mt-16 rounded-3xl bg-[#0A1A33]/90 border border-[#D4AF37]/30 shadow-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {t('tableTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {locale === 'ar'
                  ? 'أسعار واضحة وثابتة شاملة كافة الرسوم والضرائب، لا رسوم خفية'
                  : 'Guaranteed fixed fares including all highway tolls and airport fees'}
              </p>
            </div>

            {/* Currency selector tabs right over table */}
            <div className="flex items-center gap-1.5 bg-[#071324] p-1 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 px-2 font-medium flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">{tCommon('currency')}:</span>
              </span>
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${
                    currency === c
                      ? 'bg-gold-gradient text-[#0A1A33] shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-start text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-4 font-semibold text-start">{t('route')}</th>
                  <th className="py-3 px-4 font-semibold text-center">{t('duration')}</th>
                  <th className="py-3 px-4 font-semibold text-center text-amber-300">
                    {t('vitoPrice')}
                  </th>
                  <th className="py-3 px-4 font-semibold text-center text-slate-200">
                    {t('sprinterPrice')}
                  </th>
                  <th className="py-3 px-4 font-semibold text-end">{t('action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {pricingData.routes.map((route) => {
                  const routeName = (route.name as any)[locale] || route.name.en;
                  const vitoPrice = format(route.prices.vito);
                  const sprinterPrice = format(route.prices.sprinter);

                  return (
                    <tr
                      key={route.id}
                      className="hover:bg-[#071324]/50 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span>{routeName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center text-slate-400">
                        {route.durationMin} {locale === 'ar' ? 'دقيقة' : 'min'}
                      </td>
                      <td className="py-4 px-4 text-center font-extrabold text-amber-300 text-base">
                        {vitoPrice}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-slate-200 text-base">
                        {sprinterPrice}
                      </td>
                      <td className="py-4 px-4 text-end">
                        <button
                          type="button"
                          onClick={() => handleQuickBook(route.id, routeName, route.prices.vito)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gold-gradient hover:bg-gold-gradient-hover text-[#0A1A33] text-xs font-black transition-all shadow"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>{t('action')}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
