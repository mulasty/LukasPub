import type { ClientProfile, SiteContent } from "@/lib/types";

interface FooterProps {
  content: SiteContent["footer"];
  clientProfile: ClientProfile;
}

export function Footer({ content, clientProfile }: FooterProps) {
  return (
    <footer id="footer" className="section-shell pb-10 pt-8">
      <div className="panel flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <p className="font-headline text-4xl uppercase tracking-[0.08em] text-text">
            {clientProfile.brand_name_preferred}
          </p>
          <p className="max-w-xl text-sm leading-7 text-muted">{content.description}</p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-muted lg:items-end">
          <a href={`tel:${clientProfile.contact.primary_phone}`} className="transition hover:text-text">
            {clientProfile.contact.primary_phone}
          </a>
          <a
            href={clientProfile.social_media.facebook?.page_url}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-text"
          >
            Facebook
          </a>
          <p>{content.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

