import fs from "node:fs";
import path from "node:path";

import type {
  ClientProfile,
  ContentGenerationRules,
  DesignSystem,
  EventsData,
  MediaManifest,
  MenuData,
  OpeningHours,
  ProjectManifest,
  ResolvedGalleryImage,
  ResolvedMedia,
  SeoSchema,
  SiteContent,
  SiteData,
  UiLayout
} from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");
const publicDir = path.join(process.cwd(), "public");

function readJson<T>(fileName: string): T {
  return JSON.parse(fs.readFileSync(path.join(dataDir, fileName), "utf8")) as T;
}

function resolvePublicAsset(webPath: string, fallback: string) {
  const normalized = webPath.replace(/^\/+/, "");
  const fullPath = path.join(publicDir, ...normalized.split("/"));
  const exists = fs.existsSync(fullPath);

  return {
    src: exists ? `/${normalized}` : fallback,
    isPlaceholder: !exists
  };
}

function resolveMedia(
  mediaManifest: MediaManifest,
  projectManifest: ProjectManifest
): ResolvedMedia {
  const placeholderImagePath = "/assets/images/placeholder-club.svg";
  const imagesDir = projectManifest.media_directories.images || "/assets/images";
  const videosDir =
    mediaManifest.file_structure_recommendation.videos_directory ||
    projectManifest.media_directories.videos ||
    "/assets/video";

  const heroVideo = mediaManifest.hero_media.recommended_files.find((fileName) => {
    const normalized = `${videosDir}/${fileName}`.replace(/^\/+/, "");
    return fs.existsSync(path.join(publicDir, ...normalized.split("/")));
  });

  const galleryImages: ResolvedGalleryImage[] = mediaManifest.gallery_images.map((image) => ({
    ...image,
    ...resolvePublicAsset(`${imagesDir}/${image.file}`, placeholderImagePath)
  }));

  const menuImages = mediaManifest.menu_images.map((image) => ({
    ...image,
    ...resolvePublicAsset(`${imagesDir}/${image.file}`, placeholderImagePath)
  }));

  const logoFile = mediaManifest.logo.file?.trim();
  const logoPath = logoFile
    ? resolvePublicAsset(`${imagesDir}/${logoFile}`, "/assets/images/logo-placeholder.svg").src
    : null;

  return {
    heroVideoPath: heroVideo ? `${videosDir}/${heroVideo}` : null,
    logoPath,
    galleryImages,
    menuImages,
    placeholderImagePath
  };
}

export function loadSiteData(): SiteData {
  const clientProfile = readJson<ClientProfile>("client_profile.json");
  const openingHours = readJson<OpeningHours>("opening_hours.json");
  const events = readJson<EventsData>("events.json");
  const menu = readJson<MenuData>("menu.json");
  const siteContent = readJson<SiteContent>("site_content.json");
  const mediaManifest = readJson<MediaManifest>("media_manifest.json");
  const uiLayout = readJson<UiLayout>("ui_layout.json");
  const seoSchema = readJson<SeoSchema>("seo_schema.json");
  const projectManifest = readJson<ProjectManifest>("project_manifest.json");
  const designSystem = readJson<DesignSystem>("design_system.json");
  const contentGenerationRules =
    readJson<ContentGenerationRules>("content_generation_rules.json");

  return {
    clientProfile,
    openingHours,
    events,
    menu,
    siteContent,
    mediaManifest,
    uiLayout,
    seoSchema,
    projectManifest,
    designSystem,
    contentGenerationRules,
    media: resolveMedia(mediaManifest, projectManifest)
  };
}

