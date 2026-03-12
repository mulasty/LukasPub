# Codex Master Prompt
Project: Lukas Pub Dance Club Website

You are a senior full-stack developer and UX engineer.

Your task is to generate a production-ready website for a nightclub.

Client:
Lukas Pub Dance Club
Location: Łomża, Poland

The project repository already contains structured data and blueprint instructions.

Your responsibility is to read these files and generate a working website.

--------------------------------------------------

# 1. Technology Requirements

Framework:
Next.js

Language:
TypeScript

Styling:
Tailwind CSS

Animation Libraries:
GSAP ScrollTrigger
Framer Motion

Smooth Scroll Engine:
Lenis

Deployment target:
Vercel

--------------------------------------------------

# 2. Data Sources

All content must be loaded dynamically from the /data directory.

Files to read:

data/client_profile.json  
data/opening_hours.json  
data/events.json  
data/menu.json  
data/site_content.json  
data/media_manifest.json  
data/ui_layout.json  
data/seo_schema.json  
data/project_manifest.json  

Never hardcode data inside components.

--------------------------------------------------

# 3. Page Layout

The website must be a one-page scrolling layout.

Sections order:

Hero  
About Club  
Events  
Gallery  
Menu  
Reservation  
Location  
Social Media  
Footer

Navigation must scroll smoothly between sections.

--------------------------------------------------

# 4. Hero Section

Fullscreen hero section.

Background:
Video from media_manifest.json

Content:
Title
Subtitle
CTA buttons

Animations:

- slow zoom video
- fade-in headline
- scroll indicator

--------------------------------------------------

# 5. About Section

Two column layout.

Left:
Text description.

Right:
Image or visual element.

Load text from:

site_content.json

--------------------------------------------------

# 6. Events Section

Render weekly events from:

events.json

Display as event cards.

Each card should include:

event name  
day  
description

Add hover animation.

--------------------------------------------------

# 7. Gallery Section

Display club photos.

Use masonry grid layout.

Images loaded from:

media_manifest.json

Add parallax scrolling effect.

--------------------------------------------------

# 8. Menu Section

Interactive menu.

Load data from:

menu.json

Categories must include:

drinks  
beer  
cocktails  
shots  
food  

Desktop layout:
tabs

Mobile layout:
accordion

--------------------------------------------------

# 9. Reservation Section

Create reservation form.

Fields:

name  
phone  
number of guests  
date

Design must match nightclub style.

--------------------------------------------------

# 10. Location Section

Embed Google Maps.

Show club address.

Data from:

client_profile.json

--------------------------------------------------

# 11. Social Media Section

Display social links.

Primary platform:
Facebook

Load links from:

client_profile.json

--------------------------------------------------

# 12. Design Style

The website must look like modern nightclub websites from Miami or Ibiza.

Visual style:

dark background  
neon accents  
cinematic atmosphere

Color palette:

#0B0B0F background  
#FF007A neon pink  
#00E0FF neon blue  
#FFD000 accent gold

Typography:

Headlines:
Bebas Neue

Body text:
Inter

--------------------------------------------------

# 13. Animations

Hero

slow zoom background

Sections

scroll reveal animations

Gallery

parallax movement

Buttons

neon glow hover

Menu cards

hover lift effect

Animations must remain smooth and lightweight.

--------------------------------------------------

# 14. Mobile Requirements

Mobile-first design.

Gallery layout:

desktop → 3 columns  
tablet → 2 columns  
mobile → 1 column  

Menu layout:

desktop → tabs  
mobile → accordion  

Hero height on mobile:

90vh

--------------------------------------------------

# 15. SEO

Generate structured data from:

seo_schema.json

Inject JSON-LD into the page <head>.

Use meta tags from:

site_content.json

Ensure semantic HTML structure.

--------------------------------------------------

# 16. Performance

Use Next.js Image component.

Lazy load gallery images.

Optimize hero video.

Avoid unnecessary JavaScript.

--------------------------------------------------

# 17. Build Process

Follow these steps:

1. Read project_manifest.json
2. Load all JSON files from /data
3. Generate components
4. Implement layout from ui_layout.json
5. Apply animations
6. Inject SEO schema
7. Ensure responsive design
8. Prepare for production build

--------------------------------------------------

# Final Goal

Generate a visually impressive nightclub website that promotes Lukas Pub Dance Club and encourages visitors to attend events.