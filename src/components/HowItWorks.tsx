'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { MessageSquare, CheckCircle2, UserCheck, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const t = useTranslations('howItWorks');

  const steps = [
    {
      num: '01',
      title: t('step1Title'),
      desc: t('step1Desc'),
      Icon: MessageSquare
    },
    {
      num: '02',
      title: t('step2Title'),
      desc: t('step2Desc'),
      Icon: CheckCircle2
    },
    {
      num: '03',
      title: t('step3Title'),
      desc: t('step3Desc'),
      Icon: UserCheck
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#071324] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
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

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.Icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl bg-[#0A1A33]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] p-8 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0F2852] to-[#071324] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-lg">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-slate-700 group-hover:text-[#D4AF37]/40 transition-colors">
                      {s.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
