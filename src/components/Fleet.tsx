'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Users,
  Briefcase,
  Tv,
  Wifi,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  ShieldAlert
} from 'lucide-react';

export default function Fleet() {
  const t = useTranslations('fleet');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const { format } = useCurrency();

  const vehicles = [
    {
      id: 'vito',
      name: t('vito.name'),
      badge: t('vito.badge'),
      pax: t('vito.pax'),
      luggage: t('vito.luggage'),
      desc: t('vito.desc'),
      image: '/images/vito-vip.jpg',
      startingPriceUSD: 45,
      features: [
        t('vito.features.0'),
        t('vito.features.1'),
        t('vito.features.2'),
        t('vito.features.3'),
        t('vito.features.4'),
      ]
    },
    {
      id: 'sprinter',
      name: t('sprinter.name'),
      badge: t('sprinter.badge'),
      pax: t('sprinter.pax'),
      luggage: t('sprinter.luggage'),
      desc: t('sprinter.desc'),
      image: '/images/sprinter-vip.png',
      startingPriceUSD: 70,
      features: [
        t('sprinter.features.0'),
        t('sprinter.features.1'),
        t('sprinter.features.2'),
        t('sprinter.features.3'),
        t('sprinter.features.4'),
      ]
    },
    {
      id: 'maybach',
      name: t('maybach.name'),
      badge: t('maybach.badge'),
      pax: t('maybach.pax'),
      luggage: t('maybach.luggage'),
      desc: t('maybach.desc'),
      image: '/images/maybach-vip.png',
      startingPriceUSD: 140,
      features: [
        t('maybach.features.0'),
        t('maybach.features.1'),
        t('maybach.features.2'),
        t('maybach.features.3'),
        t('maybach.features.4'),
      ]
    }
  ];

  return (
    <section id="fleet" className="py-20 bg-[#06101E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className="rounded-3xl bg-[#0A1A33]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 shadow-xl overflow-hidden flex flex-col group hover:-translate-y-1.5"
            >
              {/* Vehicle Image Container */}
              <div className="relative w-full h-56 bg-[#071324] overflow-hidden">
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 start-3">
                  <span className="px-3 py-1 rounded-full bg-[#0A1A33]/90 border border-[#D4AF37]/50 text-xs font-bold text-amber-300 shadow-lg">
                    {v.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {v.name}
                  </h3>

                  {/* Capacity Badges */}
                  <div className="flex items-center gap-3 my-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#071324] border border-slate-700 text-xs font-semibold text-slate-200">
                      <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{v.pax}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#071324] border border-slate-700 text-xs font-semibold text-slate-200">
                      <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{v.luggage}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {v.desc}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2 py-3 border-t border-slate-800">
                    {v.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Price and CTA */}
                <div className="pt-4 mt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] text-slate-400 font-medium">
                      {tCommon('startingFrom')}
                    </span>
                    <span className="text-xl font-extrabold text-amber-300">
                      {format(v.startingPriceUSD)}
                    </span>
                  </div>

                  <a
                    href="#booking"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-[#0A1A33] text-xs font-extrabold transition-all shadow-md shadow-[#D4AF37]/20"
                  >
                    <span>{tCommon('bookNow')}</span>
                    {locale === 'ar' ? (
                      <ArrowLeft className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
