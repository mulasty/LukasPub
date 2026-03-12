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
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-[1.75rem] border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl sm:px-5">
        <a href="#hero" className="flex items-center gap-3">
          {media.logoPath ? (
            <span className="relative h-11 w-[9.5rem] overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-2">
              <Image
                src={media.logoPath}
                alt={brandName}
                fill
                className="object-contain p-1"
                sizes="152px"
              />
            </span>
          ) : (
            <span className="font-headline text-2xl uppercase tracking-[0.08em] text-text">
              {brandName}
            </span>
          )}
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="rounded-full px-4 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-text md:hidden"
          aria-label="Otwórz menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="text-lg">{menuOpen ? "x" : "+"}</span>
        </button>
      </div>

      {menuOpen ? (
        <div className="mx-auto mt-3 max-w-6xl rounded-3xl border border-white/10 bg-black/75 p-5 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-sm uppercase tracking-[0.18em] text-muted transition hover:text-text"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
