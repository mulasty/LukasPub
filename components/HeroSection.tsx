import { motion } from "framer-motion";
import Image from "next/image";

import type { ClientProfile, ResolvedMedia, SiteContent } from "@/lib/types";

interface HeroSectionProps {
  siteContent: SiteContent["hero"];
  clientProfile: ClientProfile;
  media: ResolvedMedia;
}

export function HeroSection({ siteContent, clientProfile, media }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-end overflow-hidden pt-28 sm:items-center"
    >
      <div data-parallax-y="72" className="absolute inset-0 scale-[1.08]">
        {media.heroVideoPath ? (
          <video
            className="h-full w-full object-cover opacity-40"
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
            className="object-cover opacity-45"
            sizes="100vw"
          />
        )}
        <div
          data-parallax-y="36"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,224,255,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,0,122,0.24),transparent_24%),linear-gradient(160deg,rgba(11,11,15,0.2),rgba(11,11,15,0.95))]"
        />
        <div
          data-parallax-y="24"
          className="absolute inset-0 bg-hero-grid bg-[size:52px_52px] opacity-10"
        />
      </div>

      <div
        data-parallax-y="48"
        data-parallax-x="-24"
        className="pointer-events-none absolute right-[8%] top-[18%] hidden h-48 w-48 rounded-full border border-white/10 bg-white/[0.02] blur-[2px] lg:block"
      />
      <div
        data-parallax-y="26"
        className="pointer-events-none absolute left-[10%] top-[24%] hidden h-px w-28 bg-gradient-to-r from-transparent via-white/60 to-transparent lg:block"
      />

      <div className="section-shell relative z-10 grid gap-12 pb-16 pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:pb-24">
        <div data-parallax-y="18" className="max-w-3xl space-y-7">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="label-chip"
          >
            {siteContent.subtitle}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="font-headline text-7xl uppercase leading-none tracking-[0.08em] text-text sm:text-[6rem] lg:text-[7.5rem]"
          >
            {siteContent.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16 }}
            className="max-w-2xl text-lg leading-8 text-muted"
          >
            {siteContent.description}
          </motion.p>

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

        <motion.aside
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3 }}
          data-parallax-y="34"
          className="panel max-w-xl justify-self-end"
        >
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {clientProfile.public_positioning.main_customer_promises_observed.map((item) => (
                <span key={item} className="mini-chip">
                  {item}
                </span>
              ))}
            </div>
            <p className="text-sm uppercase tracking-[0.22em] text-muted">Warto wiedzieć</p>
            <p className="text-2xl text-text">
              Karaoke w czwartki od 19:00, parkiet i imprezowy weekend w samym sercu Łomży.
            </p>
            <div className="grid gap-3 text-sm text-muted sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-muted">Adres</p>
                <p className="mt-2 text-base text-text">{clientProfile.location.full_address}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-muted">Kontakt</p>
                <a
                  href={`tel:${clientProfile.contact.reservation_contact || clientProfile.contact.primary_phone}`}
                  className="mt-2 block text-base text-text transition hover:text-secondary"
                >
                  {clientProfile.contact.reservation_contact || clientProfile.contact.primary_phone}
                </a>
              </div>
            </div>
          </div>
        </motion.aside>
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
