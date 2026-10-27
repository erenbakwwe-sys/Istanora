'use client';

import React, { useEffect, Suspense } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingConcierge from '@/components/FloatingConcierge';
import { CheckCircle2, Headphones, Home, ShieldCheck, Mail, Clock } from 'lucide-react';

function ThankYouContent() {
  const t = useTranslations('thankYou');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId') || '';

  useEffect(() => {
    // Fire Google Ads conversion event if configured
    if (typeof window !== 'undefined' && (window as any).gtag && process.env.NEXT_PUBLIC_ADS_CONVERSION_ID) {
      (window as any).gtag('event', 'conversion', {
        send_to: process.env.NEXT_PUBLIC_ADS_CONVERSION_ID,
      });
    }
  }, []);

  return (
    <main className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center flex-1 flex flex-col justify-center">
      <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-xl shadow-emerald-950/40 animate-bounce">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
        {t('title')}
      </h1>

      {bookingId && (
        <div className="inline-block mx-auto mb-4 px-4 py-1.5 rounded-full bg-[#0D1E38] border border-[#D4AF37] text-amber-300 font-extrabold text-xs tracking-wider uppercase">
          {locale === 'ar' ? 'رقم الحجز:' : 'Rezervasyon No:'} #{bookingId}
        </div>
      )}

      {/* 48-Hour Assurance Box */}
      <div className="p-5 rounded-2xl bg-[#0A1A33] border border-[#D4AF37]/40 mb-6 space-y-3 text-start shadow-xl">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
          <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>
            {locale === 'ar'
              ? 'تم استلام طلبكم - سيتواصل معكم ممثلنا خلال 48 ساعة'
              : locale === 'en'
              ? 'Request Received - Our VIP Concierge will contact you within 48 hours'
              : 'İşleminiz Bize Ulaşmıştır - Müşteri Temsilcimiz 48 Saat İçerisinde Size Ulaşacaktır'}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {locale === 'ar'
            ? 'شكراً لاختياركم إستانورا VIP. تم استلام تفاصيل حجزكم بنجاح في مركز العمليات. سيقوم منسق الرحلات بمراجعة جدولك والتواصل معك لتأكيد كافة الترتيبات وبيانات السائق قبل موعد رحلتك بوقت كافٍ.'
            : locale === 'en'
            ? 'Thank you for choosing Istanora VIP. Your transfer request is logged in our operations center. Our flight concierge will review your schedule and contact you to finalize chauffeur dispatch prior to your arrival.'
            : 'Transfer talebiniz güvenle VIP Operasyon Merkezimize ulaşmıştır. Uçuş koordinatörümüz rezervasyon detaylarınızı incelemekte olup, en geç 48 saat içerisinde (veya uçuş saatiniz daha yakınsa hemen uçuşunuzdan önce) şoförünüzün atanması ve karşılama detaylarını teyit etmek üzere sizinle iletişime geçecektir.'}
        </p>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60 text-xs text-slate-400">
          <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            {locale === 'ar'
              ? 'تم إرسال نسخة من تفاصيل الحجز ورمز التتبع إلى بريدكم الإلكتروني.'
              : locale === 'en'
              ? 'A confirmation summary and booking voucher have been dispatched to your email.'
              : 'Rezervasyon detaylarınız ve VIP takip kodunuz e-posta adresinize otomatik olarak iletilmiştir.'}
          </span>
        </div>
      </div>

      {/* Terminal Meet & Greet Guarantee */}
      <div className="p-4 rounded-xl bg-[#071324] border border-slate-800 mb-8 space-y-1.5 text-xs text-center">
        <div className="flex items-center justify-center gap-2 text-slate-200 font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>
            {locale === 'ar'
              ? 'استقبال VIP مجاني بالاسم عند بوابة الخروج بالمطار'
              : 'Havalimanı Çıkışında İsimli VIP Karşılama (Meet & Greet)'}
          </span>
        </div>
        <p className="text-slate-400 text-[11px] max-w-md mx-auto">
          {locale === 'ar'
            ? 'مطار إسطنبول (IST) بوابة 9 • مطار صبيحة (SAW) بوابة 3'
            : 'İstanbul Havalimanı (IST) Kapı 9 • Sabiha Gökçen (SAW) Kapı 3'}
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
  );
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#071324] text-white flex flex-col justify-between">
      <Header />
      <Suspense fallback={<div className="pt-40 text-center text-slate-400">Yükleniyor...</div>}>
        <ThankYouContent />
      </Suspense>
      <Footer />
      <FloatingConcierge />
    </div>
  );
}
