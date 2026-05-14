# Perrine Interiors — NGF Client Site

Staging company website for Perrine Interiors (PerineInteriors.com). Forked/converted from the `staging-website-mockup` static HTML mockup.

## Read this first

The universal foundation for every NGF client website lives at:

- **Canonical URL:** https://raw.githubusercontent.com/Nick-NGFsystems/NGF-Systems-app/main/NGF-STANDARDS.md
- **In-repo copy:** `NGF-STANDARDS.md` (if present and synced)

**Read it before you write any code.**

---

## Client context

- **Client:** Melissa Perrine / Perrine Interiors
- **Domain:** PerineInteriors.com (TBD — set `NEXT_PUBLIC_SITE_URL` when confirmed)
- **Contact email:** perrinematerials@gmail.com (used for form submissions)
- **Scope:** Staging company website only (separate repo/project from her real estate site)

### Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, who-we-serve, before/after, videos, team preview, reviews, featured-in |
| `/staging` | Staging services — why/timeline/what-to-expect, video section, CTA |
| `/showcase` | Portfolio — filterable before/after cards by price range + property type |
| `/consultations` | Home Edit Consultations — for sellers who need advice before listing |
| `/team` | Meet the Team |
| `/blog` | Blog — home remedy tips |
| `/shop` | Shop — brand new furniture for sale |
| `/contact` | Contact — 3-tab form (General Inquiry, Consultation, Home Evaluation) |

### Design

- Palette: teal `#2d5b57` brand, warm cream `#f5f2ed` bg, white surfaces
- Fonts: Inter (body) + Playfair Display (headings)
- Reference aesthetic: Kumara-inspired — tan/white, bright, no yellow or red
- No dark mode — light theme throughout

### Contact form

- 3 tabs: General Inquiry, Consultation, Home Evaluation
- All submissions go to `perrinematerials@gmail.com` via Resend
- `RESEND_API_KEY` required in env vars

---

## Setup checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` in Vercel env vars to `https://perineinteriors.com` (or confirmed domain)
- [ ] Set `NGF_APP_URL` (optional — defaults to `https://app.ngfsystems.com`)
- [ ] Set `WEBSITE_REVALIDATION_SECRET` (must match the value in the NGF app)
- [ ] Set `RESEND_API_KEY` for contact form email delivery
- [ ] In the NGF admin portal, set this client's `site_url` to match `NEXT_PUBLIC_SITE_URL` exactly
- [ ] Deploy to Vercel
- [ ] Verify every annotated field shows up in the portal editor sidebar

---

## Known Gaps / Integration Checklist

| Area | Status | Notes |
|---|---|---|
| Bridge version | ✅ Current | Copied from NorthCoveBuilders-Mockup main, May 2026 |
| Domain / NEXT_PUBLIC_SITE_URL | ⚠️ Pending | Awaiting client domain confirmation |
| Real content | ⚠️ Pending | All copy/images are placeholders — gather from Melissa |
| Resend from-address | ⚠️ Pending | Set `RESEND_FROM` env var to a verified sender domain (e.g. `noreply@ngfsystems.com`) |
