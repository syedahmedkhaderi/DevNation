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
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-500/25">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white mb-2">Admin Access</h1>
            <p className="text-slate-400 text-sm mb-8">Enter the admin password to manage club content</p>

            <div className="relative mb-4">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="input-field pl-11 pr-11"
                placeholder="Admin password"
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button onClick={handleLogin} className="btn-primary w-full">
              Login as Admin
            </button>

            <p className="text-slate-600 text-xs mt-6">Contact the club director for admin access</p>
          </motion.div>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Events', value: events.length, icon: Calendar, color: 'text-green-400', bg: 'bg-green-500/10', link: '/events' },
    { label: 'Projects', value: projects.length, icon: Code2, color: 'text-blue-400', bg: 'bg-blue-500/10', link: '/projects' },
    { label: 'Resources', value: resources.length, icon: BookOpen, color: 'text-amber-400', bg: 'bg-amber-500/10', link: '/resources' },
    { label: 'Members', value: members.length, icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10', link: '/members' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="tag bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-4 inline-flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Admin Panel
              </span>
              <h1 className="section-heading mb-2">Club Management</h1>
              <p className="text-slate-400">Manage all content, members, events, and club settings.</p>
            </motion.div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map(stat => (
            <Link key={stat.label} to={stat.link}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-5 hover:scale-105 transition-transform cursor-pointer">
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-400" /> Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/events" className="flex items-center gap-3 p-4 bg-white/3 hover:bg-white/8 border border-white/8 rounded-xl transition-all group">
              <Calendar className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-white text-sm font-medium">Manage Events</div>
                <div className="text-slate-500 text-xs">Add, edit, delete events</div>
              </div>
            </Link>
            <Link to="/projects" className="flex items-center gap-3 p-4 bg-white/3 hover:bg-white/8 border border-white/8 rounded-xl transition-all group">
              <Code2 className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-white text-sm font-medium">Manage Projects</div>
                <div className="text-slate-500 text-xs">Add, edit, delete projects</div>
              </div>
            </Link>
            <Link to="/resources" className="flex items-center gap-3 p-4 bg-white/3 hover:bg-white/8 border border-white/8 rounded-xl transition-all group">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-white text-sm font-medium">Manage Resources</div>
                <div className="text-slate-500 text-xs">Add, edit, delete resources</div>
              </div>
            </Link>
            <Link to="/members" className="flex items-center gap-3 p-4 bg-white/3 hover:bg-white/8 border border-white/8 rounded-xl transition-all group">
              <Users className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-white text-sm font-medium">Manage Members</div>
                <div className="text-slate-500 text-xs">Add, edit, remove members</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Club Info Editor */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-brand-400" /> Club Information
            </h2>
            <button
              onClick={() => { setEditingInfo(!editingInfo); setInfoForm(clubInfo) }}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-brand-500/10 text-brand-300 hover:bg-brand-500/20 border border-brand-500/20 transition-all"
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
                    <label className="label flex items-center gap-2"><Instagram className="w-4 h-4 text-pink-400" /> Instagram URL</label>
                    <input className="input-field" value={infoForm.instagram} onChange={e => setInfoForm(p => ({ ...p, instagram: e.target.value }))} placeholder="https://instagram.com/..." />
                  </div>
                  <div className="form-group">
                    <label className="label flex items-center gap-2"><Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn URL</label>
                    <input className="input-field" value={infoForm.linkedin} onChange={e => setInfoForm(p => ({ ...p, linkedin: e.target.value }))} placeholder="https://linkedin.com/company/..." />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="form-group"><label className="label">Email</label><input className="input-field" value={infoForm.email} onChange={e => setInfoForm(p => ({ ...p, email: e.target.value }))} /></div>
                  <div className="form-group"><label className="label">WhatsApp URL</label><input className="input-field" value={infoForm.whatsapp} onChange={e => setInfoForm(p => ({ ...p, whatsapp: e.target.value }))} placeholder="https://wa.me/..." /></div>
                </div>
                <button onClick={handleSaveInfo} className="btn-primary">Save Club Info</button>
              </motion.div>
            ) : (
              <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Name</div>
                  <div className="text-white font-medium">{clubInfo.name}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Tagline</div>
                  <div className="text-white font-medium">{clubInfo.tagline}</div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Vision</div>
                  <div className="text-slate-300 text-sm leading-relaxed">{clubInfo.vision}</div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Mission</div>
                  <div className="text-slate-300 text-sm leading-relaxed">{clubInfo.mission}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Social</div>
                  <div className="flex gap-3">
                    <a href={clubInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 text-sm flex items-center gap-1"><Instagram className="w-4 h-4" />Instagram</a>
                    <a href={clubInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"><Linkedin className="w-4 h-4" />LinkedIn</a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Data Reset */}
        <div className="glass-card rounded-2xl p-6 border border-red-500/10">
          <h2 className="text-lg font-display font-bold text-white mb-2 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-red-400" /> Reset Data
          </h2>
          <p className="text-slate-500 text-sm mb-4">Reset any section to the default seed data. This cannot be undone.</p>
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
