"use client";

import { useState } from "react";

import { SectionHeading } from "@/components/section-heading";
import { faqs } from "@/lib/data";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        <SectionHeading
          eyebrow="FAQ"
          title="أسئلة شائعة قبل الحجز"
          description="أهم الأسئلة التي تساعد الزائر على فهم طريقة الحجز وطبيعة العروض داخل Sahra Joy."
          align="center"
        />

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article key={item.question} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 backdrop-blur">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right"
                >
                  <span className="text-lg font-black text-white">{item.question}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-slate-300">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-8 text-slate-300">{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
