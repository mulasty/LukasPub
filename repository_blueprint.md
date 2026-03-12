# Lukas Pub Dance Club — Repository Blueprint

Projekt strony dla: Lukas Pub Dance Club  
Location: Łomża, Poland

---

# 1. Project Overview

Project name:  
lukas-pub-website

Project type:  
Nightclub promotional website (landing page, one-page scroll)

Primary goal:  
Promote the club and increase attendance.

Secondary goals:

- Show weekly events
- Present drinks and food menu
- Show club atmosphere
- Enable table reservations
- Connect with social media

---

# 2. Technology Stack

Framework

Next.js

Language

TypeScript

Styling

Tailwind CSS

Animation Libraries

GSAP ScrollTrigger  
Framer Motion

Smooth Scroll

Lenis

Deployment

Vercel

---

# 3. Repository Structure

lukas-pub-website/

assets/
  images/
  videos/

data/
  client_profile.json
  opening_hours.json
  events.json
  menu.json
  site_content.json
  media_manifest.json
  ui_layout.json
  seo_schema.json
  project_manifest.json

components/
  HeroSection.tsx
  AboutSection.tsx
  EventsSection.tsx
  GallerySection.tsx
  MenuSection.tsx
  ReservationSection.tsx
  LocationSection.tsx
  SocialFeedSection.tsx
  Footer.tsx
  Navbar.tsx

lib/
  dataLoader.ts
  schemaGenerator.ts

pages/
  index.tsx

styles/
  globals.css

public/

README.md
repository_blueprint.md

---

# 4. Data Flow

All website content must be generated dynamically from JSON files located in the /data directory.

Mapping examples

menu.json → MenuSection  
events.json → EventsSection  
site_content.json → text content  
media_manifest.json → images and video  

Rule:

Do not hardcode content inside components.

All data must be loaded through a central data loader.

---

# 5. Component Responsibilities

HeroSection

Displays club title  
Background video or image  
Primary CTA buttons  
Scroll indicator animation

AboutSection

Displays club description  
Feature list (dance floor, karaoke, drinks)

EventsSection

Displays weekly events  
Each event displayed as a card  
Uses events.json

GallerySection

Displays club photos  
Masonry grid layout  
Loads images from media_manifest.json

MenuSection

Displays drink and food menu  
Categories loaded from menu.json  
Supports filtering and tabs

ReservationSection

Reservation form fields:

name  
phone  
number_of_people  
date

LocationSection

Displays Google Maps  
Shows club address

SocialFeedSection

Displays social media links  
Optional Facebook embed

Footer

Displays contact information  
Copyright  
Social links

Navbar

Sticky navigation  
Links to sections of the page

---

# 6. Page Structure

The website uses a one-page scroll layout.

Section order:

Hero  
About Club  
Events  
Gallery  
Menu  
Reservation  
Location  
Social Media  
Footer

---

# 7. Animation Rules

Hero Section

Background video slow zoom  
Text fade-in animation

Section transitions

Scroll reveal animation

Gallery

Parallax image movement  
Hover zoom effect

Menu cards

Hover lift animation

Buttons

Neon glow hover effect

---

# 8. Mobile Rules

Mobile-first design.

Gallery layout

Desktop → 3 columns  
Tablet → 2 columns  
Mobile → 1 column

Menu layout

Desktop → tabs  
Mobile → accordion

Hero height on mobile

90vh

---

# 9. SEO Rules

Structured data must be generated using:

seo_schema.json

Meta tags must be generated from:

site_content.json

Use semantic HTML structure:

section  
article  
header  
footer  

Target keywords

klub Łomża  
dyskoteka Łomża  
karaoke Łomża  
impreza Łomża  
pub Łomża

---

# 10. Performance Rules

Use Next.js Image component for all images.

Gallery images must be lazy loaded.

Hero video should be optimized for web playback.

Minimize unnecessary JavaScript.

---

# 11. Media Directory Rules

Images location

assets/images

Videos location

assets/videos

Recommended hero video resolution

1920x1080

Recommended gallery image resolution

1200x800

---

# 12. Agent Build Instructions

Agent must follow this order:

1. Read project_manifest.json
2. Load all JSON files from /data
3. Generate components defined in the manifest
4. Build responsive one-page layout
5. Implement scroll animations
6. Inject SEO schema into page head
7. Ensure production-ready code

---

# End of Blueprint