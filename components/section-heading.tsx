interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: "start" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start"
}: SectionHeadingProps) {
  const alignmentClass = align === "center" ? "text-center items-center" : "text-right items-start";

  return (
    <div className={`mx-auto flex max-w-3xl flex-col gap-4 ${alignmentClass}`}>
      <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold tracking-[0.28em] text-amber-200 uppercase backdrop-blur">
        {eyebrow}
      </span>
      <h2 className="text-balance text-3xl font-black text-white sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
    </div>
  );
}
