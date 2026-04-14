# Design System Document

## 1. Overview & Creative North Star: "The Neon Observatory"

This design system is built to transform the classroom into a high-end, immersive digital theater. Our Creative North Star is **"The Neon Observatory"**—a philosophy that treats the educational interface not as a static tool, but as a luminous, boundless canvas. 

To break the "template" look common in EdTech, we move away from rigid boxes and 1px lines. Instead, we utilize **intentional asymmetry**, **overlapping "floating" modules**, and **dramatic typographic scales**. The aesthetic is a "fullscreen" presentation feel: every screen should look like a bespoke slide from a high-budget keynote. We use extreme whitespace to allow the vibrant purple and neon accents to breathe, creating a "playful professional" atmosphere that respects the intelligence of students while fueling their imagination.

---

## 2. Colors & Surface Architecture

The palette is anchored in deep purples and electric neons, designed to feel "lit from within."

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders for sectioning are strictly prohibited. 
Boundaries must be defined solely through background color shifts or tonal transitions. To separate a sidebar from a main stage, place a `surface-container-low` section against the `surface` background. If you need more definition, use a soft gradient or a change in elevation, never a stroke.

### Surface Hierarchy & Nesting
We treat the UI as physical layers of "Smart Glass."
- **Level 0 (Base):** `surface` (#fdf3ff) – The infinite canvas.
- **Level 1 (Sections):** `surface-container-low` (#f9edff) – Soft areas for secondary content.
- **Level 2 (Active Modules):** `surface-container` (#f3e2ff) – Main interaction zones.
- **Level 3 (Pop-outs/Modals):** `surface-container-highest` (#ebd4ff) – High-priority focal points.

### The "Glass & Gradient" Rule
For gamified elements (points, badges, or AI magic moments), use **Glassmorphism**. Apply a semi-transparent `primary-container` with a `backdrop-filter: blur(20px)`. 
**Signature Textures:** Main Action Buttons must use a linear gradient: `primary` (#6a1cf6) to `primary-container` (#ac8eff). This adds a "jewel-like" depth that a flat color cannot replicate.

---

## 3. Typography: Editorial Authority

We use a high-contrast pairing of **Space Grotesk** for impact and **Plus Jakarta Sans** for readability.

- **Display (Space Grotesk):** Large, bold, and slightly technical. Use `display-lg` (3.5rem) for magic moments or gamification milestones. The "Bold" weight is our default for headers to maintain the "Editorial" feel.
- **Headline/Title (Space Grotesk):** Clear and authoritative. Use `headline-md` for module titles.
- **Body/Label (Plus Jakarta Sans):** Modern and legible. `body-lg` (1rem) is the workhorse for student tasks.

**Identity Logic:** The juxtaposition of the "techy" Grotesk with the "friendly" Jakarta Sans creates the "Playful yet Professional" balance. Headers should feel like headlines in a premium magazine.

---

## 4. Elevation & Depth: Tonal Layering

Shadows and lines are replaced by the physics of light.

- **The Layering Principle:** Depth is achieved by stacking. Place a `surface-container-lowest` card (Pure White) on a `surface-container-low` background to create a "Natural Lift."
- **Ambient Shadows:** For floating "Magic" elements, use a "Neon Glow" shadow. Instead of black/grey, use `on-surface` (#38274c) at 6% opacity with a `40px` blur and `10px` Y-offset.
- **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., input focus), use the `outline-variant` (#bba4d2) at **20% opacity**. Never use 100% opacity.
- **Nesting:** Always nest rounded corners. If a container has a `xl` (3rem) radius, the inner card should have a `lg` (2rem) radius to maintain geometric harmony.

---

## 5. Components

### Buttons & Chips
- **Primary Button:** Gradient (`primary` to `primary-container`), `xl` roundedness, `headline-sm` text. It should feel like a physical "pressable" light.
- **Secondary Button:** Ghost style. No background, `outline-variant` at 20% opacity, `on-surface` text.
- **Chips:** Always `full` (9999px) roundedness. Use `secondary-container` (#4af8e3) for "Success" or "Correct" states to provide that neon "pop" against the purple.

### Input Fields & Lists
- **Text Inputs:** Use `surface-container-low`. No border. On focus, transition to `surface-container-highest` with a soft glow.
- **Cards & Lists:** **Forbid divider lines.** Use `1.5rem` (md) vertical spacing or a subtle shift from `surface-container-lowest` to `surface-container-low` to distinguish items.
- **The Magic Board (Special Component):** A fullscreen `surface` area with a `primary-dim` subtle radial gradient in the center to draw the eye to the AI interaction zone.

### Gamification Elements
- **Progress Bars:** Use a `primary` track with a `secondary` (neon teal) fill. The fill should have a `box-shadow` of the same color to appear "electric."
- **Badges:** Multi-layered circles using `primary`, `secondary`, and `tertiary` containers with 50% opacity overlays.

---

## 6. Do’s and Don'ts

### Do:
- **Do** use intentional asymmetry. Offset a header to the left while a floating card sits to the right.
- **Do** use large typography scales. If a number is important (like a score), make it `display-lg`.
- **Do** prioritize "Breathability." If in doubt, add more whitespace.
- **Do** use `xl` (3rem) corners for large layout containers to emphasize the "friendly/rounded" aesthetic.

### Don’t:
- **Don’t** use black (#000000) for text. Use `on-surface` (#38274c) to keep the "Ink & Light" feel.
- **Don’t** use standard 1px grey dividers. They break the immersive "fullscreen" illusion.
- **Don’t** use sharp corners. Even the smallest tooltip should have at least `sm` (0.5rem) roundedness.
- **Don’t** clutter the screen. If it doesn't serve the "Magic Board" presentation, hide it in a "surface-dim" drawer.
