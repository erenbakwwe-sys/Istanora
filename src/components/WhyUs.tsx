'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Car,
  Briefcase,
  UserCheck,
  Plane,
  BadgeDollarSign,
  Headphones,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function WhyUs() {
  const t = useTranslations('whyUs');

  const icons = [
    Car,
    Briefcase,
    UserCheck,
    Plane,
    BadgeDollarSign,
    Headphones,
  ];

  const rawItems = [0, 1, 2, 3, 4, 5].map((index) => ({
    title: t(`items.${index}.title`),
    desc: t(`items.${index}.desc`),
    Icon: icons[index]
  }));

  return (
    <section id="why-us" className="py-20 bg-[#071324] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 end-0 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

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

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rawItems.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <div
                key={idx}
                className="group rounded-3xl p-6 sm:p-7 bg-[#0A1A33]/70 hover:bg-[#0A1A33] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 shadow-xl shadow-black/30 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F2852] to-[#071324] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full">
                    0{idx + 1}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner / Meet & Greet Spotlight */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#0A1A33] via-[#0E2548] to-[#0A1A33] border border-[#D4AF37]/30 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest font-extrabold text-[#D4AF37]">
                MEET & GREET PROTOCOL
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                استقبال بالاسم فور خروجك من الصالة مع مساعدة كاملة في الحقائب
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                لا داعي للانتظار في طوابير التاكسي المرهقة أو المفاوضات على الأسعار. سائقك الخاص بانتظارك مسبقاً، يرافقك مباشرة إلى سيارتك المرسيدس فيتو المكيفة والمجهزة لراحتك.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>تتبع رادار الرحلة الجوية آلياً</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>60 دقيقة انتظار مجاني في المطار</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>مساعدة كاملة في حمل الأمتعة</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>إلغاء مجاني حتى 24 ساعة</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
                <Image
                  src="/images/vito-vip.jpg"
                  alt="Istanora VIP Transfer Personalized Chauffeur Meet and Greet"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
