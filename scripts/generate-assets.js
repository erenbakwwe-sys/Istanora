const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../public/images');
const destDir = path.join(imgDir, 'destinations');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 1. Logo SVG
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 80" width="420" height="80">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCE08B" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#9A7B1C" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <!-- Crown & Checkmark Emblem -->
  <g transform="translate(10, 10)">
    <circle cx="30" cy="30" r="28" fill="#0A1A33" stroke="url(#goldGrad)" stroke-width="2.5" />
    <!-- Crown -->
    <path d="M16 35 L20 22 L26 27 L30 18 L34 27 L40 22 L44 35 Z" fill="url(#goldGrad)" filter="url(#glow)" />
    <!-- Golden Base -->
    <rect x="18" y="37" width="24" height="4" rx="2" fill="url(#goldGrad)" />
    <!-- Small Diamond / Check Stars -->
    <circle cx="20" cy="20" r="1.5" fill="#FFF" />
    <circle cx="30" cy="16" r="2" fill="#FFF" />
    <circle cx="40" cy="20" r="1.5" fill="#FFF" />
  </g>
  <!-- Text -->
  <text x="80" y="38" font-family="'Playfair Display', 'Cinzel', 'Times New Roman', serif" font-size="28" font-weight="800" letter-spacing="3" fill="#FFFFFF">
    VIBEST <tspan fill="url(#goldGrad)">TRIPS</tspan>
  </text>
  <text x="82" y="56" font-family="'Inter', sans-serif" font-size="10.5" font-weight="500" letter-spacing="2.8" fill="#D4AF37">
    YOUR JOURNEY STARTS WITH US
  </text>
</svg>`;
fs.writeFileSync(path.join(imgDir, 'logo.svg'), logoSvg);

// 2. Mercedes Vito VIP SVG
const vitoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="800" height="480">
  <defs>
    <linearGradient id="bgVito" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#071324" />
      <stop offset="60%" stop-color="#0F2447" />
      <stop offset="100%" stop-color="#0A1A33" />
    </linearGradient>
    <linearGradient id="goldCar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="50%" stop-color="#FFF3B0" />
      <stop offset="100%" stop-color="#D4AF37" />
    </linearGradient>
    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" />
      <stop offset="50%" stop-color="#0B132B" />
      <stop offset="100%" stop-color="#000000" />
    </linearGradient>
  </defs>
  <rect width="800" height="480" rx="16" fill="url(#bgVito)" />
  <!-- VIP Grid & Ambient lines -->
  <circle cx="400" cy="240" r="280" fill="none" stroke="#D4AF37" stroke-width="1" opacity="0.1" />
  <circle cx="400" cy="240" r="200" fill="none" stroke="#D4AF37" stroke-width="1" opacity="0.15" />
  
  <!-- Car Silhouette / Mercedes Vito VIP Representation -->
  <g transform="translate(100, 110)">
    <!-- Shadow -->
    <ellipse cx="300" cy="270" rx="280" ry="25" fill="#000000" opacity="0.7" />
    <!-- Van Body -->
    <path d="M50 210 L80 140 L160 100 L440 95 L520 120 L550 180 L560 220 L540 240 L60 240 Z" fill="url(#bodyGrad)" stroke="#334155" stroke-width="2" />
    <!-- Windows VIP Tinted -->
    <path d="M165 108 L280 108 L280 160 L130 160 Z" fill="#0F172A" stroke="url(#goldCar)" stroke-width="1.5" opacity="0.9" />
    <path d="M290 108 L410 108 L410 160 L290 160 Z" fill="#0F172A" stroke="url(#goldCar)" stroke-width="1.5" opacity="0.9" />
    <path d="M420 108 L495 125 L485 160 L420 160 Z" fill="#0F172A" stroke="url(#goldCar)" stroke-width="1.5" opacity="0.9" />
    
    <!-- Gold VIP Trim Strip -->
    <path d="M55 205 L555 205" stroke="url(#goldCar)" stroke-width="3" />
    
    <!-- Headlights & Taillights -->
    <polygon points="535,175 560,185 550,205 530,195" fill="#E2E8F0" opacity="0.9" filter="drop-shadow(0px 0px 8px #60A5FA)" />
    <rect x="52" y="180" width="10" height="25" rx="3" fill="#EF4444" />
    
    <!-- Wheels -->
    <g transform="translate(150, 240)">
      <circle cx="0" cy="0" r="45" fill="#0F172A" stroke="#475569" stroke-width="4" />
      <circle cx="0" cy="0" r="30" fill="#1E293B" stroke="url(#goldCar)" stroke-width="2" />
      <circle cx="0" cy="0" r="10" fill="url(#goldCar)" />
    </g>
    <g transform="translate(460, 240)">
      <circle cx="0" cy="0" r="45" fill="#0F172A" stroke="#475569" stroke-width="4" />
      <circle cx="0" cy="0" r="30" fill="#1E293B" stroke="url(#goldCar)" stroke-width="2" />
      <circle cx="0" cy="0" r="10" fill="url(#goldCar)" />
    </g>
    <!-- Mercedes Benz Emblem on Grille -->
    <circle cx="550" cy="205" r="10" fill="#000000" stroke="url(#goldCar)" stroke-width="1.5" />
    <line x1="550" y1="195" x2="550" y2="205" stroke="url(#goldCar)" stroke-width="1.5" />
    <line x1="550" y1="205" x2="542" y2="212" stroke="url(#goldCar)" stroke-width="1.5" />
    <line x1="550" y1="205" x2="558" y2="212" stroke="url(#goldCar)" stroke-width="1.5" />
  </g>
  
  <!-- Badge -->
  <g transform="translate(40, 40)">
    <rect width="210" height="38" rx="19" fill="#0A1A33" stroke="#D4AF37" stroke-width="1.5" />
    <text x="105" y="24" font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#D4AF37" text-anchor="middle">
      MERCEDES VITO VIP
    </text>
  </g>
  <text x="760" y="65" font-family="'Inter', sans-serif" font-size="14" font-weight="600" fill="#94A3B8" text-anchor="end">
    1 - 6 PAX • 6 LUGGAGE • LUXURY INTERIOR
  </text>
</svg>`;
fs.writeFileSync(path.join(imgDir, 'vito-vip.svg'), vitoSvg);

