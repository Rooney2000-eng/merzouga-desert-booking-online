import { buildWhatsAppUrl, siteConfig } from "@/lib/site-config";

export function FloatingContact() {
  return (
    <a
      href={buildWhatsAppUrl("السلام عليكم، أريد الاستفسار السريع حول عروض Sahra Joy في مرزوكة.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-3 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-100 shadow-[0_20px_50px_rgba(16,185,129,0.18)] backdrop-blur transition hover:-translate-y-1 hover:bg-emerald-500/20"
      aria-label="تواصل سريع عبر واتساب"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-slate-950">✆</span>
      <span className="hidden sm:inline">واتساب سريع</span>
      <span className="sm:hidden">واتساب</span>
      <span className="hidden md:inline text-emerald-50/80">{siteConfig.whatsappDisplay}</span>
    </a>
  );
}
