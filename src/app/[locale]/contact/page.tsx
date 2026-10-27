'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingConcierge from '@/components/FloatingConcierge';
import { Headphones, Mail, MapPin, Send, Clock, CheckCircle2, Loader2, Sparkles, ShieldCheck, Plane } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name.trim(),
          phone: formData.phone.trim(),
          route: 'İletişim Sayfası Talebi',
          message: formData.message.trim() + (formData.email ? ` | E-posta: ${formData.email.trim()}` : ''),
          locale
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setErrorMsg(
        locale === 'ar'
          ? 'تعذر إرسال الرسالة حالياً. يرجى المحاولة بعد قليل.'
          : 'Mesaj iletilemedi. Lütfen bir dakika sonra tekrar deneyin.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071324] text-white">
      <Header />

      <main className="pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1A33] border border-[#D4AF37]/40 text-xs font-bold text-amber-300 mb-4 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>
              {locale === 'ar'
                ? 'مكتب عمليات كبار الشخصيات على مدار الساعة'
                : locale === 'tr'
                ? '7/24 VIP Operasyon & İletişim Masası'
                : '24/7 VIP Dedicated Operations Desk'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-[#0A1A33]/90 border border-[#D4AF37]/30 p-6 sm:p-8 shadow-xl space-y-5">
              <h2 className="text-xl font-bold text-white mb-2">
                {locale === 'ar' ? 'خدمات الاستقبال والعمليات المباشرة' : locale === 'tr' ? 'VIP Koordinasyon Kanalları' : 'VIP Coordination Channels'}
              </h2>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                {locale === 'ar'
                  ? 'يقوم فريق العمليات بمتابعة كافة رحلات الطيران لحظة بلحظة وتجهيز السائق الخاص قبل وصولكم.'
                  : 'Operasyon ekibimiz uçuşunuzu canlı radarda takip ederek şoförünüzü iniş saatinde terminalde hazır bulundurur.'}
              </p>

              {/* VIP Live Desk Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#071324] border border-[#D4AF37]/40 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-[#0F2852] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-lg">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span>{locale === 'ar' ? 'مكتب العمليات المباشر' : 'Canlı Operasyon Masası'}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    {locale === 'ar' ? 'تنسيق فوري وتأكيد الحجوزات 24/7' : '7/24 Canlı Rezervasyon & Şoför Takibi'}
                  </div>
                </div>
              </div>

              {/* Airport Meet & Greet Points */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#071324] border border-slate-700">
                <div className="w-12 h-12 rounded-xl bg-[#0F2852] border border-slate-700 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Plane className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    {locale === 'ar' ? 'نقاط الاستقبال الرسمية' : 'Havalimanı Karşılama Noktaları'}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    İstanbul (IST) &amp; Sabiha Gökçen (SAW)
                  </div>
                  <div className="text-[11px] text-amber-300">
                    {locale === 'ar' ? 'استقبال بلوحة الاسم في صالة الخروج' : 'Terminal çıkış kapısında isimli karşılama'}
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <a
                href="mailto:concierge@istanora.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#071324] border border-slate-700 hover:border-[#D4AF37] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0F2852] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">
                    Corporate Concierge Email
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-white">
                    concierge@istanora.com
                  </div>
                </div>
              </a>

              {/* Hours Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#071324] border border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-[#0F2852] flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    {locale === 'ar' ? 'ساعات الخدمة' : 'Hizmet Saatleri'}
                  </div>
                  <div className="text-sm font-bold text-white">
                    24 Hours / 7 Days a week (Non-stop)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#0A1A33]/90 border border-[#D4AF37]/30 p-6 sm:p-10 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-2">
                {locale === 'ar' ? 'إرسال طلب خاص أو استفسار للعمليات' : locale === 'tr' ? 'Operasyon Masasına Mesaj Gönderin' : 'Send an Inquiry to Operations'}
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                {locale === 'ar' ? 'سيقوم فريقنا بالرد والتواصل معكم بأسرع وقت' : 'Mesajınız doğrudan nöbetçi VIP operasyon koordinatörümüze iletilir.'}
              </p>

              {submitted && (
                <div className="p-4 mb-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{t('success')}</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-4 mb-6 rounded-2xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-[#071324] border border-slate-700 focus:border-[#D4AF37] text-sm text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t('phone')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+966 / +971 / +90..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-[#071324] border border-slate-700 focus:border-[#D4AF37] text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-[#071324] border border-slate-700 focus:border-[#D4AF37] text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t('message')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={locale === 'ar' ? 'حدد وجهتك، توقيت رحلتك، أو أي متطلبات خاصة...' : 'Transfer tarihi, araç tercihi veya sormak istediğiniz sorular...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl bg-[#071324] border border-slate-700 focus:border-[#D4AF37] text-sm text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-13 rounded-2xl bg-gold-gradient hover:bg-gold-gradient-hover text-[#0A1A33] font-extrabold text-base shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t('submit')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingConcierge />
    </div>
  );
}
