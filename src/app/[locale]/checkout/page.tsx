'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingConcierge from '@/components/FloatingConcierge';
import { useCurrency } from '@/context/CurrencyContext';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Banknote,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Briefcase,
  Car,
  Plane,
  Loader2,
  AlertCircle,
  Tag
} from 'lucide-react';

function CheckoutContent() {
  const t = useTranslations('checkout');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { format, currency } = useCurrency();

  // URL or default booking params
  const pickupParam = searchParams.get('pickup') || (locale === 'ar' ? 'مطار إسطنبول (IST)' : 'Istanbul Airport (IST)');
  const dropoffParam = searchParams.get('dropoff') || (locale === 'ar' ? 'تقسيم / بيوغلو' : 'Taksim / Beyoğlu');
  const dateParam = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const timeParam = searchParams.get('time') || '14:00';
  const vehicleParam = searchParams.get('vehicle') || 'vito';
  const paxParam = parseInt(searchParams.get('passengers') || '2', 10);
  const luggageParam = parseInt(searchParams.get('luggage') || '2', 10);
  const flightParam = searchParams.get('flight') || '';
  const priceParam = searchParams.get('price') || '29';

  // State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [flightNumber, setFlightNumber] = useState(flightParam);
  const [greetingSign, setGreetingSign] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'online_card' | 'paypal'>('online_card');

  // Card fields for online payment simulation
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto prefill greeting sign with full name
  useEffect(() => {
    if (fullName && !greetingSign) {
      setGreetingSign(fullName.toUpperCase());
    }
  }, [fullName, greetingSign]);

  const vehicleName = vehicleParam === 'sprinter'
    ? 'Mercedes-Benz Sprinter VIP'
    : vehicleParam === 'maybach'
    ? 'Mercedes S-Class / Maybach VIP'
    : 'Mercedes-Benz Vito VIP';

  const vehicleImg = vehicleParam === 'sprinter'
    ? '/images/sprinter-vip.png'
    : vehicleParam === 'maybach'
    ? '/images/maybach-vip.png'
    : '/images/vito-vip.jpg';

  const numericPrice = parseFloat(priceParam.replace(/[^0-9.]/g, '')) || 45;
  const formattedTotal = format(numericPrice);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg(locale === 'ar' ? 'يرجى إدخال الاسم ورقم الهاتف' : 'Please provide full name and phone number.');
      setLoading(false);
      return;
    }

    if (paymentMethod === 'paypal') {
      router.push(`/paypal-notice?${searchParams.toString()}`);
      return;
    }

    if (paymentMethod === 'online_card' && (!cardHolder.trim() || !cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim())) {
      setErrorMsg(locale === 'ar' ? 'يرجى إكمال بيانات البطاقة الائتمانية' : 'Please fill in all credit card details.');
      setLoading(false);
      return;
    }

    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      flightNumber: flightNumber.trim() || undefined,
      greetingSign: greetingSign.trim() || fullName.trim(),
      notes: notes.trim() || undefined,
      pickup: pickupParam,
      dropoff: dropoffParam,
      date: dateParam,
      time: timeParam,
      vehicle: vehicleName,
      passengers: paxParam,
      luggage: luggageParam,
      totalPrice: formattedTotal,
      currency,
      paymentMethod,
      cardDetails: paymentMethod === 'online_card' ? {
        cardHolder: cardHolder.trim(),
        cardNumber: cardNumber.replace(/\s+/g, ''),
        cardExpiry: cardExpiry.trim(),
        cardCvv: cardCvv.trim()
      } : undefined,
      locale
    };

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to process booking');
      }

      // Redirect to Thank You page
      router.push(`/thank-you?bookingId=${data.bookingId || ''}`);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        locale === 'ar'
          ? 'حدث خطأ أثناء معالجة الحجز. يرجى المحاولة مجدداً أو الاتصال بمركز خدمة VIP.'
          : locale === 'tr'
          ? 'Rezervasyon işlenirken bir hata oluştu. Lütfen tekrar deneyin veya VIP Çağrı Hattımızla iletişime geçin.'
          : 'Error processing reservation. Please try again or contact our VIP Concierge hotline.'
      );
      setLoading(false);
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const parts = raw.match(/.{1,4}/g);
    setCardNumber(parts ? parts.join(' ') : raw);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = raw.slice(0, 2) + '/' + raw.slice(2);
    }
    setCardExpiry(raw);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1A33] border border-[#D4AF37]/50 text-xs font-bold text-amber-300 mb-3 shadow">
          <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{t('secureGuarantee')}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('title')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (or Right in RTL): Booking Summary Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-[#0A1A33]/90 border border-[#D4AF37]/40 shadow-2xl overflow-hidden">
            {/* Vehicle Preview Header */}
            <div className="relative w-full h-44 bg-[#071324] border-b border-slate-800">
              <Image
                src={vehicleImg}
                alt={vehicleName}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 start-3">
                <span className="px-3 py-1 rounded-full bg-[#071324]/90 border border-[#D4AF37]/40 text-xs font-bold text-amber-300 backdrop-blur-md">
                  {vehicleName}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#D4AF37]" />
                <span>{t('tripSummary')}</span>
              </h2>

              {/* Itinerary info */}
              <div className="space-y-3 text-xs sm:text-sm border-b border-slate-800 pb-4">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] text-slate-400">{t('pickup')}</span>
                    <span className="font-bold text-white">{pickupParam}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] text-slate-400">{t('dropoff')}</span>
                    <span className="font-bold text-white">{dropoffParam}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-slate-200">{dateParam}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-slate-200">{timeParam}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-slate-200">{paxParam} {tCommon('passengers')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-slate-200">{luggageParam} {tCommon('luggages')}</span>
                  </div>
                </div>
              </div>

              {/* Amenities included */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{locale === 'ar' ? 'استقبال بالاسم في صالة المطار (Meet & Greet)' : 'Meet & Greet with personalized name sign'}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{locale === 'ar' ? 'تتبع مجاني للرحلة الجوية و 60 دقيقة انتظار مجاني' : 'Free flight tracking & 60-min free waiting'}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{locale === 'ar' ? 'واي فاي مجاني غير محدود ومشروبات ضيافة' : 'Free unlimited Wi-Fi & cold refreshments'}</span>
                </div>
              </div>

              {/* Total Price */}
              <div className="pt-4 border-t border-[#D4AF37]/30 flex items-center justify-between">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-slate-400 font-bold">
                    {t('totalPrice')}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {t('allInclusive')}
                  </span>
                </div>
                <div className="text-end">
                  <span className="text-2xl sm:text-3xl font-black text-amber-300">
                    {formattedTotal}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Passenger & Payment Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-[#0A1A33]/90 border border-[#D4AF37]/40 shadow-2xl p-6 sm:p-8 space-y-6"
          >
            {/* Step 1: Passenger Info */}
            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#D4AF37]" />
                <span>{t('passengerInfo')}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={locale === 'ar' ? 'سلطان المنصوري' : 'John Doe'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#071324] border border-slate-700 text-sm text-white focus:border-[#D4AF37]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t('phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+966 / +971 / +90..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#071324] border border-slate-700 text-sm text-white focus:border-[#D4AF37]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#071324] border border-slate-700 text-sm text-white focus:border-[#D4AF37]"
                  />
                  <span className="block text-[11px] text-amber-300/80 mt-1">
                    {locale === 'ar'
                      ? '✉️ سيتم إرسال تأكيد الحجز ورمز الرحلة فوراً إلى هذا البريد'
                      : locale === 'en'
                      ? '✉️ Instant booking voucher & confirmation will be sent here'
                      : '✉️ Rezervasyon onay belgeniz ve takip kodunuz anında bu e-postaya iletilir'}
                  </span>
                </div>

                {/* Flight No */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t('flightNo')}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SV260 / EK121 / TK1821"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#071324] border border-slate-700 text-sm text-white focus:border-[#D4AF37]"
                  />
                  <span className="block text-[10px] text-slate-400 mt-1">
                    {t('flightNoHelp')}
                  </span>
                </div>
              </div>

              {/* Signboard Name */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('greetingSign')}
                </label>
                <input
                  type="text"
                  placeholder={locale === 'ar' ? 'الاسم المطلوب على لوحة الاستقبال' : 'Name to display on airport greeting board'}
                  value={greetingSign}
                  onChange={(e) => setGreetingSign(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#071324] border border-slate-700 text-sm text-white focus:border-[#D4AF37]"
                />
                <span className="block text-[10px] text-slate-400 mt-1">
                  {t('greetingSignHelp')}
                </span>
              </div>

              {/* Notes */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('notes')}
                </label>
                <textarea
                  rows={2}
                  placeholder={t('notesPlaceholder')}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#071324] border border-slate-700 text-xs text-white focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Step 2: Payment Method Choice */}
            <div className="pt-6 border-t border-slate-800">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                <span>{t('paymentMethod')}</span>
              </h2>

              <div className="space-y-3">
                {/* 1. Online Credit Card */}
                <div
                  onClick={() => setPaymentMethod('online_card')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'online_card'
                      ? 'border-[#D4AF37] bg-[#102444] shadow-md shadow-[#D4AF37]/20'
                      : 'border-slate-800 bg-[#071324]/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border flex items-center justify-center border-[#D4AF37]">
                        {paymentMethod === 'online_card' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{t('payOnlineCard')}</span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                            SSL Secure
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {t('payOnlineCardDesc')}
                        </div>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-amber-300" />
                  </div>

                  {/* Card input fields toggle */}
                  {paymentMethod === 'online_card' && (
                    <div className="mt-4 pt-4 border-t border-slate-700/60 space-y-3 animate-in fade-in duration-200">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          {t('cardHolder')}
                        </label>
                        <input
                          type="text"
                          placeholder="NAME SURNAME"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                          className="w-full h-10 px-3 rounded-xl bg-[#071324] border border-slate-700 text-xs text-white uppercase focus:border-[#D4AF37]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          {t('cardNumber')}
                        </label>
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          className="w-full h-10 px-3 rounded-xl bg-[#071324] border border-slate-700 text-xs text-white tracking-widest focus:border-[#D4AF37]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                            {t('cardExpiry')}
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            className="w-full h-10 px-3 rounded-xl bg-[#071324] border border-slate-700 text-xs text-white focus:border-[#D4AF37]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                            {t('cardCvv')}
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                            className="w-full h-10 px-3 rounded-xl bg-[#071324] border border-slate-700 text-xs text-white focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. PayPal Option */}
                <div
                  onClick={() => {
                    setPaymentMethod('paypal');
                    router.push(`/paypal-notice?${searchParams.toString()}`);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-[#D4AF37] bg-[#102444] shadow-md shadow-[#D4AF37]/20'
                      : 'border-slate-800 bg-[#071324]/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border flex items-center justify-center border-[#D4AF37]">
                        {paymentMethod === 'paypal' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{t('payPaypal')}</span>
                          <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold">
                            PayPal
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {t('payPaypalDesc')}
                        </div>
                      </div>
                    </div>
                    <span className="text-xl font-black italic text-[#3b7bbf]">
                      Pay<span className="text-[#00457c]">Pal</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gold-gradient hover:bg-gold-gradient-hover active:scale-[0.99] text-[#0A1A33] font-black text-base shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t('processing')}</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>{t('btnComplete')} • {formattedTotal}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#071324] text-white flex flex-col justify-between">
      <Header />

      <main className="pt-28 md:pt-36 pb-20 flex-1">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[50vh]">
              <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
            </div>
          }
        >
          <CheckoutContent />
        </Suspense>
      </main>

      <Footer />
      <FloatingConcierge />
    </div>
  );
}
