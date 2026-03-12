import Image from "next/image";

import type { ResolvedGalleryImage, SiteContent } from "@/lib/types";

import { SectionHeading } from "@/components/SectionHeading";

interface GallerySectionProps {
  content: SiteContent["gallery"];
  images: ResolvedGalleryImage[];
}

const cardLabels = [
  "parkiet",
  "światła",
  "ekipa",
  "bar",
  "noc",
  "afterglow"
];

export function GallerySection({ content, images }: GallerySectionProps) {
  return (
    <section id="gallery" className="section-shell section-space">
      <div className="space-y-10">
        <SectionHeading
          eyebrow={content.subtitle}
          title="Ten klimat nie jest przypadkiem"
          description={content.description}
        />

        <div className="grid gap-5 lg:grid-cols-12">
          {images.map((image, index) => {
            const featured = index === 0;
            const wide = index === 3 || index === 4;

            return (
              <figure
                key={image.name}
                data-parallax-y={featured ? "30" : index % 2 === 0 ? "18" : "24"}
                className={`js-reveal group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] ${
                  featured
                    ? "lg:col-span-5 lg:row-span-2"
                    : wide
                      ? "lg:col-span-4"
                      : "lg:col-span-3"
                }`}
              >
                <div className={`relative overflow-hidden ${featured ? "aspect-[4/5] h-full min-h-[32rem]" : "aspect-[4/5]"}`}>
                  <Image
                    src={image.src}
                    alt={image.description}
                    fill
                    className={`object-cover transition duration-700 group-hover:scale-105 ${
                      image.isPlaceholder ? "opacity-80 saturate-0" : ""
                    }`}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,10,0.08),rgba(6,7,10,0.88))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-xs uppercase tracking-[0.34em] text-accent">
                      {cardLabels[index] ?? "night"}
                    </p>
                    <p className={`mt-3 font-headline uppercase leading-none tracking-[0.08em] text-text ${featured ? "text-5xl sm:text-6xl" : "text-4xl"}`}>
                      {image.name.replace(/_/g, " ")}
                    </p>
                    <p className="mt-3 max-w-md text-sm leading-6 text-muted">
                      {image.description}
                    </p>
                    {image.isPlaceholder ? (
                      <p className="mt-2 text-sm text-muted">
                        Tutaj wstawimy finalne zdjęcie klubu, gdy materiały będą już kompletne.
                      </p>
                    ) : null}
                  </div>
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
