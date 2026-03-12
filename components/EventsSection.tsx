import { motion } from "framer-motion";

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

const categoryLabels: Record<string, string> = {
  karaoke: "karaoke",
  dance_party: "impreza taneczna"
};

const confidenceLabels: Record<string, string> = {
  high: "potwierdzone",
  medium: "częściowo potwierdzone",
  low: "do potwierdzenia"
};

interface EventsSectionProps {
  content: SiteContent["events_section"];
  events: EventsData;
}

export function EventsSection({ content, events }: EventsSectionProps) {
  return (
    <section id="events" className="section-shell section-space">
      <div className="flex flex-col gap-10">
        <SectionHeading
          eyebrow={content.subtitle}
          title={content.title}
          description={content.description}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {events.weekly_events.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="panel panel-hover js-reveal"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="label-chip">{dayLabels[event.day] ?? event.day}</span>
                <span className="text-sm uppercase tracking-[0.16em] text-muted">
                  {event.start_time || "Wieczorem"}
                </span>
              </div>
              <div className="mt-8 space-y-4">
                <h3 className="font-headline text-4xl uppercase tracking-[0.08em] text-text">
                  {event.name}
                </h3>
                <p className="leading-7 text-muted">{event.description}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="mini-chip">{categoryLabels[event.category] ?? event.category}</span>
                <span className="mini-chip">
                  {confidenceLabels[event.confidence] ?? event.confidence}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
