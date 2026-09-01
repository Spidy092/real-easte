# BhaivaTech Homes design system

**Status:** Approved and implemented as a static preview

## Product surface

Warm, human property discovery for Bengaluru. The parent brand remains recognizably BhaivaTech through the supplied logo and blue accent. The property experience is quieter and more residential than a portal dashboard.

## Visual world

- Light warm stone surfaces with system-aware dark tokens.
- Deep charcoal typography and one blue brand accent.
- Newsreader for short display headlines and DM Sans for navigation, forms, and listing facts.
- Quiet borders, moderate radius, no gradients, no glass, and limited motion.
- Real generated residential photography for the preview. Live property imagery must come from client-approved listings.

## Layout rules

- The landing page opens with a split hero, two intent paths, and a useful image.
- Rent and Buy are equal entry points.
- Content sections vary between intent panels, property previews, editorial split sections, locality links, guides, FAQ rows, and a lead form.
- Mobile collapses every multi-column layout below 768px.
- Hero copy stays concise enough to fit the first viewport.

## Interaction rules

- Mobile navigation opens from a visible Menu button.
- FAQ answers open with real buttons and `aria-expanded` state.
- Catalogue filters update the visible preview cards and can be shared through query parameters.
- Property preview pages retain `intent` and `locality` context from catalogue links.
- Lead forms show a local success state until the client confirms the production destination.
- Motion remains limited to hover and feedback transitions and respects reduced motion.

## SEO rules

- Regular HTML pages with descriptive titles and meta descriptions.
- Structured listing data should generate property pages when live inventory exists.
- Locality pages are created only when the client has current inventory and original local information.
- Demo catalogue and property pages are noindex until real listing data is connected.
- Replace the canonical host, sitemap host, social metadata, and contact details before launch.

## Launch blockers

- Exact property subdomain.
- Client-approved listing records and image permissions.
- Definition and evidence for “checked” or “verified.”
- Form destination, WhatsApp number, response expectation, privacy copy, and legal review.
- Final locality coverage and language support.
