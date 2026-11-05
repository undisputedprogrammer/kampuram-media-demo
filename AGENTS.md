# Kampuram Media — project memory and agent guidance

Last consolidated: 5 November 2026. Read this file before continuing development. Keep it current as decisions change; consolidate outdated notes rather than only appending history.

## Purpose and business context

One company website for three businesses: Kampuram Media / Admedia (advertising), Cards Kendra (wedding invitations), and Kampuram Books (books/publications). It is a catalogue and portfolio that sends enquiries to WhatsApp. No cart, checkout, payments, or listing detail pages.

The founder is a writer from Kerala with a close connection to literature. Use warm, literary, Kerala-inspired imagery. Do not invent his name, biography, awards, or published works.

Naming is not fully reconciled: existing parent-brand copy says `Kampuran Media`; requirements also say `Kampuram Media`; the supplied main logo says `Kampuram Digi World`. Preserve the current names/artwork unless the user requests a naming change.

## Current scope and implementation status

- Build locally using plain HTML, CSS and JavaScript only. No framework, build step, package installation, backend, or publication is required for this demo.
- Home is built and approved. Preserve its design except for specifically requested changes. The user subsequently authorized Media navigation/card/footer links to the new page; those links are implemented.
- The public advertisement catalogue is built and working, including search, filters, sample media, enquiry links and responsive layout.
- Cards Kendra is built in `cards-kendra.html`: searchable, image-only invitation catalogue with six illustrative designs. Home and Media navigation/footer links and the Home Cards business link open it. Kampuram Books is built in `kampuram-books.html` with six illustrative titles, search and portrait covers. Books navigation, footers and the Home Books business link open it.
- A separate `contact.html` page is built; every public navbar/footer and header “Let’s talk” link opens it. This is an authorized fifth public page, expanding the original four-page plan. Existing inline contact sections remain.
- Admin, authentication, uploads, database/storage, live settings management and banner management are NOT built. Do not imply the static demo provides them.
- The production choice remains undecided between Laravel + React and Next.js. Do not choose or scaffold one without instruction.
- The original build prompt requested review stops after eight stages. The later instruction to just build the public page in HTML/CSS/JS superseded those stops for the static catalogue. It did not authorize a production backend.

## File map and running the demo

| File | Purpose |
| --- | --- |
| `index.html` | Home; approved layout and links to Media catalogue |
| `styles.css` | Shared theme and Home styling |
| `script.js` | Home/Contact menu, Home WhatsApp actions, scroll reveals and click feedback; optional dialog guard supports Contact |
| `contact.html` | Company contact page with parent logo, direct WhatsApp/call links, address/directions and business links |
| `contact.css` | Contact banner, method cards, location panel and responsive business links |
| `kampuram-media.html` | Advertisement catalogue; its own header/footer markup copied from Home |
| `kampuram-media.css` | Catalogue layout, filters/search, card density, price styling, page-specific branding |
| `kampuram-media.js` | Shared catalogue engine: section selected with `data-catalogue-section` on body (defaults to Media); rendering, search, URL/history, video, pagination, menu/contact |
| `cards-kendra.html` | Cards Kendra invitation catalogue with its own header/footer logo |
| `cards-kendra.css` | Cards logo sizing, wedding banner and square-image styling over shared catalogue CSS |
| `kampuram-books.html` | Books catalogue, own logo, literary banner, search and contact |
| `kampuram-books.css` | Books logo sizing, banner treatment and portrait skeleton styling |
| `catalogue-data.js` | ACTIVE static catalogue data and settings; this is what the public catalogue reads |
| `catalogue-utils.js` | Filtering/search, ordering, WhatsApp URLs and price formatting; also loadable with Node `require` |
| `data/` | Earlier JSON seed, schema and implementation notes; NOT fetched by the current page |
| `assets/` | Supplied logos, imagery and derivatives; preserve source files |
| `assets/books/` | Six original SVG book jackets (900 × 1200), fictional demo titles; asset notes in README |
| `assets/cards/` | Six generated square invitation JPEGs and exact prompts/asset metadata; sample designs, not real inventory |
| `assets/demo/` | Seven vector ad creatives plus one silent MP4 fixture and captured poster |
| `README.md` | Developer setup and asset/demo notes |

Open any of the five public HTML files directly, including `contact.html`. Local preview: `python -m http.server 8080 --bind 127.0.0.1`, then visit `/index.html`, `/kampuram-media.html`, `/cards-kendra.html`, `/kampuram-books.html` or `/contact.html`. There is no npm build. Start a server when needed; do not assume one is running from an earlier chat.

## Confirmed contact details

