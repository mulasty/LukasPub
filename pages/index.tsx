import { useEffect } from "react";

import Head from "next/head";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { AboutSection } from "@/components/AboutSection";
import { EventsSection } from "@/components/EventsSection";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { HeroSection } from "@/components/HeroSection";
import { LocationSection } from "@/components/LocationSection";
import { MenuSection } from "@/components/MenuSection";
import { Navbar } from "@/components/Navbar";
import { ReservationSection } from "@/components/ReservationSection";
import { SocialFeedSection } from "@/components/SocialFeedSection";
import { loadSiteData } from "@/lib/dataLoader";
import { generateSchema } from "@/lib/schemaGenerator";
import type { SiteData } from "@/lib/types";

export const getStaticProps: GetStaticProps<{ siteData: SiteData; schema: string }> = async () => {
  const siteData = loadSiteData();
  const schema = JSON.stringify(generateSchema(siteData));

  return {
    props: {
      siteData,
      schema
    }
  };
};

export default function HomePage({
  siteData,
  schema
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {
    let cleanup = () => undefined;

    void Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([lenisModule, { gsap }, scrollTriggerModule]) => {
        const Lenis = lenisModule.default;
        const ScrollTrigger =
          scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
          autoRaf: false,
          smoothWheel: true,
          duration: 1.15
        });

        let frame = 0;

        const raf = (time: number) => {
          lenis.raf(time);
          frame = window.requestAnimationFrame(raf);
        };

        frame = window.requestAnimationFrame(raf);
        lenis.on("scroll", ScrollTrigger.update);

        gsap.utils.toArray<HTMLElement>(".js-reveal").forEach((element, index) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              delay: index * 0.03,
              scrollTrigger: {
                trigger: element,
                start: "top 82%"
              }
            }
          );
        });

        cleanup = () => {
          window.cancelAnimationFrame(frame);
          lenis.destroy();
          ScrollTrigger.getAll().forEach((trigger: { kill: () => void }) => trigger.kill());
        };
      }
    );

    return () => cleanup();
  }, []);

  const { siteContent } = siteData;

  return (
    <>
      <Head>
        <title>{siteContent.seo.meta_title}</title>
        <meta name="description" content={siteContent.seo.meta_description} />
        <meta name="keywords" content={siteContent.seo.keywords.join(", ")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={siteContent.seo.meta_title} />
        <meta property="og:description" content={siteContent.seo.meta_description} />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema }}
        />
      </Head>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none fixed inset-0 opacity-60">
          <div className="absolute left-[-12rem] top-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute right-[-8rem] top-1/3 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute bottom-12 left-1/4 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <Navbar
          brandName={siteData.clientProfile.brand_name_preferred}
          uiLayout={siteData.uiLayout}
          siteContent={siteData.siteContent}
        />

        <main className="relative z-10">
          <HeroSection
            siteContent={siteData.siteContent.hero}
            clientProfile={siteData.clientProfile}
            media={siteData.media}
          />
          <AboutSection
            content={siteData.siteContent.about_club}
            clientProfile={siteData.clientProfile}
            contentRules={siteData.contentGenerationRules}
          />
          <EventsSection content={siteData.siteContent.events_section} events={siteData.events} />
          <GallerySection content={siteData.siteContent.gallery} images={siteData.media.galleryImages} />
          <MenuSection content={siteData.siteContent.menu_section} menu={siteData.menu} />
          <ReservationSection
            content={siteData.siteContent.vip_reservations}
            clientProfile={siteData.clientProfile}
          />
          <LocationSection
            content={siteData.siteContent.location_section}
            clientProfile={siteData.clientProfile}
            openingHours={siteData.openingHours}
          />
          <SocialFeedSection
            content={siteData.siteContent.social_media}
            clientProfile={siteData.clientProfile}
          />
        </main>

        <Footer content={siteData.siteContent.footer} clientProfile={siteData.clientProfile} />
      </div>
    </>
  );
}
