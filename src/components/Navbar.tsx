import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield, LogOut, Code2 } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/projects', label: 'Projects' },
  { to: '/resources', label: 'Resources' },
  { to: '/members', label: 'Members' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { isAdmin, logout } = useAdmin()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl border-b'
          : 'bg-transparent'
      }`}
      style={{
        background: scrolled ? 'rgba(18, 18, 16, 0.92)' : 'transparent',
        borderColor: scrolled ? 'var(--border-subtle)' : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center transition-all duration-300 group-hover:shadow-lg shrink-0"
              style={{
                background: 'var(--brand)',
                boxShadow: '0 2px 8px rgba(226,106,27,0.2)',
              }}
            >
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg leading-none block" style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                DevNation
              </span>
              <span className="text-[10px] leading-none font-medium" style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                UDST
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-200"
                style={{
                  color: location.pathname === link.to ? 'var(--brand)' : 'var(--text-secondary)',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => {
                  if (location.pathname !== link.to) e.currentTarget.style.color = 'var(--text-primary)'
                }}
                onMouseLeave={e => {
                  if (location.pathname !== link.to) e.currentTarget.style.color = 'var(--text-secondary)'
                }}
              >
                {link.label}
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-px"
                    style={{ background: 'var(--brand)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            {isAdmin ? (
              <div className="flex items-center gap-1">
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200"
                  style={{
                    color: location.pathname === '/admin' ? 'var(--brand)' : '#c2956a',
                    background: location.pathname === '/admin' ? 'rgba(226,106,27,0.08)' : 'transparent',
                  }}
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <Shield className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md transition-all duration-200"
            style={{ color: 'var(--text-secondary)' }}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden backdrop-blur-xl border-b"
            style={{
              background: 'rgba(18, 18, 16, 0.97)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="max-w-7xl mx-auto px-5 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-4 py-3 rounded-md text-sm font-medium transition-all duration-200"
                  style={{
                    color: location.pathname === link.to ? 'var(--brand)' : 'var(--text-secondary)',
                    background: location.pathname === link.to ? 'rgba(226,106,27,0.06)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin ? (
                <>
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200"
                    style={{ color: '#c2956a' }}
                  >
                    <Shield className="w-4 h-4" />
                    Admin Panel
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full px-4 py-3 rounded-md text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Shield className="w-4 h-4" />
                  Admin Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
