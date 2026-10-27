'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import faqData from '@data/faq.json';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

export default function Faq() {
  const t = useTranslations('faq');
  const locale = useLocale();

  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 bg-[#071324] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        {/* Accordion list */}
        <div className="space-y-4">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            const q = (item.question as any)[locale] || item.question.en;
            const a = (item.answer as any)[locale] || item.answer.en;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-[#0A1A33]/80 border border-slate-800 transition-colors overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full text-start p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-white text-base hover:text-amber-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <span>{q}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#D4AF37]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                    <p className="pt-4">{a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
