import { motion } from "framer-motion";
import Image from "next/image";

import type { EventsData, SiteContent } from "@/lib/types";

import { SectionHeading } from "@/components/SectionHeading";

const dayLabels: Record<string, string> = {
  monday: "Poniedziałek",
  tuesday: "Wtorek",
  wednesday: "Środa",
  thursday: "Czwartek",
  friday: "Piątek",
  saturday: "Sobota",
  sunday: "Niedziela"
};

const dayShortLabels: Record<string, string> = {
  monday: "Pon",
  tuesday: "Wt",
  wednesday: "Śr",
  thursday: "Czw",
  friday: "Pt",
  saturday: "Sob",
  sunday: "Nd"
};

const categoryLabels: Record<string, string> = {
  karaoke: "karaoke live",
  dance_party: "nocny parkiet"
};

const confidenceLabels: Record<string, string> = {
  high: "mocny pewniak",
  medium: "weekendowy rytm",
  low: "do potwierdzenia"
};

interface EventsSectionProps {
  content: SiteContent["events_section"];
  events: EventsData;
}

export function EventsSection({ content, events }: EventsSectionProps) {
  return (
    <section id="events" className="section-shell section-space">
      <div className="grid gap-8 xl:grid-cols-[0.86fr_1.14fr]">
        <div className="space-y-8">
          <SectionHeading
            eyebrow={content.subtitle}
            title="Tydzień ma tu własny beat"
            description={content.description}
          />

          <div className="poster-panel js-reveal overflow-hidden p-0" data-parallax-y="22">
            <div className="relative aspect-[4/5] sm:aspect-[4/3]">
              <Image
                src="/assets/images/weekend-party.jpg"
                alt="Weekendowa energia Lukas Pub"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 34vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,10,0.18),rgba(6,7,10,0.9))]" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="section-kicker">Weekend protocol</p>
              <p className="mt-3 font-headline text-5xl uppercase leading-none tracking-[0.08em] text-text sm:text-6xl">
                Najpierw głosy. Potem bas.
              </p>
              <p className="mt-3 max-w-md text-base leading-7 text-muted">
                Czwartek rozgrzewa karaoke, a piątek i sobota przejmują noc na pełnym parkiecie.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="marquee-row js-reveal">
            {events.event_features_observed.map((feature) => (
              <span key={feature} className="mini-chip">
                {feature}
              </span>
            ))}
          </div>

          <div className="grid gap-5">
            {events.weekly_events.map((event, index) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="event-ticket js-reveal grid gap-6 md:grid-cols-[0.24fr_0.76fr]"
                data-parallax-y={index % 2 === 0 ? "16" : "24"}
              >
                <div className="flex flex-col justify-between rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.34em] text-muted">
                      {dayLabels[event.day] ?? event.day}
                    </p>
                    <p className="mt-3 font-headline text-6xl uppercase leading-none tracking-[0.08em] text-primary">
                      {dayShortLabels[event.day] ?? event.day}
                    </p>
                  </div>
                  <p className="text-sm uppercase tracking-[0.24em] text-accent">
                    {event.start_time || "Wieczór"}
                  </p>
                </div>

                <div className="flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="mini-chip">
                        {categoryLabels[event.category] ?? event.category}
                      </span>
                      <span className="mini-chip">
                        {confidenceLabels[event.confidence] ?? event.confidence}
                      </span>
                    </div>
                    <h3 className="font-headline text-5xl uppercase leading-[0.92] tracking-[0.08em] text-text">
                      {event.name}
                    </h3>
                    <p className="max-w-2xl text-lg leading-8 text-muted">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <span className="ghost-button !cursor-default">Zbierz ekipę</span>
                    <a href="#reservation" className="outline-button !px-5 !py-3">
                      Rezerwuj stolik
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
