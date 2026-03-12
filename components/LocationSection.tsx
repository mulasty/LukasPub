import Image from "next/image";

import type { ClientProfile, OpeningHours, ResolvedMedia, SiteContent } from "@/lib/types";

import { SectionHeading } from "@/components/SectionHeading";

interface LocationSectionProps {
  content: SiteContent["location_section"];
  clientProfile: ClientProfile;
  openingHours: OpeningHours;
  media: ResolvedMedia;
}

export function LocationSection({
  content,
  clientProfile,
  openingHours,
  media
}: LocationSectionProps) {
  const mapQuery = encodeURIComponent(clientProfile.location.full_address);

  return (
    <section id="location" className="section-shell section-space">
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="space-y-8">
          <SectionHeading
            eyebrow={content.subtitle}
            title={content.title}
            description={content.description}
          />

          <div className="grid gap-4">
            {media.openingHoursImagePath ? (
              <article className="panel js-reveal overflow-hidden p-0">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={media.openingHoursImagePath}
                    alt="Materiały i informacje klubowe"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
              </article>
            ) : null}
            <article className="panel js-reveal">
              <p className="text-sm uppercase tracking-[0.22em] text-muted">Adres</p>
              <p className="mt-3 text-lg leading-8 text-text">{clientProfile.location.full_address}</p>
            </article>
            <article className="panel js-reveal">
              <p className="text-sm uppercase tracking-[0.22em] text-muted">Sprawdzone informacje</p>
              <ul className="mt-3 space-y-2 text-base text-text">
                {Object.entries(openingHours.agent_notes.safe_display_copy).map(([day, value]) => (
                  <li key={day} className="flex items-start justify-between gap-4 border-b border-white/8 pb-2">
                    <span className="uppercase tracking-[0.18em] text-muted">{day}</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        <div className="js-reveal overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 p-2 shadow-panel">
          <div className="overflow-hidden rounded-[1.5rem]">
            <iframe
              title="Lokalizacja Lukas Pub Dance Club"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
