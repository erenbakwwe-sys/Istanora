import nodemailer from 'nodemailer';

export interface BookingEmailData {
  bookingId: string;
  fullName: string;
  email?: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  vehicle: string;
  passengers: number;
  luggage: number;
  flightNumber?: string;
  greetingSign?: string;
  notes?: string;
  totalPrice?: string;
  currency?: string;
  paymentMethod?: string;
  locale?: string;
}

interface EmailResult {
  success: boolean;
  provider?: 'resend' | 'smtp' | 'simulated';
  messageId?: string;
  error?: string;
}

/**
 * Builds the subject line based on guest's preferred language
 */
function getSubject(data: BookingEmailData): string {
  const lang = (data.locale || 'tr').toLowerCase();
  if (lang === 'ar') {
    return `إستانورا VIP ترانسفير - تم استلام طلب الحجز بنجاح (${data.bookingId})`;
  }
  if (lang === 'en') {
    return `Istanora VIP Transfer - Booking Request Received (${data.bookingId})`;
  }
  return `Istanora VIP Transfer - Rezervasyon Talebiniz Alındı (${data.bookingId})`;
}

/**
 * Generates an ultra-luxurious, reassuring HTML email template
 * in Turkish, Arabic, or English
 */
function generateLuxuryHtml(data: BookingEmailData): string {
  const lang = (data.locale || 'tr').toLowerCase();
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  const textAlign = isRtl ? 'right' : 'left';

  // Localized texts
  let t = {
    greeting: `Sayın ${data.fullName},`,
    badgeTitle: 'TALEBİNİZ BAŞARIYLA ALINDI',
    badgeSub: 'VIP Operasyon Masası İncelemesinde',
    mainNoticeTitle: 'İşleminiz VIP Operasyon Merkezimize Ulaşmıştır',
    mainNoticeBody: `Transfer talebiniz güvenle kaydedilmiştir. Özel müşteri temsilciniz ve uçuş koordinasyon ekibimiz, rezervasyon detaylarınızı inceleyerek <strong>en geç 48 saat içerisinde</strong> (veya uçuş saatiniz daha yakınsa hemen uçuşunuz öncesinde) transfer teyidiniz ve şoförünüzün atanması için sizinle iletişime geçecektir.`,
    guaranteeTitle: 'Istanora VIP Güvencesi & Ayrıcalıkları',
    g1Title: '✈️ Canlı Uçuş Takibi (Flight Radar)',
    g1Desc: 'Uçuş numaranız anlık izlenir. Olası rötarlarda şoförünüz sizi ücretsiz bekler.',
    g2Title: '🏷️ Terminal İçi İsimli Karşılama (Meet & Greet)',
    g2Desc: 'Terminal çıkış kapısında isminizin yazılı olduğu özel tabela ve porter karşılaması.',
    g3Title: '⭐ Ultra Lüks VIP Konfor',
    g3Desc: 'Mercedes-Benz VIP aracınızda ücretsiz Wi-Fi, ikramlar ve özel deri iç mekan.',
    summaryTitle: 'Rezervasyon Özeti',
    lblBookingId: 'Rezervasyon No',
    lblGuest: 'Yolcu Adı',
    lblPhone: 'Telefon',
    lblRoute: 'Güzergah',
    lblDateTime: 'Tarih & Saat',
    lblVehicle: 'Araç Sınıfı',
    lblCapacity: 'Kapasite',
    lblFlightNo: 'Uçuş Numarası',
    lblGreetingSign: 'Karşılama İsimliği',
    lblPayment: 'Ödeme Şekli',
    lblTotal: 'Toplam Tutar',
    lblNotes: 'Özel Notlar',
    urgentTitle: '7/24 VIP Operasyon & Destek',
    urgentDesc: 'Acil değişiklikler veya uçuş güncellemeleriniz için kurumsal operasyon masamıza e-posta yoluyla 7/24 ulaşabilirsiniz:',
    supportEmail: 'concierge@istanora.com',
    terminalsNotice: 'İstanbul Havalimanı (IST) Kapı 9 • Sabiha Gökçen (SAW) Kapı 3',
    footerCompany: 'Istanora VIP Transfer & Private Chauffeur Services',
    footerSub: 'TÜRSAB A-Grubu Belgeli ve D2 Yetki Belgeli Lüks Seyahat Hizmetleri • İstanbul, Türkiye',
    footerNote: 'Bu e-posta otomatik oluşturulmuştur. Rezervasyon takip kodunuz: ',
    cardPayment: 'Kredi / Banka Kartı (Online)'
  };

  if (lang === 'ar') {
    t = {
      greeting: `سعادة العميل العزيز ${data.fullName}،`,
      badgeTitle: 'تم استلام طلبكم بنجاح',
      badgeSub: 'قيد المراجعة في غرفة العمليات VIP',
      mainNoticeTitle: 'طلب حجزكم وصل إلى مركز عمليات إستانورا VIP',
      mainNoticeBody: `تم تسجيل طلب نقلكم الفاخر بنجاح وأمان. يقوم فريق العمليات المتقدمة وممثل خدمة كبار الشخصيات بمراجعة تفاصيل رحلتكم، وسيتواصل معكم <strong>خلال 48 ساعة كحد أقصى</strong> (أو قبل موعد رحلتكم بوقت كافٍ) لتأكيد الحجز وتزويدكم ببيانات السائق وترتيبات الاستقبال.`,
      guaranteeTitle: 'ضمانات ومزايا إستانورا VIP',
      g1Title: '✈️ تتبع الرحلات المباشر (Flight Radar)',
      g1Desc: 'نراقب رحلتكم لحظة بلحظة، وفي حال حدوث أي تأخير ينتظركم السائق مجاناً.',
      g2Title: '🏷️ استقبال خاص بالاسم داخل الصالة',
      g2Desc: 'سائقكم بانتظاركم عند بوابة الخروج بلوحة تحمل اسمكم الكريم والمساعدة بالحقائب.',
      g3Title: '⭐ سيارات مرسيدس VIP فائقة الفخامة',
      g3Desc: 'مقاعد جلدية مريحة، إنترنت عالي السرعة، شاشات ترفيه وضيافة راقية.',
      summaryTitle: 'ملخص بيانات الحجز',
      lblBookingId: 'رقم الحجز المرجعي',
      lblGuest: 'اسم العميل',
      lblPhone: 'رقم الهاتف',
      lblRoute: 'خط السير (المسار)',
      lblDateTime: 'التاريخ والوقت',
      lblVehicle: 'فئة السيارة',
      lblCapacity: 'الركاب والأمتعة',
      lblFlightNo: 'رقم الرحلة الجوية',
      lblGreetingSign: 'الاسم على لوحة الاستقبال',
      lblPayment: 'طريقة الدفع',
      lblTotal: 'المبلغ الإجمالي',
      lblNotes: 'ملاحظات خاصة',
      urgentTitle: 'مكتب العمليات وخدمة كبار الشخصيات 24/7',
      urgentDesc: 'لأي استفسار طارئ أو تعديل على موعد الرحلة، يرجى التواصل مع مركز العمليات عبر البريد الإلكتروني المعتمد:',
      supportEmail: 'concierge@istanora.com',
      terminalsNotice: 'مطار إسطنبول (IST) بوابة 9 • مطار صبيحة كوكجن (SAW) بوابة 3',
      footerCompany: 'إستانورا VIP ترانسفير - خدمات النقل الفاخر والسياحة في إسطنبول',
      footerSub: 'مرخصة رسمياً من وزارة السياحة التركية TÜRSAB برخصة D2 للنقل السياحي • إسطنبول، تركيا',
      footerNote: 'تم إنشاء هذا الإشعار تلقائياً. رمز مرجع الحجز: ',
      cardPayment: 'بطاقة ائتمان / بنكية (أونلاين)'
    };
  } else if (lang === 'en') {
    t = {
      greeting: `Dear ${data.fullName},`,
      badgeTitle: 'RESERVATION REQUEST RECEIVED',
      badgeSub: 'Under Review by VIP Operations Desk',
      mainNoticeTitle: 'Your Request Has Reached Our VIP Operations Center',
      mainNoticeBody: `Your private transfer request has been successfully registered in our executive system. Our flight coordination executive and VIP customer representative will review your booking details and contact you <strong>within 48 hours</strong> (or well before your flight departure) to finalize chauffeur dispatch and meet & greet arrangements.`,
      guaranteeTitle: 'The Istanora VIP Difference & Guarantees',
      g1Title: '✈️ Live Flight Radar Monitoring',
      g1Desc: 'We track your inbound flight in real-time. Complimentary wait time for flight delays.',
      g2Title: '🏷️ VIP Meet & Greet at Terminal Exit',
      g2Desc: 'Personal chauffeur waiting with your personalized name board and luggage assistance.',
      g3Title: '⭐ Executive Fleet Comfort',
      g3Desc: 'Ultra-luxury Mercedes-Benz fleet with complimentary Wi-Fi, refreshments, and leather interior.',
      summaryTitle: 'Booking Summary Details',
      lblBookingId: 'Booking Reference',
      lblGuest: 'Guest Name',
      lblPhone: 'Phone Number',
      lblRoute: 'Route',
      lblDateTime: 'Date & Time',
      lblVehicle: 'Vehicle Class',
      lblCapacity: 'Capacity',
      lblFlightNo: 'Flight Number',
      lblGreetingSign: 'Greeting Sign Name',
      lblPayment: 'Payment Method',
      lblTotal: 'Total Fare',
      lblNotes: 'Special Notes',
      urgentTitle: '24/7 VIP Concierge & Operations',
      urgentDesc: 'For urgent schedule changes or flight updates, reach our executive concierge desk anytime:',
      supportEmail: 'concierge@istanora.com',
      terminalsNotice: 'Istanbul Airport (IST) Gate 9 • Sabiha Gökcen (SAW) Gate 3',
      footerCompany: 'Istanora VIP Transfer & Private Chauffeur Services',
      footerSub: 'TÜRSAB Licensed & D2 Certified Executive Travel Services • Istanbul, Turkey',
      footerNote: 'This is an automated confirmation notice. Booking Reference: ',
      cardPayment: 'Credit / Debit Card (Online)'
    };
  }

  const sign = data.greetingSign || data.fullName;
  const flight = data.flightNumber || (lang === 'ar' ? 'لم يحدد بعد' : lang === 'tr' ? 'Belirtilmedi' : 'Not specified');
  const notes = data.notes || (lang === 'ar' ? 'لا يوجد' : lang === 'tr' ? 'Yok' : 'None');
  const passengersText = `${data.passengers} ${lang === 'ar' ? 'ركاب' : lang === 'tr' ? 'Yolcu' : 'Guests'} • ${data.luggage} ${lang === 'ar' ? 'حقائب' : lang === 'tr' ? 'Valiz' : 'Luggage'}`;
  const totalDisplay = data.totalPrice ? `${data.totalPrice} ${data.currency || 'USD'}` : (lang === 'ar' ? 'حسب الاتفاق' : lang === 'tr' ? 'Fiyat Belirtilmedi' : 'On Request');
  const paymentText = data.paymentMethod === 'paypal' ? 'PayPal' : t.cardPayment;

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.badgeTitle} - Istanora VIP</title>
</head>
<body style="margin:0; padding:0; background-color:#050B14; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; color:#E2E8F0; -webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#050B14; padding:30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px; background-color:#0A1322; border-radius:18px; border:1px solid #1E293B; overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Header with Gold Accent & Brand Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #071324 0%, #0F2038 100%); padding:32px 30px; text-align:center; border-bottom:2px solid #D4AF37;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <div style="display:inline-block; padding:6px 16px; border:1px solid #D4AF37; border-radius:30px; background-color:rgba(212,175,55,0.08); margin-bottom:12px;">
                      <span style="font-size:11px; letter-spacing:2px; font-weight:700; color:#D4AF37; text-transform:uppercase;">ISTANBUL PRIVATE CHAUFFEUR</span>
                    </div>
                    <h1 style="margin:0; font-size:26px; font-weight:800; letter-spacing:1px; color:#FFFFFF; text-transform:uppercase;">ISTANORA <span style="color:#D4AF37;">VIP</span></h1>
                    <p style="margin:6px 0 0; font-size:12px; color:#94A3B8; letter-spacing:0.5px;">Executive Airport Meet &amp; Greet Concierge</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reassurance Hero Banner -->
          <tr>
            <td style="padding:36px 32px 24px; text-align:${textAlign};" dir="${dir}">
              
              <!-- Status Pill -->
              <div style="display:inline-block; background-color:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:6px 14px; margin-bottom:20px;">
                <span style="font-size:12px; font-weight:700; color:#10B981; letter-spacing:0.5px;">✓ ${t.badgeTitle}</span>
              </div>

              <!-- Greeting -->
              <h2 style="margin:0 0 16px; font-size:22px; font-weight:700; color:#FFFFFF; line-height:1.3;">
                ${t.greeting}
              </h2>

              <!-- Reassuring Message Box (48 Hours Assurance) -->
              <div style="background-color:rgba(212,175,55,0.06); border-left:4px solid #D4AF37; border-radius:8px; padding:18px 20px; margin-bottom:26px;">
                <h3 style="margin:0 0 8px; font-size:16px; font-weight:700; color:#D4AF37;">
                  ${t.mainNoticeTitle}
                </h3>
                <p style="margin:0; font-size:14px; line-height:1.6; color:#E2E8F0;">
                  ${t.mainNoticeBody}
                </p>
              </div>

              <!-- VIP Highlights -->
              <div style="margin-bottom:30px;">
                <h4 style="margin:0 0 14px; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#94A3B8;">
                  ${t.guaranteeTitle}
                </h4>
                
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:8px;">
                  <tr>
                    <td style="padding:10px 14px; background-color:#0E1B2E; border-radius:10px; border:1px solid #1E2E44; margin-bottom:8px;">
                      <strong style="color:#D4AF37; font-size:13px; display:block; margin-bottom:3px;">${t.g1Title}</strong>
                      <span style="font-size:12px; color:#CBD5E1; line-height:1.4;">${t.g1Desc}</span>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:8px;">
                  <tr>
                    <td style="padding:10px 14px; background-color:#0E1B2E; border-radius:10px; border:1px solid #1E2E44; margin-bottom:8px;">
                      <strong style="color:#D4AF37; font-size:13px; display:block; margin-bottom:3px;">${t.g2Title}</strong>
                      <span style="font-size:12px; color:#CBD5E1; line-height:1.4;">${t.g2Desc}</span>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding:10px 14px; background-color:#0E1B2E; border-radius:10px; border:1px solid #1E2E44;">
                      <strong style="color:#D4AF37; font-size:13px; display:block; margin-bottom:3px;">${t.g3Title}</strong>
                      <span style="font-size:12px; color:#CBD5E1; line-height:1.4;">${t.g3Desc}</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Booking Details Summary Table -->
              <div style="background-color:#0E1A2B; border:1px solid #1E2B3E; border-radius:14px; padding:22px; margin-bottom:28px;">
                <div style="border-bottom:1px solid #1E2E44; padding-bottom:12px; margin-bottom:16px;">
                  <span style="font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#94A3B8; font-weight:700;">${t.summaryTitle}</span>
                  <div style="font-size:18px; font-weight:800; color:#D4AF37; margin-top:2px;">#${data.bookingId}</div>
                </div>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size:13px;">
                  <tr>
                    <td style="padding:8px 0; color:#94A3B8; width:40%; text-align:${textAlign};">${t.lblGuest}:</td>
                    <td style="padding:8px 0; color:#FFFFFF; font-weight:600; text-align:${textAlign};">${data.fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; color:#94A3B8; text-align:${textAlign};">${t.lblRoute}:</td>
                    <td style="padding:8px 0; color:#FFFFFF; font-weight:600; text-align:${textAlign};">${data.pickup} <span style="color:#D4AF37;">➔</span> ${data.dropoff}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; color:#94A3B8; text-align:${textAlign};">${t.lblDateTime}:</td>
                    <td style="padding:8px 0; color:#FFFFFF; font-weight:600; text-align:${textAlign};">${data.date} &bull; ${data.time}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; color:#94A3B8; text-align:${textAlign};">${t.lblVehicle}:</td>
                    <td style="padding:8px 0; color:#D4AF37; font-weight:700; text-align:${textAlign};">${data.vehicle}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; color:#94A3B8; text-align:${textAlign};">${t.lblCapacity}:</td>
                    <td style="padding:8px 0; color:#FFFFFF; text-align:${textAlign};">${passengersText}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; color:#94A3B8; text-align:${textAlign};">${t.lblGreetingSign}:</td>
                    <td style="padding:8px 0; color:#FFFFFF; font-weight:600; text-align:${textAlign};">${sign}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; color:#94A3B8; text-align:${textAlign};">${t.lblFlightNo}:</td>
                    <td style="padding:8px 0; color:#FFFFFF; text-align:${textAlign};">${flight}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; color:#94A3B8; text-align:${textAlign};">${t.lblPayment}:</td>
                    <td style="padding:8px 0; color:#FFFFFF; text-align:${textAlign};">${paymentText}</td>
                  </tr>
                  <tr style="border-top:1px solid #1E2E44;">
                    <td style="padding:12px 0 4px; color:#94A3B8; font-weight:700; text-align:${textAlign};">${t.lblTotal}:</td>
                    <td style="padding:12px 0 4px; color:#10B981; font-weight:800; font-size:16px; text-align:${textAlign};">${totalDisplay}</td>
                  </tr>
                </table>
              </div>

              <!-- 24/7 Operations Contact Box -->
              <div style="background-color:#09121D; border:1px solid #1A283B; border-radius:12px; padding:18px 20px; text-align:center;">
                <h4 style="margin:0 0 6px; font-size:14px; font-weight:700; color:#FFFFFF;">${t.urgentTitle}</h4>
                <p style="margin:0 0 10px; font-size:12px; color:#94A3B8; line-height:1.5;">${t.urgentDesc}</p>
                <a href="mailto:${t.supportEmail}" style="display:inline-block; background-color:#0F233D; border:1px solid #D4AF37; color:#D4AF37; padding:8px 20px; border-radius:8px; font-size:13px; font-weight:700; text-decoration:none;">${t.supportEmail}</a>
                <div style="margin-top:10px; font-size:11px; color:#64748B;">
                  ${t.terminalsNotice}
                </div>
              </div>

            </td>
          </tr>

          <!-- Corporate Footer -->
          <tr>
            <td style="background-color:#050B14; border-top:1px solid #142030; padding:24px 30px; text-align:center;">
              <p style="margin:0 0 6px; font-size:12px; font-weight:700; color:#CBD5E1;">${t.footerCompany}</p>
              <p style="margin:0 0 10px; font-size:10px; color:#64748B; line-height:1.5;">${t.footerSub}</p>
              <p style="margin:0; font-size:10px; color:#475569;">${t.footerNote} <strong>${data.bookingId}</strong></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Generates plain text version for email clients that do not render HTML
 */
function generatePlainText(data: BookingEmailData): string {
  const lang = (data.locale || 'tr').toLowerCase();
  if (lang === 'ar') {
    return `سعادة ${data.fullName}،

تم استلام طلب الحجز الخاص بكم بنجاح في مركز عمليات إستانورا VIP (رقم الحجز: ${data.bookingId}).

سيتواصل معكم ممثل خدمة كبار الشخصيات ومنسق الرحلات خلال 48 ساعة كحد أقصى لتأكيد كافة التفاصيل وترتيبات الاستقبال.

ملخص الحجز:
- المسار: ${data.pickup} -> ${data.dropoff}
- التاريخ والوقت: ${data.date} ${data.time}
- فئة السيارة: ${data.vehicle}
- الركاب: ${data.passengers} ركاب | ${data.luggage} حقائب
- لوحة الاستقبال: ${data.greetingSign || data.fullName}
- المبلغ الإجمالي: ${data.totalPrice || ''} ${data.currency || 'USD'}

لأي استفسار طارئ، يرجى مراسلتنا: concierge@istanora.com
إستانورا VIP ترانسفير - إسطنبول`;
  }

  if (lang === 'en') {
    return `Dear ${data.fullName},

Your luxury airport transfer request has been successfully received by Istanora VIP Operations (Booking ID: ${data.bookingId}).

Our personal concierge executive will contact you within 48 hours to confirm your reservation and chauffeur details.

Booking Summary:
- Route: ${data.pickup} -> ${data.dropoff}
- Date & Time: ${data.date} at ${data.time}
- Vehicle: ${data.vehicle}
- Guests: ${data.passengers} passengers, ${data.luggage} luggage
- Greeting Sign: ${data.greetingSign || data.fullName}
- Total Price: ${data.totalPrice || ''} ${data.currency || 'USD'}

24/7 Operations Desk: concierge@istanora.com
Istanora VIP Transfer - Istanbul, Turkey`;
  }

  return `Sayın ${data.fullName},

Transfer talebiniz Istanora VIP Operasyon Merkezimize başarıyla ulaşmıştır (Rezervasyon No: ${data.bookingId}).

VIP Müşteri Temsilcimiz ve Uçuş Koordinatörümüz en geç 48 saat içerisinde (veya uçuş saatiniz öncesinde) transfer teyidiniz ve karşılama detayları için sizinle iletişime geçecektir.

Rezervasyon Detayları:
- Güzergah: ${data.pickup} -> ${data.dropoff}
- Tarih & Saat: ${data.date} - ${data.time}
- Araç: ${data.vehicle}
- Yolcu: ${data.passengers} Yolcu, ${data.luggage} Valiz
- Karşılama İsimliği: ${data.greetingSign || data.fullName}
- Toplam Tutar: ${data.totalPrice || ''} ${data.currency || 'USD'}

7/24 VIP Operasyon E-Posta: concierge@istanora.com
Istanora VIP Transfer - İstanbul, Türkiye`;
}

/**
 * Sends booking confirmation email via Resend API (HTTP REST) or SMTP (Nodemailer).
 * If no credentials are configured, it safely logs the email to console (preventing any crash).
 */
export async function sendBookingConfirmationEmail(data: BookingEmailData): Promise<EmailResult> {
  const recipient = data.email?.trim();
  if (!recipient || !recipient.includes('@')) {
    return {
      success: false,
      error: 'Recipient email is missing or invalid'
    };
  }

  const subject = getSubject(data);
  const htmlContent = generateLuxuryHtml(data);
  const textContent = generatePlainText(data);

  // 1. Try Resend HTTP API (Fastest & most reliable on Vercel Serverless)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const fromEmail = process.env.EMAIL_FROM || 'Istanora VIP <onboarding@resend.dev>';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipient],
          subject,
          html: htmlContent,
          text: textContent,
        }),
      });

      const resJson = await res.json();
      if (res.ok && resJson.id) {
        console.log(`[EMAIL] Sent successfully via Resend to ${recipient} (ID: ${resJson.id})`);
        return {
          success: true,
          provider: 'resend',
          messageId: resJson.id,
        };
      } else {
        console.warn('[EMAIL] Resend API error response:', resJson);
        return {
          success: false,
          provider: 'resend',
          error: resJson.message || resJson.error || JSON.stringify(resJson),
        };
      }
    } catch (resendErr: any) {
      console.error('[EMAIL] Failed sending via Resend API:', resendErr?.message || resendErr);
      return {
        success: false,
        provider: 'resend',
        error: resendErr?.message || 'Network error communicating with Resend',
      };
    }
  }

  // 2. Try SMTP via Nodemailer (if SMTP host and user are configured)
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const smtpPort = Number(process.env.SMTP_PORT) || 465;
      const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;
      const fromEmail = process.env.EMAIL_FROM || `"Istanora VIP Transfer" <${smtpUser}>`;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
      });

      const info = await transporter.sendMail({
        from: fromEmail,
        to: recipient,
        subject,
        html: htmlContent,
        text: textContent,
      });

      console.log(`[EMAIL] Sent successfully via SMTP to ${recipient} (ID: ${info.messageId})`);
      return {
        success: true,
        provider: 'smtp',
        messageId: info.messageId,
      };
    } catch (smtpErr: any) {
      console.error('[EMAIL] Failed sending via SMTP:', smtpErr?.message || smtpErr);
      return {
        success: false,
        provider: 'smtp',
        error: smtpErr?.message || 'SMTP delivery failed',
      };
    }
  }

  // 3. Fallback / Dev simulation mode: If neither Resend nor SMTP is configured
  console.log('---------------------------------------------------------');
  console.log(`[EMAIL SIMULATION] To: ${recipient}`);
  console.log(`[EMAIL SIMULATION] Subject: ${subject}`);
  console.log(`[EMAIL SIMULATION] Booking ID: ${data.bookingId}`);
  console.log(`[EMAIL SIMULATION] Configure RESEND_API_KEY or SMTP_* to deliver real emails.`);
  console.log('---------------------------------------------------------');

  return {
    success: true,
    provider: 'simulated',
    messageId: `sim-${Date.now()}`,
    error: 'No email service credentials configured. Set RESEND_API_KEY in Vercel/environment to deliver live emails.',
  };
}
