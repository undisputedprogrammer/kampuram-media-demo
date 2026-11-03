# Kampuran Media homepage demo

A responsive client demonstration built with plain HTML, CSS and JavaScript. No build step or dependencies are required.

Open `index.html` directly, or serve this folder with `python -m http.server 8080` and visit http://localhost:8080.

## Demo content

- The orange K monogram and Kampuran Media wordmark are temporary. The latest requested spelling is used for the parent brand; the business names retain the earlier supplied spelling.
- Photography is illustrative, not the company's actual work. The images are stored locally. Google Fonts are loaded online, with system sans-serif fallbacks.
- Business navigation points to the three homepage cards. Only the homepage is implemented; public catalog pages and admin are future work.
- Business buttons and WhatsApp buttons use the same contact handler. Set `WHATSAPP_NUMBER` in `script.js` to the real international phone number (digits only). Until configured, an accessible dialog explains the demo rather than contacting an invented number.
- The location panel is a placeholder for the confirmed address and map. Social links are omitted until real account URLs are supplied.
- Copy is proposed for design review and should be confirmed before publication. About follows the hero and covers the company story, experience, Kerala location, and a proposed mission. The user authorized dummy values: `15+ years` and `Kozhikode, Kerala`. Both must be replaced or verified before publication.

## Image assets

The current homepage uses three images generated with the built-in image generation tool and optimized to local JPEGs:

- `assets/writer-desk.jpg`: a Kerala-inspired writer’s desk for the hero.
- `assets/advertising-creatives.jpg`: illustrative posters and a video-ad preview for Kampuram Media.
- `assets/literary-books.jpg`: literary paperbacks with Kerala-inspired covers for Kampuram Books.
- `assets/invitations.svg`: original wedding invitation illustration; names are illustrative.

These are demo images, not the founder’s actual desk, completed client campaigns, or books available for sale. The founder’s writing and literary background informed their direction. Exact generation prompts are recorded in `assets/image-prompts.json`.

Earlier Unsplash samples remain unused in the assets folder: `creative-studio.jpg` (photo-1497215728101-856f4ea42174), `media.jpg` (photo-1541462608143-67571c6738dd), and `books.jpg` (photo-1512820790803-83ca734da794).
