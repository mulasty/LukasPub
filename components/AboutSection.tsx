import type { ClientProfile, ContentGenerationRules, SiteContent } from "@/lib/types";

import { SectionHeading } from "@/components/SectionHeading";

interface AboutSectionProps {
  content: SiteContent["about_club"];
  clientProfile: ClientProfile;
  contentRules: ContentGenerationRules;
}

export function AboutSection({
  content,
  clientProfile,
  contentRules
}: AboutSectionProps) {
  return (
    <section id="about_club" className="section-shell section-space">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <SectionHeading
          eyebrow="O miejscu"
          title={content.title}
          description={content.description}
        />

        <div className="js-reveal grid gap-6">
          <div className="panel overflow-hidden">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.24em] text-muted">Za co goście lubią to miejsce</p>
                <ul className="grid gap-3 text-base text-text">
                  {content.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-secondary shadow-blue" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-muted">Klimat marki</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {contentRules.brand_voice.tone.map((tone) => (
                    <span key={tone} className="mini-chip">
                      {tone}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-muted">
                  {clientProfile.public_positioning.short_description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="stat-card">
              <p className="font-headline text-5xl tracking-[0.08em] text-primary">
                {clientProfile.target_audience_hypothesis.primary_age_range}
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted">Główna grupa gości</p>
            </article>
            <article className="stat-card">
              <p className="font-headline text-5xl tracking-[0.08em] text-secondary">Thu</p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted">Karaoke od 19:00</p>
            </article>
            <article className="stat-card">
              <p className="font-headline text-5xl tracking-[0.08em] text-accent">Fri-Sat</p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted">Weekendowy rytm imprez</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
