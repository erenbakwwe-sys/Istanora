declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', action, { category, label, value });
  }
}

export function trackWhatsAppClick(source: string = 'general') {
  trackEvent('whatsapp_click', 'lead', source);
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact');
  }
}

export function trackBookingSubmission(details: any) {
  trackEvent('booking_submit', 'conversion', details.route, details.price);
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: details.route,
      value: details.price,
      currency: details.currency || 'USD'
    });
  }
}
