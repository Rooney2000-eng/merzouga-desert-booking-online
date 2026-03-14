const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://sahrajoy.com";
const normalizedSiteUrl = rawSiteUrl.replace(/\/$/, "");

const rawWhatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "212691999897";
const normalizedWhatsappNumber = rawWhatsappNumber.replace(/[^\d]/g, "");

export const siteConfig = {
  brandAr: process.env.NEXT_PUBLIC_BRAND_AR?.trim() || "صحرا جوي | رحلات مرزوكة",
  brandEn: process.env.NEXT_PUBLIC_BRAND_EN?.trim() || "Sahra Joy",
  siteUrl: normalizedSiteUrl,
  siteHost: normalizedSiteUrl.replace(/^https?:\/\//, ""),
  whatsappNumber: normalizedWhatsappNumber,
  whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY?.trim() || "+212 691 999 897",
  whatsappDefaultMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE?.trim() ||
    "السلام عليكم، أريد معلومات حول عروض Sahra Joy في مرزوكة.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "Soufianechahid30@gmail.com",
  depositPaymentUrl: process.env.NEXT_PUBLIC_DEPOSIT_PAYMENT_URL?.trim() || ""
} as const;

export function buildWhatsAppUrl(message = siteConfig.whatsappDefaultMessage) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
}
