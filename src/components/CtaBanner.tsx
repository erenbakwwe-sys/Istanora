'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Headphones, Sparkles, Mail, CreditCard, ShieldCheck } from 'lucide-react';

export default function CtaBanner() {
  const t = useTranslations('ctaBanner');
  const locale = useLocale();

  return (
    <section className="py-16 bg-[#071324] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-[#0A1A33] via-[#122A52] to-[#0A1A33] border border-[#D4AF37]/50 p-8 sm:p-14 shadow-2xl shadow-black/60 relative overflow-hidden text-center">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 start-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/15 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#071324] border border-[#D4AF37]/40 text-xs font-bold text-amber-300 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>VIP CONCIERGE 24/7</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              {t('title')}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gold-gradient hover:bg-gold-gradient-hover text-[#0A1A33] font-black text-base shadow-xl shadow-[#D4AF37]/30 hover:scale-[1.02] transition-all"
              >
                <CreditCard className="w-5 h-5" />
                <span>{t('btn')}</span>
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-[#071324] hover:bg-[#091C38] border border-[#D4AF37]/50 text-slate-200 font-bold text-base transition-all"
              >
                <Headphones className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {locale === 'ar'
                    ? 'طلب اتصال أو استفسار خاص'
                    : locale === 'tr'
                    ? 'Operasyon Masasından Geri Arama İste'
                    : 'Request Dispatch Callback'}
                </span>
              </a>

              <a
                href="mailto:concierge@istanora.com"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#081F3D] hover:bg-[#0F2D54] border border-slate-700 text-slate-300 font-bold text-sm transition-all"
              >
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>concierge@istanora.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