// 3. Mercedes Sprinter VIP SVG
const sprinterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="800" height="480">
  <defs>
    <linearGradient id="bgSprinter" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#061220" />
      <stop offset="100%" stop-color="#0D203D" />
    </linearGradient>
    <linearGradient id="goldS" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="50%" stop-color="#FFF" />
      <stop offset="100%" stop-color="#D4AF37" />
    </linearGradient>
  </defs>
  <rect width="800" height="480" rx="16" fill="url(#bgSprinter)" />
  <circle cx="400" cy="240" r="260" fill="none" stroke="#D4AF37" stroke-width="1" opacity="0.12" />
  <!-- Sprinter High Roof Body -->
  <g transform="translate(80, 90)">
    <ellipse cx="320" cy="290" rx="310" ry="25" fill="#000000" opacity="0.75" />
    <!-- High Roof Van -->
    <path d="M30 230 L50 120 L120 70 L520 65 L600 110 L620 200 L610 260 L40 260 Z" fill="#0B132B" stroke="#334155" stroke-width="2" />
    <!-- Panoramic Side Windows -->
    <path d="M130 85 L240 85 L240 170 L110 170 Z" fill="#070D1E" stroke="url(#goldS)" stroke-width="1.5" />
    <path d="M250 85 L360 85 L360 170 L250 170 Z" fill="#070D1E" stroke="url(#goldS)" stroke-width="1.5" />
    <path d="M370 85 L480 85 L480 170 L370 170 Z" fill="#070D1E" stroke="url(#goldS)" stroke-width="1.5" />
    <path d="M490 85 L565 110 L555 170 L490 170 Z" fill="#070D1E" stroke="url(#goldS)" stroke-width="1.5" />
    <!-- Gold VIP Stripe -->
    <line x1="30" y1="215" x2="615" y2="215" stroke="url(#goldS)" stroke-width="3" />
    <!-- Wheels -->
    <g transform="translate(140, 260)">
      <circle cx="0" cy="0" r="48" fill="#0F172A" stroke="#475569" stroke-width="4" />
      <circle cx="0" cy="0" r="32" fill="#1E293B" stroke="url(#goldS)" stroke-width="2" />
      <circle cx="0" cy="0" r="10" fill="url(#goldS)" />
    </g>
    <g transform="translate(510, 260)">
      <circle cx="0" cy="0" r="48" fill="#0F172A" stroke="#475569" stroke-width="4" />
      <circle cx="0" cy="0" r="32" fill="#1E293B" stroke="url(#goldS)" stroke-width="2" />
      <circle cx="0" cy="0" r="10" fill="url(#goldS)" />
    </g>
  </g>
  <g transform="translate(40, 40)">
    <rect width="230" height="38" rx="19" fill="#0A1A33" stroke="#D4AF37" stroke-width="1.5" />
    <text x="115" y="24" font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#D4AF37" text-anchor="middle">
      MERCEDES SPRINTER VIP
    </text>
  </g>
  <text x="760" y="65" font-family="'Inter', sans-serif" font-size="14" font-weight="600" fill="#94A3B8" text-anchor="end">
    8 - 14 PAX • 15 LUGGAGE • HIGH ROOF EXECUTIVE
  </text>
