# Kampuram Media catalogue demo

A responsive client demonstration built with plain HTML, CSS and JavaScript. No build step or dependencies are required.

Open `index.html` directly, or serve this folder with `python -m http.server 8080` and visit http://localhost:8080.

## Demo content

- The supplied transparent `assets/kampuram-logo.png` is used for branding, with padding trimmed in `kampuram-logo-trimmed.png`. The globe is exported as `kampuram-symbol.png` for the About artwork and `favicon.png` for the browser tab. The original file is preserved. The logo reads Kampuram Digi World; page copy retains the previously requested company naming.
- Photography is illustrative, not the company's actual work. The images are stored locally. Google Fonts are loaded online, with system sans-serif fallbacks.
- The homepage Media navigation, Media business-card link and footer Media link open `kampuram-media.html`. Cards navigation and its business link open `cards-kendra.html`. Books navigation and the Books business link open `kampuram-books.html`. Admin remains future work.
- Business buttons and WhatsApp buttons use the same contact handler. The shared `WHATSAPP_NUMBER` in `script.js` is configured to the supplied business number, `919388002975`. Buttons open WhatsApp with a prefilled enquiry.
- The location panel shows the supplied address at Madari Tower, Near Civil Station, Kacherippadi, Manjeri – 676121, Malappuram District, Kerala, India, with a phone link and a Google Maps address-search link. Social links are omitted until real account URLs are supplied.
- Copy is proposed for design review and should be confirmed before publication. About follows the hero and covers the company story, experience, Kerala location, and a proposed mission. The experience value `15+ years` remains user-authorized dummy content and must be verified before publication. The location is now the supplied Manjeri address.

## Image assets

The current homepage uses three images generated with the built-in image generation tool and optimized to local JPEGs:

- `assets/writer-desk.jpg`: a Kerala-inspired writer’s desk for the hero.
- `assets/advertising-creatives.jpg`: illustrative posters and a video-ad preview for Kampuram Media.
- `assets/literary-books.jpg`: literary paperbacks with Kerala-inspired covers for Kampuram Books.
- `assets/invitations.svg`: original wedding invitation illustration; names are illustrative.

These are demo images, not the founder’s actual desk, completed client campaigns, or books available for sale. The founder’s writing and literary background informed their direction. Exact generation prompts are recorded in `assets/image-prompts.json`.

Earlier Unsplash samples remain unused in the assets folder: `creative-studio.jpg` (photo-1497215728101-856f4ea42174), `media.jpg` (photo-1541462608143-67571c6738dd), and `books.jpg` (photo-1512820790803-83ca734da794).

## Business logos

The three homepage cards use their supplied business logos in compact flex rows, pairing a contained logo badge with its category and business name. `kampuram-ad-media-trimmed.png` trims transparent padding from the supplied advertising logo. `cardskendra-logo-trimmed.png` is a cropped render of the supplied `cardskendra-logo.pdf`, preserving its colors and tagline. The Books card uses `kampuram-books.png`. Original files and main homepage branding are preserved.

## Earlier data seed

Stage 1 is ready in `data/`: a shared listing schema, 10 sample Media ads (seven images and three videos), and site settings. See `data/README.md` for the original contract and roadmap; the later HTML/CSS/JS-only instruction superseded its review stops for the static page. Sample image records reuse the existing illustrative ad artwork; video records reuse one local silent clip and its captured poster. These fixtures are not real completed campaigns. The original stage left Home unchanged; subsequent authorized navigation updates link Home to the catalogue.

## Static advertisement page

Open `kampuram-media.html` directly or visit `/kampuram-media.html` on the local server. This page is buildless HTML, CSS and JavaScript, with no package installation or backend. The homepage now links to the advertisement page through the Media menu item, business-card button and footer link, as requested.

