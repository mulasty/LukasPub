import type { ClientProfile, SiteContent } from "@/lib/types";

interface FooterProps {
  content: SiteContent["footer"];
  clientProfile: ClientProfile;
}

export function Footer({ content, clientProfile }: FooterProps) {
  return (
    <footer id="footer" className="section-shell pb-12 pt-6">
      <div className="poster-panel flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <p className="section-kicker">Last call</p>
          <p className="font-headline text-6xl uppercase leading-[0.9] tracking-[0.08em] text-text sm:text-7xl">
            {clientProfile.brand_name_preferred}
          </p>
          <p className="max-w-2xl text-lg leading-8 text-muted">{content.description}</p>
        </div>

        <div className="flex flex-col gap-3 text-base text-muted lg:items-end">
          <a href={`tel:${clientProfile.contact.primary_phone}`} className="transition hover:text-text">
            {clientProfile.contact.primary_phone}
          </a>
          {clientProfile.social_media.facebook?.page_url ? (
            <a
              href={clientProfile.social_media.facebook.page_url}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-text"
            >
              Facebook
            </a>
          ) : null}
          <p>{content.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
