# AI Magic Board ✨

A Gamified, Teacher-led Presentation Web App tailored for English Classrooms without 1:1 student devices. It acts as an engaging live-action leaderboard and Smart Evaluator using Google Gemini API.

## Core Features
- **Projector-Ready Interface:** Utilizes massive font scales, high-contrast text, and Glassmorphism for clarity on poorly lit overhead projectors.
- **Real-time AI Verification:** Instant validation of student answers on English Grammar tasks (e.g. Reported Speech, Passives).
- **Gamified Elements:** 
  - Confetti particle bursts for correct answers.
  - "Shake & Flash" penalty UI for incorrect tenses.
  - Silent animations (Chasing Mascot) to keep the classroom entertained.

## Tech Stack
- Frontend: Next.js 14+ (App Router), React, Tailwind CSS
- AI Backend: Google Gemini GenAI SDK (`@google/genai`)
- Custom CSS Animations + `canvas-confetti`

## Getting Started
(Pending Next.js Initialization in Phase 2)

```bash
# 1. Install dependencies
npm install

# 2. Add API Key to .env.local
GEMINI_API_KEY=your_key_here

# 3. Run development server
npm run dev
```

## Project Context
Built with AI Agent Antigravity following the **No-Lines Rule** and **Neon Observatory** design systems.
