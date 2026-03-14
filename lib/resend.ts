import type { BookingRecord } from "@/lib/booking";
import { siteConfig } from "@/lib/site-config";

const resendApiKey = process.env.RESEND_API_KEY?.trim() || "";
const notifyEmail = process.env.BOOKINGS_NOTIFY_EMAIL?.trim() || "";
const fromEmail = process.env.BOOKINGS_FROM_EMAIL?.trim() || "";

function currency(value: number) {
  return new Intl.NumberFormat("ar-MA").format(value);
}

function buildHtml(record: BookingRecord) {
  return `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; line-height: 1.8; color: #0f172a">
      <h2 style="margin: 0 0 16px; color: #92400e;">طلب حجز جديد من الموقع</h2>
      <p><strong>مرجع الحجز:</strong> ${record.bookingReference}</p>
      <p><strong>الخدمة:</strong> ${record.serviceTitle}</p>
      <p><strong>التاريخ:</strong> ${record.travelDate}</p>
      <p><strong>عدد الأشخاص / الكوادات:</strong> ${record.people}</p>
      <p><strong>عدد الليالي:</strong> ${record.nights}</p>
      <p><strong>عدد الساعات:</strong> ${record.durationHours}</p>
      <p><strong>الإضافات:</strong> ${record.addOnIds.length > 0 ? record.addOnIds.join("، ") : "بدون إضافات"}</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      <p><strong>الاسم:</strong> ${record.customerName}</p>
      <p><strong>الدولة:</strong> ${record.customerCountry ?? "غير محددة"}</p>
      <p><strong>الهاتف:</strong> ${record.customerPhone}</p>
      <p><strong>البريد:</strong> ${record.customerEmail ?? "غير متوفر"}</p>
      <p><strong>السعر التقديري:</strong> ${currency(record.estimate)} درهم</p>
      <p><strong>الملاحظات:</strong> ${record.notes ?? "لا توجد"}</p>
      <p style="margin-top: 20px; color: #475569;">تم إرسال هذا الإشعار من ${siteConfig.brandEn}.</p>
    </div>
  `;
}

export function hasEmailConfig() {
  return Boolean(resendApiKey && notifyEmail && fromEmail);
}

export async function sendBookingNotificationEmail(record: BookingRecord) {
  if (!hasEmailConfig()) {
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notifyEmail],
      subject: `طلب حجز جديد ${record.bookingReference} - ${record.serviceTitle}`,
      html: buildHtml(record),
      reply_to: record.customerEmail ?? undefined
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend error: ${details}`);
  }
}
