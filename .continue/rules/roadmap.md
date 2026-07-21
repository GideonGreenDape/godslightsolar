---
name: Free AI Sales Engineer Chatbot
alwaysApply: false
description: Specification and guardrails for building a zero-cost AI sales assistant using the Gemini free tier with WhatsApp handoff capabilities.
---

# GITSE AI Sales Engineer (Free Tier & WhatsApp Handoff)

## 🎯 Objective
Build a lightweight, zero-cost AI-powered sales assistant widget embedded into the frontend (`/frontend`) that handles lead generation, answers FAQs, qualifies clients in Delta State, and seamlessly hands them off to human sales via WhatsApp.

## 🚫 Cost & API Key Constraints (The Zero-Cost Rule)
1. **API Provider:** Must use **Google AI Studio (Gemini Free Tier)** via supported free models (`gemini-3.5-flash` or `gemini-3.1-flash-lite`). **Never** use paid Pro models.
2. **Environment Variable Configuration:** The free API key must be read directly from the backend `.env` file (e.g., `GEMINI_API_KEY=AIza...`). 
3. **Security (No Exposure):** The API key must **never** be exposed in the frontend client code. It must stay hidden on the Node.js/Express server and be accessed exclusively via a secure backend proxy endpoint (e.g., `/api/chat`).
4. **Infrastructure:** Hosted entirely within the existing Render monorepo infrastructure without adding any paid microservices.

## 🧠 Behavior & Sales Flow
The AI Sales Engineer must strictly follow this conversational qualification sequence:
1. **Welcome & Greeting:** Welcome visitors professionally with the GITSE brand identity (Solar, CCTV, Starlink, Smart Home).
2. **Service Discovery:** Ask what service they need assistance with.
3. **Location Qualification:** Ask if the installation is located within **Delta State** or surrounding regions to confirm service feasibility.
4. **Recommendation & Estimation:** Provide a rough estimate or high-level overview based on static data.
5. **The WhatsApp Handoff (Conversion Trigger):** Once the user is qualified or requests pricing/inspection, the AI must present a clear handoff prompt and display a **"Continue on WhatsApp"** button.

## 💬 WhatsApp Handoff Mechanics & Business Number
- **Business Number:** The target WhatsApp number for all handoffs is **2347064110671**.
- **Pre-filled Context:** The chat UI must dynamically compile a summary of the conversation (Service type, location, estimated needs) into a standard Click-to-Chat URL format.
- **URL Structure:** `https://wa.me/2347064110671?text=[Encoded_AI_Conversation_Summary]`
- **Goal:** Ensure the customer can tap one button to land in your WhatsApp inbox with all their details already typed out, eliminating friction.

## 🔔 UI/UX Interaction & Existing Widget Integration
- **Replacement of Old Widget:** There is an existing static floating WhatsApp chat icon on the site. The AI Sales Engineer widget should completely replace or subsume that old icon to avoid duplicate floating elements on the screen.
- **Engagement Notification Badge:** The floating chat icon must display an unread notification badge/bubble immediately when a user visits the site, drawing their attention to engage with the AI assistant.

## 🛠️ Implementation Directives for the AI Assistant
- **Component Isolation:** Build the chat interface inside an isolated component (e.g., `src/components/SalesBot.tsx`). Do not inject code directly into core layout files without permission.
- **Backend Proxy Pattern:** The frontend must call a local Express backend endpoint rather than calling the Gemini API directly, ensuring the `.env` key remains secure on the server.
- **Styling:** Must match the navy blue, orange, and white high-fidelity Tailwind CSS design standards.