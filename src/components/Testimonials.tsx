'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import reviewsData from '@data/reviews.json';
import { Star, ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviewsData.length - 1 ? 0 : prev + 1));
  };

  const flags: Record<string, string> = {
    SA: '🇸🇦',
    AE: '🇦🇪',
    KW: '🇰🇼',
    QA: '🇶🇦',
    GB: '🇬🇧',
  };

  return (
    <section id="testimonials" className="py-20 bg-[#06101E] relative overflow-hidden">
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

        {/* Featured Slider Card */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[#0A1A33]/90 border border-[#D4AF37]/40 p-6 sm:p-10 shadow-2xl relative">
            {/* Top Stars & Country */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-1.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ms-2 text-xs font-bold text-slate-300">5.0 / 5.0</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#071324] border border-slate-700 text-xs text-slate-200">
                <span>{flags[reviewsData[currentIndex].countryCode] || '🌍'}</span>
                <span>{reviewsData[currentIndex].location}</span>
              </div>
            </div>

            {/* Review text */}
            <blockquote className="text-base sm:text-xl text-slate-100 font-medium leading-relaxed italic mb-8">
              &ldquo;
              {(reviewsData[currentIndex].text as any)[locale] || reviewsData[currentIndex].text.en}
              &rdquo;
            </blockquote>

            {/* Author details & navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#FFF3B0] text-[#0A1A33] font-black text-lg flex items-center justify-center shadow-md">
                  {reviewsData[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">
                      {reviewsData[currentIndex].name}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {locale === 'ar' ? 'حجز مؤكد' : 'Verified Ride'}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {reviewsData[currentIndex].date}
                  </span>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={locale === 'ar' ? nextReview : prevReview}
                  className="w-10 h-10 rounded-xl bg-[#071324] border border-slate-700 hover:border-[#D4AF37] text-white flex items-center justify-center transition-colors"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={locale === 'ar' ? prevReview : nextReview}
                  className="w-10 h-10 rounded-xl bg-[#071324] border border-slate-700 hover:border-[#D4AF37] text-white flex items-center justify-center transition-colors"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
