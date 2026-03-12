import type { ClientProfile, SiteContent } from "@/lib/types";

import { SectionHeading } from "@/components/SectionHeading";

const platformLabels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok"
};

const statusLabels: Record<string, string> = {
  confirmed: "aktywne",
  not_confirmed: "weryfikacja"
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

  const verifiedProfile = profiles.find(({ details }) => details?.status === "confirmed");

  return (
    <section id="social" className="section-shell section-space">
      <div className="grid gap-8 xl:grid-cols-[0.88fr_1.12fr]">
        <div className="space-y-8">
          <SectionHeading
            eyebrow={content.subtitle}
            title="Złap klimat zanim wejdziesz"
            description={content.description}
          />

          <div className="poster-panel js-reveal space-y-6" data-parallax-y="20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">Social proof</p>
                <p className="mt-3 font-headline text-5xl uppercase leading-none tracking-[0.08em] text-text">
                  Miasto już to śledzi
                </p>
              </div>
              <span className="ghost-button !cursor-default !py-2">Before the queue</span>
            </div>
            <p className="text-lg leading-8 text-muted">
              Najmocniejsze momenty, zapowiedzi i weekendowe sygnały lecą tu jeszcze zanim tłum
              zacznie schodzić się pod klub.
            </p>
            {verifiedProfile?.details?.page_url || verifiedProfile?.details?.profile_url ? (
              <a
                href={verifiedProfile.details.page_url || verifiedProfile.details.profile_url}
                target="_blank"
                rel="noreferrer"
                className="glow-button w-fit"
              >
                Otwórz Facebook
              </a>
            ) : null}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {profiles.map(({ platform, details }, index) => (
            <article
              key={platform}
              className={`panel js-reveal flex flex-col ${index === 0 ? "md:col-span-2 xl:col-span-2" : ""}`}
              data-parallax-y={index === 0 ? "22" : "14"}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-kicker">{statusLabels[details?.status ?? "not_confirmed"] ?? "weryfikacja"}</p>
                  <p className="mt-3 font-headline text-5xl uppercase tracking-[0.08em] text-text">
                    {platformLabels[platform] ?? platform}
                  </p>
                </div>
                <span className={details?.status === "confirmed" ? "mini-chip text-secondary" : "mini-chip"}>
                  {details?.status === "confirmed" ? "live" : "pending"}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {details?.page_name ? (
                  <p className="text-xl leading-8 text-text">{details.page_name}</p>
                ) : (
                  <p className="text-lg leading-8 text-muted">
                    Kanał czeka jeszcze na potwierdzenie od właściciela.
                  </p>
                )}

                {details?.audience_snapshot ? (
                  <div className={`grid gap-3 ${index === 0 ? "sm:grid-cols-3" : ""}`}>
                    {Object.values(details.audience_snapshot).map((value) =>
                      value ? (
                        <div key={value} className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] p-4">
                          <p className="text-sm uppercase tracking-[0.22em] text-muted">Momentum</p>
                          <p className="mt-2 text-lg leading-7 text-text">{value}</p>
                        </div>
                      ) : null
                    )}
                  </div>
                ) : null}

                {details?.notes ? <p className="text-base leading-7 text-muted">{details.notes}</p> : null}
              </div>

              {details?.page_url || details?.profile_url ? (
                <a
                  href={details.page_url || details.profile_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex text-sm uppercase tracking-[0.24em] text-secondary transition hover:text-text"
                >
                  Otwórz profil
                </a>
              ) : (
                <span className="mt-8 inline-flex text-sm uppercase tracking-[0.24em] text-muted">
                  Czekamy na oficjalny link
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
