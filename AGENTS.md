# Agent guidance

## Project

Kampuram Media is a single company website showcasing three businesses. It is a catalog and portfolio site whose purpose is to send visitors to WhatsApp, not an online store.

The founder is a writer from Kerala with a close connection to literature. Reflect this through warm, literary, Kerala-inspired imagery rather than generic corporate-office or business-book photography. Do not invent his name, biography, published works, or awards.

## Current scope and decisions

- The production stack is undecided: Laravel + React and Next.js are under consideration. Do not select or scaffold either stack without instruction.
- The planned first deliverable is a homepage demonstration in plain HTML, CSS, and JavaScript for client review of the theme and UI style.
- Homepage development is authorized in plain HTML, CSS, and JavaScript. Scope is a local client demonstration; production catalogs and admin are not yet authorized.
- Keep this file updated with confirmed project requirements and decisions as the user supplies them.

## Public pages

There are four public pages:

- **Home:** company introduction, about, why choose us, contact, and links to the three businesses.
- **Kampuram Media:** advertising work presented as images and videos, with All / Images / Videos filters.
- **Cards Kendra:** wedding card listings.
- **Kampuram Books:** book listings.

Every public page has a banner, menu, content section, WhatsApp contact, and footer.

## Listings and contact

- Each listing is a simple box containing an image or video, heading, description, optional price, and a WhatsApp button.
- Listing boxes are not clickable and have no detail pages.
- WhatsApp buttons open a chat with a prefilled message such as `Hi, I am interested in: [name]`.
- Use one shared WhatsApp number across the entire site, configurable by the owner through the admin dashboard.
- Do not introduce cart, checkout, payment, or other online store flows.

## Admin dashboard

- The private `/admin` area requires login.
- The owner must be able to add and delete listings without coding.
- New listings appear on the public site immediately.
- The owner can change the shared WhatsApp number.
- Banner management is planned for later; do not assume it is part of the initial implementation.

## Design direction

- Use a clean, image-first, mobile-first catalog layout that prioritizes WhatsApp contact.
- Use a white or off-white background, dark text, and orange as the primary brand accent, as confirmed by the user. Prices use the accent color; WhatsApp buttons retain recognizable green.
- The supplied catalog screenshot is a visual reference for a soft neutral background, rounded panels and cards, subtle shadows, and generous spacing. Its car-rental content and controls are not project requirements.
- Use an imagined temporary logo with the latest requested parent-brand spelling, `Kampuran Media`, until the original logo arrives. Earlier requirements use `Kampuram Media`; the business names retain their supplied spellings pending confirmation.
- Keep the interface quiet so photos, advertisements, and book covers provide the color. Use generous spacing, rounded corners, and soft card shadows without heavy decoration.
- Use a clean sans-serif for UI text. A serif accent for Cards Kendra and Kampuram Books headings is a proposed option.
- Keep uploaded images visually consistent despite varying source quality through predictable media frames and suitable cropping.
- The homepage banner uses a writer’s desk, notebook, pen and books. The Kampuram Media business card should depict finished advertising creatives (images and video campaigns); Kampuram Books should depict literary books rather than business/self-help titles. Current generated assets are illustrative demo content, not actual company work, founder photography, or book inventory.

### Public layout

- Use a continuous white/off-white page background with no outer gradient, framed container, outer rounded corners, or decorative page shadow. Keep content centered with responsive side padding.
- Sticky header: logo on the left, four page links on the right, and a hamburger menu on mobile.
- Banners: plan responsive imagery with a separate mobile crop (for example, 4:3) or a controlled focal point and cover behavior. Avoid relying on a wide 1600x500 crop on phones. Use a dark gradient behind banner text for readability.
- Home section order: hero banner, About, three business cards (image, one-line summary, link), why choose us (3 to 4 icons with short text), then contact with a map. About must cover company story, years of experience, location, and mission. Use the confirmed founder/writer and Kerala background; the user explicitly authorized dummy values for the demo: `15+ years` and `Kozhikode, Kerala`. These are illustrative, not verified facts; replace them with client-confirmed details before publication. Mission copy is a proposal for client review. Keep content short and scannable.
- Listing media: consistent aspect ratios, with 1:1 or 4:3 proposed for wedding cards and 3:4 for books. Use a one-line heading, descriptions clamped to 3 or 4 lines, optional accent-colored price, and a full-width WhatsApp button at the bottom.
- Use recognizable WhatsApp green for contact buttons, plus a floating WhatsApp button at the bottom-right of every public page.
- Kampuram Media filters use pill-style All / Images / Videos tabs. Videos show a poster and play icon, load on play, and never autoplay with sound.
- Footer: simple menu links, social icons, and copyright.

### Proposals requiring confirmation

- Confirm Malayalam support or bilingual content with the client; Noto Sans Malayalam and Manjari are suggested font options.
- A two-column mobile grid for Cards Kendra and Kampuram Books is a proposal to compare with the stated one-column plan; the column count is not finalized.
- Tap-to-enlarge image lightboxes require client confirmation. Until approved, retain non-clickable listing boxes and no detail pages.
- A referenced PDF has not been supplied or reviewed. Do not infer additional requirements from it.

### Admin UI direction and tooling proposals

- Use a separate, plain admin layout with a left sidebar, large buttons, and clear labels. Proposed navigation: Add listing, All listings, WhatsApp number, and later Banners.
- Include confirmation before deletion and upload progress feedback when admin implementation is authorized.
- Tailwind, shadcn/ui for admin, Next.js `next/image`, and Embla for banners were suggested tools, not a finalized stack. The production stack remains undecided and the initial homepage demo remains plain HTML, CSS, and JavaScript.
- Homepage development is now requested. Do not expand into other pages, admin, or a production framework without instruction.

## Working conventions

- Read existing code and documentation before making changes.
- Keep changes focused on the requested task.
- Preserve unrelated work and avoid destructive commands unless explicitly authorized.
- Do not commit credentials, secrets, or local environment files.
- Document setup steps and required environment variables when adding tooling.

## Validation

- Run the relevant checks when build, lint, or test commands are available.
- Do not claim checks passed unless they were run successfully.
- Summarize changes, validation results, and any remaining limitations.
