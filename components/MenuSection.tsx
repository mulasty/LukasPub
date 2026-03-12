import { useState } from "react";

import Image from "next/image";

import type { MenuData, MenuItem, ResolvedMedia, SiteContent } from "@/lib/types";

import { SectionHeading } from "@/components/SectionHeading";

const tabConfig = {
  drinks: {
    title: "Drinki i alkohole",
    subtitle: "Mocna baza baru",
    categories: ["coffee_tea", "soft_drinks", "juices", "energy_drinks", "wine", "rum", "tequila", "gin", "vodka", "whisky"]
  },
  beer: {
    title: "Piwo",
    subtitle: "Klasyka pod parkiet",
    categories: ["draft_beer", "bottled_beer", "non_alcoholic_beer"]
  },
  cocktails: {
    title: "Koktajle",
    subtitle: "Kolor, smak i tempo",
    categories: ["cocktails", "signature_cocktails"]
  },
  shots: {
    title: "Shoty",
    subtitle: "Szybkie wejście w noc",
    categories: ["shots"]
  },
  food: {
    title: "Jedzenie",
    subtitle: "Przekąski i konkret",
    categories: ["snacks", "food", "sharing_boards", "salads", "desserts"]
  }
} as const;

function prettifyCategory(name: string) {
  const labels: Record<string, string> = {
    coffee_tea: "Kawa i herbata",
    soft_drinks: "Napoje bezalkoholowe",
    juices: "Soki",
    energy_drinks: "Energetyki",
    draft_beer: "Piwo lane",
    bottled_beer: "Piwo butelkowe",
    non_alcoholic_beer: "Piwo bezalkoholowe",
    wine: "Wino",
    rum: "Rum",
    tequila: "Tequila",
    gin: "Gin",
    vodka: "Wódka",
    whisky: "Whisky",
    cocktails: "Koktajle klasyczne",
    signature_cocktails: "Koktajle firmowe",
    shots: "Shoty",
    snacks: "Przekąski",
    food: "Dania",
    sharing_boards: "Deski do wspólnego zamawiania",
    salads: "Sałatki",
    desserts: "Desery"
  };

  return labels[name] ?? name.replace(/_/g, " ");
}

function formatPrice(item: MenuItem, currency: string) {
  const priceEntries = Object.entries(item).filter(
    ([key, value]) => key.startsWith("price") && value !== undefined
  );

  if (!priceEntries.length) {
    return "";
  }

  return priceEntries
    .map(([key, value]) => {
      const label = key === "price" ? "" : key.replace("price_", "").replace(/_/g, "/");
      const displayLabel = label ? `${label}: ` : "";

      return `${displayLabel}${value} ${currency}`;
    })
    .join(" | ");
}

interface MenuSectionProps {
  content: SiteContent["menu_section"];
  menu: MenuData;
  media: ResolvedMedia;
}

const imageMap: Record<string, string[]> = {
  drinks: ["cocktails", "aperol_spritz", "signature_cocktail"],
  beer: ["cocktails", "aperol_spritz"],
  cocktails: ["signature_cocktail", "cocktails", "aperol_spritz"],
  shots: ["cocktails", "signature_cocktail"],
  food: ["food_01", "food_02", "food_03", "food_04", "food_05", "food_06"]
};

