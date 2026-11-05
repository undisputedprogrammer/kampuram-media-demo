# Earlier catalogue data seed

This directory preserves the earlier data contract. Public pages load `../catalogue-data.js`, not these JSON files. The seed now also includes six fictional Cards Kendra invitations and six fictional Books listings (22 total records). This stage defines the content contract and supplies 10 illustrative Media ads: seven images and three video entries. The approved homepage files are unchanged. This is a data seed, not a database, public page, or admin implementation.

## Files and contract

- `listings.schema.json`: JSON Schema for all three catalogue sections.
- `listings.json`: editable sample seed data. Every record is marked `isSample: true`; names, descriptions and prices are fictional demo content.
- `site-settings.json`: one shared WhatsApp number, page size, media shape, video support and upload limits.
- `../assets/demo/advertisement-preview.mp4`: small, silent demo motion clip made from the existing illustrative ad artwork. The three sample video records reuse this fixture; they are not three real completed campaigns.
- `../assets/demo/advertisement-preview.jpg`: poster captured from the demo clip. Actual uploaded videos will receive an automatically captured thumbnail in the upload stage.

`id` is stable and independent of the title. Sections are `media`, `cards` and `books`; only Media permits video. Optional descriptions are empty strings. Optional prices are `null` when absent and non-negative numeric rupee amounts when supplied, such as `6000`. The shared formatter displays `₹ 6000/-`, without commas or per-item units. The future admin price field accepts the amount only. This user instruction supersedes the PDF’s earlier free-text price examples. Prices are not checkout amounts. `file` stores the managed asset path, original filename, MIME type and byte size. Video records require a separate image `thumbnail`; image records use `null`.

`displayOrder` is ascending, with `dateAdded` descending and then `id` as deterministic tie breakers. Public reads must select only `published` records for the current section. `hidden` records remain available to authenticated admins. Timestamps use ISO 8601 with an explicit offset. Shared settings are not duplicated on individual records.

Paths are relative to the site root. Resolve them against that root, not the `/data/` directory or the current browser address. Uploaded files will need unique managed storage keys; preserve original names as metadata only. Deleting an upload must check references before removing a file, as demo records deliberately reuse files. Never delete the shared homepage artwork when deleting a sample record.

## Public behaviour to build in later stages

- Shared header, footer, contact section, banner styling, fonts, colours and floating WhatsApp control from Home; do not edit Home.
- Exact banner title: “Kampuram Media Advertisements”. Subtitle: “Creative ads for print, digital and outdoor”. Responsive crop.
- Four columns on desktop, two on tablets and one on mobile. Equal-height non-clickable boxes with 4:3 cover-cropped media, a one-line ellipsized heading, description clamped to three lines, optional orange price and full-width WhatsApp button.
- `?filter=all`, `?filter=images`, `?filter=videos`; default to All. Support direct links, refresh and browser Back/Forward. Reset visible count when the filter changes. Show a friendly empty state.
- First 12 matching published ads, then Load more in batches of 12. The 10-item seed intentionally fits in the first batch; use temporary larger fixtures to verify pagination later.
- Lazy-load images. Display posters without setting a video `src` or adding a video `source` until Play is pressed. Load inline controls on demand; do not start playback or sound automatically.
- Every enquiry reads the current shared number and prefills `Hi, I am interested in: [heading]`.
- Reusable listing component accepts the section's aspect ratio and video policy. No detail pages, lightbox, extra categories or store flows.

## Original staged roadmap

The latest user instruction supersedes the review stops for the static public page: build it now using only HTML, CSS and JavaScript. That implementation is complete in `../kampuram-media.html`; admin and backend work remain deferred. The original roadmap is retained below for reference:

1. Data structure and sample ads (this stage).
2. Reusable box and responsive grid.
3. On-demand inline video playback.
4. URL-backed filters using the listing data.
5. Banner.
6. Validated uploads, progress and automatic video thumbnail capture.
7. Login-protected admin add/list/delete and shared WhatsApp settings.
8. Admin edit, publish/hide, reorder and final polish.

The production framework remains undecided. Before implementing authenticated uploads and durable admin changes, choose Laravel + React or Next.js with the user. JSON seeds do not provide authentication or durable multi-user storage; do not present a client-side password or localStorage as secure admin access. The approved Home currently has its existing number constant; it is deliberately untouched in this stage. Updating that page to read live settings will require resolving the prompt's “do not change Home” constraint before the shared-settings integration stage.
