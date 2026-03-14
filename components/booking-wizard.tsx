"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";

import { addOns, services } from "@/lib/data";
import type { AddOn, Service, ServiceId } from "@/lib/types";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-config";

interface BookingFormState {
  serviceId: ServiceId;
  date: string;
  people: number;
  nights: number;
  durationHours: number;
  addOnIds: string[];
  name: string;
  country: string;
  phone: string;
  email: string;
  notes: string;
}

const stepLabels = ["العرض", "التفاصيل", "الإضافات", "التواصل"] as const;

const initialState: BookingFormState = {
  serviceId: "camel",
  date: "",
  people: 2,
  nights: 1,
  durationHours: 1,
  addOnIds: [],
  name: "",
  country: "",
  phone: "",
  email: "",
  notes: ""
};

function calculateBasePrice(service: Service, state: BookingFormState) {
  switch (service.pricingModel) {
    case "perNight":
      return service.price * state.people * state.nights;
    case "perHour":
      return service.price * state.people * state.durationHours;
    case "perPerson":
    default:
      return service.price * state.people;
  }
}

function calculateAddonPrice(addOn: AddOn, state: BookingFormState) {
  if (addOn.pricing === "perPerson") {
    return addOn.price * state.people;
  }

  return addOn.price;
}

function getQuantityLabel(serviceId: ServiceId) {
  return serviceId === "quad" ? "عدد الكوادات" : "عدد الأشخاص";
}

