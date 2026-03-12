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
      <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="O miejscu"
            title="Tu zaczyna się weekend"
            description={content.description}
          />

          <div className="poster-panel js-reveal space-y-6" data-parallax-y="20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">Dlaczego to działa</p>
                <p className="mt-3 font-headline text-4xl uppercase tracking-[0.08em] text-text sm:text-5xl">
                  Lokalny klub, nie wydmuszka
                </p>
              </div>
              <span className="ghost-button !cursor-default !py-2">Łomża real vibe</span>
            </div>
            <p className="text-lg leading-8 text-muted">
              {clientProfile.public_positioning.short_description}
            </p>
            <div className="marquee-row">
              {contentRules.brand_voice.tone.map((tone) => (
                <span key={tone} className="mini-chip">
                  {tone}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
            <article className="panel js-reveal" data-parallax-y="18">
              <p className="section-kicker">Za co wraca ekipa</p>
              <ul className="mt-6 grid gap-4">
                {content.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-lg text-text">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary shadow-pink" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="panel js-reveal flex flex-col justify-between" data-parallax-y="30">
              <div>
                <p className="section-kicker">Publika</p>
                <p className="poster-number mt-3">{clientProfile.target_audience_hypothesis.primary_age_range}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.22em] text-muted">
                  Główna grupa gości
                </p>
              </div>
              <div className="poster-divider my-6" />
              <div className="space-y-2">
                {clientProfile.target_audience_hypothesis.segments.slice(0, 3).map((segment) => (
                  <p key={segment} className="text-base text-muted">
                    {segment}
                  </p>
                ))}
              </div>
            </article>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="stat-card js-reveal" data-parallax-y="12">
              <p className="section-kicker">Czwartek</p>
              <p className="mt-3 font-headline text-5xl uppercase tracking-[0.08em] text-secondary">
                Karaoke
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted">Start od 19:00</p>
            </article>
            <article className="stat-card js-reveal" data-parallax-y="24">
              <p className="section-kicker">Piątek</p>
              <p className="mt-3 font-headline text-5xl uppercase tracking-[0.08em] text-primary">
                Rozruch
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted">Wejście w weekend</p>
            </article>
            <article className="stat-card js-reveal" data-parallax-y="16">
              <p className="section-kicker">Sobota</p>
              <p className="mt-3 font-headline text-5xl uppercase tracking-[0.08em] text-accent">
                Peak
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted">Pełny parkiet</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
