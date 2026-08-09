# DESIGN.md — E-Cell IIT Bhilai

A blended system. Each rule below is borrowed deliberately; the source is named
so future changes can be argued against the original intent rather than taste.

## Theme

Dark editorial. A near-black ground, one red accent, enormous uppercase display
type, and depth expressed through soft shadow rather than borders or blocks.
Restraint is the mechanism — colour appears rarely enough that it still means
something when it does.

## Colour

Ground and surfaces (**Linear / Vercel** — layered near-blacks, never pure #000):

| Token | Value | Role |
|---|---|---|
| `paper` | `#08090A` | Page canvas |
| `bone` | `#0E0F11` | Raised section band |
| `stone` | `#23252A` | Hairline borders |
| `ink` | `#F5F5F7` | Foreground text, and inverted (light) blocks |
| `ink-70` | `#A1A1A6` | Secondary text |
| `ink-40` | `#86868B` | Tertiary text, labels |
| `accent` / `red` | `#E6002A` | The only accent |

Card surfaces are barely-different dark planes with a hint of hue, never
pastels: `lime #17191D`, `grass #0F1A15`, `blush #1A1418`, `butter #1A1712`,
`violet #15151F`, `sky #121A20`.

`ink` doubles as the inverted block colour, so `bg-ink text-paper` produces a
light section on the dark site — used once per page at most (**Nike / Apple**:
one hard inversion reads as intent, three read as indecision).

### Contrast floors
- Body on ground: `#F5F5F7` on `#08090A` — 18:1
- Secondary on ground: `#A1A1A6` — 8.2:1
- Tertiary on ground: `#86868B` — 5.5:1
- `ink` on `accent` — 4.5:1. Never put `paper` on `accent`.

## Typography

**Nike** for the display voice, **Apple/Linear** for everything else.

- Display: `Space Grotesk` 700, UPPERCASE, `letter-spacing: -0.035em`, `line-height: 0.92`
- Body: `Inter` 400
- Lead paragraphs: `.lead` — Inter **300**, `-0.014em` (**Stripe**'s weight-300 elegance)
- Eyebrow: 0.7rem, 500, `0.22em` tracking, preceded by a 1px red 24px rule

Scale is set with `clamp()` so headings track the viewport: hero
`clamp(3.2rem, 10.5vw, 10rem)`, section `clamp(2.2rem, 5.5vw, 4.5rem)`.

## Depth (Stripe / Linear)

No offset blocks, no hard shadows. One panel treatment, `.brutal`:

```
border: 1px solid #23252A;
border-radius: 14px;
box-shadow: 0 1px 0 0 rgb(255 255 255 / 0.05) inset,
            0 18px 50px -24px rgb(0 0 0 / 0.9);
```

Hover **lifts** `translateY(-3px)` and deepens the shadow — it never presses in.
The inset white hairline along the top edge is what sells the material; without
it a dark panel on a dark ground reads as a hole.

Radii: `14px` panels, `20px` large surfaces. Never square, never pill.

## Signature techniques

- **Single anchoring glow** (Linear): one fixed radial `rgb(230 0 42 / 0.12)` at
  the top of the page. No repeating pattern anywhere — the ground stays quiet.
- **Gradient display type** (Stripe): `.grad-text`, white → `#FF5470` → `#E6002A`
  at 96°, used on exactly one word in the hero.
- **Full-bleed 3D as background** (Nike's full-bleed photography, adapted):
  four three.js scenes sit `absolute inset-0` behind sections at 50% opacity
  with a radial mask so they dissolve at the edges instead of ending on a box.
- **Generous rhythm** (Apple): sections at `py-24 sm:py-32`, headings separated
  from their content by `mb-14`. Space does the separating, not rules.

## Motion

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` everywhere
- Panels/headings: 320ms · colour changes: 200ms · scene drift: 0.07–0.4 rad/s
- Headings scale to `1.02` on hover — `transform` only, never a property that reflows
- `prefers-reduced-motion` flattens every transition and cancels all hover transforms

## Guardrails

- One accent. If something needs emphasis and red is taken, use size or space.
- Never `text-paper` on `accent` — it fails contrast at 2.1:1.
- Never more than one inverted (`bg-ink`) section per page.
- 3D scenes are background only: `pointer-events-none`, behind `z-10` content,
  and mounted lazily via `LazyScene` so the three chunk never loads unseen.
- Borders are 1px hairlines. If a divider needs to shout, it's the wrong divider.

## Agent prompt

> Use DESIGN.md. Dark ground `#08090A`, one red accent `#E6002A`, Space Grotesk
> uppercase display with tight negative tracking, Inter body, weight-300 leads.
> Depth via 1px hairline + inset highlight + deep soft shadow, 14px radius,
> hover lifts. Generous vertical rhythm. Colour is rare and load-bearing.
