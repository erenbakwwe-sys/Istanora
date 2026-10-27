'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useCurrency } from '@/context/CurrencyContext';
import { Currency } from '@/lib/currency';
import {
  Menu,
  X,
  Globe,
  Coins,
  ChevronDown,
  ShieldCheck,
  Headphones,
  Sparkles,
  Plane
} from 'lucide-react';

export default function Header() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { currency, setCurrency } = useCurrency();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangDropdownOpen(false);
  };

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '#booking', label: t('booking') },
    { href: '#fleet', label: t('fleet') },
    { href: '#destinations', label: t('destinations') },
    { href: '#services', label: t('services') },
    { href: '#faq', label: t('faq') },
    { href: '#contact', label: t('contact') },
  ];

  const currencies: Currency[] = ['USD', 'EUR', 'SAR', 'AED', 'TRY'];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-[#071324]/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-[#D4AF37]/20 py-2.5'
        : 'bg-gradient-to-b from-[#071324]/90 to-transparent py-4'
    }`}>
      {/* Top micro bar for trust on desktop */}
      <div className="hidden lg:block border-b border-[#D4AF37]/10 pb-2 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              {tCommon('licensedInsured')}
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Plane className="w-3.5 h-3.5 text-[#D4AF37]" />
              {locale === 'ar' ? 'متابعة حية للرحلات الجوية' : 'Canlı Uçuş Radarı Takibi'}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-medium">✓ {tCommon('freeCancellation')}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-amber-300">
              {locale === 'ar' ? 'مكتب العمليات والاستقبال: 7/24 متواصل' : '7/24 VIP Operasyon Masası Aktif'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-44 sm:w-56 h-10 transition-transform group-hover:scale-[1.02]">
              <Image
                src="/images/logo.svg"
                alt="Istanora VIP Transfer - VIP Airport Transfer Istanbul"
                fill
                priority
                className="object-contain object-start"
              />
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D4AF37] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Controls: Currency Switcher + Lang Switcher + CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCurrencyDropdownOpen(!currencyDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0A1A33] border border-slate-700 hover:border-[#D4AF37] text-xs font-semibold text-slate-200 transition-colors"
                aria-label="Select Currency"
              >
                <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute top-full end-0 mt-2 w-28 rounded-xl bg-[#0A1A33] border border-[#D4AF37]/30 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-start px-3 py-1.5 text-xs font-medium flex items-center justify-between hover:bg-[#132A52] transition-colors ${
                        currency === curr ? 'text-[#D4AF37] bg-[#132A52]/50 font-bold' : 'text-slate-300'
                      }`}
                    >
                      <span>{curr}</span>
                      {currency === curr && <span className="text-[#D4AF37]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setCurrencyDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0A1A33] border border-slate-700 hover:border-[#D4AF37] text-xs font-semibold text-slate-200 transition-colors"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="uppercase">{locale}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute top-full end-0 mt-2 w-32 rounded-xl bg-[#0A1A33] border border-[#D4AF37]/30 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    type="button"
                    onClick={() => changeLocale('ar')}
                    className={`w-full text-start px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-[#132A52] transition-colors ${
                      locale === 'ar' ? 'text-[#D4AF37] bg-[#132A52]/50 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span>🇸🇦 العربية</span>
                    {locale === 'ar' && <span className="text-[#D4AF37]">✓</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => changeLocale('en')}
                    className={`w-full text-start px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-[#132A52] transition-colors ${
                      locale === 'en' ? 'text-[#D4AF37] bg-[#132A52]/50 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span>🇬🇧 English</span>
                    {locale === 'en' && <span className="text-[#D4AF37]">✓</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => changeLocale('tr')}
                    className={`w-full text-start px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-[#132A52] transition-colors ${
                      locale === 'tr' ? 'text-[#D4AF37] bg-[#132A52]/50 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span>🇹🇷 Türkçe</span>
                    {locale === 'tr' && <span className="text-[#D4AF37]">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Quick Concierge Link */}
            <a
              href="#contact"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F2852] hover:bg-[#153466] border border-[#D4AF37]/40 text-slate-200 hover:text-white text-xs font-bold transition-all shadow-md"
            >
              <Headphones className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{locale === 'ar' ? 'الكونسيرج المباشر' : locale === 'tr' ? 'Canlı Destek' : 'Live Concierge'}</span>
            </a>

            {/* Book Now Button */}
            <a
              href="#booking"
              className="flex items-center justify-center px-4 py-2 rounded-lg bg-gold-gradient hover:bg-gold-gradient-hover text-[#0A1A33] text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg shadow-[#D4AF37]/20 hover:scale-[1.02]"
            >
              {tCommon('bookNow')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0A1A33] border border-slate-700 text-slate-200 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A1A33]/98 border-b border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="max-w-7xl mx-auto px-4 pt-3 pb-6 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-semibold text-slate-200 hover:text-[#D4AF37] py-2 border-b border-slate-800/60 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-gold-gradient text-[#0A1A33] font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20"
              >
                {tCommon('bookNow')}
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0F2852] border border-[#D4AF37]/50 text-slate-200 hover:text-white font-bold text-sm shadow-md"
              >
                <Headphones className="w-4 h-4 text-[#D4AF37]" />
                <span>{locale === 'ar' ? 'مكتب العمليات المباشر 7/24' : locale === 'tr' ? '7/24 VIP Canlı Operasyon Masası' : '24/7 VIP Live Concierge Desk'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
