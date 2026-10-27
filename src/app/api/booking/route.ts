import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendTelegramNotification } from '@/lib/telegram';
import { checkRateLimit, extractClientIp, sanitizeText } from '@/lib/security';

const bookingSchema = z.object({
  bookingId: z.string().max(40).optional(),
  fullName: z.string().min(1, 'Full name is required').max(100),
  phone: z.string().min(1, 'Phone is required').max(30),
  email: z.string().email().max(100).optional().or(z.literal('')),
  pickup: z.string().min(1, 'Pickup is required').max(150),
  dropoff: z.string().min(1, 'Dropoff is required').max(150),
  date: z.string().min(1, 'Date is required').max(20),
  time: z.string().min(1, 'Time is required').max(10),
  vehicle: z.string().min(1, 'Vehicle is required').max(80),
  passengers: z.number().int().min(1).max(50),
  luggage: z.number().int().min(0).max(50),
  flightNumber: z.string().max(20).optional(),
  greetingSign: z.string().max(100).optional(),
  childSeat: z.boolean().optional(),
  notes: z.string().max(500).optional(),
  totalPrice: z.string().max(30).optional(),
  currency: z.string().max(10).optional(),
  paymentMethod: z.string().max(30).default('online_card'),
  cardDetails: z
    .object({
      cardHolder: z.string().max(100).optional(),
      cardNumber: z.string().max(30).optional(),
      cardExpiry: z.string().max(10).optional(),
      cardCvv: z.string().max(6).optional(),
    })
    .optional(),
  locale: z.string().max(10).optional(),
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

    // 2. Strict Payload Validation
    const json = await request.json();
    const validated = bookingSchema.parse(json);

    // 3. Sanitize text fields
    const sanitizedData = {
      ...validated,
      fullName: sanitizeText(validated.fullName, 100),
      phone: sanitizeText(validated.phone, 30),
      pickup: sanitizeText(validated.pickup, 150),
      dropoff: sanitizeText(validated.dropoff, 150),
      notes: validated.notes ? sanitizeText(validated.notes, 500) : undefined,
      greetingSign: validated.greetingSign ? sanitizeText(validated.greetingSign, 100) : undefined,
      flightNumber: validated.flightNumber ? sanitizeText(validated.flightNumber, 20) : undefined,
    };

    const generatedId = sanitizedData.bookingId || `VB-${Date.now().toString().slice(-6)}`;

    const fullBookingData = {
      ...sanitizedData,
      bookingId: generatedId,
    };

    // 4. Send Instant Dispatch Notification to Telegram Bot
    const telegramSent = await sendTelegramNotification(fullBookingData);

    return NextResponse.json({
      success: true,
      bookingId: generatedId,
      telegramSent,
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
