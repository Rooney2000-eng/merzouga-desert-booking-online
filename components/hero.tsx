import { siteStats, trustPillars } from "@/lib/data";
import { buildWhatsAppUrl, siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-12 lg:px-8 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute left-0 top-2/3 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-amber-100 backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
            Sahra Joy • Merzouga Desert Experiences
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-balance text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
              اكتشف <span className="text-amber-300">سحر مرزوكة</span> مع عروض جاهزة للحجز السريع عبر واتساب.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              رحلات جمال عند الغروب، خيم صحراوية مميزة، وجولات كواد بين الكثبان. اختر العرض المناسب لك،
              احسب السعر مباشرة، وأكمل التأكيد في ثوانٍ.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#booking"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-6 py-3 text-base font-black text-slate-950 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(251,191,36,0.25)]"
            >
              ابدأ الحجز الآن
            </a>
            <a
              href={buildWhatsAppUrl("السلام عليكم، أريد معرفة أفضل عرض في Sahra Joy بمرزوكة.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
            >
              تواصل عبر واتساب
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {siteStats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur"
              >
                <p className="text-2xl font-black text-white">{item.value}</p>
                <p className="mt-2 text-sm text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-amber-300/25 via-orange-500/10 to-transparent blur-2xl" />
          <div className="relative grid gap-5">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 shadow-[0_25px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <img
                src="/media/hero-dunes.svg"
                alt="مشهد بصري لصحراء مرزوكة"
                className="h-full min-h-[320px] w-full object-cover"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">تواصل سريع</p>
                <p className="mt-2 text-xl font-black text-white">{siteConfig.whatsappDisplay}</p>
                <p className="mt-3 text-sm text-slate-300">واتساب مباشر للحجز والاستفسار طوال الأسبوع.</p>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">تواصل البريد</p>
                <p className="mt-2 text-xl font-black text-white">{siteConfig.contactEmail}</p>
                <p className="mt-3 text-sm text-slate-300">للاستفسارات، الرحلات الخاصة، وتنسيق العروض.</p>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">ما الذي تحصل عليه؟</p>
                  <p className="text-xl font-black text-white">تجربة مريحة من أول رسالة</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                  {siteConfig.siteHost}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trustPillars.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
