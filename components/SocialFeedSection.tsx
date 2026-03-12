import type { ClientProfile, SiteContent } from "@/lib/types";

import { SectionHeading } from "@/components/SectionHeading";

const platformLabels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok"
};

const statusLabels: Record<string, string> = {
  confirmed: "potwierdzone",
  not_confirmed: "do potwierdzenia"
};

interface SocialFeedSectionProps {
  content: SiteContent["social_media"];
  clientProfile: ClientProfile;
}

export function SocialFeedSection({
  content,
  clientProfile
}: SocialFeedSectionProps) {
  const profiles = Object.entries(clientProfile.social_media).map(([platform, details]) => ({
    platform,
    details
  }));

  return (
    <section id="social" className="section-shell section-space">
      <div className="space-y-10">
        <SectionHeading
          eyebrow={content.subtitle}
          title={content.title}
          description={content.description}
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {profiles.map(({ platform, details }) => (
            <article key={platform} className="panel js-reveal">
              <div className="flex items-center justify-between gap-4">
                <p className="font-headline text-3xl uppercase tracking-[0.08em] text-text">
                  {platformLabels[platform] ?? platform}
                </p>
                <span className={details?.status === "confirmed" ? "mini-chip text-secondary" : "mini-chip"}>
                  {statusLabels[details?.status ?? "not_confirmed"] ?? "do potwierdzenia"}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {details?.page_name ? <p className="text-lg text-text">{details.page_name}</p> : null}
                {details?.audience_snapshot ? (
                  <div className="grid gap-2 text-sm text-muted">
                    {Object.values(details.audience_snapshot).map((value) =>
                      value ? <p key={value}>{value}</p> : null
                    )}
                  </div>
                ) : null}
                {details?.notes ? <p className="leading-7 text-muted">{details.notes}</p> : null}
              </div>

              {details?.page_url || details?.profile_url ? (
                <a
                  href={details.page_url || details.profile_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex text-sm uppercase tracking-[0.18em] text-secondary transition hover:text-text"
                >
                  Otwórz profil
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
