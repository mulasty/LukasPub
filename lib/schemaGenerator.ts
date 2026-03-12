import type { MenuData, OpeningHours, SiteData, WeeklyEvent } from "@/lib/types";
import { getSiteUrl } from "@/lib/siteUrl";

const weekdayMap: Record<string, string> = {
  monday: "https://schema.org/Monday",
  tuesday: "https://schema.org/Tuesday",
  wednesday: "https://schema.org/Wednesday",
  thursday: "https://schema.org/Thursday",
  friday: "https://schema.org/Friday",
  saturday: "https://schema.org/Saturday",
  sunday: "https://schema.org/Sunday"
};

const menuSectionLabels: Record<string, string> = {
  coffee_tea: "Kawa i herbata",
  soft_drinks: "Napoje bezalkoholowe",
  juices: "Soki",
  energy_drinks: "Napoje energetyczne",
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
  shots: "Shoty",
  signature_cocktails: "Koktajle firmowe",
  snacks: "Przekąski",
  food: "Dania",
  sharing_boards: "Deski do dzielenia",
  salads: "Sałatki",
  desserts: "Desery"
};

function compact<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== "" && entry !== null && entry !== undefined)
  ) as T;
}

function buildMenuSections(menu: MenuData) {
  return Object.entries(menu.categories).map(([key, items]) => ({
    "@type": "MenuSection",
    name: menuSectionLabels[key] || key.replace(/_/g, " "),
    hasMenuItem: items.map((item) => ({
      "@type": "MenuItem",
      name: item.name,
      description: item.notes || undefined,
      offers: {
        "@type": "Offer",
        priceCurrency: menu.currency,
        price: Object.entries(item)
          .filter(([entryKey]) => entryKey.startsWith("price"))
          .map(([, entryValue]) => entryValue)
          .filter(Boolean)
          .join(" / ")
      }
    }))
  }));
}

function buildEventSchema(event: WeeklyEvent, siteData: SiteData) {
  return compact({
    "@type": "Event",
    name: event.name,
    description: event.description,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": siteData.seoSchema.local_business["@type"],
      name: siteData.clientProfile.brand_name_preferred,
      address: siteData.seoSchema.local_business.address
    },
    organizer: {
      "@type": "Organization",
      name: siteData.clientProfile.brand_name_preferred,
      telephone: siteData.clientProfile.contact.primary_phone,
      sameAs: siteData.seoSchema.organization.sameAs
    },
    eventSchedule: compact({
      "@type": "Schedule",
      repeatFrequency: "P1W",
      byDay: weekdayMap[event.day],
      startTime: event.start_time || undefined
    })
  });
}

function buildOpeningHours(openingHours: OpeningHours) {
  return Object.entries(openingHours.verified_schedule)
    .filter(([, item]) => item.open && item.close)
    .map(([day, item]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: weekdayMap[day],
      opens: item.open,
      closes: item.close
    }));
}

export function generateSchema(siteData: SiteData) {
  const openingHours = buildOpeningHours(siteData.openingHours);
  const siteUrl = getSiteUrl();

  const organization = compact({
    "@type": siteData.seoSchema.organization["@type"],
    name: siteData.seoSchema.organization.name || siteData.clientProfile.brand_name_preferred,
    url:
      siteData.seoSchema.organization.url ||
      siteData.clientProfile.contact.website ||
      siteUrl ||
      undefined,
    logo: siteData.seoSchema.organization.logo || siteData.media.logoPath || undefined,
    sameAs: siteData.seoSchema.organization.sameAs
  });

  const localBusiness = compact({
    ...siteData.seoSchema.local_business,
    openingHoursSpecification: openingHours.length ? openingHours : undefined
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      localBusiness,
      {
        "@type": siteData.seoSchema.menu_schema.schema_type,
        name: `Menu ${siteData.clientProfile.brand_name_preferred}`,
        hasMenuSection: buildMenuSections(siteData.menu)
      },
      ...siteData.events.weekly_events.map((event) => buildEventSchema(event, siteData))
    ]
  };
}
