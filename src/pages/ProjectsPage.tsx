import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Github, ExternalLink, Plus, Pencil, Trash2, X, Search, Filter } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useAdmin } from '../context/AdminContext'
import { Project } from '../data/defaults'
import toast from 'react-hot-toast'

function generateId() { return Math.random().toString(36).substr(2, 9) }

const statusColors: Record<string, { bg: string; text: string }> = {
  active: { bg: 'rgba(226,106,27,0.08)', text: 'var(--brand)' },
  completed: { bg: 'rgba(255,255,255,0.05)', text: 'var(--text-secondary)' },
  planning: { bg: 'rgba(176,125,79,0.08)', text: 'var(--accent)' },
}

const categories = ['All', 'Web Development', 'App Development', 'AI/ML', 'DSA', 'Design', 'Other']

export default function ProjectsPage() {
  const { projects, addProject, updateProject, removeProject } = useData()
  const { isAdmin } = useAdmin()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)

  const filtered = projects.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || p.category === category
    const matchStatus = status === 'All' || p.status === status.toLowerCase()
    return matchSearch && matchCat && matchStatus
  })

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this project?')) return
    removeProject(id)
    toast.success('Project removed')
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="mb-12">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tag mb-4 inline-block" style={{ background: 'rgba(226,106,27,0.08)', color: 'var(--brand)', border: '1px solid rgba(226,106,27,0.15)' }}>
            <Code2 className="w-3.5 h-3.5 inline mr-1" /> Projects
          </motion.span>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="section-heading mb-2">Member Projects</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Real products built by DevNation members — from hackathon prototypes to production-ready apps.</p>
            </div>
            {isAdmin && (
              <button onClick={() => { setEditing(null); setShowModal(true) }} className="btn-primary flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Project
              </button>
            )}
          </motion.div>
        </div>

        <div className="flex flex-col gap-4 mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)} className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200" style={{
                background: category === c ? 'var(--brand)' : 'rgba(255,255,255,0.03)',
                color: category === c ? '#fff' : 'var(--text-secondary)',
                border: category === c ? 'none' : '1px solid var(--border-subtle)',
              }}>{c}</button>
            ))}
            <div className="w-px mx-1" style={{ background: 'var(--border-subtle)' }} />
            {['All', 'Active', 'Completed', 'Planning'].map(s => (
              <button key={s} onClick={() => setStatus(s)} className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200" style={{
                background: status === s ? 'var(--brand)' : 'rgba(255,255,255,0.03)',
                color: status === s ? '#fff' : 'var(--text-secondary)',
                border: status === s ? 'none' : '1px solid var(--border-subtle)',
              }}>{s}</button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <Code2 className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
            <p style={{ color: 'var(--text-muted)' }}>No projects found.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, i) => {
              const st = statusColors[project.status] || statusColors.active
              return (
              <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card rounded-lg overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  {project.featured && (
                    <div className="absolute top-3 left-3 tag backdrop-blur-sm" style={{ background: 'rgba(226,106,27,0.15)', color: 'var(--brand)', border: '1px solid rgba(226,106,27,0.2)' }}>Featured</div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className="tag backdrop-blur-sm" style={{ background: st.bg, color: st.text }}>{project.status}</span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="tag text-xs" style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>{project.category}</span>
                    {isAdmin && (
                      <div className="flex gap-1 shrink-0">
                        <button onClick={() => { setEditing(project); setShowModal(true) }} className="p-1.5 rounded-md transition-all" style={{ color: 'var(--text-muted)' }}><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete(project.id)} className="p-1.5 rounded-md transition-all" style={{ color: 'var(--text-muted)' }}><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{project.title}</h3>
                  <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map(t => <span key={t} className="tag text-xs" style={{ background: 'rgba(226,106,27,0.08)', color: 'var(--brand)' }}>{t}</span>)}
                  </div>
                  <div className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Team: {project.team.join(', ')}</div>
                  <div className="flex gap-3">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium transition-colors" style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                      >
                        <Github className="w-4 h-4" /> GitHub
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium transition-colors" style={{ color: 'var(--brand)' }}>
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )})}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <ProjectModal
            project={editing}
            onClose={() => { setShowModal(false); setEditing(null) }}
            onSave={p => {
              if (editing) { updateProject(p); toast.success('Project updated') }
              else { addProject({ ...p, id: generateId() }); toast.success('Project added') }
              setShowModal(false); setEditing(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function ProjectModal({ project, onClose, onSave }: { project: Project | null; onClose: () => void; onSave: (p: Project) => void }) {
  const [form, setForm] = useState<Partial<Project>>(project || {
    title: '', description: '', image: '', category: 'Web Development', techStack: [], team: [], status: 'active', year: new Date().getFullYear(), featured: false, githubLink: '', liveLink: ''
  })

  const handleSubmit = () => {
    if (!form.title || !form.description) { toast.error('Fill in required fields'); return }
    onSave({
      ...form,
      id: project?.id || generateId(),
      techStack: typeof form.techStack === 'string' ? (form.techStack as string).split(',').map(t => t.trim()).filter(Boolean) : form.techStack || [],
      team: typeof form.team === 'string' ? (form.team as string).split(',').map(t => t.trim()).filter(Boolean) : form.team || [],
    } as Project)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center modal-overlay p-4">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display font-bold" style={{ color: 'var(--text-primary)' }}>{project ? 'Edit Project' : 'Add Project'}</h3>
          <button onClick={onClose} className="p-2 rounded-md" style={{ color: 'var(--text-muted)' }}><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <div className="form-group"><label className="label">Title *</label><input className="input-field" value={form.title || ''} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Project title" /></div>
          <div className="form-group"><label className="label">Description *</label><textarea rows={3} className="input-field" value={form.description || ''} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="What does this project do?" /></div>
          <div className="form-group"><label className="label">Image URL</label><input className="input-field" value={form.image || ''} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} placeholder="https://..." /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="form-group">
              <label className="label">Category</label>
              <select className="input-field" value={form.category || 'Web Development'} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {['Web Development', 'App Development', 'AI/ML', 'DSA', 'Design', 'Other'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="label">Status</label>
              <select className="input-field" value={form.status || 'active'} onChange={e => setForm(p => ({ ...p, status: e.target.value as 'active' | 'completed' | 'planning' }))}>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="planning">Planning</option>
              </select>
            </div>
          </div>
          <div className="form-group"><label className="label">Tech Stack (comma-separated)</label><input className="input-field" value={Array.isArray(form.techStack) ? form.techStack.join(', ') : ''} onChange={e => setForm(p => ({ ...p, techStack: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} placeholder="React, TypeScript, Node.js" /></div>
          <div className="form-group"><label className="label">Team Members (comma-separated)</label><input className="input-field" value={Array.isArray(form.team) ? form.team.join(', ') : ''} onChange={e => setForm(p => ({ ...p, team: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} placeholder="Alice, Bob, Charlie" /></div>
          <div className="form-group"><label className="label">GitHub Link</label><input className="input-field" value={form.githubLink || ''} onChange={e => setForm(p => ({ ...p, githubLink: e.target.value }))} placeholder="https://github.com/..." /></div>
          <div className="form-group"><label className="label">Live Demo Link</label><input className="input-field" value={form.liveLink || ''} onChange={e => setForm(p => ({ ...p, liveLink: e.target.value }))} placeholder="https://..." /></div>
          <div className="form-group"><label className="label">Year</label><input type="number" className="input-field" value={form.year || new Date().getFullYear()} onChange={e => setForm(p => ({ ...p, year: Number(e.target.value) }))} /></div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="featured" checked={form.featured || false} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="w-4 h-4 rounded" />
            <label htmlFor="featured" className="text-sm cursor-pointer" style={{ color: 'var(--text-secondary)' }}>Featured project</label>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={handleSubmit} className="btn-primary flex-1">{project ? 'Save Changes' : 'Add Project'}</button>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  )
}
