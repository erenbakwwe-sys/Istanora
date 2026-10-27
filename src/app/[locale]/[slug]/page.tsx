import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingConcierge from '@/components/FloatingConcierge';
import BookingWidget from '@/components/BookingWidget';
import WhyUs from '@/components/WhyUs';
import Faq from '@/components/Faq';
import Destinations from '@/components/Destinations';
import destinationsData from '@data/destinations.json';
import { Sparkles, MapPin, Clock, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const dest = destinationsData.find((d) => d.slug === slug);

  if (!dest) {
    return {
      title: 'Istanora VIP Transfer | VIP Istanbul Airport Transfer',
    };
  }

  const name = (dest.name as any)[locale] || dest.name.en;
  return {
    title: locale === 'ar'
      ? `توصيل VIP إلى ${name} | إستانورا VIP إسطنبول`
      : `VIP Transfer to ${name} | Istanora VIP Istanbul`,
    description: (dest.description as any)[locale] || dest.description.en,
  };
}

export default async function AdLandingPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const dest = destinationsData.find((d) => d.slug === slug);

  if (!dest) {
    notFound();
  }

  const name = (dest.name as any)[locale] || dest.name.en;
  const desc = (dest.description as any)[locale] || dest.description.en;

  return (
    <div className="min-h-screen bg-[#071324] text-white">
      <Header />

      <main className="pt-32 md:pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero for Destination */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0A1A33] border border-[#D4AF37]/50 text-xs font-bold text-amber-300 mb-4 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>
                {locale === 'ar' ? 'توصيل خاص ومباشر' : 'Direct VIP Chauffeur Transfer'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              {locale === 'ar'
                ? `استقبال وتوصيل VIP من المطار إلى ${name}`
                : `VIP Airport Transfer to ${name}`}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {desc}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1 bg-[#0A1A33] px-3 py-1.5 rounded-xl border border-slate-700">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                {dest.distanceKm} km
              </span>
              <span className="flex items-center gap-1 bg-[#0A1A33] px-3 py-1.5 rounded-xl border border-slate-700">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                {dest.duration}
              </span>
              <span className="flex items-center gap-1 bg-[#0A1A33] px-3 py-1.5 rounded-xl border border-[#D4AF37]/40 text-amber-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {locale === 'ar' ? 'سعر ثابت شامل الرسوم' : 'All-Inclusive Fixed Fare'}
              </span>
            </div>
          </div>

          {/* Quick Booking Widget tailored */}
          <BookingWidget />

          <div className="mt-20">
            <WhyUs />
            <Destinations />
            <Faq />
          </div>
        </div>
      </main>

      <Footer />
      <FloatingConcierge />
    </div>
  );
}
