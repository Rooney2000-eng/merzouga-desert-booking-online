import { buildWhatsAppUrl, siteConfig } from "@/lib/site-config";

const navItems = [
  { label: "التجربة", href: "#experience" },
  { label: "العروض", href: "#services" },
  { label: "لماذا نحن", href: "#highlights" },
  { label: "الحجز", href: "#booking" },
  { label: "الآراء", href: "#testimonials" },
  { label: "الأسئلة", href: "#faq" }
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 via-orange-300 to-yellow-500 text-lg font-black text-slate-950 shadow-[0_0_30px_rgba(251,191,36,0.35)] transition-transform duration-300 group-hover:scale-105">
            S
          </div>
          <div>
            <p className="text-sm text-slate-400">{siteConfig.brandEn}</p>
            <p className="text-base font-bold text-white">{siteConfig.brandAr}</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-slate-300 transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={buildWhatsAppUrl("السلام عليكم، أريد الحجز مباشرة مع Sahra Joy.")}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20 sm:inline-flex"
          >
            واتساب مباشر
          </a>
          <a
            href="#booking"
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.18)]"
          >
            احجز الآن
          </a>
        </div>
      </div>
    </header>
  );
}
