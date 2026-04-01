# UDST DevNation Club Website

## Overview
The official website for UDST DevNation — the technology club of the University of Doha for Science and Technology. Built as a React + Vite single-page application with no backend or database (uses localStorage for all data persistence).

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v3 + custom CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Notifications**: React Hot Toast
- **Data**: localStorage (no database)
- **Auth**: Simple password in localStorage (no real auth)

## Admin Access
- Navigate to `/admin`
- Password: `devnation2025`
- Admins can add/edit/delete: events, projects, resources, members
- Admin can edit club info (vision, mission, social links)

## Pages
- `/` — Home: hero, vision & mission, 4 groups, upcoming events, featured projects, CTA
- `/events` — Events & Programs: searchable/filterable list with "Finding Teams" inside each event card
- `/projects` — Member Projects: searchable/filterable project showcase
- `/resources` — Learning Resources: curated courses, articles, tools, videos
- `/members` — Team: org hierarchy view + groups view, LinkedIn/Instagram/WhatsApp links
- `/admin` — Admin Panel: password-protected management of all content

## Key Features
- **No Auth/DB**: All data stored in localStorage; admin uses a simple password
- **Finding Teams**: Renamed from "Assemble", lives inside each event card — users can join teams by entering their name and connecting via WhatsApp
- **Members Hierarchy**: Levels 0-3 (Founder, Core Leadership, Department Heads, Core Members)
- **4 Groups**: DSA, AI/ML, Web Development, App Development
- **Social Links**: Instagram and LinkedIn throughout the site
- **Admin CRUD**: Full add/edit/delete for all content sections from the UI
- **Club Info Editor**: Admin can update vision, mission, social links from the admin panel

## Project Structure
```
src/
  App.tsx               — Router setup
  main.tsx              — Entry point
  index.css             — Global styles + Tailwind
  context/
    AdminContext.tsx    — Admin auth state (localStorage)
    DataContext.tsx     — All data CRUD (localStorage)
  data/
    defaults.ts         — Default seed data + TypeScript interfaces
  hooks/
    useLocalStorage.ts  — Custom localStorage hook
  pages/
    HomePage.tsx        — Landing page
    EventsPage.tsx      — Events with Finding Teams
    ProjectsPage.tsx    — Projects showcase
    ResourcesPage.tsx   — Learning resources
    MembersPage.tsx     — Members hierarchy + groups
    AdminPage.tsx       — Admin management panel
  components/
    Navbar.tsx          — Navigation with admin indicator
    Footer.tsx          — Footer with social links
```

## Development
```bash
npm run dev   # Start dev server on port 5000
```

## User Preferences
- Dark theme with indigo/violet brand colors and pink accent
- No Arena or Leaderboard features
- All buttons and cards are fully functional
- Admin password: devnation2025
