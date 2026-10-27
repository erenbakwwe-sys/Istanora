/**
 * Istanora VIP Transfer Enterprise Security & Anti-Abuse Hardening Library
 * - HTML Entity Sanitizer (Guards Telegram HTML parser against injection & crashes)
 * - Sliding-Window IP Rate Limiter (Guards API routes against DDoS & Spam flood)
 * - Input Sanitization & Boundary Enforcement
 */

// HTML entity map for neutralizing injection vectors
const HTML_REPLACEMENTS: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;',
};

/**
 * Escapes unsafe characters for Telegram HTML parse_mode
 */
export function escapeHtml(str: unknown): string {
  if (typeof str !== 'string') {
    if (str === null || str === undefined) return '';
    return String(str);
  }
  return str.replace(/[&<>"']/g, (char) => HTML_REPLACEMENTS[char] || char);
}

/**
 * Sanitizes input string: strips non-printable control characters, trims, and applies max length
 */
export function sanitizeText(val: unknown, maxLength = 250): string {
  if (typeof val !== 'string') return '';
  return val
    // Remove control characters (except newline \n)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLength);
}

// In-Memory Rate Limiting
interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Periodic cleanup every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 60_000);
      if (record.timestamps.length === 0) {
        rateLimitStore.delete(key);
      }
    }
  }, 300_000);
}

/**
 * Sliding-window rate limiter by IP & route action
 * @param ip Client IP address
 * @param action 'booking' (max 6/min) | 'callback' (max 4/min)
 */
export function checkRateLimit(
  ip: string,
  action: 'booking' | 'callback' = 'booking'
): { allowed: boolean; remaining: number; resetSeconds: number } {
  const now = Date.now();
  const windowMs = 60_000; // 1 minute window
  const limit = action === 'booking' ? 6 : 4;

  const key = `${action}:${ip || 'unknown'}`;
  const record = rateLimitStore.get(key) || { timestamps: [] };

  // Retain only requests within the last minute
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    const oldest = record.timestamps[0];
    const resetSeconds = Math.ceil((oldest + windowMs - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetSeconds: Math.max(1, resetSeconds),
    };
  }

  // Record this hit
  record.timestamps.push(now);
  rateLimitStore.set(key, record);

  return {
    allowed: true,
    remaining: limit - record.timestamps.length,
    resetSeconds: 60,
  };
}

/**
 * Extracts client IP securely from request headers
 */
export function extractClientIp(reqHeaders: Headers): string {
  const forwarded = reqHeaders.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = reqHeaders.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}
