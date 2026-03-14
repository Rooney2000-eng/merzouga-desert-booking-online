import type { ServiceId } from "@/lib/types";

export interface BookingPayload {
  serviceId?: ServiceId | string;
  serviceTitle?: string;
  date?: string;
  people?: number;
  nights?: number;
  durationHours?: number;
  addOnIds?: string[];
  name?: string;
  country?: string;
  phone?: string;
  email?: string;
  notes?: string;
  estimate?: number;
}

export interface BookingRecord {
  bookingReference: string;
  serviceId: string;
  serviceTitle: string;
  travelDate: string;
  people: number;
  nights: number;
  durationHours: number;
  addOnIds: string[];
  customerName: string;
  customerCountry: string | null;
  customerPhone: string;
  customerEmail: string | null;
  notes: string | null;
  estimate: number;
  status: "pending";
  source: "website";
}

function cleanText(value?: string | null) {
  const result = value?.trim();
  return result ? result : "";
}

function cleanOptionalText(value?: string | null) {
  const result = value?.trim();
  return result ? result : null;
}

function normalizeInteger(value: unknown, fallback = 0, min = 0, max = 999) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, Math.round(parsed)));
}

export function buildBookingReference() {
  const timePart = Date.now().toString().slice(-6);
  const randomPart = crypto.randomUUID().replace(/-/g, "").slice(0, 4).toUpperCase();
  return `MZK-${timePart}-${randomPart}`;
}

export function normalizeBookingPayload(payload: BookingPayload, bookingReference: string): BookingRecord {
  return {
    bookingReference,
    serviceId: cleanText(payload.serviceId as string),
    serviceTitle: cleanText(payload.serviceTitle),
    travelDate: cleanText(payload.date),
    people: normalizeInteger(payload.people, 0, 0, 20),
    nights: normalizeInteger(payload.nights, 1, 1, 14),
    durationHours: normalizeInteger(payload.durationHours, 1, 1, 12),
    addOnIds: Array.isArray(payload.addOnIds)
      ? payload.addOnIds.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
      : [],
    customerName: cleanText(payload.name),
    customerCountry: cleanOptionalText(payload.country),
    customerPhone: cleanText(payload.phone),
    customerEmail: cleanOptionalText(payload.email),
    notes: cleanOptionalText(payload.notes),
    estimate: normalizeInteger(payload.estimate, 0, 0, 1_000_000),
    status: "pending",
    source: "website"
  };
}

export function validateBooking(record: BookingRecord) {
  if (!record.serviceId || !record.serviceTitle || !record.travelDate) {
    return "الرجاء اختيار الخدمة والتاريخ قبل إرسال الطلب.";
  }

  if (record.people < 1) {
    return "عدد الأشخاص أو الكوادات يجب أن يكون أكبر من صفر.";
  }

  if (record.customerName.length < 2) {
    return "الاسم الكامل مطلوب.";
  }

  if (record.customerPhone.length < 6) {
    return "رقم الهاتف أو الواتساب غير صالح.";
  }

  return null;
}
