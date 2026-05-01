## Add Social Proof Section to Landing Page

Add a new section to the landing page that showcases impact numbers (students learning, challenges solved, etc.) and a few short testimonials/reviews. Section will sit between the Course Carousel and the FAQ, fitting naturally into the existing funnel.

### What gets built

**1. Stats strip (4 numbers)**
Animated count-up numbers when the section scrolls into view (using IntersectionObserver, no extra dependency). Examples:
- 12,000+ Active Learners
- 4,500+ Kids Started Coding
- 80,000+ Challenges Solved
- 4.9/5 Average Rating

Numbers are static/marketing values stored as constants — easy to edit in one place.

**2. Testimonials (3 cards)**
Three short reviews with name, role/age (e.g. "Age 12, Tirana"), avatar initials, 5-star rating, and a 1–2 sentence quote. Rendered in a responsive grid (1 col mobile, 3 cols desktop) using the existing `glass-card` style and shadcn `Card` component to match the rest of the page.

### Files to change

- **`src/components/landing/SocialProof.tsx`** (new) — the whole section: stats row + testimonials grid + count-up hook.
- **`src/pages/Landing.tsx`** — import and mount `<SocialProof />` between the courses carousel and the FAQ section.
- **`src/i18n/locales/en.json`** — add `landing.stats_*` and `landing.testimonial_*` keys (title, subtitle, 4 stat labels, 3 testimonials with quote/name/role).
- **`src/i18n/locales/sq.json`** — Albanian translations for the same keys.

### Design / styling

- Reuses existing tokens: `glass-card`, `text-gradient-primary`, `border-border`, `text-primary`, `text-muted-foreground`.
- Section structure mirrors the existing pattern: `border-t border-border py-24 sm:py-32`, centered title + subtitle, then content.
- Stat numbers large and bold (`text-4xl sm:text-5xl font-bold text-gradient-primary`), label below in muted text.
- Star rating uses `lucide-react` `Star` icon (already a project dep) filled with `text-primary`.
- Avatars use existing shadcn `Avatar` with initials fallback (no external image deps).
- Count-up animation: ~1.5s ease-out, triggers once when section enters viewport. Pure React + `requestAnimationFrame`, no library.

### Out of scope

- No backend / no real review collection — numbers and quotes are marketing copy.
- No carousel for testimonials (static 3-card grid is cleaner at this viewport).
- No changes to dashboard, workspace, or auth flows.
