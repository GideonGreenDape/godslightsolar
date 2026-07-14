---
name: Project Guardrails and Constraints
alwaysApply: true
description: Global system instructions for the Solar Sizing and Technical Services monorepo.
---

# Claude System Instructions & Constraints

You are working on a completed, functional full-stack Solar Sizing and Technical Services monorepo (React frontend, Node.js/Express backend). 

## 🚫 THE GOLDEN RULE
**Do NOT modify, overwrite, refactor, or delete any existing code, files, or project structures without explicit user permission.** 

Before making changes to any file, you must present the proposed change to the user and wait for confirmation.

## 🛠️ Project Architecture Review
- **Frontend:** React (Vite/Tailwind CSS/Lucide Icons) located in `/frontend`
- **Backend:** Node.js/Express located in `/backend`
- **Deployment:** Configured as a single monorepo deployable on Render.
- **State:** The code is currently operational. Do not break existing features (Solar Sizer, Export functionality, Services Grid, Portfolio).

## 📋 Rules of Engagement
1. **Read-Only First:** Treat the codebase as read-only unless specifically instructed to implement a feature or fix a bug.
2. **Component Isolation:** If asked to add something new, build it in an isolated component or file rather than injecting code into existing core structures.
3. **Keep It Simple:** Maintain the architectural decision of zero authentication (no sign-up/sign-in) and lightweight state management.
4. **Mobile Optimization:** Any requested UI additions must strictly maintain the existing mobile-first, high-fidelity design standards.