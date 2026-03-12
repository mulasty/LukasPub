import { useState } from "react";

import Image from "next/image";

import type { ResolvedMedia, SiteContent, UiLayout } from "@/lib/types";

type TitledSectionKey =
  | "about_club"
  | "events_section"
  | "gallery"
  | "menu_section"
  | "vip_reservations"
  | "location_section";

const labelMap: Record<string, TitledSectionKey> = {
  about_club: "about_club",
  events: "events_section",
  gallery: "gallery",
  menu: "menu_section",
  reservation: "vip_reservations",
  location: "location_section"
};

interface NavbarProps {
  brandName: string;
  uiLayout: UiLayout;
  siteContent: SiteContent;
  media: ResolvedMedia;
}

export function Navbar({ brandName, uiLayout, siteContent, media }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = uiLayout.navbar.links.map((link) => {
    const sectionKey = labelMap[link];
    const section = siteContent[sectionKey];

    return {
      id: link,
      label: section?.title ?? link.replace(/_/g, " ")
    };
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="section-shell">
        <div className="flex items-center justify-between rounded-[1.8rem] border border-white/10 bg-black/55 px-4 py-3 shadow-panel backdrop-blur-xl sm:px-5">
          <a href="#hero" className="flex items-center gap-4">
            {media.logoPath ? (
              <span className="relative h-11 w-[8.4rem] overflow-hidden rounded-[1.1rem] border border-white/10 bg-white/5">
                <Image
                  src={media.logoPath}
                  alt={brandName}
                  fill
                  className="object-contain p-2"
                  sizes="134px"
                />
              </span>
            ) : (
              <span className="font-headline text-3xl uppercase tracking-[0.08em] text-text">
                {brandName}
              </span>
            )}
            <div className="hidden md:block">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-muted">Łomża nightlife</p>
              <p className="text-sm uppercase tracking-[0.18em] text-text">Aleja Legionów 60B</p>
            </div>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <a href="#reservation" className="ghost-button">
              Rezerwacja
            </a>
            <a href="#events" className="glow-button !px-5 !py-3">
              Dzisiaj w klubie
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-text lg:hidden"
            aria-label="Otwórz menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="text-lg">{menuOpen ? "x" : "+"}</span>
          </button>
        </div>

        {menuOpen ? (
          <div className="mt-3 rounded-[1.8rem] border border-white/10 bg-black/80 p-5 shadow-panel backdrop-blur-xl lg:hidden">
            <div className="mb-5 rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-accent">Łomża nightlife</p>
              <p className="mt-2 font-headline text-3xl uppercase tracking-[0.08em] text-text">
                Lukas Pub
              </p>
            </div>

            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="rounded-[1rem] border border-white/8 px-4 py-4 text-sm uppercase tracking-[0.22em] text-muted transition hover:border-primary/30 hover:text-text"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
