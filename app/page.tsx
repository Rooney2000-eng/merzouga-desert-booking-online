import { BookingWizard } from "@/components/booking-wizard";
import { ExperienceShowcase } from "@/components/experience-showcase";
import { FaqAccordion } from "@/components/faq-accordion";
import { FloatingContact } from "@/components/floating-contact";
import { Hero } from "@/components/hero";
import { HighlightsSection } from "@/components/highlights-section";
import { ServicesGrid } from "@/components/services-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { buildWhatsAppUrl, siteConfig } from "@/lib/site-config";

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.brandEn,
    url: siteConfig.siteUrl,
    email: siteConfig.contactEmail || undefined,
    telephone: siteConfig.whatsappNumber ? `+${siteConfig.whatsappNumber}` : undefined,
    areaServed: "Merzouga, Morocco",
    makesOffer: [
      {
        "@type": "Offer",
        name: "Camel Sunset Tour"
      },
      {
        "@type": "Offer",
        name: "Desert Camp"
      },
      {
        "@type": "Offer",
        name: "Quad Tour"
      },
      {
        "@type": "Offer",
        name: "Sahra Joy Full Package"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />
      <main className="relative overflow-x-hidden">
        <Hero />
        <ExperienceShowcase />
        <ServicesGrid />
        <HighlightsSection />
        <BookingWizard />
        <TestimonialsCarousel />
        <FaqAccordion />

        <section className="px-6 pb-20 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 via-orange-400/10 to-transparent p-8 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-amber-200">Sahra Joy</p>
                <h2 className="mt-3 text-balance text-3xl font-black text-white sm:text-4xl">
                  جاهز لرحلتك القادمة في مرزوكة؟
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                  اختر العرض الذي يناسبك، أرسل طلبك خلال ثوانٍ، ثم أكمل التأكيد عبر واتساب لنرتب لك
                  تجربة صحراوية جميلة وسهلة من أول تواصل.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-black text-slate-950 transition hover:-translate-y-0.5"
                >
                  جرّب الحجز الآن
                </a>
                <a
                  href={buildWhatsAppUrl("السلام عليكم، أريد الحجز أو الاستفسار حول عروض Sahra Joy.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-base font-bold text-white transition hover:bg-white/10"
                >
                  تواصل عبر واتساب
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingContact />
    </>
  );
}
