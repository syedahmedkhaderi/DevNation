import { Link } from 'react-router-dom'
import { Code2, Instagram, Linkedin, Mail, MapPin, Heart } from 'lucide-react'
import { useData } from '../context/DataContext'

export default function Footer() {
  const { clubInfo } = useData()

  return (
    <footer className="mt-auto" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
      {/* Top accent line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, var(--brand), transparent)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center"
                style={{ background: 'var(--brand)' }}
              >
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-xl leading-none block" style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                  DevNation
                </span>
                <span className="text-[10px] leading-none font-medium" style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                  {clubInfo.university}
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
              {clubInfo.tagline}. Building the next generation of tech leaders in Qatar.
            </p>
            <div className="flex items-center gap-2">
              <a
                href={clubInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md flex items-center justify-center transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#c13584'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={clubInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md flex items-center justify-center transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0a66c2'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${clubInfo.email}`}
                className="w-9 h-9 rounded-md flex items-center justify-center transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-5 text-sm" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/events', label: 'Events' },
                { to: '/projects', label: 'Projects' },
                { to: '/resources', label: 'Resources' },
                { to: '/members', label: 'Members' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-5 text-sm" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Our Groups
            </h4>
            <ul className="space-y-3 mb-8">
              {['DSA', 'AI/ML', 'Web Development', 'App Development'].map(group => (
                <li key={group}>
                  <Link
                    to="/members"
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    {group}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>Doha, Qatar</span>
              </div>
              <div className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${clubInfo.email}`}
                  className="transition-colors"
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  {clubInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} UDST DevNation. All rights reserved.
          </p>
          <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
            Built with <Heart className="w-3 h-3" style={{ color: 'var(--brand)' }} /> by DevNation Members
          </p>
        </div>
      </div>
    </footer>
  )
}
