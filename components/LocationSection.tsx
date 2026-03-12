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
      <div className="grid gap-8 xl:grid-cols-[0.88fr_1.12fr] xl:items-start">
        <div className="space-y-8">
          <SectionHeading
            eyebrow={content.subtitle}
            title="Tu wpada Łomża"
            description={content.description}
          />

          <div className="grid gap-4">
            {media.openingHoursImagePath ? (
              <article className="poster-panel js-reveal relative overflow-hidden p-0" data-parallax-y="18">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={media.openingHoursImagePath}
                    alt="Materiały i informacje klubowe"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="section-kicker">Night address</p>
                  <p className="mt-3 font-headline text-4xl uppercase tracking-[0.08em] text-text">
                    {clientProfile.location.street_address}
                  </p>
                </div>
              </article>
            ) : null}

            <article className="panel js-reveal" data-parallax-y="12">
              <p className="section-kicker">Adres</p>
              <p className="mt-3 text-xl leading-8 text-text">{clientProfile.location.full_address}</p>
            </article>

            <article className="panel js-reveal" data-parallax-y="24">
              <p className="section-kicker">Sprawdzone informacje</p>
              <ul className="mt-5 space-y-3">
                {Object.entries(openingHours.agent_notes.safe_display_copy).map(([day, value]) => (
                  <li key={day} className="flex items-start justify-between gap-4 border-b border-white/8 pb-3">
                    <span className="text-sm uppercase tracking-[0.24em] text-muted">{day}</span>
                    <span className="text-right text-base text-text">{value}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        <div className="poster-panel js-reveal overflow-hidden p-2" data-parallax-y="20">
          <div className="overflow-hidden rounded-[1.6rem] border border-white/10">
            <iframe
              title="Lokalizacja Lukas Pub Dance Club"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-[520px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
