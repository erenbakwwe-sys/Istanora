'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  Headphones,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CreditCard,
  Banknote
} from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  return (
    <footer className="bg-[#050C17] border-t border-[#D4AF37]/20 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-48 h-10">
                <Image
                  src="/images/logo.svg"
                  alt="Istanora VIP Transfer Logo"
                  fill
                  className="object-contain object-start"
                />
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('about')}
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold pt-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>TÜRSAB Licensed &amp; Insured VIP Chauffeur</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors">
                  {tNav('services')}
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-[#D4AF37] transition-colors">
                  {tNav('fleet')}
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-[#D4AF37] transition-colors">
                  {tNav('destinations')}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#D4AF37] transition-colors">
                  {tNav('howItWorks')}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#D4AF37] transition-colors">
                  {tNav('faq')}
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Routes */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('popularDestinations')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#booking" className="hover:text-[#D4AF37] transition-colors">
                  {locale === 'ar' ? 'مطار إسطنبول ⟵ تقسيم' : 'Istanbul Airport ⟵ Taksim'}
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#D4AF37] transition-colors">
                  {locale === 'ar' ? 'مطار إسطنبول ⟵ السلطان أحمد' : 'Istanbul Airport ⟵ Sultanahmet'}
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#D4AF37] transition-colors">
                  {locale === 'ar' ? 'مطار إسطنبول ⟵ بشكتاش' : 'Istanbul Airport ⟵ Beşiktaş'}
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#D4AF37] transition-colors">
                  {locale === 'ar' ? 'مطار صبيحة ⟵ كاديكوي' : 'Sabiha Airport ⟵ Kadıköy'}
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#D4AF37] transition-colors">
                  {locale === 'ar' ? 'رحلة صبنجة ومعشوقية VIP' : 'Sapanca & Maşukiye Day Tour'}
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#D4AF37] transition-colors">
                  {locale === 'ar' ? 'رحلة بورصة وجبل أولوداغ' : 'Green Bursa & Uludağ Tour'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('contactInfo')}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2 text-slate-300">
                <Headphones className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  {locale === 'ar'
                    ? 'مكتب عمليات الكونسيرج: متاح 7/24'
                    : locale === 'tr'
                    ? '7/24 VIP Operasyon & Karşılama Masası'
                    : '24/7 VIP Live Concierge Desk'}
                </span>
              </li>
              <li>
                <a
                  href="mailto:concierge@istanora.com"
                  className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>concierge@istanora.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  {locale === 'ar'
                    ? 'مطارا إسطنبول (IST) وصبيحة (SAW) • صالات الوصول'
                    : 'İstanbul (IST) & Sabiha Gökçen (SAW) Havalimanları'}
                </span>
              </li>
              <li className="flex items-center gap-2 text-amber-300 text-xs">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>
                  {locale === 'ar' ? 'خدمة متواصلة 24 ساعة / 7 أيام' : '7 Gün 24 Saat Kesintisiz Şoför Hizmeti'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>{t('rights')}</p>

          {/* Payment Methods */}
          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>Credit / Debit Card (Visa, Mastercard)</span>
            </span>
            <span>•</span>
            <span className="font-bold text-[#3b7bbf] text-xs">
              Pay<span className="text-[#00457c]">Pal</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