export function MenuSection({ content, menu, media }: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState<keyof typeof tabConfig>("drinks");

  const sections = Object.entries(tabConfig).map(([key, config]) => ({
    id: key as keyof typeof tabConfig,
    title: config.title,
    subtitle: config.subtitle,
    groups: config.categories
      .map((categoryKey) => ({
        title: prettifyCategory(categoryKey),
        items: menu.categories[categoryKey] ?? []
      }))
      .filter((group) => group.items.length > 0)
  }));

  const activeSection = sections.find((section) => section.id === activeTab) ?? sections[0];

  const activeImages =
    imageMap[activeTab]
      ?.map((name) => media.menuImages.find((image) => image.name === name))
      .filter((image): image is NonNullable<typeof image> => Boolean(image))
      .slice(0, 3) ?? [];

  const fallbackImages = media.menuImages.filter((image) => !image.isPlaceholder).slice(0, 3);
  const showcaseImages = activeImages.length ? activeImages : fallbackImages;

  return (
    <section id="menu" className="section-shell section-space">
      <div className="space-y-10">
        <SectionHeading
          eyebrow={content.subtitle}
          title="Bar i kuchnia w rytmie nocy"
          description={content.description}
        />

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <div className="poster-panel js-reveal space-y-5" data-parallax-y="22">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-kicker">Bar signal</p>
                  <p className="mt-3 font-headline text-5xl uppercase leading-none tracking-[0.08em] text-text">
                    {activeSection.title}
                  </p>
                </div>
                <span className="ghost-button !cursor-default !py-2">{activeSection.subtitle}</span>
              </div>
              <p className="text-lg leading-8 text-muted">
                Zanim parkiet zrobi się pełny, bar robi robotę. Przeklikaj sekcje i zobacz, co
                ustawia tempo wieczoru.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveTab(section.id)}
                    className={`rounded-[1.4rem] border px-4 py-4 text-left transition ${
                      section.id === activeTab
                        ? "border-primary/45 bg-primary/10 text-text shadow-pink"
                        : "border-white/8 bg-white/[0.02] text-muted hover:border-white/14 hover:text-text"
                    }`}
                  >
                    <p className="font-headline text-3xl uppercase tracking-[0.08em]">
                      {section.title}
                    </p>
                    <p className="mt-1 text-sm uppercase tracking-[0.2em]">
                      {section.subtitle}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <article className="stat-card js-reveal" data-parallax-y="12">
                <p className="section-kicker">Koktajle</p>
                <p className="mt-3 font-headline text-5xl uppercase tracking-[0.08em] text-primary">11+</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted">Pozycji firmowych</p>
              </article>
              <article className="stat-card js-reveal" data-parallax-y="20">
                <p className="section-kicker">Shoty</p>
                <p className="mt-3 font-headline text-5xl uppercase tracking-[0.08em] text-secondary">7</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted">Szybkich wejść</p>
              </article>
              <article className="stat-card js-reveal" data-parallax-y="16">
                <p className="section-kicker">Food</p>
                <p className="mt-3 font-headline text-5xl uppercase tracking-[0.08em] text-accent">Share</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted">Na ekipę i dłuższy wieczór</p>
              </article>
            </div>
          </div>

          <div className="grid gap-4">
            {showcaseImages.length ? (
              <div className="grid gap-4 md:grid-cols-[1.18fr_0.82fr]">
                <figure className="js-reveal relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
                  <Image
                    src={showcaseImages[0].src}
                    alt={showcaseImages[0].description}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 58vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,10,0.12),rgba(6,7,10,0.88))]" />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="section-kicker">{activeSection.subtitle}</p>
                    <p className="mt-3 font-headline text-5xl uppercase leading-none tracking-[0.08em] text-text">
                      {activeSection.title}
                    </p>
                    <p className="mt-3 max-w-md text-sm leading-6 text-muted">
                      Zdjęcia menu mają działać jak impuls. Widzisz i już wiesz, że warto zostać dłużej.
                    </p>
                  </figcaption>
                </figure>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                  {showcaseImages.slice(1).map((image, index) => (
                    <figure
                      key={image.name}
                      className="js-reveal relative min-h-[10.5rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.04]"
                      data-parallax-y={index === 0 ? "18" : "12"}
                    >
                      <Image
                        src={image.src}
                        alt={image.description}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 30vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                    </figure>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="grid gap-5 lg:grid-cols-2">
              {activeSection.groups.map((group) => (
                <div key={group.title} className="panel js-reveal">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="section-kicker">Kategoria</p>
                      <h3 className="mt-2 font-headline text-4xl uppercase tracking-[0.08em] text-text">
                        {group.title}
                      </h3>
                    </div>
                    <span className="mini-chip">{group.items.length} pozycji</span>
                  </div>
                  <div className="space-y-4">
                    {group.items.map((item) => (
                      <div
                        key={`${group.title}-${item.name}`}
                        className="menu-ticket flex items-start justify-between gap-4"
                      >
                        <div>
                          <p className="text-lg font-medium text-text">{item.name}</p>
                          {item.notes ? <p className="mt-1 text-sm leading-6 text-muted">{item.notes}</p> : null}
                        </div>
                        <p className="text-right text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                          {formatPrice(item, menu.currency)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
