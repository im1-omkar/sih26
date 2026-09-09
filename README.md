# AI Intelligence Platform for Law Enforcement

## Overview
This project was developed for the **Smart India Hackathon (SIH) - Problem Statement 189**. It is an advanced AI intelligence and case management platform designed for law enforcement agencies (Police, CBI, etc.). The system aggregates data from FIRs, Call Detail Records (CDRs), financial transactions, and physical evidence, using Graph Neural Networks (GNNs) and LLM-driven natural language processing to uncover hidden criminal networks, trace financial laundering paths, and resolve entity identities.

## Demo Video
Watch the demo of the platform in action:

![Project Demo](./screenshots/demo.webm)

*(If the video does not play inline, you can find it at `screenshots/demo.webm`)*

## Key Features
- **Intelligent Workspace Dashboard**: VS Code style multi-pane layout to view case files alongside extracted AI insights.
- **Graph Neural Network (GNN) Output**: AI-predicted hidden relationships, showing probability scores for suspected co-conspirators and money laundering paths.
- **Financial Tracing**: Visual force-directed graph to track money flow across bank accounts, front companies, and crypto wallets.
- **Digital & Communication Forensics**: Network graphs visualizing device connections, telecom communication, and digital artifacts.
- **Chronological Timelines**: Interactive event timelines detailing incidents, financial movements, and communication pings.
- **Geo-Location Intelligence**: Pseudo-radar map plotting historical movement data and incident hotspots.
- **Identity Resolution**: Automated matching algorithms resolving aliases and fuzzy names to a unified target entity profile.
- **LLM Analysis Terminal**: Real-time simulated terminal output providing actionable interrogation recommendations and case insights.

## Tech Stack
- **Frontend Framework**: React 18 with TypeScript (built with Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **Visualizations**: 
  - D3.js (Force-directed graphs for Financial/Forensics/GNN mapping)
  - HTML5 Canvas rendering for high-performance physics simulations
- **Animations**: Framer Motion (Landing page hero animations)
- **3D Rendering**: Three.js / React Three Fiber (Landing page visual effects)

## Architecture
The application is built as a Single Page Application (SPA).
1. **Service Layer**: Abstracts API calls and currently hooks into an advanced mock data engine (`src/data/mockCaseData.ts`) to simulate complex law enforcement queries without needing the real backend yet.
2. **State Layer**: Zustand stores (`casesStore`, `documentsStore`, `workspaceStore`) handle global state and UI panel toggles.
3. **Visualization Engine**: Centralized D3 physics engine (`NetworkGraph.tsx`) powers multiple intelligence tabs by dynamically adjusting its visual theme (colors, node shapes) based on the context (e.g., green for financial, blue for cyber).

## Project Structure
```text
src/
├── assets/             # Static assets and fonts
├── components/         # Reusable React components
│   ├── cases/          # Case list and items
│   ├── dashboard/      # Case view and analytics visualizations (D3 graphs, Maps)
│   ├── documents/      # Document viewer and extraction UI
│   ├── layout/         # Navbar, Sidebar, Workspace panes
│   ├── ui/             # Generic UI elements (Buttons, Modals)
│   └── upload/         # File upload components
├── data/               # Mock data engines (mockCaseData.ts)
├── pages/              # Route level components (Landing.tsx, Dashboard.tsx, CaseView.tsx)
├── services/           # API and data fetching layer
└── store/              # Zustand state management
```

## Install and Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Bun](https://bun.sh/) (or npm/yarn/pnpm)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sih26
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or npm install
   ```

3. **Run the development server**
   ```bash
   bun run dev
   # or npm run dev
   ```

4. **Build for production**
   ```bash
   bun run build
   # or npm run build
   ```

5. **Preview production build**
   ```bash
   bun run preview
   # or npm run preview
   ```

## Deployment
The app is optimized for Vercel. A `vercel.json` is included to handle client-side SPA routing correctly.
