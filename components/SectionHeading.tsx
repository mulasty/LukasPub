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
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`js-reveal flex max-w-3xl flex-col gap-5 ${alignment}`}>
      {eyebrow ? <span className="label-chip">{eyebrow}</span> : null}
      <div className="space-y-4">
        <h2 className="font-headline text-6xl uppercase leading-[0.92] tracking-[0.08em] text-text sm:text-7xl lg:text-[5.6rem]">
          {title}
        </h2>
        <p className="max-w-2xl text-lg leading-7 text-muted sm:text-xl">
          {description}
        </p>
      </div>
    </div>
  );
}