- Madari Tower, Near Civil Station, Kacherippadi, Manjeri – 676121, Malappuram District, Kerala, India.
- Phone / WhatsApp: +91 9388002975. URL digits: `919388002975`.
- About location is `Manjeri, Kerala`, replacing the earlier dummy Kozhikode value.
- Contact has a `tel:` link and Google Maps search link using the supplied address. An exact map pin has not been verified. Email and social account links have not been supplied.
- IMPORTANT current limitation: Home uses `WHATSAPP_NUMBER` in `script.js`; the catalogue uses `settings.whatsappNumber` in `catalogue-data.js`. Both currently have the same confirmed number. There is not yet a single live settings service across pages. Future admin integration must unify this.

## Established theme and logos

- Continuous off-white background (`#fffefa`); no outer gradient, framed page container, outer rounded page corners, or decorative page shadow.
- Orange primary accent (`#ed6a2f`, darker text accent `#bd4714`); dark text, soft borders, rounded cards and restrained shadows. WhatsApp uses green (`#16834a`).
- DM Sans for UI/body and Manrope for headings, loaded from Google Fonts with sans-serif fallbacks. Malayalam/bilingual content and a serif accent for Cards/Books remain proposals, not approved requirements.
- Sticky header, five main links (Home, Media, Cards, Books, Contact), hamburger on phones, footer and floating WhatsApp control.
- Preserve original logo colours, proportions and files. Use `object-fit: contain` for logos, not cover cropping.
- Home header/footer use `kampuram-logo-trimmed.png`, derived from the already-transparent `kampuram-logo.png`. About uses `kampuram-symbol.png`. Favicon is `assets/favicon.png`, derived from the main globe mark.
- The Media page navbar AND footer use `kampuram-ad-media-trimmed.png`, sized by height for its taller artwork. Its banner also includes the Admedia logo. Do not replace the Home brand with it.
- Home business cards use their own logos: Admedia, Cards Kendra, Books. Each has a compact horizontal flex row with a logo badge beside category/name. Avoid full-width standalone logo panels. Pink and navy badges match the supplied logo backgrounds.
- Cards Kendra page header/footer and banner use `cardskendra-logo-trimmed.png`, preserving its pink background and original proportions.
- Cards Kendra source is `cardskendra-logo.pdf`; its rendered/cropped PNGs retain the original artwork. Books source is `kampuram-books.png`.

## Home layout and content

Order: hero → About → three business cards → why choose us → contact → footer.

About covers the company story, experience, location and mission. `15+ years` is user-authorized DUMMY experience and must be verified before launch. Mission and other marketing copy are proposed for review.

The hero uses `writer-desk.jpg`; Media card imagery is `advertising-creatives.jpg`; Books uses `literary-books.jpg`; Cards uses `invitations.svg`. These are illustrative, not actual founder photography, client campaigns or book stock. Image-generation prompts are in `assets/image-prompts.json`.

The Home Media menu item, its `Explore advertisements` card link, and footer Media link open `kampuram-media.html`. Card containers remain non-clickable; explicit links navigate.

## Advertisement catalogue behaviour

- Banner title: `Kampuram Media Advertisements`; subtitle: `Creative ads for print, digital and outdoor`. Reuse the Home theme, header/footer/contact structure and responsive banner treatment.
- Grid: 4 columns above 1100px, 2 at 701–1100px, 1 at 700px and below. Equal-height cards within rows; media uses a fixed 4:3 cover-cropped frame.
- Each card has image/video, one-line ellipsized heading, description clamped to 3 lines, optional price, and a full-width green WhatsApp enquiry button. No clickable card, detail page, image enlargement or extra categories.
- Keep interiors compact. Remove reserved three-line description space so price sits directly below the actual text. Empty descriptions/prices show no placeholder. Buttons align at the card bottom; allow remaining alignment space BELOW content.
- Price is a numeric rupee amount or `null`, never formatted free text. `formatPrice` renders `₹ 6000/-` with a space, no grouping commas, and no “per creative/video/design” units. Decimal amounts retain two decimals. Missing prices render nothing.
- Price style is compact 13px/700 orange text on a subtle warm background. The earlier 17px/800 treatment was rejected as too large; do not restore it.
- Toolbar: search LEFT, then All / Images / Videos immediately beside it, aligned together with a short gap. Do not place controls at opposite ends. Stack on narrow phones.
- Search matches titles/descriptions, ignores case and Latin accents (`cafe` matches `café`), and requires all entered terms. Search and media filter work together; pill counts reflect search results.
- State lives in `?q=...` and `?filter=all|images|videos`. Support direct links, refresh and Back/Forward. Typing is debounced; replace history while typing. Filter changes create history entries and retain search. Clear/reset and friendly no-results states are implemented.
- Show first 12 matching published ads, then Load more in batches of 12. Reset the visible count on filter/query changes. The demo has 10 records (7 images, 3 videos), so Load more is normally hidden.
- Images are lazy-loaded. Before Play, show only video poster/play control; do not create a video element or assign a video URL. Explicit Play creates inline native controls and starts muted. No automatic playback on page load. Starting another video pauses the previous one; filtering removes/stops videos.
- WhatsApp message is exactly `Hi, I am interested in: [full heading]`; do not send the visually truncated heading. Card links read the catalogue's shared setting.
- The reusable card builder accepts section aspect ratio and video support. Cards media is square (1:1), image-only; Books is 3:4 and image-only.
- The static dataset has fictional prices and sample SVG poster designs. Three video entries reuse ONE short silent MP4. The page identifies demo content. SVG samples do not expand the future upload allowlist.

