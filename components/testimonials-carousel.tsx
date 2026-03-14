"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/lib/data";

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = testimonials[activeIndex];

  function goToNext() {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  }

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  }

  return (
    <section id="testimonials" className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="آراء الزوار"
          title="شهادات تضيف الثقة قبل الحجز"
          description="آراء مختصرة توضح كيف تبدو التجربة من وجهة نظر الزوار الذين اختاروا مرزوكة مع Sahra Joy."
          align="center"
        />

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="grid gap-4">
            {testimonials.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={`${item.name}-${item.trip}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-[1.5rem] border p-5 text-right transition ${
                    isActive
                      ? "border-amber-300/30 bg-amber-300/10"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black text-white">{item.name}</h3>
                      <p className="mt-1 text-sm text-slate-400">{item.country}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-slate-100">
                      {item.trip}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.3)] backdrop-blur">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeItem.name}-${activeItem.trip}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-amber-200">Guest review</p>
                    <h3 className="mt-2 text-3xl font-black text-white">{activeItem.name}</h3>
                    <p className="mt-1 text-slate-400">{activeItem.country}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xl text-amber-300">
                    {Array.from({ length: activeItem.rating }).map((_, index) => (
                      <span key={index}>★</span>
                    ))}
                  </div>
                </div>

                <blockquote className="text-2xl font-bold leading-10 text-slate-100">
                  “{activeItem.quote}”
                </blockquote>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200">
                    التجربة: {activeItem.trip}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={goToPrevious}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                      aria-label="السابق"
                    >
                      →
                    </button>
                    <button
                      type="button"
                      onClick={goToNext}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                      aria-label="التالي"
                    >
                      ←
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
