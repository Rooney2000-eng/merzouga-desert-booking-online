import { highlights, processSteps } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

const quickFacts = [
  { label: "طريقة التأكيد", value: "واتساب مباشر", tone: "text-emerald-200 border-emerald-400/20 bg-emerald-400/10" },
  { label: "اللغة", value: "العربية / English / Français", tone: "text-amber-200 border-amber-300/20 bg-amber-300/10" },
  { label: "نوع الخدمة", value: "رحلات خاصة ومجموعات", tone: "text-orange-200 border-orange-400/20 bg-orange-400/10" },
  { label: "الموقع", value: "Merzouga • Morocco", tone: "text-fuchsia-200 border-fuchsia-400/20 bg-fuchsia-400/10" }
] as const;

export function HighlightsSection() {
  return (
    <section id="highlights" className="px-6 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="لماذا Sahra Joy"
            title="منصة حجز بسيطة، واضحة، ومصممة لتسهيل اتخاذ القرار"
            description="نركز على الوضوح والسرعة: عروض واضحة، خطوات سهلة، وتأكيد سريع عبر واتساب حتى لا يضيع وقت الزائر."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {highlights.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-amber-200">Quick facts</p>
                <h3 className="mt-2 text-2xl font-black text-white">معلومات سريعة</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                تنظيم سهل وواضح
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {quickFacts.map((slot) => (
                <div key={slot.label} className={`rounded-2xl border p-4 ${slot.tone}`}>
                  <p className="text-sm opacity-80">{slot.label}</p>
                  <p className="mt-2 text-lg font-black">{slot.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-200">Booking Journey</p>
            <h3 className="mt-2 text-2xl font-black text-white">كيف يتم الحجز؟</h3>
            <div className="mt-8 space-y-6">
              {processSteps.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 text-lg font-black text-slate-950">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white">{item.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
