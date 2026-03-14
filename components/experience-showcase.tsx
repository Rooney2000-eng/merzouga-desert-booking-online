import { SectionHeading } from "@/components/section-heading";

const cards = [
  {
    title: "Camel Sunset",
    subtitle: "لحظات الغروب فوق الكثبان",
    image: "/media/camel-trek.svg",
    copy: "أجواء هادئة، صور جميلة، وخطوات الجمال على الرمال الذهبية."
  },
  {
    title: "Luxury Camp",
    subtitle: "ليلة صحراوية دافئة",
    image: "/media/luxury-camp.svg",
    copy: "خيمة مريحة، عشاء مغربي، وجلسة نار تحت النجوم."
  },
  {
    title: "Quad Adventure",
    subtitle: "مسار سريع وممتع",
    image: "/media/quad-adventure.svg",
    copy: "جولة مليئة بالحركة لعشاق المغامرة في مرزوكة."
  }
] as const;

export function ExperienceShowcase() {
  return (
    <section id="experience" className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="التجربة"
          title="أجواء مرزوكة من أول نظرة"
          description="مشاهد بصرية مستوحاة من سحر الصحراء تمنح الصفحة إحساسا دافئا وفاخرا يعكس تجربة الرحلة قبل أن تبدأ."
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            <img src="/media/hero-dunes.svg" alt="لوحة بصرية لمرزوكة" className="h-full w-full object-cover" />
          </article>

          <div className="grid gap-6">
            {cards.map((card) => (
              <article key={card.title} className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 md:grid-cols-[0.95fr_1.05fr]">
                <img src={card.image} alt={card.title} className="h-full min-h-[220px] w-full object-cover" />
                <div className="flex flex-col justify-center p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-amber-200">{card.title}</p>
                  <h3 className="mt-3 text-2xl font-black text-white">{card.subtitle}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{card.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
