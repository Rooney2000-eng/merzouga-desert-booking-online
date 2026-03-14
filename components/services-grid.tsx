import { services } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

export function ServicesGrid() {
  return (
    <section id="services" className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="العروض"
          title="اختر العرض الذي يناسب رحلتك في مرزوكة"
          description="كل عرض مصمم ليكون واضحا وسهل المقارنة: نوع التجربة، المدة، السعر التقديري، وأبرز ما تحصل عليه."
        />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.id}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-2 hover:border-amber-300/30 hover:bg-white/10 hover:shadow-[0_30px_80px_rgba(15,23,42,0.4)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-500 opacity-80" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">{service.eyebrow}</p>
                  <h3 className="mt-3 text-2xl font-black text-white">{service.title}</h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-slate-100">
                  {service.badge}
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-300">{service.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-3 rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-4">
                <div>
                  <p className="text-xs text-slate-400">المدة</p>
                  <p className="mt-2 text-sm font-bold text-white">{service.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">السعر يبدأ من</p>
                  <p className="mt-2 text-sm font-bold text-white">
                    {service.price} <span className="text-slate-400">{service.unitLabel}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span key={feature} className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-slate-200">
                    {feature}
                  </span>
                ))}
              </div>

              <a
                href="#booking"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-amber-200 transition group-hover:translate-x-[-4px]"
              >
                احجز هذا العرض
                <span aria-hidden>←</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
