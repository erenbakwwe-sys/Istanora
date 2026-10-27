'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, Link } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingConcierge from '@/components/FloatingConcierge';
import {
  CreditCard,
  Headphones,
  Clock,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Loader2
} from 'lucide-react';

function PaypalNoticeContent() {
  const t = useTranslations('paypalNotice');
  const locale = useLocale();
  const searchParams = useSearchParams();

  // Preserve existing search params to return to checkout smoothly
  const queryString = searchParams.toString();
  const returnUrl = `/checkout${queryString ? `?${queryString}` : ''}`;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="rounded-3xl bg-[#0A1A33]/90 border border-[#D4AF37]/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 start-1/2 -translate-x-1/2 w-64 h-64 bg-[#D4AF37]/15 blur-[80px] rounded-full pointer-events-none" />

        {/* PayPal Icon with Coming Soon Badge */}
        <div className="relative inline-block mb-6">
          <div className="w-20 h-20 rounded-3xl bg-[#071324] border-2 border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-xl mx-auto">
            <span className="text-3xl font-black italic tracking-tighter text-[#3b7bbf]">
              Pay<span className="text-[#00457c]">Pal</span>
            </span>
          </div>
          <span className="absolute -bottom-2 start-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-400 text-[10px] font-black text-amber-300 uppercase tracking-wider">
            {t('badge')}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          {t('title')}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
          {t('subtitle')}
        </p>

        {/* Advice box */}
        <div className="p-4 rounded-2xl bg-[#071324] border border-slate-700 text-xs sm:text-sm text-slate-300 mb-8 leading-relaxed">
          {t('advice')}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href={returnUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gold-gradient hover:bg-gold-gradient-hover text-[#0A1A33] font-black text-sm shadow-xl shadow-[#D4AF37]/20 transition-all hover:scale-[1.02]"
          >
            <CreditCard className="w-4 h-4" />
            <span>{t('btnBack')}</span>
            {locale === 'ar' ? (
              <ArrowLeft className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0F2852] hover:bg-[#153466] border border-[#D4AF37]/50 text-white font-bold text-sm shadow-lg transition-all"
          >
            <Headphones className="w-4 h-4 text-[#D4AF37]" />
            <span>
              {locale === 'ar'
                ? 'مكتب عمليات الكونسيرج'
                : locale === 'tr'
                ? 'Operasyon Masasına Danış'
                : 'Consult Live Concierge'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaypalNoticePage() {
  return (
    <div className="min-h-screen bg-[#071324] text-white flex flex-col justify-between">
      <Header />

      <main className="pt-28 md:pt-36 pb-20 flex-1 flex items-center justify-center">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[40vh]">
              <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
            </div>
          }
        >
          <PaypalNoticeContent />
        </Suspense>
      </main>

      <Footer />
      <FloatingConcierge />
    </div>
  );
}