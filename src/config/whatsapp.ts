// WhatsApp Configuration
// This is the central place for WhatsApp-related settings

export const WHATSAPP_CONFIG = {
  // Admin WhatsApp number (from Footer contact info)
  ADMIN_NUMBER: '923224768011', // Format: country code + number (no + or spaces)
  
  // Website domain for product links
  WEBSITE_URL: 'https://naeemelectric.store',
  
  // Business name
  BUSINESS_NAME: 'Naeem Electric',
};

/**
 * Generate WhatsApp Web URL with pre-filled message
 * @param phoneNumber - WhatsApp number (format: 923XXXXXXXXX)
 * @param message - Pre-filled message text
 * @returns WhatsApp Web URL
 */
export function generateWhatsAppUrl(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Open WhatsApp with a pre-filled message
 * @param message - Message to send
 */
export function openWhatsApp(message: string): void {
  const url = generateWhatsAppUrl(WHATSAPP_CONFIG.ADMIN_NUMBER, message);
  window.open(url, '_blank');
}
