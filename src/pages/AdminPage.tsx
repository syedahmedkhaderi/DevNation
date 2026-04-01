import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Eye, EyeOff, Lock, Settings, Users, Calendar, Code2, BookOpen, Globe, Linkedin, Instagram, LogOut, RefreshCw } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useData } from '../context/DataContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function AdminPage() {
  const { isAdmin, login, logout } = useAdmin()
  const { events, projects, resources, members, clubInfo, updateClubInfo } = useData()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [editingInfo, setEditingInfo] = useState(false)
  const [infoForm, setInfoForm] = useState(clubInfo)

  const handleLogin = () => {
    if (login(password)) {
      toast.success('Welcome back, Admin!')
      setPassword('')
    } else {
      toast.error('Incorrect password')
    }
  }

  const handleSaveInfo = () => {
    updateClubInfo(infoForm)
    setEditingInfo(false)
    toast.success('Club info updated successfully')
  }

  const handleResetData = (key: string) => {
    if (!window.confirm(`Reset ${key} to default data? This cannot be undone.`)) return
    localStorage.removeItem(`devnation_${key}`)
    window.location.reload()
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="w-full max-w-md px-5">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-8 text-center">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'var(--brand)', boxShadow: '0 4px 20px rgba(226,106,27,0.3)' }}
            >
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold mb-2" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Admin Access</h1>
            <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>Enter the admin password to manage club content</p>

            <div className="relative mb-5">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="input-field pl-11 pr-11"
                placeholder="Admin password"
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: 'var(--text-muted)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button onClick={handleLogin} className="btn-primary w-full shadow-md">
              Login as Admin
            </button>

            <p className="text-xs mt-6" style={{ color: 'var(--text-muted)' }}>Contact the club director for admin access</p>
          </motion.div>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Events', value: events.length, icon: Calendar, color: 'var(--brand)', bg: 'rgba(226,106,27,0.08)', link: '/events' },
    { label: 'Projects', value: projects.length, icon: Code2, color: 'var(--brand-light)', bg: 'rgba(232,131,60,0.08)', link: '/projects' },
    { label: 'Resources', value: resources.length, icon: BookOpen, color: 'var(--accent)', bg: 'rgba(176,125,79,0.08)', link: '/resources' },
    { label: 'Members', value: members.length, icon: Users, color: '#c2956a', bg: 'rgba(194,149,106,0.08)', link: '/members' },
  ]

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-12">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="tag mb-4 inline-flex items-center gap-1.5" style={{ background: 'rgba(226,106,27,0.08)', color: 'var(--brand)', border: '1px solid rgba(226,106,27,0.15)' }}>
                <Shield className="w-3.5 h-3.5" /> Admin Panel
              </span>
              <h1 className="section-heading mb-2">Club Management</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Manage all content, members, events, and club settings.</p>
            </motion.div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all" style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {stats.map(stat => (
            <Link key={stat.label} to={stat.link}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-lg p-5 hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-10 h-10 rounded-md flex items-center justify-center mb-4" style={{ background: stat.bg }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="text-2xl font-display font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-lg p-6 mb-10">
          <h2 className="text-lg font-display font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Settings className="w-5 h-5" style={{ color: 'var(--brand)' }} /> Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/events" className="flex items-center gap-3 p-4 rounded-md transition-all group" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}>
              <Calendar className="w-5 h-5" style={{ color: 'var(--brand)' }} />
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Manage Events</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Add, edit, delete events</div>
              </div>
            </Link>
            <Link to="/projects" className="flex items-center gap-3 p-4 rounded-md transition-all group" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}>
              <Code2 className="w-5 h-5" style={{ color: 'var(--brand-light)' }} />
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Manage Projects</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Add, edit, delete projects</div>
              </div>
            </Link>
            <Link to="/resources" className="flex items-center gap-3 p-4 rounded-md transition-all group" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}>
              <BookOpen className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Manage Resources</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Add, edit, delete resources</div>
              </div>
            </Link>
            <Link to="/members" className="flex items-center gap-3 p-4 rounded-md transition-all group" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}>
              <Users className="w-5 h-5" style={{ color: '#c2956a' }} />
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Manage Members</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Add, edit, remove members</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Club Info Editor */}
        <div className="glass-card rounded-lg p-6 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Globe className="w-5 h-5" style={{ color: 'var(--brand)' }} /> Club Information
            </h2>
            <button
              onClick={() => { setEditingInfo(!editingInfo); setInfoForm(clubInfo) }}
              className="px-4 py-2 rounded-md text-sm font-medium transition-all"
              style={{ background: 'rgba(226,106,27,0.1)', color: 'var(--brand)', border: '1px solid rgba(226,106,27,0.2)' }}
            >
              {editingInfo ? 'Cancel' : 'Edit Info'}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {editingInfo ? (
              <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="form-group"><label className="label">Club Name</label><input className="input-field" value={infoForm.name} onChange={e => setInfoForm(p => ({ ...p, name: e.target.value }))} /></div>
                  <div className="form-group"><label className="label">Tagline</label><input className="input-field" value={infoForm.tagline} onChange={e => setInfoForm(p => ({ ...p, tagline: e.target.value }))} /></div>
                </div>
                <div className="form-group"><label className="label">Vision</label><textarea rows={3} className="input-field" value={infoForm.vision} onChange={e => setInfoForm(p => ({ ...p, vision: e.target.value }))} /></div>
                <div className="form-group"><label className="label">Mission</label><textarea rows={4} className="input-field" value={infoForm.mission} onChange={e => setInfoForm(p => ({ ...p, mission: e.target.value }))} /></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="label flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}><Instagram className="w-4 h-4" style={{ color: '#ec4899' }} /> Instagram URL</label>
                    <input className="input-field" value={infoForm.instagram} onChange={e => setInfoForm(p => ({ ...p, instagram: e.target.value }))} placeholder="https://instagram.com/..." />
                  </div>
                  <div className="form-group">
                    <label className="label flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}><Linkedin className="w-4 h-4" style={{ color: '#3b82f6' }} /> LinkedIn URL</label>
                    <input className="input-field" value={infoForm.linkedin} onChange={e => setInfoForm(p => ({ ...p, linkedin: e.target.value }))} placeholder="https://linkedin.com/company/..." />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="form-group"><label className="label">Email</label><input className="input-field" value={infoForm.email} onChange={e => setInfoForm(p => ({ ...p, email: e.target.value }))} /></div>
                  <div className="form-group"><label className="label">WhatsApp URL</label><input className="input-field" value={infoForm.whatsapp} onChange={e => setInfoForm(p => ({ ...p, whatsapp: e.target.value }))} placeholder="https://wa.me/..." /></div>
                </div>
                <button onClick={handleSaveInfo} className="btn-primary mt-4">Save Club Info</button>
              </motion.div>
            ) : (
              <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid sm:grid-cols-2 gap-8">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Name</div>
                  <div className="font-medium" style={{ color: 'var(--text-primary)' }}>{clubInfo.name}</div>
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Tagline</div>
                  <div className="font-medium" style={{ color: 'var(--text-primary)' }}>{clubInfo.tagline}</div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Vision</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{clubInfo.vision}</div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Mission</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{clubInfo.mission}</div>
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Social</div>
                  <div className="flex gap-4">
                    <a href={clubInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-1.5 hover:opacity-80 transition-opacity" style={{ color: '#ec4899' }}><Instagram className="w-4 h-4" />Instagram</a>
                    <a href={clubInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-1.5 hover:opacity-80 transition-opacity" style={{ color: '#3b82f6' }}><Linkedin className="w-4 h-4" />LinkedIn</a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Data Reset */}
        <div className="glass-card rounded-lg p-6 border" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
          <h2 className="text-lg font-display font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <RefreshCw className="w-5 h-5 text-red-400" /> Reset Data
          </h2>
          <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>Reset any section to the default seed data. This cannot be undone.</p>
          <div className="flex flex-wrap gap-3">
            {['events', 'projects', 'resources', 'members', 'clubinfo'].map(key => (
              <button
                key={key}
                onClick={() => handleResetData(key)}
                className="btn-danger capitalize"
              >
                Reset {key}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
