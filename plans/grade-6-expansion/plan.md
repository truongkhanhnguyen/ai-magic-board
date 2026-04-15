---
title: Grade 6 Expansion & Portal Architecture
status: pending
created: "2026-04-15"
blockedBy: []
blocks: []
---

# 🚀 Grade 6 Expansion & Portal Architecture Plan

## 1. Problem Statement
The current AI Magic Board app has successfully proven its capability for Grade 8 Sentence Transformations. However, we now have a massive Grade 6 outline document containing Multiple Choice, Word Forms, Sign Reading, and Sentence Rewriting. We need to absorb this data without breaking the Grade 8 UX, requiring a new modular architecture and safe deployment flow.

## 2. Solution Design
We will implement a **Hub & Spoke (Portal) Architecture**:
- A landing page (`/`) where users select their grade.
- `/grade-8`: Houses the existing stable Sentences app.
- `/grade-6`: Houses the new "Game Modes" designed specifically to handle the structural variety of the Grade 6 test outline.

To ensure stability, all work will be done on a separate Git branch (`grade-6-expansion`).

## 3. Implementation Phases

### Phase 1: Safe Environment Setup (Local Testing)
- **Goal:** Isolate the development environment from the stable master branch.
- **Tasks:**
  - Create and switch to new branch: `git checkout -b grade-6-expansion`.
  - Ensure local environment `npm run dev` is running successfully.

### Phase 2: Hub & Routing Restructure
- **Goal:** Build the Portal Landing Page and migrate Grade 8.
- **Tasks:**
  - Move `app/page.tsx` (the current Magic Board) to `app/grade-8/page.tsx`.
  - Create a new `app/page.tsx` acting as the Portal. It will have two massive, engaging cards/buttons: "Khối 6 (Beginner)" and "Khối 8 (Advanced)".
  - Verify routing works perfectly without breaking imports.

### Phase 3: Grade 6 UI Layout & Data Modeling
- **Goal:** Wireframe and stub out the Grade 6 board.
- **Tasks:**
  - Create `app/grade-6/page.tsx`.
  - Extract the multiple choice, signs, word form, and rewriting questions from `docx_output_utf8.txt`.
  - Create `src/data/grade6Data.ts` to manage these dynamic arrays.
  - Create a Game Mode selector in the Grade 6 UI (e.g., [Quiz Arena], [Sign Reader], [Grammar Hub]).

### Phase 4: Grade 6 Component Development
- **Goal:** Build the interactive elements for Grade 6 test types.
- **Tasks:**
  - **Multiple Choice UI:** Build `MultipleChoiceMode.tsx` with 4 large answers buttons.
  - **Sign/Picture UI:** Build `SignReaderMode.tsx` featuring an image placeholder and 4 options. (Requires slicing images from the DOCX to the `public/` folder).
  - **Word Form/Rewriting UI:** Re-use or adapt the existing `PresentationView.tsx` from Grade 8 for typed answers.
  - Update `api/check/route.ts` to handle different prompt personas or contexts based on the Grade and question type.

### Phase 5: QA & Merge
- **Goal:** Test all flows locally and merge safely.
- **Tasks:**
  - Verify API endpoints don't cross-pollinate Grade 6 and Grade 8 prompts.
  - Check Mobile/Projector responsiveness.
  - Stage, commit, and push the branch.
  - Create PR and Merge to `master` when 100% stable.

## 4. Success Metrics
- Local host URL `/` shows the portal.
- Navigating to `/grade-8` functions exactly as it did yesterday.
- Navigating to `/grade-6` provides a multi-mode testing experience covering all extracted data types.
- No bugs or 404s during transition.
