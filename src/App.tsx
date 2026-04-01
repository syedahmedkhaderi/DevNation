import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import ProjectsPage from './pages/ProjectsPage'
import ResourcesPage from './pages/ResourcesPage'
import MembersPage from './pages/MembersPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: 'var(--bg-primary)' }}>

      {/* ── Global ambient background orbs (pure CSS, zero JS cost) ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '8%', left: '5%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(226,106,27,0.055) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'orb-drift-1 22s ease-in-out infinite',
          willChange: 'transform',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '8%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(176,125,79,0.045) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'orb-drift-2 28s ease-in-out infinite',
          willChange: 'transform',
        }} />
        <div style={{
          position: 'absolute', top: '55%', left: '45%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(226,106,27,0.025) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'orb-drift-3 18s ease-in-out infinite',
          willChange: 'transform',
        }} />
      </div>

      <div className="relative flex flex-col flex-1" style={{ zIndex: 1 }}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>

    </div>
  )
}
