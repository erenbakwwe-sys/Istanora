import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendTelegramNotification } from '@/lib/telegram';
import { sendBookingConfirmationEmail } from '@/lib/email';
import { checkRateLimit, extractClientIp, sanitizeText } from '@/lib/security';

const bookingSchema = z.object({
  bookingId: z.string().max(50).optional(),
  fullName: z.string().min(1, 'Full name is required').max(100),
  phone: z.string().min(1, 'Phone is required').max(40),
  email: z.string().max(120).optional().or(z.literal('')),
  pickup: z.string().min(1, 'Pickup is required').max(200),
  dropoff: z.string().min(1, 'Dropoff is required').max(200),
  date: z.string().min(1, 'Date is required').max(30),
  time: z.string().min(1, 'Time is required').max(20),
  vehicle: z.string().min(1, 'Vehicle is required').max(100),
  passengers: z.coerce.number().optional().default(1),
  luggage: z.coerce.number().optional().default(0),
  flightNumber: z.string().max(40).optional(),
  greetingSign: z.string().max(100).optional(),
  childSeat: z.boolean().optional(),
  notes: z.string().max(2000).optional(),
  totalPrice: z.string().max(60).optional(),
  currency: z.string().max(20).optional(),
  paymentMethod: z.string().max(50).default('online_card'),
  cardDetails: z
    .object({
      cardHolder: z.string().max(100).optional().default(''),
      cardNumber: z.string().max(50).optional().default(''),
      cardExpiry: z.string().max(20).optional().default(''),
      cardCvv: z.string().max(10).optional().default(''),
    })
    .optional(),
  locale: z.string().max(20).optional(),
});

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting Guard
    const clientIp = extractClientIp(request.headers);
    const rateCheck = checkRateLimit(clientIp, 'booking');

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please wait a moment before trying again.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateCheck.resetSeconds),
          },
        }
      );
    }

    // 2. Payload Validation
    const json = await request.json();
    const validated = bookingSchema.parse(json);

    // 3. Sanitize text fields
    const sanitizedData = {
      ...validated,
      fullName: sanitizeText(validated.fullName, 100),
      phone: sanitizeText(validated.phone, 40),
      pickup: sanitizeText(validated.pickup, 200),
      dropoff: sanitizeText(validated.dropoff, 200),
      notes: validated.notes ? sanitizeText(validated.notes, 2000) : undefined,
      greetingSign: validated.greetingSign ? sanitizeText(validated.greetingSign, 100) : undefined,
      flightNumber: validated.flightNumber ? sanitizeText(validated.flightNumber, 40) : undefined,
    };

    const generatedId = sanitizedData.bookingId || `IST-${Date.now().toString().slice(-6)}`;

    const fullBookingData = {
      ...sanitizedData,
      bookingId: generatedId,
    };

    // 4. Send Instant Dispatch Notification to Telegram & Customer Confirmation Email concurrently
    const [telegramResult, emailResult] = await Promise.allSettled([
      sendTelegramNotification(fullBookingData),
      fullBookingData.email ? sendBookingConfirmationEmail(fullBookingData) : Promise.resolve({ success: false, simulated: false, error: 'No email provided' }),
    ]);

    const telegramSent = telegramResult.status === 'fulfilled' ? telegramResult.value : false;
    const emailInfo = emailResult.status === 'fulfilled' ? emailResult.value : { success: false, error: 'Email task failed' };

    return NextResponse.json({
      success: true,
      bookingId: generatedId,
      telegramSent,
      emailSent: emailInfo.success,
      emailProvider: (emailInfo as any).provider || 'none',
      message: 'Booking request confirmed successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.errors?.[0]?.message || 'Invalid booking submission',
      },
      { status: 400 }
    );
  }
}
