'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useCurrency } from '@/context/CurrencyContext';
import { trackBookingSubmission } from '@/lib/analytics';
import pricingData from '@data/pricing.json';
import destinationsData from '@data/destinations.json';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Briefcase,
  Car,
  Plane,
  CheckCircle2,
  Sparkles,
  Headphones,
  Mail,
  Loader2,
  Info
} from 'lucide-react';

interface RouteItem {
  id: string;
  from: string;
  to: string;
  name: Record<string, string>;
  distanceKm: number;
  durationMin: number;
  category: string;
  prices: {
    vito: number;
    sprinter: number;
    maybach: number;
  };
}

export default function BookingWidget() {
  const t = useTranslations('bookingWidget');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const { currency, format } = useCurrency();

  // Form states
  const [pickup, setPickup] = useState<string>('IST');
  const [dropoff, setDropoff] = useState<string>('taksim');
  const [customPickup, setCustomPickup] = useState<string>('');
  const [customDropoff, setCustomDropoff] = useState<string>('');
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState<string>('14:00');
  const [vehicle, setVehicle] = useState<'vito' | 'sprinter' | 'maybach'>('vito');
  const [passengers, setPassengers] = useState<number>(2);
  const [luggage, setLuggage] = useState<number>(2);
  const [flightNumber, setFlightNumber] = useState<string>('');
  const [childSeat, setChildSeat] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Calculate price dynamically
  const { basePriceUSD, isNightTime } = useMemo(() => {
    const routes = pricingData.routes as RouteItem[];
    const matchedRoute = routes.find(
      (r) => (r.from === pickup && r.to === dropoff) || (r.from === 'IST' && r.to === dropoff)
    );

    let price = 45; // Default fallback
    if (matchedRoute && matchedRoute.prices[vehicle]) {
      price = matchedRoute.prices[vehicle];
    } else {
      // General heuristic
      if (vehicle === 'vito') price = 50;
      if (vehicle === 'sprinter') price = 80;
      if (vehicle === 'maybach') price = 160;
    }

    // Check night hours (00:00 to 06:00)
    const hour = parseInt(time.split(':')[0] || '12', 10);
    const night = hour >= 0 && hour < 6;
    if (night) {
      price = Math.round(price * (pricingData.surcharges.nightHoursMultiplier || 1.15));
    }

    return { basePriceUSD: price, isNightTime: night };
  }, [pickup, dropoff, vehicle, time]);

  const formattedPrice = format(basePriceUSD);

  // Build human friendly labels
  const getPickupLabel = () => {
    if (pickup === 'IST') return locale === 'ar' ? 'مطار إسطنبول الجديد (IST)' : locale === 'tr' ? 'İstanbul Havalimanı (IST)' : 'Istanbul Airport (IST)';
    if (pickup === 'SAW') return locale === 'ar' ? 'مطار صبيحة كوكجن (SAW)' : locale === 'tr' ? 'Sabiha Gökçen Havalimanı (SAW)' : 'Sabiha Gökçen Airport (SAW)';
    return customPickup || (locale === 'ar' ? 'عنوان أو فندق خاص' : 'Hotel or Custom Address');
  };

  const getDropoffLabel = () => {
    const dest = destinationsData.find((d) => d.id === dropoff);
    if (dest) {
      return (dest.name as any)[locale] || dest.name.en;
    }
    return customDropoff || dropoff;
  };

  const getVehicleLabel = () => {
    if (vehicle === 'vito') return 'Mercedes Vito VIP (1-6 Pax)';
    if (vehicle === 'sprinter') return 'Mercedes Sprinter VIP (8-14 Pax)';
    return 'Mercedes S-Class / Maybach VIP';
  };

  const handleProceedToCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    trackBookingSubmission({
      route: `${getPickupLabel()} -> ${getDropoffLabel()}`,
      price: basePriceUSD,
      currency
    });

    const params = new URLSearchParams({
      pickup: getPickupLabel(),
      dropoff: getDropoffLabel(),
      date,
      time,
      vehicle,
      passengers: passengers.toString(),
      luggage: luggage.toString(),
      flight: flightNumber,
      price: basePriceUSD.toString()
    });

    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div id="booking" className="w-full max-w-4xl mx-auto rounded-3xl bg-[#0A1A33]/90 backdrop-blur-xl border border-[#D4AF37]/30 shadow-2xl shadow-black/60 p-5 sm:p-8">
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D4AF37]/20 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {t('title')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {t('subtitle')}
          </p>
        </div>

        {/* Live Guaranteed Price Badge */}
        <div className="flex items-center self-start sm:self-auto gap-3 px-4 py-2.5 rounded-2xl bg-[#071324] border border-[#D4AF37]/40 shadow-inner">
          <div className="text-end">
            <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              {t('estimatedPrice')}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-300">
                {formattedPrice}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                / {tCommon('fixedPrice')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleProceedToCheckout} className="mt-6 space-y-5">
        {/* Row 1: Pickup & Dropoff */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pickup */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              {t('pickup')}
            </label>
            <select
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full h-12 px-3.5 rounded-xl bg-[#071324] border border-slate-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm font-medium transition-colors"
            >
              <option value="IST">
                {locale === 'ar' ? '✈️ مطار إسطنبول الجديد (IST)' : '✈️ Istanbul Airport (IST)'}
              </option>
              <option value="SAW">
                {locale === 'ar' ? '✈️ مطار صبيحة كوكجن (SAW)' : '✈️ Sabiha Gökçen Airport (SAW)'}
              </option>
              <option value="HOTEL">
                {locale === 'ar' ? '🏨 فندق أو عنوان خاص في إسطنبول' : '🏨 Hotel or Custom Address'}
              </option>
            </select>

            {pickup === 'HOTEL' && (
              <input
                type="text"
                placeholder={locale === 'ar' ? 'اكتب اسم الفندق أو العنوان بالتفصيل...' : 'Enter hotel name or address...'}
                value={customPickup}
                onChange={(e) => setCustomPickup(e.target.value)}
                required
                className="w-full mt-2 h-10 px-3.5 rounded-xl bg-[#071324] border border-slate-700 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37]"
              />
            )}
          </div>

          {/* Dropoff */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              {t('dropoff')}
            </label>
            <select
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="w-full h-12 px-3.5 rounded-xl bg-[#071324] border border-slate-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm font-medium transition-colors"
            >
              <option value="taksim">
                {locale === 'ar' ? 'تقسيم / بيوغلو / شارع الاستقلال' : 'Taksim / Beyoğlu / Istiklal'}
              </option>
              <option value="sultanahmet">
                {locale === 'ar' ? 'السلطان أحمد / الفاتح / سيركجي' : 'Sultanahmet / Fatih / Sirkeci'}
              </option>
              <option value="besiktas">
                {locale === 'ar' ? 'بشكتاş / أورتاكوي / خط البوسفور' : 'Beşiktaş / Ortaköy / Bosphorus'}
              </option>
              <option value="sisli">
                {locale === 'ar' ? 'شيشلي / نيشانتاشي / مجيدية كوي' : 'Şişli / Nişantaşı / Mecidiyeköy'}
              </option>
              <option value="kadikoy">
                {locale === 'ar' ? 'كاديكوي / أوسكودار / الجانب الآسيوي' : 'Kadıköy / Üsküdar / Asian Side'}
              </option>
              <option value="bakirkoy">
                {locale === 'ar' ? 'باكركوي / أتاكوي / فلوريا' : 'Bakırköy / Ataköy / Florya'}
              </option>
              <option value="sariyer">
                {locale === 'ar' ? 'ساريير / ليفنت / مسلك / وادي إسطنبول' : 'Sarıyer / Levent / Maslak / Vadistanbul'}
              </option>
              <option value="sapanca">
                {locale === 'ar' ? '🌲 رحلة صبنجة ومعشوقية والمحمودية' : '🌲 Sapanca & Maşukiye Day Trip'}
              </option>
              <option value="bursa">
                {locale === 'ar' ? '🚠 رحلة بورصة الخضراء وجبل أولوداغ' : '🚠 Green Bursa & Mount Uludağ'}
              </option>
              <option value="citytour">
                {locale === 'ar' ? '✨ جولة VIP خاصة في إسطنبول (8 ساعات)' : '✨ Full Day Istanbul VIP City Tour'}
              </option>
              <option value="CUSTOM">
                {locale === 'ar' ? '📍 وجهة أو منطقة أخرى' : '📍 Other Custom Destination'}
              </option>
            </select>

            {dropoff === 'CUSTOM' && (
              <input
                type="text"
                placeholder={locale === 'ar' ? 'اكتب الوجهة المطلوبة بالتفصيل...' : 'Enter your specific destination...'}
                value={customDropoff}
                onChange={(e) => setCustomDropoff(e.target.value)}
                required
                className="w-full mt-2 h-10 px-3.5 rounded-xl bg-[#071324] border border-slate-700 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37]"
              />
            )}
          </div>
        </div>

        {/* Row 2: Vehicle Selection Radio Cards */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Car className="w-4 h-4 text-[#D4AF37]" />
            {t('vehicle')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Vito */}
            <div
              onClick={() => setVehicle('vito')}
              className={`cursor-pointer rounded-2xl p-3.5 border transition-all ${
                vehicle === 'vito'
                  ? 'border-[#D4AF37] bg-[#102544] shadow-md shadow-[#D4AF37]/20 scale-[1.01]'
                  : 'border-slate-800 bg-[#071324]/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Mercedes Vito VIP</span>
                {vehicle === 'vito' && <span className="text-xs text-[#D4AF37]">●</span>}
              </div>
              <div className="text-[11px] text-amber-300/90 font-medium mt-0.5">
                {locale === 'ar' ? 'الأكثر طلباً للعائلات' : 'Most Popular'}
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#D4AF37]" /> 1-6
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-[#D4AF37]" /> 6
                </span>
              </div>
            </div>

            {/* Sprinter */}
            <div
              onClick={() => setVehicle('sprinter')}
              className={`cursor-pointer rounded-2xl p-3.5 border transition-all ${
                vehicle === 'sprinter'
                  ? 'border-[#D4AF37] bg-[#102544] shadow-md shadow-[#D4AF37]/20 scale-[1.01]'
                  : 'border-slate-800 bg-[#071324]/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Mercedes Sprinter VIP</span>
                {vehicle === 'sprinter' && <span className="text-xs text-[#D4AF37]">●</span>}
              </div>
              <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                {locale === 'ar' ? 'للعائلات الكبيرة' : 'Large Groups'}
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#D4AF37]" /> 8-14
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-[#D4AF37]" /> 15
                </span>
              </div>
            </div>

            {/* Maybach */}
            <div
              onClick={() => setVehicle('maybach')}
              className={`cursor-pointer rounded-2xl p-3.5 border transition-all ${
                vehicle === 'maybach'
                  ? 'border-[#D4AF37] bg-[#102544] shadow-md shadow-[#D4AF37]/20 scale-[1.01]'
                  : 'border-slate-800 bg-[#071324]/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Maybach / S-Class</span>
                {vehicle === 'maybach' && <span className="text-xs text-[#D4AF37]">●</span>}
              </div>
              <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                {locale === 'ar' ? 'قمة الفخامة ورجال الأعمال' : 'Diplomatic VIP'}
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#D4AF37]" /> 1-3
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-[#D4AF37]" /> 3
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Date, Time, Pax, Luggage */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Date */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              {t('date')}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#071324] border border-slate-700 text-xs text-white focus:border-[#D4AF37]"
            />
          </div>

          {/* Time */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              {t('time')}
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#071324] border border-slate-700 text-xs text-white focus:border-[#D4AF37]"
            />
          </div>

          {/* Passengers Counter */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
              {t('passengersCount')}
            </label>
            <div className="flex items-center h-11 rounded-xl bg-[#071324] border border-slate-700 px-2 justify-between">
              <button
                type="button"
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 text-white font-bold hover:bg-[#D4AF37] hover:text-[#0A1A33] transition-colors"
              >
                -
              </button>
              <span className="text-sm font-bold text-white">{passengers}</span>
              <button
                type="button"
                onClick={() => setPassengers(Math.min(16, passengers + 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 text-white font-bold hover:bg-[#D4AF37] hover:text-[#0A1A33] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Luggage Counter */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
              {t('luggageCount')}
            </label>
            <div className="flex items-center h-11 rounded-xl bg-[#071324] border border-slate-700 px-2 justify-between">
              <button
                type="button"
                onClick={() => setLuggage(Math.max(0, luggage - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 text-white font-bold hover:bg-[#D4AF37] hover:text-[#0A1A33] transition-colors"
              >
                -
              </button>
              <span className="text-sm font-bold text-white">{luggage}</span>
              <button
                type="button"
                onClick={() => setLuggage(Math.min(20, luggage + 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 text-white font-bold hover:bg-[#D4AF37] hover:text-[#0A1A33] transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Optional Row: Flight No & Child Seat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
              <Plane className="w-3.5 h-3.5 text-[#D4AF37]" />
              {t('flightNumber')}
            </label>
            <input
              type="text"
              placeholder={t('flightPlaceholder')}
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
              className="w-full h-11 px-3.5 rounded-xl bg-[#071324] border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37]"
            />
          </div>

          {/* Child seat & night badge */}
          <div className="flex flex-col justify-end gap-2">
            <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-[#071324]/80 border border-slate-800 hover:border-slate-700">
              <input
                type="checkbox"
                checked={childSeat}
                onChange={(e) => setChildSeat(e.target.checked)}
                className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37] accent-[#D4AF37]"
              />
              <span className="text-xs text-slate-200 font-medium">
                {t('childSeat')}
              </span>
            </label>

            {isNightTime && (
              <div className="flex items-center gap-1.5 text-[11px] text-amber-300 px-2">
                <Info className="w-3 h-3" />
                <span>
                  {locale === 'ar' ? 'سعر الخدمة الليلية مطبق (00:00 - 06:00)' : 'Night service fare applied'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Trust Note */}
        <div className="flex items-center gap-2 text-xs text-slate-400 py-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{t('allInclusive')} • {t('priceNote')}</span>
        </div>

        {/* Error / Success Feedback */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-xs text-red-200">
            {errorMessage}
          </div>
        )}
        {submitSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {locale === 'ar'
                ? 'تم استلام طلبكم بنجاح! سيتواصل معكم فريق الكونسيرج VIP لتأكيد السيارة مباشرة.'
                : locale === 'tr'
                ? 'Talebiniz başarıyla alındı! VIP Concierge ekibimiz onay için sizinle iletişime geçecektir.'
                : 'Booking request sent! Our VIP concierge team will reach out directly to confirm.'}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Primary Action: Go to Checkout & Payment */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 h-13 rounded-2xl bg-gold-gradient hover:bg-gold-gradient-hover active:scale-[0.99] text-[#0A1A33] font-black text-sm sm:text-base shadow-xl shadow-[#D4AF37]/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#0A1A33]" />
            <span>
              {locale === 'ar'
                ? 'الانتقال لصفحة الدفع والحجز'
                : locale === 'tr'
                ? 'Ödeme Sayfasına Geç & Rezervasyon Yap'
                : 'Proceed to Booking & Payment'}
            </span>
          </button>

          {/* Secondary Action: Live Concierge Desk */}
          <a
            href="#contact"
            className="w-full flex items-center justify-center gap-2.5 h-13 rounded-2xl bg-[#0F2852] hover:bg-[#153466] border border-[#D4AF37]/50 active:scale-[0.99] text-white font-extrabold text-sm sm:text-base shadow-xl transition-all cursor-pointer"
          >
            <Headphones className="w-5 h-5 text-[#D4AF37]" />
            <span>
              {locale === 'ar'
                ? 'مكتب عمليات الكونسيرج 24/7'
                : locale === 'tr'
                ? '7/24 Canlı Operasyon Masası'
                : '24/7 Live Concierge Desk'}
            </span>
          </a>
        </div>
      </form>
    </div>
  );
}
