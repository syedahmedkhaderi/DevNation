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
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
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
  )
}
