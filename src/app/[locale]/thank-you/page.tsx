'use client';

import React, { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingConcierge from '@/components/FloatingConcierge';
import { CheckCircle2, Headphones, Home, ShieldCheck, Plane } from 'lucide-react';

export default function ThankYouPage() {
  const t = useTranslations('thankYou');
  const locale = useLocale();

  useEffect(() => {
    // Fire Google Ads conversion event if configured
    if (typeof window !== 'undefined' && (window as any).gtag && process.env.NEXT_PUBLIC_ADS_CONVERSION_ID) {
      (window as any).gtag('event', 'conversion', {
        send_to: process.env.NEXT_PUBLIC_ADS_CONVERSION_ID,
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#071324] text-white flex flex-col justify-between">
      <Header />

      <main className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center flex-1 flex flex-col justify-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-xl shadow-emerald-950/40 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          {t('title')}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
          {t('subtitle')}
        </p>

        <div className="p-5 rounded-2xl bg-[#0A1A33] border border-[#D4AF37]/30 mb-8 space-y-2 text-xs">
          <div className="flex items-center justify-center gap-2 text-amber-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>
              {locale === 'ar'
                ? 'حجزكم مؤكد ومحمي بضمان إستانورا VIP (Istanora)'
                : 'Rezervasyonunuz Istanora VIP Transfer Güvencesi Altındadır'}
            </span>
          </div>
          <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
            {locale === 'ar'
              ? 'يقوم مكتب العمليات الآن بمتابعة رحلتكم وتجهيز السيارة والسائق الخاص لاستقبالكم بلوحة الاسم عند الموعد المحدد.'
              : 'Operasyon merkezimiz uçuş kodunuzu sisteme kaydetti. Şoförünüz iniş saatinizde terminal kapısında adınızın yazılı olduğu VIP pano ile hazır olacaktır.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-[#0A1A33] font-black text-sm shadow-xl shadow-[#D4AF37]/20 transition-all hover:scale-[1.02]"
          >
            <Home className="w-4 h-4" />
            <span>{t('btnHome')}</span>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0F2852] hover:bg-[#153466] border border-[#D4AF37]/50 text-slate-200 font-bold text-sm shadow-md transition-all"
          >
            <Headphones className="w-4 h-4 text-[#D4AF37]" />
            <span>
              {locale === 'ar'
                ? 'مكتب العمليات والاستفسارات'
                : 'Canlı Operasyon Masası'}
            </span>
          </Link>
        </div>
      </main>

      <Footer />
      <FloatingConcierge />
    </div>
  );
}
