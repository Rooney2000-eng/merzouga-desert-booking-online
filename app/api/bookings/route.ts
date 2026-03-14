import { NextResponse } from "next/server";

import { buildBookingReference, normalizeBookingPayload, type BookingPayload, validateBooking } from "@/lib/booking";
import { sendBookingNotificationEmail, hasEmailConfig } from "@/lib/resend";
import { buildWhatsAppUrl } from "@/lib/site-config";
import { createSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingPayload;
    const bookingReference = buildBookingReference();
    const record = normalizeBookingPayload(body, bookingReference);
    const validationError = validateBooking(record);

    if (validationError) {
      return NextResponse.json(
        {
          ok: false,
          message: validationError
        },
        { status: 400 }
      );
    }

    let persisted = false;
    let emailed = false;
    const issues: string[] = [];

    if (hasSupabaseAdminConfig()) {
      try {
        const supabase = createSupabaseAdminClient();

        const { error } = await supabase.from("bookings").insert({
          booking_reference: record.bookingReference,
          service_id: record.serviceId,
          service_title: record.serviceTitle,
          travel_date: record.travelDate,
          people: record.people,
          nights: record.nights,
          duration_hours: record.durationHours,
          add_on_ids: record.addOnIds,
          customer_name: record.customerName,
          customer_country: record.customerCountry,
          customer_phone: record.customerPhone,
          customer_email: record.customerEmail,
          notes: record.notes,
          estimate: record.estimate,
          status: record.status,
          source: record.source
        });

        if (error) {
          throw error;
        }

        persisted = true;
      } catch (error) {
        console.error("Supabase insert failed", error);
        issues.push("database");
      }
    }

    if (hasEmailConfig()) {
      try {
        await sendBookingNotificationEmail(record);
        emailed = true;
      } catch (error) {
        console.error("Booking email failed", error);
        issues.push("email");
      }
    }

    const whatsappMessageLines = [
      "السلام عليكم، أريد تأكيد هذا الطلب من موقع Sahra Joy.",
      `المرجع: ${record.bookingReference}`,
      `الخدمة: ${record.serviceTitle}`,
      `التاريخ: ${record.travelDate}`,
      `العدد: ${record.people}`,
      record.nights > 1 || record.serviceId === "camp" ? `الليالي: ${record.nights}` : "",
      record.durationHours > 1 || record.serviceId === "quad" ? `المدة بالساعات: ${record.durationHours}` : "",
      record.addOnIds.length > 0 ? `الإضافات: ${record.addOnIds.join(", ")}` : "",
      `الاسم: ${record.customerName}`,
      `الهاتف: ${record.customerPhone}`,
      record.customerEmail ? `البريد: ${record.customerEmail}` : "",
      record.customerCountry ? `الدولة: ${record.customerCountry}` : "",
      record.notes ? `ملاحظات: ${record.notes}` : "",
      `السعر التقديري: ${record.estimate} درهم`
    ].filter(Boolean);

    const whatsappUrl = buildWhatsAppUrl(whatsappMessageLines.join("\n"));

    if (!persisted && !emailed) {
      console.info("Booking received without external integrations. WhatsApp confirmation will be used.", record);
      issues.push("manual-confirmation");
    }

    const statusNote =
      issues.length > 0
        ? " أكمل التأكيد عبر واتساب ليصلك الرد بسرعة."
        : " سيتم التواصل معك أيضا عبر القنوات المفعلة على الموقع.";

    return NextResponse.json(
      {
        ok: true,
        bookingReference: record.bookingReference,
        whatsappUrl,
        message: `تم تجهيز طلب ${record.serviceTitle} بنجاح. السعر التقديري الحالي هو ${record.estimate} درهم.${statusNote}`
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking route error", error);

    return NextResponse.json(
      {
        ok: false,
        message: "تعذر معالجة الطلب حاليا. حاول مرة أخرى بعد قليل."
      },
      { status: 500 }
    );
  }
}
