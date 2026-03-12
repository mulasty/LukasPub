import { motion } from "framer-motion";
import Image from "next/image";

import type { ClientProfile, EventsData, ResolvedMedia, SiteContent } from "@/lib/types";

interface HeroSectionProps {
  siteContent: SiteContent["hero"];
  clientProfile: ClientProfile;
  events: EventsData;
  media: ResolvedMedia;
}

const dayShortLabels: Record<string, string> = {
  monday: "Pon",
  tuesday: "Wt",
  wednesday: "Śr",
  thursday: "Czw",
  friday: "Pt",
  saturday: "Sob",
  sunday: "Nd"
};

export function HeroSection({ siteContent, clientProfile, events, media }: HeroSectionProps) {
  const titleParts = clientProfile.brand_name_preferred.split(" ");
  const leadTitle = titleParts.slice(0, 2).join(" ");
  const subTitle = titleParts.slice(2).join(" ") || "Dance Club";
  const highlightEvents = events.weekly_events.slice(0, 3);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-end overflow-hidden pt-28 sm:items-center"
    >
      <div data-parallax-y="72" className="absolute inset-0 scale-[1.08]">
        {media.heroVideoPath ? (
          <video
            className="h-full w-full object-cover opacity-35 saturate-[1.05]"
            autoPlay
            muted
            loop
            playsInline
            poster={media.placeholderImagePath}
          >
            <source src={media.heroVideoPath} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={media.heroImagePath}
            alt="Lukas Pub Dance Club"
            fill
            priority
            className="object-cover opacity-40 saturate-[1.05]"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(4,5,7,0.3),rgba(4,5,7,0.86)_42%,rgba(4,5,7,0.92)),radial-gradient(circle_at_top_left,rgba(255,90,42,0.24),transparent_26%),radial-gradient(circle_at_80%_24%,rgba(0,209,255,0.18),transparent_22%)]" />
        <div
          data-parallax-y="28"
          className="absolute inset-0 bg-hero-grid bg-[size:68px_68px] opacity-[0.08]"
        />
      </div>

      <div
        data-parallax-y="42"
        data-parallax-x="-26"
        className="pointer-events-none absolute left-[5%] top-[16%] hidden h-[28rem] w-[28rem] rounded-full border border-primary/15 bg-primary/10 blur-3xl lg:block"
      />
      <div
        data-parallax-y="26"
        data-parallax-x="18"
        className="pointer-events-none absolute right-[8%] top-[20%] hidden h-60 w-60 rounded-full border border-secondary/15 bg-secondary/10 blur-3xl lg:block"
      />

      <div className="section-shell relative z-10 grid gap-12 pb-16 pt-20 xl:grid-cols-[1.1fr_0.9fr] xl:items-end xl:pb-24">
        <div className="space-y-10">
          <div data-parallax-y="18" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="label-chip">{siteContent.subtitle}</span>
              <span className="ghost-button !cursor-default !py-2">{clientProfile.location.city}</span>
            </motion.div>

            <div className="space-y-5">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="max-w-xl text-sm uppercase tracking-[0.38em] text-muted"
              >
                Głośniej. Bliżej. Do rana.
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1 }}
                className="font-headline text-[5rem] uppercase leading-[0.86] tracking-[0.05em] text-text sm:text-[7rem] lg:text-[8.6rem] xl:text-[9.4rem]"
              >
                <span className="block">{leadTitle}</span>
                <span className="block text-primary">{subTitle}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.16 }}
                className="max-w-2xl text-xl leading-8 text-muted sm:text-2xl"
              >
                Tu zaczyna się noc w Łomży. Karaoke, parkiet, mocny bar i miejsce,
                do którego wpada się po klimat, ekipę i weekend, który naprawdę żyje.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <a href="#reservation" className="glow-button">
                {siteContent.primary_cta}
              </a>
              <a href="#events" className="outline-button">
                {siteContent.secondary_cta}
              </a>
            </motion.div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="poster-panel js-reveal" data-parallax-y="28">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-kicker">Nocny rytm</p>
                  <p className="mt-3 font-headline text-4xl uppercase tracking-[0.08em] text-text sm:text-5xl">
                    Czwartki, piątki, soboty
                  </p>
                </div>
                <span className="ghost-button !cursor-default !py-2">Łomża live</span>
              </div>
              <div className="poster-divider my-6" />
              <div className="grid gap-4 sm:grid-cols-3">
                {highlightEvents.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.32em] text-muted">
                      {dayShortLabels[event.day] ?? event.day}
                    </p>
                    <p className="mt-3 font-headline text-3xl uppercase tracking-[0.08em] text-text">
                      {event.start_time || "Wieczór"}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted">{event.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="stat-card js-reveal" data-parallax-y="16">
                <p className="section-kicker">Publika</p>
                <p className="poster-number mt-3">{clientProfile.target_audience_hypothesis.primary_age_range}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-muted">
                  Główna energia parkietu
                </p>
              </div>
              <div className="stat-card js-reveal" data-parallax-y="24">
                <p className="section-kicker">Adres nocy</p>
                <p className="mt-3 text-lg leading-7 text-text">
                  {clientProfile.location.street_address}
                </p>
                <p className="mt-1 text-sm uppercase tracking-[0.24em] text-muted">
                  {clientProfile.location.city}
                </p>
              </div>
            </div>
          </div>

          <div className="marquee-row js-reveal">
            {clientProfile.public_positioning.main_customer_promises_observed.map((item) => (
              <span key={item} className="mini-chip">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-[32rem] xl:min-h-[42rem]">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.22 }}
            data-parallax-y="30"
            className="absolute inset-x-0 top-0 poster-panel overflow-hidden p-0"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={media.heroImagePath}
                alt="Nocny klimat Lukas Pub"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,10,0.08),rgba(6,7,10,0.9))]" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="section-kicker">Wejście w klimat</p>
              <p className="mt-3 font-headline text-5xl uppercase leading-none tracking-[0.08em] text-text sm:text-6xl">
                Parkiet. Bar. Ekipa.
              </p>
              <p className="mt-3 max-w-md text-base leading-7 text-muted">
                Nie sterylna witryna, tylko wejście prosto w nocne serce miejsca.
              </p>
            </div>
          </motion.div>

          <div
            data-parallax-y="46"
            data-parallax-x="-18"
            className="absolute -bottom-4 left-0 z-10 hidden w-[16rem] rotate-[-6deg] overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/70 shadow-panel md:block"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src="/assets/images/weekend-party.jpg"
                alt="Weekendowa impreza"
                fill
                className="object-cover"
                sizes="260px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-accent">Weekend alarm</p>
              <p className="mt-2 font-headline text-3xl uppercase tracking-[0.08em] text-text">
                Full party mode
              </p>
            </div>
          </div>

          <div
            data-parallax-y="18"
            className="absolute right-0 top-[16%] z-10 w-[13rem] rounded-[1.7rem] border border-white/10 bg-black/65 p-5 shadow-panel"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Sygnał miasta</p>
            <p className="mt-3 font-headline text-4xl uppercase tracking-[0.08em] text-text">
              Pub. Club. House.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Lokalne miejsce, które wchodzi w głowę zanim wejdziesz do środka.
            </p>
          </div>
        </div>
      </div>

      <a
        href="#about_club"
        data-scroll-cue
        className="scroll-cue absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:flex"
      >
        <span>Scroll down</span>
        <span className="scroll-cue__track">
          <span className="scroll-cue__dot scroll-cue__dot--top" />
          <span className="scroll-cue__dot scroll-cue__dot--middle" />
          <span className="scroll-cue__dot scroll-cue__dot--bottom" />
        </span>
      </a>
    </section>
  );
}
