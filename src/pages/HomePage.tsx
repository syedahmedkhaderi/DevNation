import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Brain, Globe, Smartphone, Users, Calendar, BookOpen, Star, Instagram, Linkedin, ChevronRight } from 'lucide-react'
import { useData } from '../context/DataContext'

const groups = [
  { name: 'Data Structures & Algorithms', abbr: 'DSA', icon: Code2, color: 'from-green-500 to-emerald-600', description: 'Master algorithmic thinking, competitive programming, and technical interview preparation.' },
  { name: 'AI / Machine Learning', abbr: 'AI/ML', icon: Brain, color: 'from-purple-500 to-violet-600', description: 'Explore machine learning, deep learning, NLP, and real-world AI applications.' },
  { name: 'Web Development', abbr: 'Web Dev', icon: Globe, color: 'from-blue-500 to-cyan-600', description: 'Build modern web experiences with React, TypeScript, Node.js, and more.' },
  { name: 'App Development', abbr: 'App Dev', icon: Smartphone, color: 'from-orange-500 to-amber-600', description: 'Create cross-platform mobile applications with Flutter and React Native.' },
]

const stats = [
  { label: 'Active Members', value: '150+' },
  { label: 'Events Hosted', value: '40+' },
  { label: 'Projects Built', value: '25+' },
  { label: 'Industry Partners', value: '10+' },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function HomePage() {
  const { clubInfo, events, projects } = useData()
  const upcomingEvents = events.filter(e => e.isOpen).slice(0, 3)
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3)

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-grid overflow-hidden">
        <div className="absolute inset-0 bg-glow pointer-events-none" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-brand-600/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl animate-pulse-slow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-2 text-brand-300 text-sm font-medium mb-8"
          >
            <Star className="w-4 h-4" />
            UDST Official Technology Club
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight"
          >
            UDST{' '}
            <span className="text-gradient">DevNation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl sm:text-2xl text-slate-400 mb-4 font-medium max-w-3xl mx-auto"
          >
            {clubInfo.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            The official developer community at the University of Doha for Science and Technology — where code meets creativity and innovation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/events" className="btn-primary flex items-center gap-2 text-base">
              Explore Events <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/members" className="btn-secondary flex items-center gap-2 text-base">
              Meet the Team
            </Link>
            <a href={clubInfo.instagram} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-pink-400 transition-colors text-sm font-medium">
              <Instagram className="w-5 h-5" />
              Follow Us
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-display font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-[#080815]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="tag bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-4">Who We Are</span>
            <h2 className="section-heading">Our Vision & Mission</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-brand-500/25">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">Our Vision</h3>
                <p className="text-slate-300 leading-relaxed text-base">
                  {clubInfo.vision}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-700 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-accent-500/25">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">Our Mission</h3>
                <p className="text-slate-300 leading-relaxed text-base">
                  {clubInfo.mission}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Groups Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="tag bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">Our Communities</span>
            <h2 className="section-heading">4 Specialized Groups</h2>
            <p className="section-subheading mx-auto">
              Deep-dive into your area of passion with peers who share your curiosity
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {groups.map((group, i) => (
              <motion.div
                key={group.abbr}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 group cursor-pointer"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${group.color} rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <group.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{group.abbr}</div>
                <h3 className="text-base font-display font-bold text-white mb-3 leading-snug">{group.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{group.description}</p>
                <Link to="/members" className="inline-flex items-center gap-1 text-brand-400 hover:text-brand-300 text-sm font-medium mt-4 transition-colors">
                  See Members <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      {upcomingEvents.length > 0 && (
        <section className="py-24 bg-[#080815]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="tag bg-green-500/10 text-green-300 border border-green-500/20 mb-4 block w-fit">Upcoming</span>
                <h2 className="section-heading mb-0">Upcoming Events</h2>
              </div>
              <Link to="/events" className="flex items-center gap-2 text-brand-300 hover:text-brand-200 font-medium transition-colors text-sm">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden"
                >
                  <div className="h-40 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <span className="tag bg-green-500/10 text-green-300 text-xs mb-3">{event.category}</span>
                    <h3 className="font-display font-bold text-white text-base mb-2 leading-snug">{event.title}</h3>
                    <div className="flex items-center gap-1 text-slate-400 text-xs mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <Link to="/events" className="btn-primary btn-sm flex items-center gap-2 w-fit text-xs mt-3">
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Preview */}
      {featuredProjects.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="tag bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-4 block w-fit">Showcase</span>
                <h2 className="section-heading mb-0">Featured Projects</h2>
              </div>
              <Link to="/projects" className="flex items-center gap-2 text-brand-300 hover:text-brand-200 font-medium transition-colors text-sm">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden"
                >
                  <div className="h-40 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <span className={`tag text-xs mb-3 ${project.status === 'active' ? 'bg-green-500/10 text-green-300' : 'bg-slate-500/10 text-slate-400'}`}>{project.status}</span>
                    <h3 className="font-display font-bold text-white text-base mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 3).map(tech => (
                        <span key={tech} className="tag bg-brand-500/10 text-brand-300 text-xs">{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-[#080815]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative glass-card rounded-3xl p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 to-accent-500/10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Join the DevNation Community
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Whether you're a beginner or an expert, there's a place for you in DevNation. Start building, learning, and connecting today.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={clubInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-5 h-5" />
                  Follow on Instagram
                </a>
                <a
                  href={clubInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-500 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
