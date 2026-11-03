# Kampuran Media homepage demo

A responsive client demonstration built with plain HTML, CSS and JavaScript. No build step or dependencies are required.

Open `index.html` directly, or serve this folder with `python -m http.server 8080` and visit http://localhost:8080.

## Demo content

- The supplied transparent `assets/kampuram-logo.png` is used for branding, with padding trimmed in `kampuram-logo-trimmed.png`. The globe is exported as `kampuram-symbol.png` for the About artwork and `favicon.png` for the browser tab. The original file is preserved. The logo reads Kampuram Digi World; page copy retains the previously requested company naming.
- Photography is illustrative, not the company's actual work. The images are stored locally. Google Fonts are loaded online, with system sans-serif fallbacks.
- Business navigation points to the three homepage cards. Only the homepage is implemented; public catalog pages and admin are future work.
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
