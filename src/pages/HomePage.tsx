import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Brain, Globe, Smartphone, Calendar, Star, Instagram, Linkedin, ChevronRight, Terminal } from 'lucide-react'
import { useData } from '../context/DataContext'

const groups = [
  { name: 'Data Structures & Algorithms', abbr: 'DSA', icon: Code2, accent: '#10b981', num: '01', description: 'Algorithmic thinking, competitive programming, and interview prep.' },
  { name: 'AI / Machine Learning', abbr: 'AI/ML', icon: Brain, accent: '#8b5cf6', num: '02', description: 'Deep learning, NLP, computer vision, and real-world AI systems.' },
  { name: 'Web Development', abbr: 'Web Dev', icon: Globe, accent: '#0ea5e9', num: '03', description: 'React, TypeScript, Node.js, and full-stack modern experiences.' },
  { name: 'App Development', abbr: 'App Dev', icon: Smartphone, accent: '#f97316', num: '04', description: 'Cross-platform mobile apps with Flutter and React Native.' },
]

const stats = [
  { label: 'Active Members', value: '150+', suffix: '' },
  { label: 'Events Hosted', value: '40+', suffix: '' },
  { label: 'Projects Built', value: '25+', suffix: '' },
  { label: 'Industry Partners', value: '10+', suffix: '' },
]

export default function HomePage() {
  const { clubInfo, events } = useData()
  const upcomingEvents = events.filter(e => e.isOpen).slice(0, 3)

  return (
    <div className="relative overflow-hidden">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center bg-dot overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-brand-600/6 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-500/5 blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: text */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-8"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">UDST Official Technology Club</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display font-bold text-white leading-[0.95] mb-6"
                style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
              >
                UDST<br />
                <span className="text-gradient">DevNation</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md"
              >
                {clubInfo.tagline} — the official developer community of the University of Doha for Science and Technology.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-3 mb-12"
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
                className="flex items-center gap-6"
              >
                <a href={clubInfo.instagram} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 hover:text-pink-400 transition-colors text-sm font-medium group">
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Instagram
                </a>
                <a href={clubInfo.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 hover:text-blue-400 transition-colors text-sm font-medium group">
                  <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  LinkedIn
                </a>
              </motion.div>
            </div>

            {/* Right: stats card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:justify-self-end w-full max-w-sm"
            >
              <div className="rounded-2xl border border-white/8 p-6 space-y-1" style={{ background: 'rgba(8,8,28,0.7)', backdropFilter: 'blur(24px)' }}>
                {/* Fake terminal header */}
                <div className="flex items-center gap-2 pb-4 border-b border-white/6 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-slate-600 text-xs font-mono ml-2">devnation_stats.json</span>
                </div>
                {stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center justify-between py-2.5 border-b border-white/4 last:border-0">
                    <span className="text-slate-500 text-sm font-mono">"{stat.label}"</span>
                    <span className="text-brand-300 font-display font-bold text-lg">"{stat.value}"</span>
                  </div>
                ))}
                <div className="pt-3 flex items-center gap-2 text-slate-700 text-xs font-mono">
                  <Terminal className="w-3 h-3" />
                  <span className="animate-blink">|</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ──────────────────────────────────── */}
      <section className="py-28 relative" style={{ background: '#08081c' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Who We Are</span>
            <div className="flex-1 h-px bg-white/5" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-0 border border-white/8 rounded-2xl overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="p-10 border-b lg:border-b-0 lg:border-r border-white/8 relative overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-brand-500/6 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/15 border border-brand-500/20 flex items-center justify-center">
                    <Star className="w-4 h-4 text-brand-400" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Vision</span>
                </div>
                <p className="text-white text-xl font-display font-semibold leading-relaxed">
                  {clubInfo.vision}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-10 relative overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent-500/5 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-accent-500/15 border border-accent-500/20 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-accent-400" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent-400">Mission</span>
                </div>
                <p className="text-slate-300 text-base leading-relaxed">
                  {clubInfo.mission}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4 Groups ─────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Our Communities</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
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
                className="group relative rounded-xl border border-white/6 p-7 cursor-pointer overflow-hidden transition-all duration-300 hover:border-white/12"
                style={{ background: 'rgba(8,8,24,0.7)' }}
              >
                {/* Accent sweep on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                  style={{ background: `radial-gradient(circle at 0% 100%, ${g.accent}10 0%, transparent 60%)` }}
                />

                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${g.accent}15`, border: `1px solid ${g.accent}25` }}
                  >
                    <g.icon className="w-5 h-5" style={{ color: g.accent }} />
                  </div>
                  <span className="font-mono text-3xl font-black text-white/5 group-hover:text-white/8 transition-colors">{g.num}</span>
                </div>

                <div className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: g.accent }}>{g.abbr}</div>
                <h3 className="font-display font-bold text-white text-lg mb-2 leading-snug">{g.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{g.description}</p>

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
        <section className="py-28" style={{ background: '#08081c' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-14">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">What's Coming</span>
                  <div className="h-px w-16 bg-white/5" />
                </div>
                <h2 className="text-4xl font-display font-bold text-white">Upcoming Events</h2>
              </div>
              <Link to="/events" className="flex items-center gap-1.5 text-brand-400 hover:text-brand-300 font-medium text-sm transition-colors group">
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
                  className="group rounded-xl border border-white/6 overflow-hidden hover:border-white/12 transition-all duration-300"
                  style={{ background: 'rgba(8,8,24,0.8)' }}
                >
                  <div className="h-44 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="tag bg-emerald-500/10 text-emerald-400 text-xs">{event.category}</span>
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                      <span className="text-slate-600 text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-white text-base mb-3 leading-snug">{event.title}</h3>
                    <Link
                      to="/events"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors group/link"
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
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-600 mb-6">Join Us</p>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-5 leading-tight">
              Become Part of<br /><span className="text-gradient">DevNation</span>
            </h2>
            <p className="text-slate-500 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Whether you're just starting or already shipping products — there's a group for you. Build, learn, connect.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={clubInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 font-semibold px-6 py-3 rounded-xl text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
              >
                <Instagram className="w-4 h-4" />
                Follow on Instagram
              </a>
              <a
                href={clubInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 font-semibold px-6 py-3 rounded-xl text-white bg-[#0a66c2] hover:bg-[#0956a8] transition-all duration-200 active:scale-95"
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
