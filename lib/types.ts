export interface SocialProfile {
  status: string;
  page_name?: string;
  page_url?: string;
  alt_page_url?: string;
  profile_url?: string;
  notes?: string;
  audience_snapshot?: {
    likes_or_followers_text?: string;
    talking_about_text?: string;
    checkins_or_visits_text?: string;
  };
}

export interface ClientProfile {
  club_name: string;
  brand_name_preferred: string;
  type: string[];
  location: {
    country: string;
    region: string;
    city: string;
    postal_code: string;
    street_address: string;
    full_address: string;
  };
  contact: {
    primary_phone: string;
    secondary_phone?: string;
    email?: string;
    website?: string;
    reservation_contact?: string;
  };
  social_media: {
    facebook?: SocialProfile;
    instagram?: SocialProfile;
    tiktok?: SocialProfile;
  };
  public_positioning: {
    short_description: string;
    tone_of_voice_observed: string[];
    main_customer_promises_observed: string[];
  };
  offer_snapshot: {
    core_offers: string[];
    weekly_rhythm_observed: Record<string, string>;
    special_formats_observed: string[];
  };
  target_audience_hypothesis: {
    primary_age_range: string;
    secondary_age_range: string;
    segments: string[];
    confidence: string;
  };
  brand_assets_status: {
    logo_received: boolean;
    official_brand_book: boolean;
    official_photo_bank: boolean;
    official_video_bank: boolean;
    menu_received: boolean;
  };
  discovery_metadata: {
    research_date: string;
    verification_status: string;
    needs_client_confirmation: string[];
  };
  agent_notes: {
    important: string[];
    content_direction: string[];
  };
}

export interface OpeningHours {
  status: string;
  timezone: string;
  verified_schedule: Record<
    string,
    {
      open: string;
      close: string;
      status: string;
      notes: string;
    }
  >;
  unverified_days: Record<
    string,
    {
      open: string;
      close: string;
      status: string;
    }
  >;
  observed_patterns: {
    regular_event_start_times: Array<{
      day: string;
      event: string;
      start_time: string;
      confidence: string;
    }>;
    active_nightlife_days: Array<{
      day: string;
      confidence: string;
    }>;
  };
  needs_owner_confirmation: string[];
  agent_notes: {
    important: string[];
    safe_display_copy: Record<string, string>;
  };
}

export interface WeeklyEvent {
  id: string;
  name: string;
  day: string;
  start_time: string;
  description: string;
  category: string;
  confidence: string;
  source: string;
}

export interface EventsData {
  status: string;
  weekly_events: WeeklyEvent[];
  special_events: Array<{
    type: string;
    examples: string[];
    confidence: string;
    notes: string;
  }>;
  event_features_observed: string[];
  event_media_types: string[];
  needs_owner_confirmation: string[];
  agent_notes: {
    website_usage: string[];
    ui_hint: string;
  };
}

export interface MenuItem {
  name: string;
  notes?: string;
  [key: string]: string | number | undefined;
}

export interface MenuData {
  currency: string;
  categories: Record<string, MenuItem[]>;
}

export interface SiteContent {
  language: string;
  hero: {
    title: string;
    subtitle: string;
    description: string;
    primary_cta: string;
    secondary_cta: string;
    background_media: string;
  };
  about_club: {
    title: string;
    description: string;
    features: string[];
  };
  events_section: {
    title: string;
    subtitle: string;
    description: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    description: string;
  };
  menu_section: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
  };
  vip_reservations: {
    title: string;
    description: string;
    cta: string;
  };
  location_section: {
    title: string;
    subtitle: string;
    description: string;
  };
  social_media: {
    title: string;
    subtitle: string;
    description: string;
  };
  footer: {
    description: string;
    copyright: string;
  };
  seo: {
    meta_title: string;
    meta_description: string;
    keywords: string[];
  };
  cta_global: {
    reservation: string;
    events: string;
    menu: string;
    contact: string;
  };
}

export interface MediaManifest {
  status: string;
  hero_media: {
    type: string;
    recommended_files: string[];
    description: string;
    source_status: string;
  };
  logo: {
    file: string;
    format_preferred: string[];
    notes: string;
    source_status: string;
  };
  gallery_images: Array<{
    name: string;
    file: string;
    description: string;
    source_status: string;
  }>;
  menu_images: Array<{
    name: string;
    file: string;
    description: string;
  }>;
  events_media: Array<{
    name: string;
    file: string;
    description: string;
    source_status: string;
  }>;
  social_media_media: {
    type: string;
    sources: string[];
    description: string;
  };
  file_structure_recommendation: {
    images_directory: string;
    videos_directory: string;
  };
  recommended_image_specs: Record<
    string,
    {
      resolution: string;
      format: string;
    }
  >;
  agent_notes: string[];
}

