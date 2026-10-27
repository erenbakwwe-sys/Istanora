import { NextResponse } from 'next/server';
import { sendBookingConfirmationEmail } from '@/lib/email';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const to = searchParams.get('to') || 'test@example.com';
    const lang = searchParams.get('lang') || 'tr';

    const testBookingData = {
      bookingId: `IST-${Date.now().toString().slice(-6)}`,
      fullName: 'Ahmet Yılmaz (Test Yolcu)',
      email: to,
      phone: '+90 555 123 4567',
      pickup: 'İstanbul Havalimanı (IST)',
      dropoff: 'Sultanahmet Four Seasons Hotel',
      date: '28.10.2026',
      time: '14:30',
      vehicle: 'Mercedes-Benz Vito VIP (Ultra Lüks)',
      passengers: 4,
      luggage: 4,
      flightNumber: 'TK1821',
      greetingSign: 'Ahmet Yılmaz',
      totalPrice: '29',
      currency: 'USD',
      paymentMethod: 'online_card',
      locale: lang,
      notes: 'Test email gönderimi - Istanora VIP Konfirmasyon Sistemi',
    };

    const result = await sendBookingConfirmationEmail(testBookingData);

    const hasResendKey = !!process.env.RESEND_API_KEY;
    const hasSmtp = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

    return NextResponse.json({
      success: result.success,
      recipient: to,
      language: lang,
      provider: result.provider,
      messageId: result.messageId || null,
      error: result.error || null,
      environmentStatus: {
        resendConfigured: hasResendKey,
        smtpConfigured: hasSmtp,
        resendKeyPreview: hasResendKey ? `${process.env.RESEND_API_KEY?.slice(0, 7)}...` : 'NOT SET',
        fromEmail: process.env.EMAIL_FROM || 'Istanora VIP <onboarding@resend.dev>',
      },
      importantNotice: 'Resend ücretsiz test modunda (onboarding@resend.dev) sadece Resend hesabınızı açtığınız kendi e-posta adresinize gönderim yapabilirsiniz. Linkteki to= kısmına Resend hesabınızın e-postasını yazarak test ediniz.',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Email test failed',
      },
      { status: 500 }
    );
  }
}
