# PRD.md — Petify

## What this is

Petify is an online storefront for an existing exotic-pet business (fish, birds, squirrels,
micro squirrels, and similar animals/related supplies) that currently sells through WhatsApp
and Instagram. The website lets customers browse a catalog, add items to a cart, and submit an
order — which notifies the admin by email and appears in an admin dashboard. There is no online
payment in v1; payment/fulfillment still happens the way it does today (chat, cash, transfer,
etc.), the website just replaces "DM us a list of what you want" with a proper catalog and cart.

Every piece of content on the site — product info, page text, headings, social media links — is
editable from an admin panel, by people with no coding ability. Nothing should require a
developer to change once v1 ships.

## Who it's for

- **Customers**: exotic pet enthusiasts who currently buy via WhatsApp/Instagram DMs and want
  a proper way to browse the full catalog and place an order.
- **Admins (two tiers)**:
  - *Simple admin*: edits product listings (name, price, images, description, stock, care
    instructions) and social media links. Day-to-day catalog management.
  - *Privileged admin*: everything a simple admin can do, plus editing any text/content
    anywhere on the site (headings, about page, button labels, category list) and managing
    admin accounts.

## Who it's explicitly not for

- Not for general/common pets (dogs, cats) — exotic pets only.
- Not for wholesale/B2B buyers in v1.
- Not building a marketplace for multiple sellers — this is a single business's storefront.

## The 5 core features, ranked

1. **Product catalog** — browse/search/filter exotic pets and related items by
   category/species, each with images, price, description, stock status, care instructions.
2. **Cart + order submission** — customers select multiple products, review a cart, submit an
   order (no online payment); admin is emailed and sees it in the dashboard.
3. **Admin content management** — simple admin manages products; privileged admin manages
   every editable piece of site content, plus admin accounts, all backed by the database (no
   hardcoded text).
4. **Customer accounts** — email/password signup so customers can view their order history and
   (later) save favorites.
5. **Social media showcase** — a section of the site displaying manually-added links/embeds
   from Instagram, Facebook, and YouTube.

## What we are NOT building (v1)

- No online payment/checkout gateway (orders are submitted, not paid, on-site).
- No live/auto-synced social media feeds (links are manually added by admin).
- No wholesale or multi-vendor support.
- No native mobile app (planned for later, this build should not block it).
- No WhatsApp order notifications (email only, for now).
- No reviews/ratings, no loyalty/rewards, no delivery tracking.

## Open questions to revisit later

- Whether/when to add an online payment gateway.
- Whether category list needs sub-categories (e.g. "Fish → Freshwater/Saltwater").
- Whether to add Google/social login for customer accounts.
