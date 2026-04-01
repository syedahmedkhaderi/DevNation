import { Link } from 'react-router-dom'
import { Code2, Instagram, Linkedin, Mail, MapPin, Heart } from 'lucide-react'
import { useData } from '../context/DataContext'

export default function Footer() {
  const { clubInfo } = useData()

  return (
    <footer className="bg-[#080815] border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/25">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-white text-xl leading-none block">DevNation</span>
                <span className="text-xs text-slate-500 leading-none">{clubInfo.university}</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              {clubInfo.tagline}. Building the next generation of tech leaders in Qatar.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={clubInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={clubInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-blue-600 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${clubInfo.email}`}
                className="w-10 h-10 bg-white/5 hover:bg-brand-600 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
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
                    className="text-slate-400 hover:text-brand-300 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Our Groups</h4>
            <ul className="space-y-3 mb-6">
              {['DSA', 'AI/ML', 'Web Development', 'App Development'].map(group => (
                <li key={group}>
                  <Link
                    to="/members"
                    className="text-slate-400 hover:text-brand-300 text-sm transition-colors duration-200"
                  >
                    {group}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Doha, Qatar</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <a href={`mailto:${clubInfo.email}`} className="hover:text-brand-300 transition-colors">{clubInfo.email}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} UDST DevNation. All rights reserved.
          </p>
          <p className="text-slate-600 text-sm flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500" /> by DevNation Members
          </p>
        </div>
      </div>
    </footer>
  )
}
