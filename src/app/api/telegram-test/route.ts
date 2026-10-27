import { NextResponse } from 'next/server';

const DEFAULT_TELEGRAM_BOT_TOKEN = '8801497774:AAGOTPJ0fCiEYKuk8sWHvgxZSeW0C42Yffs';
const DEFAULT_TELEGRAM_CHAT_ID = '6330000122';

export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || DEFAULT_TELEGRAM_CHAT_ID;

  const now = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
  const testText = `✅ <b>ISTANORA VIP - TELEGRAM BAĞLANTI TESTİ</b>\n━━━━━━━━━━━━━━━━━━━━━\n⏰ Sistem Saati: ${now}\n🚀 Vercel sunucunuz ile Telegram botunuz arasındaki bağlantı başarıyla kuruldu.`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: testText,
        parse_mode: 'HTML',
      }),
    });

    const data = await res.json();

    return NextResponse.json({
      status: 'complete',
      telegramOk: data.ok,
      chatId,
      botTokenConfigured: Boolean(process.env.TELEGRAM_BOT_TOKEN),
      usingFallback: !process.env.TELEGRAM_BOT_TOKEN,
      telegramResponse: data,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: error?.message || 'Failed to connect to Telegram',
      },
      { status: 500 }
    );
  }
}
