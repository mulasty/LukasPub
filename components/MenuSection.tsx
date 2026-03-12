import { useState } from "react";

import type { MenuData, MenuItem, SiteContent } from "@/lib/types";

import { SectionHeading } from "@/components/SectionHeading";

const tabConfig = {
  drinks: {
    title: "Drinki i alkohole",
    categories: ["coffee_tea", "soft_drinks", "juices", "energy_drinks", "wine", "rum", "tequila", "gin", "vodka", "whisky"]
  },
  beer: {
    title: "Piwo",
    categories: ["draft_beer", "bottled_beer", "non_alcoholic_beer"]
  },
  cocktails: {
    title: "Koktajle",
    categories: ["cocktails", "signature_cocktails"]
  },
  shots: {
    title: "Shoty",
    categories: ["shots"]
  },
  food: {
    title: "Jedzenie",
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
    vodka: "Wodka",
    whisky: "Whisky",
    cocktails: "Koktajle klasyczne",
    signature_cocktails: "Koktajle firmowe",
    shots: "Shoty",
    snacks: "Przekaski",
    food: "Dania",
    sharing_boards: "Deski do wspolnego zamawiania",
    salads: "Salatki",
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
}

export function MenuSection({ content, menu }: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState<keyof typeof tabConfig>("drinks");

  const sections = Object.entries(tabConfig).map(([key, config]) => ({
    id: key as keyof typeof tabConfig,
    title: config.title,
    groups: config.categories
      .map((categoryKey) => ({
        title: prettifyCategory(categoryKey),
        items: menu.categories[categoryKey] ?? []
      }))
      .filter((group) => group.items.length > 0)
  }));

  return (
    <section id="menu" className="section-shell section-space">
      <div className="space-y-10">
        <SectionHeading
          eyebrow={content.subtitle}
          title={content.title}
          description={content.description}
        />

        <div className="hidden flex-wrap gap-3 md:flex">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveTab(section.id)}
              className={
                section.id === activeTab ? "glow-button !px-5 !py-3" : "outline-button !px-5 !py-3"
              }
            >
              {section.title}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          {sections
            .filter((section) => section.id === activeTab)
            .map((section) => (
              <div key={section.id} className="grid gap-6 lg:grid-cols-2">
                {section.groups.map((group) => (
                  <div key={group.title} className="panel js-reveal">
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <h3 className="font-headline text-3xl uppercase tracking-[0.08em] text-text">
                        {group.title}
                      </h3>
                      <span className="mini-chip">{group.items.length} pozycji</span>
                    </div>
                    <div className="space-y-4">
                      {group.items.map((item) => (
                        <div
                          key={`${group.title}-${item.name}`}
                          className="flex items-start justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4"
                        >
                          <div>
                            <p className="text-base font-medium text-text">{item.name}</p>
                            {item.notes ? <p className="mt-1 text-sm text-muted">{item.notes}</p> : null}
                          </div>
                          <p className="text-right text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                            {formatPrice(item, menu.currency)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>

        <div className="space-y-4 md:hidden">
          {sections.map((section) => (
            <details key={section.id} className="panel js-reveal" open={section.id === activeTab}>
              <summary className="cursor-pointer list-none font-headline text-3xl uppercase tracking-[0.08em] text-text">
                {section.title}
              </summary>
              <div className="mt-6 space-y-6">
                {section.groups.map((group) => (
                  <div key={group.title} className="space-y-3">
                    <h3 className="text-sm uppercase tracking-[0.24em] text-muted">{group.title}</h3>
                    {group.items.map((item) => (
                      <div
                        key={`${section.id}-${group.title}-${item.name}`}
                        className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4"
                      >
                        <p className="text-base font-medium text-text">{item.name}</p>
                        {item.notes ? <p className="mt-1 text-sm text-muted">{item.notes}</p> : null}
                        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                          {formatPrice(item, menu.currency)}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
