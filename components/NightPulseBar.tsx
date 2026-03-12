import { motion } from "framer-motion";

import type { ClientProfile, EventsData, OpeningHours } from "@/lib/types";

interface NightPulseBarProps {
  clientProfile: ClientProfile;
  events: EventsData;
  openingHours: OpeningHours;
}

function getFacebookFollowers(clientProfile: ClientProfile) {
  const raw = clientProfile.social_media.facebook?.audience_snapshot?.likes_or_followers_text;

  if (!raw) {
    return "Live";
  }

  const digits = raw.replace(/[^\d]/g, "");

  return digits || raw;
}

export function NightPulseBar({
  clientProfile,
  events,
  openingHours
}: NightPulseBarProps) {
  const items = [
    {
      value: openingHours.observed_patterns.regular_event_start_times[0]?.start_time ?? "19:00",
      label: "Karaoke start",
      meta: "Każdy czwartek"
    },
    {
      value: "Pt / Sob",
      label: "Peak nights",
      meta: `${events.weekly_events.length} rytmów tygodnia`
    },
    {
      value: getFacebookFollowers(clientProfile),
      label: "Facebook pulse",
      meta: "Zweryfikowany kanał"
    },
    {
      value: "60B",
      label: "Aleja Legionów",
      meta: clientProfile.location.city
    }
  ];

  return (
    <section
      aria-label="Night pulse"
      className="border-y border-white/10 bg-black/55 py-7 backdrop-blur-xl"
    >
      <div className="section-shell grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <motion.article
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-5 py-5 text-center"
          >
            <p className="font-headline text-5xl uppercase leading-none tracking-[0.08em] text-accent">
              {item.value}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.34em] text-text">
              {item.label}
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted">
              {item.meta}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
