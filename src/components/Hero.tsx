'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import BookingWidget from './BookingWidget';
import { ShieldCheck, UserCheck, PlaneTakeoff, Clock, Sparkles } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-hero-glow">
      {/* Background Luxury Vehicle & Bosphorus Photo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <Image
          src="/images/hero-vito.jpg"
          alt="VIP Mercedes Vito Istanbul Bosphorus"
          fill
          priority
          className="object-cover object-center filter brightness-90 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071324]/95 via-[#071324]/85 to-[#071324]" />
      </div>

      {/* Decorative ambient background elements */}
      <div className="absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 start-1/4 w-[400px] h-[400px] bg-[#0F2852]/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Text Content */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          {/* Top Luxury Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1A33] border border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/10 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs sm:text-sm font-bold text-amber-300 tracking-wide">
              {t('badge')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.2] mb-6">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          {/* 4 Trust Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#0A1A33]/70 border border-[#D4AF37]/20 text-xs font-semibold text-slate-200">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{t('trust1')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#0A1A33]/70 border border-[#D4AF37]/20 text-xs font-semibold text-slate-200">
              <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t('trust2')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#0A1A33]/70 border border-[#D4AF37]/20 text-xs font-semibold text-slate-200">
              <PlaneTakeoff className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{t('trust3')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#0A1A33]/70 border border-[#D4AF37]/20 text-xs font-semibold text-slate-200">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t('trust4')}</span>
            </div>
          </div>
        </div>

        {/* Embedded High Conversion Quick Booking Widget */}
        <div className="mt-8">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
}