- `catalogue-data.js` contains 10 demo ads, 6 sample Cards Kendra invitations and 6 sample books and the shared contact settings used throughout the new page. Edit this file for the static demonstration; the earlier JSON seed under `data/` is not fetched by the page.
- All / Images / Videos filters use `?filter=all`, `?filter=images`, and `?filter=videos`. Live title/description search is stored as `?q=` and works with the selected filter. Search ignores case and Latin accents; multiple words must all match. Browser Back/Forward restores both controls. A clear button and friendly no-results state are included.
- The grid is four columns above 1100px, two from 701–1100px, and one at 700px and below. Media frames are 4:3 and cover-cropped. The card builder accepts the section's media shape and video policy.
- Image creatives load lazily. Video elements and their source URLs are created only after Play is pressed. User-initiated playback starts muted with native controls; only one video plays at a time.
- Each batch contains 12 ads. The supplied 10-item sample set has no remaining batch, so Load more is hidden.
- The page includes loading placeholders, empty-filter states, media error feedback, accessible filter controls, and reduced-motion support.
- Seven original SVG poster designs are illustrative demo artwork, not real client campaigns. Three video entries reuse a single short silent clip; prices are fictional. Production image uploads remain JPG/PNG/WebP.
- Admin, authentication, uploads and production persistence are deferred, per the instruction to build only HTML/CSS/JS now.

Prices in `catalogue-data.js` are numeric amounts or `null`. The shared formatter renders `₹ 6000/-` style automatically, without per-creative/video/design units.

Cards Kendra adds a fixed `per card` label when rendering a price, for example `₹ 85/- per card`. Missing prices remain hidden; Media prices have no unit.

The Media page uses the Admedia logo in its navbar and footer. Search sits directly left of the media filters. Catalogue cards use compact spacing and 13px highlighted prices. `AGENTS.md` is the maintained handoff reference for current state and decisions.

## Cards Kendra page

Open `cards-kendra.html` directly or visit `/cards-kendra.html` on the local server. Home and Media link to it. It uses `cards-kendra.css` over the shared catalogue styles and the same `kampuram-media.js` engine, selecting the Cards section through its body data attribute.

The page has Cards Kendra branding, a wedding invitation banner, title/description search with URL persistence, a 4/2/1 responsive square-image grid, compact optional rupee prices, WhatsApp enquiries and the confirmed Manjeri contact details. It has no media filters because Cards is image-only. Six generated invitation mockups and fictional prices illustrate the catalogue; they are not actual stock. Assets and exact prompts are in `assets/cards/` and `assets/cards/image-prompts.json`.

The active JS seed and earlier JSON seed each have 22 records (10 Media, 6 Cards, 6 Books). Public pages only load the JS seed. Browser checks covered desktop/tablet/mobile layout, 320px overflow, search/refresh/reset, mobile menu and the existing Media filters after sharing the engine. `AGENTS.md` records the current implementation and remaining production work.

## Kampuram Books page

Open `kampuram-books.html` directly or on the local server. Linked from Home's navbar, Books business link and every public page's Books navigation/footer. The page follows PDF page 6: supplied Books branding, literary banner, portrait 3:4 covers, titles, descriptions, optional compact prices and WhatsApp enquiries. It uses the shared catalogue engine with URL-backed search, responsive 4/2/1 columns and no video filters. No framework, detail page, checkout or backend was added.

Six native SVG jackets in `assets/books/` are original illustrative covers for fictional titles, with demo descriptions/prices. They are not real Kampuram publications or stock. Each vector is 900 × 1200; replace with real covers and approved details before launch. The existing literary hero photograph is also illustrative. Price display has no unit on Books; `per card` remains Cards-only.

Verified desktop/tablet/mobile layouts, 320px overflow, search persistence and empty/reset states, optional prices, cover loading, correct enquiry URLs and working Home links. JavaScript syntax and data/asset checks pass. Project memory is maintained in `AGENTS.md`.

## Contact page

`contact.html` adds a fifth public page with company branding, a literary banner, WhatsApp and phone links, the supplied Manjeri address, Google Maps address-search directions, and links to the three businesses. Every navbar and footer now includes Contact, and header “Let’s talk” links open it. Existing inline contact sections remain.

`contact.css` handles the responsive two-column/stacked contact layout. It reuses `script.js` for the menu and motion, with an optional-dialog guard and a versioned script URL. Direct contact links work without JavaScript. Contact URLs in markup use the confirmed number; future shared admin settings must unify these with Home and catalogue settings. No email, opening hours, enquiry form or exact map pin is assumed.

Verified desktop, tablet and narrow mobile layout, menu expansion, working Contact navigation, phone/WhatsApp/directions URLs, local imagery and JavaScript syntax. No backend or deployment was added.
