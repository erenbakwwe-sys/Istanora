import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, extractClientIp, sanitizeText, escapeHtml } from '@/lib/security';

const DEFAULT_TELEGRAM_BOT_TOKEN = '8801497774:AAGOTPJ0fCiEYKuk8sWHvgxZSeW0C42Yffs';
const DEFAULT_TELEGRAM_CHAT_ID = '6330000122';

const callbackSchema = z.object({
  fullName: z.string().min(1, 'Name is required').max(100),
  phone: z.string().min(1, 'Phone is required').max(40),
  route: z.string().max(200).optional(),
  locale: z.string().max(20).optional(),
  message: z.string().max(2000).optional(),
});

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting Guard
    const clientIp = extractClientIp(request.headers);
    const rateCheck = checkRateLimit(clientIp, 'callback');

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please wait a minute before requesting another callback.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateCheck.resetSeconds),
          },
        }
      );
    }

    // 2. Strict Input Validation & Sanitization
    const json = await request.json();
    const data = callbackSchema.parse(json);

    const safeName = escapeHtml(sanitizeText(data.fullName, 100));
    const rawPhone = sanitizeText(data.phone, 40);
    const safePhone = escapeHtml(rawPhone);
    const cleanPhone = rawPhone.replace(/[^0-9+]/g, '');
    const safeRoute = data.route ? escapeHtml(sanitizeText(data.route, 200)) : '';
    const safeCustomMsg = data.message ? escapeHtml(sanitizeText(data.message, 2000)) : '';
    const safeLocale = escapeHtml((data.locale || 'TR').toUpperCase());

    const token = process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID || DEFAULT_TELEGRAM_CHAT_ID;

    let telegramSent = false;

    if (token && chatId) {
      const now = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });

      let telegramMsg = `🛎️ <b>CANLI VIP CONCIERGE & GERİ ARAMA TALEBİ</b>\n`;
      telegramMsg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      telegramMsg += `⏰ <b>Zaman:</b> ${now}\n`;
      telegramMsg += `🌐 <b>Dil:</b> ${safeLocale}\n\n`;
      telegramMsg += `👤 <b>Müşteri:</b> ${safeName}\n`;
      telegramMsg += `📱 <b>Telefon:</b> <a href="tel:${cleanPhone}">${safePhone}</a>\n`;
      if (safeRoute) {
        telegramMsg += `📍 <b>İlgilendiği Güzergah / Konu:</b> ${safeRoute}\n`;
      }
      if (safeCustomMsg) {
        telegramMsg += `💬 <b>Müşteri Notu:</b> <i>${safeCustomMsg}</i>\n`;
      }
      telegramMsg += `\n⚡ <i>Müşteri VIP operasyon masamızdan 5 dakika içinde aranmak istiyor!</i>\n`;
      telegramMsg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      telegramMsg += `⚡ <i>Istanora VIP Canlı Bildirim Sistemi</i>`;

      const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMsg,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      });

      const tgData = await tgRes.json();
      telegramSent = Boolean(tgData.ok);
    }

    return NextResponse.json({
      success: true,
      telegramSent,
      message: 'Callback request received successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.errors?.[0]?.message || 'Invalid request' },
      { status: 400 }
    );
  }
}