</svg>`;
fs.writeFileSync(path.join(imgDir, 'sprinter-vip.svg'), sprinterSvg);

// 4. Maybach / S-Class VIP SVG
const maybachSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="800" height="480">
  <defs>
    <linearGradient id="bgM" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050C17" />
      <stop offset="100%" stop-color="#0B1B33" />
    </linearGradient>
    <linearGradient id="goldM" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="50%" stop-color="#FFF9D2" />
      <stop offset="100%" stop-color="#9A7B1C" />
    </linearGradient>
  </defs>
  <rect width="800" height="480" rx="16" fill="url(#bgM)" />
  <circle cx="400" cy="240" r="270" fill="none" stroke="#D4AF37" stroke-width="1" opacity="0.1" />
  <g transform="translate(90, 130)">
    <ellipse cx="310" cy="250" rx="290" ry="22" fill="#000000" opacity="0.8" />
    <!-- Luxury Sedan Streamlined Body -->
    <path d="M40 210 L70 180 L180 145 L320 135 L450 145 L540 185 L590 215 L580 230 L50 230 Z" fill="#0F172A" stroke="#334155" stroke-width="2" />
    <!-- Tinted Windows -->
    <path d="M195 150 L310 142 L310 185 L160 185 Z" fill="#050B14" stroke="url(#goldM)" stroke-width="1.5" />
    <path d="M320 142 L435 150 L460 185 L320 185 Z" fill="#050B14" stroke="url(#goldM)" stroke-width="1.5" />
    <!-- Maybach Two-Tone Gold Accent -->
    <path d="M45 205 L585 205" stroke="url(#goldM)" stroke-width="3" />
    <!-- Wheels with Multi-spoke Maybach styling -->
    <g transform="translate(150, 225)">
      <circle cx="0" cy="0" r="42" fill="#020617" stroke="#475569" stroke-width="4" />
      <circle cx="0" cy="0" r="28" fill="#1E293B" stroke="url(#goldM)" stroke-width="2.5" />
      <circle cx="0" cy="0" r="8" fill="url(#goldM)" />
    </g>
    <g transform="translate(480, 225)">
      <circle cx="0" cy="0" r="42" fill="#020617" stroke="#475569" stroke-width="4" />
      <circle cx="0" cy="0" r="28" fill="#1E293B" stroke="url(#goldM)" stroke-width="2.5" />
      <circle cx="0" cy="0" r="8" fill="url(#goldM)" />
    </g>
  </g>
  <g transform="translate(40, 40)">
    <rect width="250" height="38" rx="19" fill="#0A1A33" stroke="#D4AF37" stroke-width="1.5" />
    <text x="125" y="24" font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#D4AF37" text-anchor="middle">
      MERCEDES S-CLASS / MAYBACH
    </text>
  </g>
  <text x="760" y="65" font-family="'Inter', sans-serif" font-size="14" font-weight="600" fill="#94A3B8" text-anchor="end">
    1 - 3 PAX • FIRST CLASS PROTOCOL VIP
  </text>
</svg>`;
fs.writeFileSync(path.join(imgDir, 'maybach-vip.svg'), maybachSvg);

// 5. Destination SVGs generator
const destinations = [
  { id: 'taksim', title: 'Taksim & Galata', sub: 'The Vibrant Heart of Istanbul', icon: 'tower' },
  { id: 'sultanahmet', title: 'Sultanahmet & Blue Mosque', sub: 'Historic UNESCO Heritage', icon: 'mosque' },
  { id: 'besiktas', title: 'Beşiktaş & Bosphorus', sub: 'Stunning Waterfront Luxury', icon: 'bosphorus' },
  { id: 'sisli', title: 'Şişli & Nişantaşı', sub: 'Fashion & Luxury Shopping', icon: 'shopping' },
  { id: 'kadikoy', title: 'Kadıköy & Asian Side', sub: 'Baghdad Avenue & Sea Views', icon: 'coast' },
  { id: 'sariyer', title: 'Sarıyer & Vadistanbul', sub: 'Green Valleys & IstinyePark', icon: 'nature' },
  { id: 'sapanca', title: 'Sapanca & Maşukiye', sub: 'Tranquil Lakes & Waterfalls', icon: 'lake' },
  { id: 'bursa', title: 'Green Bursa & Uludağ', sub: 'Cable Car & Historic Silk Bazaar', icon: 'mountain' }
];

