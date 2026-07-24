# UI Refactoring
---

Go over all the HTML+CSS+JS and refactor, check that everything is tight.


## TODO
* fixed-list-editor
    * Add checkboxes for items

* tenants
* toasts
* dialogs - sizes

## DONE
* products
* fixed-lists
* current-list
* layout-tenant
* layout-user
* categories


## fixed list editor
**Layout**
- Two-pane content block: catalog (left, ~60%) + selected-items cart panel (right, ~40%), max-width capped (~900–1100px), centered in the space between the sidebar and the viewport edge (not edge-aligned).
- Sidebar stays as-is, unchanged, on whichever side matches language direction (right in Hebrew, left in English) — already implemented this way.
- Mobile flow is separate/untouched.

**Catalog pane**
- List name field, search input, and category chips are all sticky at the top of this pane.
- All category cards always visible at once — no tab-switching, no layout mode change for search.
- Category chips are multi-select filters, not tabs. They narrow which category cards show; they never fully hide.
- Products get an explicit checkbox/checked state (not bold-text-only) for selection.
- Search filters items in place within visible categories; categories with zero matches collapse (their content, not the chip).
- Chips with 20+ categories: wrap to multiple rows, no horizontal scroll.
- Chips never disappear based on search — zero-match chips go greyed/disabled instead, optionally with a match count.
- Selected filter chips also stay selected even if a search temporarily yields zero matches for them — no silent auto-deselect.
- Add a "Clear filters" control for category chips, shown only when ≥1 chip is active. Separate from the search input's own clear (×), not bundled together.
- Only the catalog's product-grid area scrolls internally (nested scroll), bounded by the sticky header above and sticky cart panel beside it — accepted as a deliberate, standard pattern (like a cart/checkout UI), not something to avoid.

**Cart panel (Selected products)**
- Sticky, height capped to viewport, internal scroll for the item list.
- Save/Cancel buttons pinned to the bottom of the panel, always visible regardless of scroll or item count.
- Each selected item must show its category explicitly (e.g., "Tomato — Vegetables") since products can share a name across categories — selection/storage must key on product ID, never name alone.

**Explanation/filler content**
- Rejected adding a permanent explanatory block just to fill wide-screen space. Acceptable uses only if genuinely helpful: empty-state guidance in the cart panel, or a dismissible first-time tip — not a static always-on block.