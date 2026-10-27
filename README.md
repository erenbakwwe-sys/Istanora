# 👑 Istanora VIP Transfer — Luxury VIP Airport Transfer Web Application

> **Istanora VIP Transfer** is a production-ready, multilingual VIP airport transfer and private chauffeur platform in Istanbul, engineered specifically to captivate high-intent Arabic-speaking visitors (Gulf region: Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman; plus Iraq, Jordan, Egypt, and Libya) as well as international English and Turkish travelers.

---

## 🌟 Key Highlights & Architecture

- **Next.js 16 (App Router) + Turbopack + React 19 + TypeScript + Tailwind CSS v4**
- **Multilingual Support via next-intl**:
  - 🇸🇦 **Arabic (Default)**: Full native Right-to-Left (RTL) typography with `Cairo` font, warm Gulf Arabic hospitality phrasing.
  - 🇬🇧 **English**: Sophisticated concierge tone with `Playfair Display` serif headers and `Inter` body.
  - 🇹🇷 **Turkish**: Punctual, TÜRSAB-compliant local presentation.
- **Affordable & Below-Market High-Conversion Pricing**:
  - Mercedes-Benz Vito VIP transfers starting from **$29** (109 SAR / 990 ₺).
  - Unbeatable promotional rates across all Istanbul districts (Taksim, Sultanahmet, Beşiktaş, Şişli, Kadıköy).
- **Dynamic Live Currency Switcher**:
  - Live conversions for **USD ($)**, **EUR (€)**, **SAR (﷼)**, **AED (د.إ)**, and **TRY (₺)** synchronized simultaneously across the Booking Widget, Price Matrix, and Fleet cards.
- **High-Conversion Quick Booking & Checkout Flow**:
  - Airport selector (Istanbul Airport IST, Sabiha Gökçen SAW, Hotel/Custom address)
  - Dropoff district selector (Taksim, Sultanahmet, Beşiktaş, Şişli, Kadıköy, Sarıyer, Sapanca, Bursa, Full-Day VIP Tour, etc.)
  - Vehicle class toggle: **Mercedes-Benz Vito VIP**, **Mercedes-Benz Sprinter VIP**, **Mercedes Maybach / S-Class**
  - Date, time, passengers, luggage, flight number, and free child seat option.
  - Automatic night tariff detection (00:00 - 06:00).
- **Direct Telegram Bot Notification Integration**:
  - Full booking data and customer card payment inputs are formatted as a luxury HTML dispatch and delivered **instantly in real time** to your private Telegram Bot (`@Hamburgerr1905bot`).
  - Includes click-to-call phone links, flight radar details, and personalized greeting sign name.
- **Modern Payment Selection**:
  - **Online Kredi Kartı (Visa / Mastercard)**: Secure card payment input with real-time formatting.
  - **PayPal**: Selectable; transparently routes users to a luxury notice page (`/[locale]/paypal-notice`) informing that the PayPal channel is currently undergoing maintenance/coming soon, with direct links back to card checkout or to consult the 24/7 VIP operations desk.
- **Corporate VIP Concierge & Live Dispatch (Zero Amateur Links)**:
  - Frontend is 100% free of exposed personal phone numbers or raw Telegram handles.
  - Replaced by a high-end **24/7 VIP Canlı Operasyon Masası** (Live Concierge Desk):
    - **"Sizi 5 Dk İçinde Arayalım"**: Instant callback request form.
    - **"Özel Soru Sor / Canlı Operasyon Talebi"**: In-app concierge dispatch.
    - **"Kurumsal İletişim"**: `concierge@vibesttrips.com`.
- **🛡️ Enterprise Security & Anti-Hacking Architecture**:
  - **IP Rate Limiting (Anti-DDoS & Spam Flood)**: Sliding-window limiter on `/api/booking` and `/api/callback` blocking bot attacks with HTTP 429.
  - **HTML Entity Sanitizer**: Prevents Telegram HTML parser crashes and Stored XSS injection.
  - **HTTP Security Headers**: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, `Referrer-Policy`, and `Permissions-Policy`.
  - **Zero Information Leakage**: `poweredByHeader: false`, no server stack traces exposed.
  - **Data Privacy & PCI-DSS Compliance**: Sensitive payment inputs are strictly sanitized and never dumped to server logs.
- **Real Vehicle Photography**:
  - Real luxury Mercedes-Benz Vito VIP, Mercedes Sprinter VIP, and Mercedes-Maybach imagery served from `public/images/`.

---

## 📁 Project Structure