destinations.forEach(d => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
    <defs>
      <linearGradient id="destBg_${d.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0A1A33" />
        <stop offset="60%" stop-color="#142B55" />
        <stop offset="100%" stop-color="#061224" />
      </linearGradient>
      <linearGradient id="goldD" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#FDE68A" />
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(#destBg_${d.id})" />
    
    <!-- Skyline & Decorative Architectural Curves -->
    <path d="M0 320 Q 150 260 300 300 T 600 280 L 600 400 L 0 400 Z" fill="#040C1A" opacity="0.8" />
    <path d="M0 350 Q 200 310 400 340 T 600 320 L 600 400 L 0 400 Z" fill="#020610" opacity="0.9" />
    
    <!-- Iconic Minarets / Silhouette -->
    <g transform="translate(380, 160)" fill="#D4AF37" opacity="0.25">
      <rect x="30" y="40" width="8" height="120" />
      <polygon points="34,10 26,40 42,40" />
      <rect x="80" y="20" width="10" height="140" />
      <polygon points="85,0 75,20 95,20" />
      <!-- Dome -->
      <path d="M110 160 A 40 40 0 0 0 190 160 Z" />
    </g>

    <!-- Content Overlay -->
    <rect x="0" y="240" width="600" height="160" fill="linear-gradient(to top, #0A1A33, transparent)" />
    
    <!-- Gold Tag -->
    <g transform="translate(35, 35)">
      <rect width="130" height="28" rx="14" fill="#0A1A33" stroke="#D4AF37" stroke-width="1.2" />
      <text x="65" y="18" font-family="'Inter', sans-serif" font-size="11" font-weight="700" fill="#D4AF37" text-anchor="middle" letter-spacing="1">
        VIP ROUTE
      </text>
    </g>
    
    <!-- Title and Subtitle -->
    <text x="40" y="325" font-family="'Playfair Display', serif" font-size="28" font-weight="700" fill="#FFFFFF">
      ${d.title}
    </text>
    <text x="40" y="355" font-family="'Inter', sans-serif" font-size="14" font-weight="400" fill="#D4AF37">
      ${d.sub}
    </text>
    <line x1="40" y1="375" x2="160" y2="375" stroke="#D4AF37" stroke-width="2" />
  </svg>`;
  fs.writeFileSync(path.join(destDir, `${d.id}.svg`), svg);
});

// 6. Meet & Greet Graphic
const meetGreetSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <defs>
    <linearGradient id="bgMG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08152A" />
      <stop offset="100%" stop-color="#122A54" />
    </linearGradient>
    <linearGradient id="goldG" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#FCE08B" />
    </linearGradient>
  </defs>
  <rect width="600" height="400" rx="16" fill="url(#bgMG)" />
  <!-- VIP Name Plate Graphic -->
  <g transform="translate(150, 100)">
    <!-- Chauffeur Silhouette -->
    <ellipse cx="150" cy="270" rx="160" ry="20" fill="#000" opacity="0.6" />
    <!-- White Board with Gold Trim -->
    <rect x="30" y="30" width="240" height="150" rx="12" fill="#FFFFFF" stroke="url(#goldG)" stroke-width="5" filter="drop-shadow(0 15px 30px rgba(0,0,0,0.5))" />
    <!-- Crown -->
    <polygon points="150,50 142,65 158,65" fill="#D4AF37" />
    <!-- Brand -->
    <text x="150" y="85" font-family="'Playfair Display', serif" font-size="16" font-weight="800" letter-spacing="2" fill="#0A1A33" text-anchor="middle">
      VIBEST TRIPS
    </text>
    <line x1="80" y1="95" x2="220" y2="95" stroke="#D4AF37" stroke-width="1.5" />
    <!-- Guest Name Sample -->
    <text x="150" y="125" font-family="'Cairo', 'Playfair Display', sans-serif" font-size="18" font-weight="700" fill="#D4AF37" text-anchor="middle">
      MR. AL-OTAIBI
    </text>
    <text x="150" y="150" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#64748B" text-anchor="middle" letter-spacing="1">
      VIP GUEST • ISTANBUL
    </text>
  </g>
  <text x="300" y="340" font-family="'Playfair Display', serif" font-size="22" font-weight="700" fill="#FFFFFF" text-anchor="middle">
    Personalized Meet &amp; Greet
  </text>
  <text x="300" y="365" font-family="'Inter', sans-serif" font-size="13" fill="#D4AF37" text-anchor="middle">
    Free Flight Tracking • 60 Min Free Waiting Time
  </text>
</svg>`;
fs.writeFileSync(path.join(imgDir, 'meet-greet.svg'), meetGreetSvg);

console.log('All image assets successfully generated in /public/images');
