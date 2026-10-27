import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import Fleet from '@/components/Fleet';
import Destinations from '@/components/Destinations';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import FloatingConcierge from '@/components/FloatingConcierge';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'ar') {
    return {
      title: 'Istanora VIP | إستانورا لخدمات التوصيل الفاخر في مطار إسطنبول',
      description: 'أفضل خدمة استقبال وتوصيل VIP من مطاري إسطنبول (IST) وصبيحة (SAW) بسيارات مرسيدس فيتو فارهة للعائلات والمسافرين العرب. أسعار ثابتة، استقبال بالاسم، ودعم عربي 24/7.',
      keywords: [
        'توصيل من مطار اسطنبول',
        'خدمة VIP اسطنبول',
        'ليموزين مطار اسطنبول',
        'تاكسي مطار اسطنبول بالعربي',
        'سائق خاص في اسطنبول',
        'توصيل مطار صبيحة',
        'مرسيدس فيتو مع سائق اسطنبول',
        'رحلات صبنجة وبورصة VIP'
      ],
      alternates: {
        canonical: 'https://istanora.com/ar',
        languages: {
          'ar': 'https://istanora.com/ar',
          'en': 'https://istanora.com/en',
          'tr': 'https://istanora.com/tr',
        }
      },
      openGraph: {
        title: 'Istanora VIP | توصيل مطار إسطنبول VIP',
        description: 'استقبال وتوصيل خاص في إسطنبول بأسعار ثابتة تبدأ من $29. سيارات مرسيدس فيتو وسائقين محترفين.',
        url: 'https://istanora.com/ar',
        siteName: 'Istanora VIP Transfer',
        locale: 'ar_SA',
        type: 'website',
      }
    };
  }

  if (locale === 'tr') {
    return {
      title: 'Istanora VIP Transfer | İstanbul VIP Havalimanı Transferi & Şoförlü Araç',
      description: 'İstanbul Havalimanı (IST) ve Sabiha Gökçen\'den (SAW) lüks Mercedes Vito VIP araçlarla sabit fiyatlı, güvenli ve konforlu özel transfer.',
      keywords: [
        'istanbul havalimanı transfer',
        'vip transfer istanbul',
        'özel şoförlü araç kiralama istanbul',
        'sabiha gökçen transfer',
        'mercedes vito vip transfer'
      ],
      alternates: {
        canonical: 'https://istanora.com/tr',
        languages: {
          'ar': 'https://istanora.com/ar',
          'en': 'https://istanora.com/en',
          'tr': 'https://istanora.com/tr',
        }
      }
    };
  }

  // English default
  return {
    title: 'Istanora VIP Transfer | VIP Istanbul Airport Transfer & Private Chauffeur',
    description: 'Premier private VIP transfers from Istanbul New Airport (IST) & Sabiha Gökçen (SAW) in luxury Mercedes Vito vans. Fixed transparent prices, meet & greet, 24/7 service.',
    keywords: [
      'Istanbul airport transfer',
      'VIP transfer Istanbul',
      'private chauffeur Istanbul',
      'Mercedes Vito transfer Istanbul',
      'Istanbul airport to Taksim',
      'Sabiha Gokcen VIP transfer'
    ],
    alternates: {
      canonical: 'https://istanora.com/en',
      languages: {
        'ar': 'https://istanora.com/ar',
        'en': 'https://istanora.com/en',
        'tr': 'https://istanora.com/tr',
      }
    },
    openGraph: {
      title: 'Istanora VIP Transfer | VIP Istanbul Airport Transfer',
      description: 'Luxury Mercedes Vito VIP chauffeur service from Istanbul airports. All-inclusive fixed fares from $29.',
      url: 'https://istanora.com/en',
      siteName: 'Istanora VIP Transfer',
      locale: 'en_US',
      type: 'website',
    }
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    'name': 'Istanora VIP Transfer - VIP Istanbul Airport Transfer',
    'image': 'https://istanora.com/images/vito-vip.jpg',
    'description': 'Luxury private chauffeur and airport transfer services in Istanbul, Turkey.',
    'url': `https://istanora.com/${locale}`,
    'email': 'concierge@istanora.com',
    'priceRange': '$$',
    'currenciesAccepted': 'USD, EUR, SAR, AED, TRY',
    'paymentAccepted': 'Credit Card, Online',
    'areaServed': [
      { '@type': 'City', 'name': 'Istanbul' },
      { '@type': 'AdministrativeArea', 'name': 'Bursa' },
      { '@type': 'AdministrativeArea', 'name': 'Sapanca' }
    ],
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'Istanora VIP Transfer',
      'email': 'concierge@istanora.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Tayakadın Mah. Terminal Cad.',
        'addressLocality': 'Arnavutköy, Istanbul',
        'addressCountry': 'TR'
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#071324] text-white selection:bg-[#D4AF37] selection:text-[#0A1A33]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main>
        <Hero />
        <WhyUs />
        <Fleet />
        <Destinations />
        <Services />
        <HowItWorks />
        <Testimonials />
        <Faq />
        <CtaBanner />
      </main>

      <Footer />
      <FloatingConcierge />
    </div>
  );
}