export interface UiLayout {
  layout_version: string;
  page: {
    type: string;
    scroll_engine: string;
    navigation: string;
  };
  sections: Array<{
    id: string;
    component: string;
    layout: string;
    columns?: number;
    height?: string;
    image_position?: string;
    data_source?: string;
    content_source?: string;
    tabs?: string[];
    form_fields?: string[];
    map_provider?: string;
    background?: {
      type: string;
      source: string;
    };
    animations?: string[];
  }>;
  navbar: {
    style: string;
    sticky: boolean;
    links: string[];
  };
  mobile_layout: {
    hero_height: string;
    gallery_columns: number;
    menu_layout: string;
    events_columns: number;
  };
  ui_effects: {
    hover_glow: boolean;
    neon_style: boolean;
    smooth_scroll: boolean;
    parallax_backgrounds: boolean;
  };
}

export interface SeoSchema {
  organization: {
    "@type": string;
    name: string;
    url: string;
    logo: string;
    sameAs: string[];
  };
  local_business: {
    "@type": string;
    name: string;
    description: string;
    address: {
      "@type": string;
      streetAddress: string;
      addressLocality: string;
      postalCode: string;
      addressCountry: string;
    };
    telephone: string;
    servesCuisine: string[];
    priceRange: string;
    sameAs: string[];
  };
  opening_hours_reference: {
    data_source: string;
    note: string;
  };
  events_schema: {
    data_source: string;
    schema_type: string;
    note: string;
  };
  menu_schema: {
    data_source: string;
    schema_type: string;
    note: string;
  };
  seo_meta_defaults: {
    meta_title: string;
    meta_description: string;
    keywords: string[];
  };
  agent_instructions: string[];
}

export interface ProjectManifest {
  project: {
    name: string;
    client_name: string;
    type: string;
    location: string;
    language: string;
  };
  purpose: {
    primary_goal: string;
    secondary_goals: string[];
  };
  tech_stack: {
    framework: string;
    language: string;
    styling: string;
    animations: string[];
    scroll_engine: string;
    deployment: string;
  };
  data_sources: Record<string, string>;
  site_structure: string[];
  components_to_generate: string[];
  design_system: {
    style: string;
    colors: Record<string, string>;
    fonts: Record<string, string>;
  };
  animation_rules: string[];
  media_directories: {
    images: string;
    videos: string;
  };
  seo: {
    target_keywords: string[];
  };
  agent_instructions: string[];
}

export interface DesignSystem {
  theme: {
    style: string;
  };
  colors: Record<string, string>;
  typography: {
    font_headline: string;
    font_body: string;
    sizes: Record<string, string>;
  };
  spacing: Record<string, string>;
  border_radius: Record<string, string>;
  shadows: Record<string, string>;
  buttons: Record<string, Record<string, string>>;
  cards: Record<string, string>;
  animations: Record<string, Record<string, string>>;
  layout: {
    container: Record<string, string>;
    grid: Record<string, number>;
  };
  hero: Record<string, string>;
  menu: Record<string, string>;
  effects: Record<string, boolean>;
  agent_notes: string[];
}

export interface ContentGenerationRules {
  version: string;
  project: {
    client: string;
    city: string;
    language: string;
  };
  brand_voice: {
    tone: string[];
    style_rules: string[];
  };
  event_content_rules: {
    description_length: string;
    required_elements: string[];
    example_structure: string[];
  };
  social_media_posts: {
    platforms: string[];
    post_length: string;
    include: string[];
    hashtags_default: string[];
  };
  seo_content: {
    blog_topics: string[];
    target_keywords: string[];
    article_length: string;
  };
  event_templates: Record<
    string,
    {
      headline_template: string;
      cta: string;
    }
  >;
  agent_notes: string[];
}

export interface ResolvedGalleryImage {
  name: string;
  file: string;
  description: string;
  source_status: string;
  src: string;
  isPlaceholder: boolean;
}

export interface ResolvedMedia {
  heroVideoPath: string | null;
  logoPath: string | null;
  galleryImages: ResolvedGalleryImage[];
  menuImages: Array<{
    name: string;
    file: string;
    description: string;
    src: string;
    isPlaceholder: boolean;
  }>;
  placeholderImagePath: string;
}

export interface SiteData {
  clientProfile: ClientProfile;
  openingHours: OpeningHours;
  events: EventsData;
  menu: MenuData;
  siteContent: SiteContent;
  mediaManifest: MediaManifest;
  uiLayout: UiLayout;
  seoSchema: SeoSchema;
  projectManifest: ProjectManifest;
  designSystem: DesignSystem;
  contentGenerationRules: ContentGenerationRules;
  media: ResolvedMedia;
}
