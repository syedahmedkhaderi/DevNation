# DevNation

## Overview

DevNation is a React + TypeScript single-page website built with Vite and Tailwind CSS. It is designed to showcase an event-driven student club experience with pages for home, events, projects, resources, members, and an admin portal.

## Key Features

- Home page with club overview and featured sections
- Events page with event cards and team membership
- Projects page with current club projects
- Resources page with links and learning tools
- Members page with member showcase
- Admin portal for managing club data and site content
- Local persistence using browser `localStorage`
- Responsive UI with Framer Motion animations

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- lucide-react icons
- react-hot-toast

## Pages and Routes

- `/` — HomePage
- `/events` — EventsPage
- `/projects` — ProjectsPage
- `/resources` — ResourcesPage
- `/members` — MembersPage
- `/admin` — AdminPage

## Admin Portal

The admin area is available at `/admin`.

### Admin login

- Password: `devnation2025`
- Admin session is stored in `localStorage` under `devnation_admin_session`.

### Admin capabilities

- Edit club info (name, tagline, vision, mission, social links)
- Manage events, projects, resources, and members
- Reset any section back to default seed data

## Data Persistence

All editable content is stored locally in the browser using `localStorage`, and admin edits are also written back to the source defaults file while running the development server.

### Persistence behavior

- Admin changes persist across page reloads in the same browser profile.
- When running `npm run dev`, the app also saves updates into `src/data/defaultData.json`.
- `src/data/defaults.ts` now loads its initial defaults from that JSON file, so code-level defaults can be updated too.
- If you clear browser storage, switch browsers, or use a different browser/profile, the app will fall back to the latest saved defaults from `src/data/defaultData.json`.
- Using the admin reset buttons returns the selected section to the default initial seed data currently stored in code.

### LocalStorage keys used

- `devnation_clubinfo`
- `devnation_members`
- `devnation_events`
- `devnation_projects`
- `devnation_resources`

## Setup and Local Preview

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually `http://localhost:5000` or the next available port.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

- `index.html` — main HTML entry point
- `src/main.tsx` — app bootstrapping
- `src/App.tsx` — route definitions and layout
- `src/index.css` — Tailwind imports and global styles
- `src/context/AdminContext.tsx` — admin authentication state
- `src/context/DataContext.tsx` — app data management and persistence
- `src/hooks/useLocalStorage.ts` — reusable localStorage hook
- `src/pages/` — page components for each route
- `src/components/` — shared UI components
- `src/data/defaults.ts` — default site data and seed values

## Admin change permanence

The admin changes are preserved in browser localStorage and will remain after refreshing the page or restarting the local development server. They are not permanent on a remote server because this app does not use server-side storage. If localStorage is cleared or you open the site in another browser/profile, the app will revert to default content.

## Notes

- Do not commit `node_modules/` to the repository.
- Use the admin reset buttons to restore default content for a specific section.
