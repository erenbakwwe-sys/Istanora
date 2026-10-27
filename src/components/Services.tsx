'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  Plane,
  Compass,
  Trees,
  Clock,
  CarFront,
  Navigation,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function Services() {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const serviceIcons = [
    Plane,
    Navigation,
    Compass,
    Trees,
    Clock,
    CarFront,
  ];

  const services = [0, 1, 2, 3, 4, 5].map((i) => ({
    title: t(`items.${i}.title`),
    desc: t(`items.${i}.desc`),
    Icon: serviceIcons[i]
  }));

  return (
    <section id="services" className="py-20 bg-[#06101E] relative overflow-hidden">
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

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, index) => {
            const Icon = item.Icon;
            return (
              <div
                key={index}
                className="rounded-3xl bg-[#0A1A33]/70 hover:bg-[#0A1A33] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 p-7 transition-all duration-300 shadow-xl flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#071324] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <a
                    href="#booking"
                    className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:text-amber-300 transition-colors"
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