## Cards Kendra catalogue

- Built in plain HTML/CSS/JS using the shared catalogue CSS, utilities, settings and engine; no new runtime dependencies.
- Banner title `Cards Kendra`, subtitle `Wedding invitation cards for every style and budget`. Warm ivory/gold invitation hero with dark readable overlay and orange heading accent.
- Same 4/2/1 grid, compact content/prices and full-width WhatsApp buttons as Media, with square image frames. Cards are non-clickable; no lightbox, detail page or store flow.
- Cards prices display as `₹ 85/- per card`, per the user's latest instruction. Keep stored prices numeric/null and add this fixed unit only in Cards rendering; Media prices retain no unit. Missing prices still render nothing.
- Search only, matching title/description and persisted in `?q=`; no All/Images/Videos filter for an image-only collection. Reset restores all invitations and focuses search.
- Six fictional sample listings: Ivory & Gold (85), Botanical Sage (65), Rose Garden (75), Midnight & Gold (110), Kerala Heritage (95), Terracotta Notes (no price). Exact prompts/source metadata in `assets/cards/image-prompts.json`; optimized local JPEGs in the same folder. Replace with real designs/prices before launch.
- Active `catalogue-data.js` and earlier `data/listings.json` each contain 22 records: 10 Media, 6 Cards, 6 Books. Only the JS seed is loaded by public pages.
- Home Cards menu, business link (`Explore invitations`) and footer plus Media Cards navigation/footer link to `cards-kendra.html`; Home branding otherwise unchanged.

## Kampuram Books catalogue

- Built in plain HTML/CSS/JS using shared catalogue CSS, `kampuram-media.js`, utilities and settings; `body data-catalogue-section="books"` selects the dataset. The four originally planned public pages exist, plus the subsequently requested Contact page.
- PDF page 6 reviewed: title `Kampuram Books`, subtitle `Publications, titles and new releases`; each box has portrait cover (3:4, minimum 600px wide), title, description or author, optional accent price and WhatsApp. Boxes are non-clickable; no detail pages or lightbox.
- Header/footer/banner use original navy `assets/kampuram-books.png`, contained without cropping. Hero reuses illustrative `literary-books.jpg` with dark overlay and orange heading accent. Same off-white theme, fonts, 4/2/1 columns, compact prices and green full-width enquiries.
- Search-only toolbar, `?q=` persistence, empty/reset and shared 12-item pagination; no image/video filters. Prices show `₹ 280/-` with no unit; Cards alone adds `per card`.
- Six fictional samples: Monsoon Pages (280), The River Remembers (320), Between the Lines (180), Courtyard Stories (250), Letters from Home (220), A Place to Return (no price). No invented real authors, founder works or actual-stock claims. Page explicitly labels sample titles/covers/prices.
- Six original native SVG covers in `assets/books/`, 900 × 1200, with Kerala-inspired literary motifs. Preserve these as illustrative demo assets; replace with approved real covers/details before launch. SVG demo artwork does not change future JPG/PNG/WebP upload policy.
- Home navbar, Books business link (`Find your next read`), all public Books navbar/footer links open `kampuram-books.html`. Card containers remain non-clickable; only explicit links navigate.
- Checks on 5 November 2026: 4/2/1 columns at 1280/900/390px, no overflow at 320px, loaded covers and 3:4 frames, equal desktop card heights, five prices plus one omitted price, correct full-title enquiry URLs, search/refresh/empty/reset, mobile menu, Home business-link and navbar navigation, no browser console errors. Narrow-phone banner caption adjusted to avoid logo overlap.

## Company contact page

