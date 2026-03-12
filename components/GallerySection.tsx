import Image from "next/image";

import type { ResolvedGalleryImage, SiteContent } from "@/lib/types";

import { SectionHeading } from "@/components/SectionHeading";

interface GallerySectionProps {
  content: SiteContent["gallery"];
  images: ResolvedGalleryImage[];
}

export function GallerySection({ content, images }: GallerySectionProps) {
  return (
    <section id="gallery" className="section-shell section-space">
      <div className="space-y-10">
        <SectionHeading
          eyebrow={content.subtitle}
          title={content.title}
          description={content.description}
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {images.map((image, index) => (
            <figure
              key={image.name}
              className={`js-reveal overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] ${
                index % 3 === 0 ? "xl:translate-y-10" : index % 3 === 2 ? "xl:-translate-y-10" : ""
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.description}
                  fill
                  className={`object-cover transition duration-700 hover:scale-105 ${
                    image.isPlaceholder ? "opacity-80 saturate-0" : ""
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              </div>
              <figcaption className="space-y-2 p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-muted">
                  {image.name.replace(/_/g, " ")}
                </p>
                <p className="text-base text-text">{image.description}</p>
                {image.isPlaceholder ? (
                  <p className="text-sm text-muted">
                    Miejsce na docelowe zdjęcie klubu. Podmień po otrzymaniu materiałów.
                  </p>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
