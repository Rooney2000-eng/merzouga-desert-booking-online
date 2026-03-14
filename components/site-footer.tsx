import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-amber-200">{siteConfig.brandEn}</p>
          <h2 className="mt-3 text-3xl font-black text-white">{siteConfig.brandAr}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            عروض سياحية في مرزوكة مع حجز سريع، تجربة واضحة، وتأكيد مباشر عبر واتساب.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">
              WhatsApp: {siteConfig.whatsappDisplay}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">
              Email: {siteConfig.contactEmail}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">
              {siteConfig.siteHost}
            </span>
          </div>
        </div>

        <div className="text-sm text-slate-500 lg:text-left">
          <p>© 2026 {siteConfig.brandEn}</p>
          <p className="mt-2">Merzouga Desert • Camel Tours • Desert Camp • Quad Adventures</p>
        </div>
      </div>
    </footer>
  );
}