export function BookingWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<BookingFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bookingReference, setBookingReference] = useState("");
  const [confirmationWhatsappUrl, setConfirmationWhatsappUrl] = useState("");
  const [emailFallback, setEmailFallback] = useState("");

  const selectedService = useMemo(
    () => services.find((service) => service.id === form.serviceId) ?? services[0],
    [form.serviceId]
  );

  const selectedAddOns = useMemo(
    () => addOns.filter((item) => form.addOnIds.includes(item.id)),
    [form.addOnIds]
  );

  const basePrice = useMemo(() => calculateBasePrice(selectedService, form), [selectedService, form]);

  const addOnPrice = useMemo(
    () => selectedAddOns.reduce((sum, item) => sum + calculateAddonPrice(item, form), 0),
    [selectedAddOns, form]
  );

  const totalPrice = basePrice + addOnPrice;

  const quantityLabel = getQuantityLabel(form.serviceId);

  const bookingSummary = useMemo(() => {
    if (selectedService.id === "camp") {
      return `${form.people} أشخاص × ${form.nights} ليلة`;
    }

    if (selectedService.id === "quad") {
      return `${form.people} كواد × ${form.durationHours} ساعة`;
    }

    return `${form.people} أشخاص`;
  }, [form.durationHours, form.nights, form.people, selectedService.id]);

  const stepIsValid = useMemo(() => {
    if (step === 1) {
      return Boolean(form.date) && form.people > 0 && form.nights > 0 && form.durationHours > 0;
    }

    if (step === 3) {
      return form.name.trim().length > 1 && form.phone.trim().length > 5;
    }

    return true;
  }, [form.date, form.durationHours, form.name, form.nights, form.people, form.phone, step]);

  function updateCounter(field: "people" | "nights" | "durationHours", delta: number, min = 1, max = 20) {
    setForm((current) => {
      const nextValue = Math.min(max, Math.max(min, current[field] + delta));
      return { ...current, [field]: nextValue };
    });
  }

  function toggleAddOn(id: string) {
    setForm((current) => {
      const exists = current.addOnIds.includes(id);
      return {
        ...current,
        addOnIds: exists ? current.addOnIds.filter((item) => item !== id) : [...current.addOnIds, id]
      };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setConfirmationWhatsappUrl("");
    setEmailFallback("");

    if (!stepIsValid) {
      setErrorMessage("يرجى إكمال الحقول المطلوبة قبل إرسال الطلب.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          serviceTitle: selectedService.title,
          estimate: totalPrice
        })
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        bookingReference?: string;
        whatsappUrl?: string | null;
      };

      if (!response.ok || !data.ok) {
        throw new Error(data.message ?? "تعذر إرسال الطلب حاليا.");
      }

      setSuccessMessage(data.message ?? "تم إرسال طلب الحجز بنجاح.");
      setBookingReference(data.bookingReference ?? "");
      setConfirmationWhatsappUrl(data.whatsappUrl ?? "");
      setEmailFallback(siteConfig.contactEmail ? `mailto:${siteConfig.contactEmail}` : "");
      setForm(initialState);
      setStep(0);
    } catch (error) {
      setConfirmationWhatsappUrl("");
      setEmailFallback("");
      setErrorMessage(error instanceof Error ? error.message : "حدث خطأ غير متوقع.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="booking" className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="الحجز التفاعلي"
          title="اختر العرض، أرسل التفاصيل، ثم أكمل التأكيد عبر واتساب"
          description="هذا النموذج يعطي الزائر سعرا تقديريا فوريا ويجهز رسالة تأكيد سريعة على واتساب بعد الإرسال."
        />

        <div className="rounded-[1.5rem] border border-emerald-400/15 bg-emerald-500/10 px-5 py-4 text-sm leading-7 text-emerald-100">
          حاليا لا يوجد دفع داخل الموقع. بعد إرسال الطلب سيظهر لك زر واتساب جاهز لتأكيد الحجز مباشرة.
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.3)] backdrop-blur xl:p-8">
            <div className="mb-8 flex flex-wrap gap-3">
              {stepLabels.map((label, index) => {
                const isActive = index === step;
                const isDone = index < step;

                return (
                  <div
                    key={label}
                    className={`flex items-center gap-3 rounded-full border px-4 py-2 text-sm transition ${
                      isActive
                        ? "border-amber-300/30 bg-amber-300/10 text-amber-100"
                        : isDone
                          ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
                          : "border-white/10 bg-white/5 text-slate-400"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
                        isActive
                          ? "bg-amber-300 text-slate-950"
                          : isDone
                            ? "bg-emerald-400 text-slate-950"
                            : "bg-white/10 text-slate-200"
                      }`}
                    >
                      {index + 1}
                    </span>
                    {label}
                  </div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.28 }}
                className="space-y-6"
              >
                {step === 0 && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm text-slate-400">اختر العرض الأساسي الذي تريده في رحلتك.</p>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-2">
                      {services.map((service) => {
                        const selected = service.id === form.serviceId;
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => setForm((current) => ({ ...current, serviceId: service.id }))}
                            className={`rounded-[1.5rem] border p-5 text-right transition ${
                              selected
                                ? "border-amber-300/30 bg-amber-300/10 shadow-[0_20px_60px_rgba(251,191,36,0.12)]"
                                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-xs uppercase tracking-[0.22em] text-amber-200">{service.eyebrow}</p>
                                <h3 className="mt-3 text-xl font-black text-white">{service.title}</h3>
                              </div>
                              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-slate-100">
                                {service.badge}
                              </span>
                            </div>
                            <p className="mt-4 text-sm leading-7 text-slate-300">{service.description}</p>
                            <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm">
                              <span className="text-slate-400">{service.duration}</span>
                              <span className="font-black text-white">
                                {service.price} <span className="text-slate-400">{service.unitLabel}</span>
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="space-y-3">
                        <span className="text-sm font-semibold text-slate-200">تاريخ الرحلة</span>
                        <input
                          type="date"
                          value={form.date}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => setForm((current) => ({ ...current, date: event.target.value }))}
                          className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none transition focus:border-amber-300/40"
                        />
                      </label>

                      <div className="space-y-3">
                        <span className="text-sm font-semibold text-slate-200">{quantityLabel}</span>
                        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
                          <button
                            type="button"
                            onClick={() => updateCounter("people", -1, 1, 12)}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                          >
                            −
                          </button>
                          <span className="text-lg font-black text-white">{form.people}</span>
                          <button
                            type="button"
                            onClick={() => updateCounter("people", 1, 1, 12)}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {(form.serviceId === "camp" || form.serviceId === "quad") && (
                      <div className="grid gap-5 md:grid-cols-2">
                        {form.serviceId === "camp" && (
                          <div className="space-y-3">
                            <span className="text-sm font-semibold text-slate-200">عدد الليالي</span>
                            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
                              <button
                                type="button"
                                onClick={() => updateCounter("nights", -1, 1, 7)}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                              >
                                −
                              </button>
                              <span className="text-lg font-black text-white">{form.nights}</span>
                              <button
                                type="button"
                                onClick={() => updateCounter("nights", 1, 1, 7)}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}

                        {form.serviceId === "quad" && (
                          <div className="space-y-3">
                            <span className="text-sm font-semibold text-slate-200">مدة الجولة بالساعات</span>
                            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
                              <button
                                type="button"
                                onClick={() => updateCounter("durationHours", -1, 1, 5)}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                              >
                                −
                              </button>
                              <span className="text-lg font-black text-white">{form.durationHours}</span>
                              <button
                                type="button"
                                onClick={() => updateCounter("durationHours", 1, 1, 5)}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <p className="text-sm text-slate-400">ملخص العرض الحالي</p>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-black text-white">{selectedService.title}</h3>
                          <p className="mt-2 text-sm text-slate-300">{selectedService.description}</p>
                        </div>
                        <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-sm font-bold text-amber-100">
                          {selectedService.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-slate-400">أضف خدمات إضافية تجعل الرحلة أكثر راحة أو تميزا.</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {addOns.map((item) => {
                        const active = form.addOnIds.includes(item.id);
                        const itemPrice = calculateAddonPrice(item, form);

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleAddOn(item.id)}
                            className={`rounded-[1.5rem] border p-5 text-right transition ${
                              active
                                ? "border-amber-300/30 bg-amber-300/10"
                                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="text-lg font-black text-white">{item.title}</h3>
                                <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                              </div>
                              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-slate-100">
                                {item.pricing === "perPerson" ? "لكل شخص" : "للمجموعة"}
                              </span>
                            </div>
                            <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                              <span className="text-sm text-slate-400">قيمة الإضافة الحالية</span>
                              <span className="text-sm font-black text-white">{itemPrice} درهم</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="space-y-3">
                      <span className="text-sm font-semibold text-slate-200">الاسم الكامل</span>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setForm((current) => ({ ...current, name: event.target.value }))}
                        placeholder="اكتب الاسم الكامل"
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/40"
                      />
                    </label>

                    <label className="space-y-3">
                      <span className="text-sm font-semibold text-slate-200">الدولة</span>
                      <input
                        type="text"
                        value={form.country}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setForm((current) => ({ ...current, country: event.target.value }))}
                        placeholder="مثال: Morocco / France / Spain"
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/40"
                      />
                    </label>

                    <label className="space-y-3">
                      <span className="text-sm font-semibold text-slate-200">الهاتف أو واتساب</span>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setForm((current) => ({ ...current, phone: event.target.value }))}
                        placeholder="+212..."
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/40"
                      />
                    </label>

                    <label className="space-y-3">
                      <span className="text-sm font-semibold text-slate-200">البريد الإلكتروني</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setForm((current) => ({ ...current, email: event.target.value }))}
                        placeholder="name@email.com"
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/40"
                      />
                    </label>

                    <label className="space-y-3 md:col-span-2">
                      <span className="text-sm font-semibold text-slate-200">ملاحظات إضافية</span>
                      <textarea
                        value={form.notes}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setForm((current) => ({ ...current, notes: event.target.value }))}
                        rows={5}
                        placeholder="مثال: نريد خيمة خاصة، أو نحتاج نقل، أو نفضل وقت غروب محدد..."
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/40"
                      />
                    </label>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {(errorMessage || successMessage) && (
              <div
                className={`mt-6 rounded-2xl border px-4 py-4 text-sm ${
                  errorMessage
                    ? "border-rose-400/25 bg-rose-400/10 text-rose-100"
                    : "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
                }`}
              >
                <p>
                  {errorMessage || successMessage}
                  {bookingReference ? <span className="mr-2 font-black">#{bookingReference}</span> : null}
                </p>

                {!errorMessage && (confirmationWhatsappUrl || emailFallback) ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {confirmationWhatsappUrl ? (
                      <a
                        href={confirmationWhatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-white px-4 py-2 text-xs font-black text-slate-950 transition hover:-translate-y-0.5"
                      >
                        أكّد الطلب عبر واتساب
                      </a>
                    ) : null}

                    {emailFallback ? (
                      <a
                        href={emailFallback}
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black text-white transition hover:bg-white/15"
                      >
                        تواصل بالبريد
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={() => setStep((current) => Math.max(0, current - 1))}
                disabled={step === 0}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                السابق
              </button>

              <div className="flex flex-wrap gap-3">
                {step < stepLabels.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((current) => Math.min(stepLabels.length - 1, current + 1))}
                    disabled={!stepIsValid}
                    className="rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    التالي
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !stepIsValid}
                    className="rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "جاري الإرسال..." : "إرسال طلب الحجز"}
                  </button>
                )}
              </div>
            </div>
          </form>

          <aside className="xl:sticky xl:top-28 xl:self-start">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-[0_30px_100px_rgba(0,0,0,0.38)] backdrop-blur">
              <div className="border-b border-white/10 p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-amber-200">Live Price Estimate</p>
                <h3 className="mt-2 text-2xl font-black text-white">ملخص الحجز المباشر</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  السعر يتحدث مباشرة حسب اختياراتك ليسهّل عليك فهم العرض قبل التواصل.
                </p>
              </div>

              <div className="space-y-5 p-6">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">العرض المختار</p>
                  <h4 className="mt-2 text-xl font-black text-white">{selectedService.title}</h4>
                  <p className="mt-2 text-sm text-slate-300">{bookingSummary}</p>
                  <p className="mt-3 text-xs text-slate-500">{form.date ? `التاريخ: ${form.date}` : "اختر تاريخا لتظهر التفاصيل كاملة"}</p>
                </div>

                <div className="space-y-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-400">قيمة العرض</span>
                    <span className="font-bold text-white">{basePrice} درهم</span>
                  </div>
                  <div className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-slate-400">الإضافات</span>
                    <div className="text-left">
                      <p className="font-bold text-white">{addOnPrice} درهم</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {selectedAddOns.length > 0 ? selectedAddOns.map((item) => item.title).join("، ") : "بدون إضافات حاليا"}
                      </p>
                    </div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex items-center justify-between gap-4 text-base">
                    <span className="font-bold text-slate-200">الإجمالي التقديري</span>
                    <span className="text-2xl font-black text-amber-200">{totalPrice} درهم</span>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-amber-300/10 via-orange-400/10 to-transparent p-5">
                  <h4 className="text-lg font-black text-white">بعد الإرسال ماذا يحدث؟</h4>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                    <li>• يظهر لك زر واتساب برسالة جاهزة.</li>
                    <li>• يتم إرسال تفاصيل العرض المختار تلقائيا داخل الرسالة.</li>
                    <li>• تتفق مباشرة على الوقت النهائي ومكان الانطلاق.</li>
                    <li>• البريد الإلكتروني يبقى متاحا كوسيلة تواصل إضافية.</li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
