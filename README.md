---

# Data Flow

All website content should be generated dynamically from JSON files.

Example:

menu.json → MenuSection  
events.json → EventsSection  
site_content.json → text content  
media_manifest.json → images and videos  

Do not hardcode content.

---

# Component Responsibilities

HeroSection

- display hero title
- background video
- CTA buttons
- scroll indicator


AboutSection

- club description
- feature list


EventsSection

- render weekly events
- event cards


GallerySection

- display club photos
- masonry grid


MenuSection

- interactive drink and food menu
- filter categories


ReservationSection

- table reservation form


LocationSection

- display Google Maps
- show address


SocialFeedSection

- embed social media feed


Footer

- contact
- copyright
- social links

---

# Animation Rules

Hero

- slow zoom background video

Sections

- scroll reveal

Gallery

- parallax image movement

Menu

- hover lift cards

Buttons

- neon glow hover

---

# Mobile Rules

Use mobile-first design.

Gallery columns:

desktop: 3  
tablet: 2  
mobile: 1  

Menu layout:

desktop → tabs  
mobile → accordion  

---

# SEO Rules

Generate schema.org structured data using seo_schema.json.

Add meta tags using site_content.json.

Use semantic HTML structure.

---

# Performance

Use Next.js Image component.

Lazy load gallery images.

Optimize video for hero.

---

# Agent Instructions

1. Read project_manifest.json
2. Load all JSON data from /data
3. Generate components listed in manifest
4. Build responsive one-page layout
5. Implement animations
6. Inject SEO schema
7. Ensure production readiness