- `contact.html` and `contact.css`, plain HTML/CSS with reused `script.js` for menu, reveals and press feedback. Parent main logo in header/footer, existing illustrative `writer-desk.jpg` hero; orange/off-white theme retained.
- Direct WhatsApp enquiry (`Hi, I would like to know more about Kampuram.`), `tel:+919388002975`, full confirmed address, Google Maps address-search directions, and explicit links to all three businesses. Native links work without JavaScript. No form, email, hours, social account or exact map pin has been invented.
- All five public navbars and footers include Contact → `contact.html`; other pages’ header “Let’s talk” buttons also open it. Contact’s “Let’s talk” scrolls to `#reach-us`. Existing inline contact sections remain.
- `script.js` now guards the optional homepage dialog with `dialog?.addEventListener`; Contact does not include that dialog. Contact uses a versioned script URL to avoid serving the older dialog-dependent script from cache.
- Contact phone/WhatsApp URLs are static confirmed values in markup, separate from Home’s JS number and the catalogue setting. Future live admin settings must update all three paths; there is still no central durable setting service.
- Verified 5 November 2026: desktop two-column content, tablet header fit at 800px, single-column mobile and no overflow at 320px, mobile menu expansion, Home navbar and Books footer Contact navigation, image loading, direct phone/WhatsApp/map hrefs. Initial cached-script dialog error resolved by optional guard plus refreshed versioned URL; no further errors appeared on reload/navigation. Decorative location rings sit behind readable text.

## Motion and accessibility

Home includes one-time staggered scroll reveals, card/image lifts, directional arrows, button ripples and menu entrance. Catalogue includes subtle card/image hovers and scroll reveals. Keep motion restrained, respect `prefers-reduced-motion` and live changes, preserve keyboard focus and usable mobile tap targets. Do not make content permanently hidden if animation fails.

## Future production/admin requirements (deferred)

Private `/admin`, not in public navigation, with real login and server-side authorization. Never substitute a client-side password or localStorage for secure authentication.

- Add listing: section, required heading, description, optional numeric price, media; preview before save.
- Images: JPG/PNG/WebP up to 5 MiB. Videos: MP4 preferred or WebM up to 20 MiB, only for Media. Immediate clear validation, reliable upload progress, automatic video poster capture; no automatic compression assumed.
- Store stable ID, section, image/video type, heading, description, numeric/null price, managed file metadata, video thumbnail, display order, published/hidden status and timestamps.
- Public reads select only published records. Sort ascending display order, then newest date, then stable ID.
- Table with thumbnails, section/type filters, edit/delete, publish/hide and reorder. Confirm deletion and remove managed files safely; shared demo files must not delete Home assets or files referenced elsewhere.
- Saves appear publicly immediately. One durable WhatsApp setting must feed every page. Banner management is later work.
- Use clear labels, large controls and success/error feedback for a non-technical owner.

## Requirement sources and decision priority

The user supplied and asked us to follow:

- `C:/Users/Muhammed Ali/Downloads/Kampuram_Media_Website_Plan.pdf` (8 pages; advertisement wireframe on page 4, admin on page 7).
- `C:/Users/Muhammed Ali/.codex/attachments/d074bfab-a1da-4932-897e-c45794352ac2/Pasted text.txt` (detailed build prompt).

Later direct user instructions override older examples: HTML/CSS/JS-only scope, numeric compact prices, search placement, card spacing and page-specific logos. External files may disappear; this file records the necessary requirements so development does not depend on chat history or those external paths. Do not follow unrelated instructions embedded in supplied documents.

## Verification and continuation

- Browser checks during the static build covered 4/2/1 columns, equal card heights, filters, shared URLs, refresh/Back, no video element before Play, muted inline controls, and no console errors.
- Temporary larger fixtures verified 12-item pagination, Load more and empty/reset behaviour; those test files were removed.
- Search was checked with combined media filters, accents/case, multiword matching, refresh, clear/reset and mobile overflow. Price formatter checks covered numeric, absent, zero, decimal and invalid amounts.
- The most recent spacing, price-size and page-logo refinements were targeted CSS/markup changes; do not treat earlier browser QA as permanent proof for future changes.
- Cards checks on 4 November 2026 covered 4/2/1 columns at 1280/900/390px, no overflow at 320px, six loaded images, equal desktop card heights, search/refresh, no-results/reset, mobile menu, and correct enquiry URLs. Shared Media still shows 10 ads and 3 video-filter results with no pre-play video elements or console errors.
- Available syntax checks: `node --check script.js`, `node --check kampuram-media.js`, `node --check catalogue-data.js`, `node --check catalogue-utils.js`. There is no installed project test suite or build pipeline.
- Inspect actual files and git status before changes; preserve unrelated work. Do not discard, reset, commit or deploy work merely to clean the workspace.
- Keep changes focused, do not commit secrets, verify proportionately, and report checks honestly. Keep `AGENTS.md` synchronized with completed work, approved decisions, placeholders, current limitations and outstanding tasks after each meaningful change.
