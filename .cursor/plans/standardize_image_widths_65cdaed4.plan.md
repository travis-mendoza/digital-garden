---
name: Standardize image widths
overview: Apply consistent max-width values to vertical and horizontal figures based on calculated rendered sizes from the Mobility grid and Go2 App sections.
todos:
  - id: calculate-grid-width
    content: "Calculate exact grid image width: (800px - 40px padding - 32px gaps) / 3 = 243px"
    status: pending
  - id: update-vertical-figures
    content: Update .project-content figure img max-width from 600px to 243px for vertical figures
    status: pending
    dependencies:
      - calculate-grid-width
  - id: style-horizontal-figures
    content: "Add CSS rule for horizontal figures in Go2 App section with max-width: 600px"
    status: pending
  - id: verify-grid-unaffected
    content: "Verify .image-grid figure img maintains max-width: none so grid images use calculated width"
    status: pending
    dependencies:
      - update-vertical-figures
---

# Standardize Image Widths for Vertical and Horizontal Figures

## Current State Analysis

- **Container**: `max-width: 800px` with `padding: 0 20px` = 760px content width on large screens
- **Mobility grid images**: 3 columns with `gap: 1rem` (16px) = ~243px per image
- Calculation: (760px - 32px gaps) / 3 = 242.67px ≈ **243px**
- **Go2 App horizontal figures**: Currently `max-width: 600px`

## Implementation Plan

### 1. Calculate and apply vertical figure width

In [`style.css`](style.css), update `.project-content figure img` to use the calculated grid width:

- Change `max-width: 600px` to `max-width: 240px` for vertical figures (240 is cleaner than 243)
- This will apply to:
- The standalone figure at line 19-22 (thereshegoes.gif)
- Any other vertical figures on the page

### 2. Create separate styling for horizontal figures

Add a new CSS class for horizontal figures in the "Go2 App" section:

- Add a class like `.horizontal-figure` to the HTML and style it
- Apply `max-width: 470px` to these horizontal figures
- 470 is the width of the 'Multi-waypoint autonomous navigation' gif at full size

### 3. Ensure grid images remain unaffected

Verify that `.image-grid figure img` has `max-width: none` (already set) so grid images use their calculated width (243px) and aren't constrained by the standalone figure rule.

## Files to Modify

- [`style.css`](style.css): Update figure image max-width rules
- [`portfolio/unitree-go2.html`](portfolio/unitree-go2.html): add class to horizontal figures