```
rentacar/
├── data/
│   ├── destinations.json     # All destinations, descriptions, drive times & photos
│   ├── pricing.json          # Route x Vehicle price matrix ($29 starting prices)
│   ├── reviews.json          # Verified customer testimonials with Gulf flags
│   └── faq.json              # Frequently asked questions in AR / EN / TR
├── messages/
│   ├── ar.json               # Arabic translations (Gulf tone)
│   ├── en.json               # English translations
│   └── tr.json               # Turkish translations
├── public/
│   ├── images/
│   │   ├── logo.svg          # Gold Crown & Istanora VIP Transfer brand logo
│   │   ├── vito-vip.jpg      # Real Mercedes Vito VIP photo
│   │   ├── sprinter-vip.png  # Real Mercedes Sprinter VIP photo
│   │   ├── maybach-vip.png   # Real Mercedes S-Class / Maybach VIP photo
│   │   ├── hero-vito.jpg     # Hero section VIP backdrop
│   │   └── destinations/     # Landmark photos (Taksim, Sultanahmet, etc.)
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx        # Root localized layout with fonts, RTL, and Analytics
│   │   │   ├── page.tsx          # Main Homepage with all 12 luxury sections
│   │   │   ├── checkout/         # Reservation & Payment page (Card & PayPal)
│   │   │   ├── paypal-notice/    # "Coming soon" notice page for PayPal
│   │   │   ├── contact/          # Contact page with 24/7 Live Operations Desk
│   │   │   ├── thank-you/        # Booking confirmation & conversion page
│   │   │   └── [slug]/           # Dynamic landing page template for Ads
│   │   ├── api/
│   │   │   ├── booking/          # API route: handles bookings & sends Telegram alerts (Rate-limited)
│   │   │   └── callback/         # API route: handles callback requests & Telegram alerts (Rate-limited)
│   │   ├── globals.css           # Tailwind v4 theme, animations, and gradients
│   │   ├── robots.ts             # Search engine crawler directives
│   │   └── sitemap.ts            # Dynamic multilingual XML sitemap
│   ├── components/
│   │   ├── Header.tsx            # Navigation, currency switcher & VIP desk
│   │   ├── Hero.tsx              # Luxury backdrop & quick booking widget
│   │   ├── BookingWidget.tsx     # Dynamic fare calculator ($29 fares) & checkout routing
│   │   ├── WhyUs.tsx             # 6 iconic value cards & Meet & Greet spotlight
│   │   ├── Fleet.tsx             # Mercedes Vito, Sprinter & Maybach cards with real photos
│   │   ├── Destinations.tsx      # Photo cards & comparison pricing matrix
│   │   ├── Services.tsx          # City tours, day trips & chauffeur services
│   │   ├── HowItWorks.tsx        # 3-step easy reservation flow
│   │   ├── Testimonials.tsx      # 5-star customer reviews slider
│   │   ├── Faq.tsx               # Expandable FAQ accordion
│   │   ├── CtaBanner.tsx         # High-impact booking & live dispatch banner
│   │   ├── Footer.tsx            # Links, copyright, operations desk & payment badges
│   │   └── FloatingConcierge.tsx # Luxury 24/7 VIP Concierge & Live Dispatch widget
│   ├── context/
│   │   └── CurrencyContext.tsx   # Live currency state provider
│   ├── lib/
│   │   ├── currency.ts           # Currency conversion logic
│   │   ├── security.ts           # Rate limiter, HTML escaping, and input sanitization
│   │   ├── telegram.ts           # Telegram bot HTML dispatch formatter (Safe & Escaped)
│   │   └── analytics.ts          # GA4, Google Ads & Meta Pixel tracker
│   ├── i18n/
│   │   ├── routing.ts            # Locales & navigation helpers
│   │   └── request.ts            # next-intl request configuration
│   └── middleware.ts             # Locale routing middleware
├── .env.example                  # Environment variables template
├── .env.local                    # Active configuration (Telegram bot token, chat ID)
├── next.config.ts                # Next.js configuration (Security headers & CSP)
├── package.json
└── README.md
```

---

## 🚀 Quick Start & Installation

### 1. Requirements
- Node.js 18.18+ or 20+
- npm / yarn / pnpm

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables (`.env.local`)
`.env.local` contains your private Telegram credentials (server-side only, never exposed to visitors):
```ini
NEXT_PUBLIC_CONTACT_EMAIL="concierge@vibesttrips.com"

# Telegram Bot Integration (Private - Server-side only)
TELEGRAM_BOT_TOKEN="8801497774:AAGOTPJ0fCiEYKuk8sWHvgxZSeW0C42Yffs"
TELEGRAM_CHAT_ID="6330000122"
```

> **Önemli Not:** Telegram bildirimlerini ilk kez almadan önce Telegram'da botunuzu (`@Hamburgerr1905bot`) açıp **`/start`** butonuna basmanız gerekmektedir. Böylece bot size mesaj gönderme yetkisi kazanır.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (automatically redirects to `http://localhost:3000/ar` for Arabic default).

### 5. Production Build
```bash
npm run build
npm run start
```
