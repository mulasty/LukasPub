interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`js-reveal flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow ? <span className="label-chip">{eyebrow}</span> : null}
      <div className="space-y-3">
        <h2 className="font-headline text-5xl uppercase tracking-[0.08em] text-text sm:text-6xl">
          {title}
        </h2>
        <p className="text-base leading-7 text-muted sm:text-lg">{description}</p>
      </div>
    </div>
  );
}

