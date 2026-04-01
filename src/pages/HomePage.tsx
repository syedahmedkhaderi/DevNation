import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Brain, Globe, Smartphone, Calendar, Star, Instagram, Linkedin, ChevronRight, Terminal } from 'lucide-react'
import { useData } from '../context/DataContext'

const groups = [
  { name: 'Data Structures & Algorithms', abbr: 'DSA', icon: Code2, accent: '#c2956a', num: '01', description: 'Algorithmic thinking, competitive programming, and interview prep.' },
  { name: 'AI / Machine Learning', abbr: 'AI/ML', icon: Brain, accent: '#e26a1b', num: '02', description: 'Deep learning, NLP, computer vision, and real-world AI systems.' },
  { name: 'Web Development', abbr: 'Web Dev', icon: Globe, accent: '#b07d4f', num: '03', description: 'React, TypeScript, Node.js, and full-stack modern experiences.' },
  { name: 'App Development', abbr: 'App Dev', icon: Smartphone, accent: '#e8833c', num: '04', description: 'Cross-platform mobile apps with Flutter and React Native.' },
]

const stats = [
  { label: 'Active Members', value: '150+', fill: 92 },
  { label: 'Events Hosted', value: '40+', fill: 74 },
  { label: 'Projects Built', value: '25+', fill: 58 },
  { label: 'Industry Partners', value: '10+', fill: 40 },
]

