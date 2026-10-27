'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import {
  Headphones,
  Send,
  X,
  CheckCircle2,
  Sparkles,
  Loader2,
  Mail,
  ShieldCheck,
  PhoneCall,
  Clock,
  MessageSquare
} from 'lucide-react';

export default function FloatingConcierge() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'callback' | 'inquiry'>('callback');

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg(locale === 'ar' ? 'يرجى إدخال الاسم ورقم الهاتف' : 'Lütfen adınızı ve telefon numaranızı girin.');
      return;
    }

    setSending(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name.trim(),
          phone: phone.trim(),
          route: activeTab === 'callback' ? 'VIP Canlı Geri Arama Talebi' : 'Canlı Operasyon Özel Talebi',
          message: message.trim() || undefined,
          locale,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Request failed');
      }

      setSentSuccess(true);
      setName('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(
        locale === 'ar'
          ? 'تعذر إرسال الطلب حالياً. يرجى المحاولة بعد قليل.'
          : 'Talebiniz iletilemedi. Lütfen bir dakika sonra tekrar deneyin.'
      );
    } finally {
      setSending(false);
    }
  };

  const isRtl = locale === 'ar';

  return (
    <div className={`fixed bottom-6 z-50 ${isRtl ? 'left-6' : 'right-6'}`}>
      {/* Floating Concierge Pop-up Modal */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[390px] rounded-3xl bg-[#0A1A33]/98 backdrop-blur-2xl border border-[#D4AF37]/50 shadow-2xl shadow-black/80 p-6 animate-in fade-in slide-in-from-bottom-4 duration-200 text-white">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#071324] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-lg">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>
                    {locale === 'ar'
                      ? 'مكتب عمليات VIP المباشر'
                      : locale === 'tr'
                      ? 'VIP Canlı Operasyon Masası'
                      : '24/7 VIP Live Concierge Desk'}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">
                  {locale === 'ar'
                    ? 'فريق العمليات متاح لحظياً على مدار الساعة'
                    : locale === 'tr'
                    ? '7/24 Kesintisiz Şoför & Uçuş Koordinasyonu'
                    : 'Real-time Chauffeur & Flight Coordination'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setSentSuccess(false);
                setErrorMsg('');
              }}
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {sentSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-base font-extrabold text-white">
                {locale === 'ar'
                  ? 'تم استلام طلبكم بنجاح!'
                  : locale === 'tr'
                  ? 'Talebiniz Operasyon Masamıza İletildi!'
                  : 'Request Dispatched Successfully!'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-[280px] mx-auto">
                {locale === 'ar'
                  ? 'سيتواصل معكم كونسيرج إستانورا VIP هاتفياً خلال 5 دقائق لتنسيق رحلتكم.'
                  : locale === 'tr'
                  ? 'VIP Operasyon ekibimiz en geç 5 dakika içinde sizinle iletişime geçecektir.'
                  : 'Our dedicated VIP operations coordinator will contact you directly within 5 minutes.'}
              </p>
              <button
                type="button"
                onClick={() => setSentSuccess(false)}
                className="mt-4 px-5 py-2 rounded-xl bg-[#0F2852] border border-[#D4AF37]/40 text-xs font-bold text-amber-300 hover:text-white transition-colors"
              >
                {locale === 'ar' ? 'طلب جديد' : locale === 'tr' ? 'Yeni Talep İlet' : 'Send Another Request'}
              </button>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {/* Tab Selector */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#071324] border border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('callback')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'callback'
                      ? 'bg-gold-gradient text-[#0A1A33] shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'اتصلوا بي (5 دقائق)' : locale === 'tr' ? 'Sizi Arayalım' : 'Request Callback'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('inquiry')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'inquiry'
                      ? 'bg-gold-gradient text-[#0A1A33] shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'استفسار خاص' : locale === 'tr' ? 'Özel Soru Sor' : 'Live Inquiry'}</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    {locale === 'ar' ? 'الاسم الكريم' : locale === 'tr' ? 'Ad Soyad' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={locale === 'ar' ? 'مثال: محمد السعيد' : locale === 'tr' ? 'Örn: Ahmet Yılmaz' : 'e.g. John Smith'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#071324] border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    {locale === 'ar' ? 'رقم الهاتف (مع مفتاح الدولة)' : locale === 'tr' ? 'İletişim Numarası (Ülke kodu ile)' : 'Phone (with country code)'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+966 / +971 / +90 / +44..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#071324] border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37]"
                  />
                </div>

                {activeTab === 'inquiry' && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      {locale === 'ar' ? 'تفاصيل الاستفسار أو الطلب الخاص' : locale === 'tr' ? 'Sormak İstediğiniz Konu / Not' : 'Inquiry / Special Request'}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={locale === 'ar' ? 'نوع السيارة، موعد الرحلة، أو أي سؤال...' : locale === 'tr' ? 'Özel rota, çocuk koltuğu veya transfer detayları...' : 'Vehicle preference, route details, etc.'}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#071324] border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37]"
                    />
                  </div>
                )}

                {errorMsg && (
                  <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-[11px] text-red-200">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full h-11 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-[#0A1A33] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{locale === 'ar' ? 'جارٍ الإرسال...' : locale === 'tr' ? 'İletiliyor...' : 'Sending...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>
                        {activeTab === 'callback'
                          ? locale === 'ar'
                            ? 'طلب اتصال فوري (خلال 5 دقائق)'
                            : locale === 'tr'
                            ? '5 Dk İçinde Aranmak İstiyorum'
                            : 'Request Priority Callback'
                          : locale === 'ar'
                          ? 'إرسال الاستفسار للعمليات'
                          : locale === 'tr'
                          ? 'Operasyon Masasına Gönder'
                          : 'Send to Live Dispatch'}
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Corporate Trust Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>TÜRSAB VIP Güvencesi</span>
                </span>
                <span className="flex items-center gap-1 font-mono text-slate-300">
                  <Mail className="w-3 h-3 text-[#D4AF37]" />
                  <span>concierge@istanora.com</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 px-5 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover active:scale-95 text-[#0A1A33] font-black text-xs sm:text-sm shadow-2xl shadow-[#D4AF37]/30 flex items-center gap-2.5 border border-[#F6E29F] transition-all cursor-pointer group"
        aria-label="Open Live VIP Concierge Desk"
      >
        <div className="w-7 h-7 rounded-full bg-[#0A1A33] text-[#D4AF37] flex items-center justify-center shrink-0">
          <Headphones className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </div>
        <div className="flex flex-col text-start">
          <span className="leading-tight">
            {locale === 'ar'
              ? 'الكونسيرج المباشر'
              : locale === 'tr'
              ? 'Canlı Concierge Masası'
              : 'Live VIP Concierge'}
          </span>
          <span className="text-[10px] text-[#0A1A33]/80 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>{locale === 'ar' ? 'متاح 7/24' : '7/24 Aktif'}</span>
          </span>
        </div>
      </button>
    </div>
  );
}
