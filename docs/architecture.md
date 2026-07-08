# Project Architecture & Baseline

This document serves as the source of truth for the Solar Sizing website codebase. Do not alter this configuration without explicit instructions.

## 📁 Repository Directory Structure

```text
├── backend/
│   ├── server.js            # Express application entry point
│   ├── package.json         # Backend dependencies
│   └── routes/              # Export/Sizing PDF logic routes
├── frontend/
│   ├── src/
│   │   ├── components/      # SolarSizer, Services, Hero, Portfolio, Footer
│   │   ├── App.jsx          # Component layout coordinator
│   │   └── main.jsx
│   ├── package.json         # Frontend dependencies (Vite + Tailwind)
│   └── tailwind.config.js
├── docs/
│   └── architecture.md      # This file
├── claude.md                # AI guardrails and behavioral constraints
└── package.json             # Root monorepo orchestrator for Render builds