export default function HomePage() {
  const { clubInfo, events } = useData()
  const upcomingEvents = events.filter(e => e.isOpen).slice(0, 3)

  return (
    <div className="relative overflow-hidden">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Ambient glows — warm tones */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: 'rgba(226,106,27,0.04)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(176,125,79,0.03)' }} />

        {/* Dot grid */}
        <div className="absolute inset-0 bg-dot opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-36 pb-28 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: text */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-10"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" style={{ background: 'var(--brand)' }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                  UDST Official Technology Club
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display font-bold leading-[0.92] mb-8"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', color: 'var(--text-primary)', letterSpacing: '-0.05em' }}
              >
                UDST<br />
                <span className="text-gradient">DevNation</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-lg leading-relaxed mb-12 max-w-md"
                style={{ color: 'var(--text-secondary)' }}
              >
                {clubInfo.tagline} — the official developer community of the University of Doha for Science and Technology.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-3 mb-14"
              >
                <Link to="/events" className="btn-primary flex items-center gap-2">
                  Explore Events <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/members" className="btn-secondary flex items-center gap-2">
                  Meet the Team
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-8"
              >
                <a href={clubInfo.instagram} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium group transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#c13584'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Instagram
                </a>
                <a href={clubInfo.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium group transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0a66c2'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  LinkedIn
                </a>
              </motion.div>
            </div>

            {/* Right: stats terminal card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:justify-self-end w-full max-w-sm"
            >
              <div className="rounded-lg p-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                {/* HUD Header */}
                <div className="flex items-center justify-between pb-4 mb-5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Mission Control</span>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#4ade80' }}
                    />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: '#4ade80' }}>Live</span>
                  </div>
                </div>

                {/* Metric Rows */}
                <div className="space-y-4">
                  {stats.map((stat, i) => (
                    <div key={stat.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
                        <span className="text-sm font-display font-bold" style={{ color: 'var(--brand)' }}>{stat.value}</span>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, var(--brand), #e8833c)` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stat.fill}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer status */}
                <div className="mt-5 pt-4 flex items-center gap-2" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <div className="flex gap-0.5 items-end h-3">
                    {[3, 5, 4, 6, 5, 3, 6, 4].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 rounded-sm"
                        style={{ height: `${h * 2}px`, background: 'var(--brand)', opacity: 0.7 }}
                        animate={{ scaleY: [1, 0.4, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>All Systems Operational</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ──────────────────────────────────── */}
      <section className="py-32 relative" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-20"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] font-mono" style={{ color: 'var(--text-muted)' }}>Who We Are</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-0 rounded-lg overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="p-10 lg:p-14 relative overflow-hidden"
              style={{ borderRight: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
            >
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-[80px] pointer-events-none" style={{ background: 'rgba(226,106,27,0.04)' }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'rgba(226,106,27,0.1)', border: '1px solid rgba(226,106,27,0.15)' }}>
                    <Star className="w-3.5 h-3.5" style={{ color: 'var(--brand)' }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono" style={{ color: 'var(--brand)' }}>Vision</span>
                </div>
                <p className="text-xl font-display font-semibold leading-relaxed" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  {clubInfo.vision}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-10 lg:p-14 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-[80px] pointer-events-none" style={{ background: 'rgba(176,125,79,0.04)' }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'rgba(176,125,79,0.1)', border: '1px solid rgba(176,125,79,0.15)' }}>
                    <Code2 className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono" style={{ color: 'var(--accent)' }}>Mission</span>
                </div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {clubInfo.mission}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4 Groups ─────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] font-mono" style={{ color: 'var(--text-muted)' }}>Our Communities</span>
              <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
            </div>
            <h2 className="text-4xl lg:text-6xl font-display font-bold leading-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
              4 Specialized<br /><span className="text-gradient">Groups</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {groups.map((g, i) => (
              <motion.div
                key={g.abbr}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-lg p-8 cursor-pointer overflow-hidden transition-all duration-300"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${g.accent}30`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
              >
                {/* Accent sweep on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 0% 100%, ${g.accent}08 0%, transparent 60%)` }}
                />

                <div className="flex items-start justify-between mb-8">
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${g.accent}12`, border: `1px solid ${g.accent}20` }}
                  >
                    <g.icon className="w-5 h-5" style={{ color: g.accent }} />
                  </div>
                  <span className="font-mono text-3xl font-black transition-colors" style={{ color: 'rgba(255,255,255,0.03)' }}>{g.num}</span>
                </div>

                <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] font-mono" style={{ color: g.accent }}>{g.abbr}</div>
                <h3 className="font-display font-bold text-lg mb-3 leading-snug" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{g.name}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{g.description}</p>

                <Link
                  to="/members"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
                  style={{ color: `${g.accent}cc` }}
                  onMouseEnter={e => (e.currentTarget.style.color = g.accent)}
                  onMouseLeave={e => (e.currentTarget.style.color = `${g.accent}cc`)}
                >
                  See Members <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ───────────────────────────────────── */}
      {upcomingEvents.length > 0 && (
        <section className="py-32" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between mb-16">
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] font-mono" style={{ color: 'var(--text-muted)' }}>What's Coming</span>
                  <div className="h-px w-16" style={{ background: 'var(--border-subtle)' }} />
                </div>
                <h2 className="text-4xl font-display font-bold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>Upcoming Events</h2>
              </div>
              <Link to="/events" className="flex items-center gap-1.5 font-medium text-sm transition-colors group"
                style={{ color: 'var(--brand)' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group rounded-lg overflow-hidden transition-all duration-300"
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                >
                  <div className="h-44 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="tag text-xs" style={{ background: 'rgba(226,106,27,0.08)', color: 'var(--brand)' }}>{event.category}</span>
                      <div className="w-1 h-1 rounded-full" style={{ background: 'var(--border-subtle)' }} />
                      <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <Calendar className="w-3 h-3" />
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base mb-3 leading-snug" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{event.title}</h3>
                    <Link
                      to="/events"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors group/link"
                      style={{ color: 'var(--brand)' }}
                    >
                      View Details <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, var(--border-subtle), transparent)' }} />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 font-mono" style={{ color: 'var(--text-muted)' }}>Join Us</p>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6 leading-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
              Become Part of<br /><span className="text-gradient">DevNation</span>
            </h2>
            <p className="text-lg mb-12 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Whether you're just starting or already shipping products — there's a group for you. Build, learn, connect.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={clubInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2.5"
              >
                <Instagram className="w-4 h-4" />
                Follow on Instagram
              </a>
              <a
                href={clubInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2.5"
              >
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
