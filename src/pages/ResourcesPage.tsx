import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ExternalLink, Plus, Pencil, Trash2, X, Search, Video, BookMarked, Wrench, FileText, Star } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useAdmin } from '../context/AdminContext'
import { Resource } from '../data/defaults'
import toast from 'react-hot-toast'

function generateId() { return Math.random().toString(36).substr(2, 9) }

const typeIcons: Record<string, typeof BookOpen> = {
  article: FileText,
  video: Video,
  course: BookMarked,
  tool: Wrench,
  book: BookOpen,
  workshop: Star,
}

const typeColors: Record<string, string> = {
  article: 'bg-blue-500/10 text-blue-300',
  video: 'bg-red-500/10 text-red-300',
  course: 'bg-green-500/10 text-green-300',
  tool: 'bg-amber-500/10 text-amber-300',
  book: 'bg-purple-500/10 text-purple-300',
  workshop: 'bg-cyan-500/10 text-cyan-300',
}

const categories = ['All', 'Web Development', 'App Development', 'AI/ML', 'DSA', 'Design', 'DevOps', 'Other']
const types = ['All', 'article', 'video', 'course', 'tool', 'book', 'workshop']

export default function ResourcesPage() {
  const { resources, addResource, updateResource, removeResource } = useData()
  const { isAdmin } = useAdmin()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [type, setType] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Resource | null>(null)

  const filtered = resources.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || r.category === category
    const matchType = type === 'All' || r.type === type
    return matchSearch && matchCat && matchType
  })

  const featured = filtered.filter(r => r.featured)
  const regular = filtered.filter(r => !r.featured)

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this resource?')) return
    removeResource(id)
    toast.success('Resource removed')
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tag bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-4 inline-block">
            <BookOpen className="w-3.5 h-3.5 inline mr-1" /> Resources
          </motion.span>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="section-heading mb-2">Learning Resources</h1>
              <p className="text-slate-400">Curated courses, articles, tools, and guides recommended by DevNation members.</p>
            </div>
            {isAdmin && (
              <button onClick={() => { setEditing(null); setShowModal(true) }} className="btn-primary flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Resource
              </button>
            )}
          </motion.div>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search resources..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${category === c ? 'bg-amber-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>{c}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {types.map(t => (
              <button key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-200 ${type === t ? 'bg-brand-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>{t}</button>
            ))}
          </div>
        </div>

        {featured.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" /> Featured Resources
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((r, i) => (
                <ResourceCard key={r.id} resource={r} index={i} isAdmin={isAdmin} onEdit={() => { setEditing(r); setShowModal(true) }} onDelete={() => handleDelete(r.id)} featured />
              ))}
            </div>
          </div>
        )}

        {regular.length > 0 && (
          <div>
            {featured.length > 0 && <h2 className="text-lg font-display font-bold text-white mb-4">All Resources</h2>}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {regular.map((r, i) => (
                <ResourceCard key={r.id} resource={r} index={i} isAdmin={isAdmin} onEdit={() => { setEditing(r); setShowModal(true) }} onDelete={() => handleDelete(r.id)} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500">No resources found.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <ResourceModal
            resource={editing}
            onClose={() => { setShowModal(false); setEditing(null) }}
            onSave={r => {
              if (editing) { updateResource(r); toast.success('Resource updated') }
              else { addResource({ ...r, id: generateId() }); toast.success('Resource added') }
              setShowModal(false); setEditing(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function ResourceCard({ resource: r, index, isAdmin, onEdit, onDelete, featured }: { resource: Resource; index: number; isAdmin: boolean; onEdit: () => void; onDelete: () => void; featured?: boolean }) {
  const Icon = typeIcons[r.type] || FileText

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className={`glass-card rounded-2xl overflow-hidden flex flex-col ${featured ? 'ring-1 ring-amber-500/20' : ''}`}>
      {r.thumbnail && (
        <div className="h-36 overflow-hidden">
          <img src={r.thumbnail} alt={r.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`tag capitalize ${typeColors[r.type] || 'bg-white/5 text-slate-400'}`}><Icon className="w-3 h-3" />{r.type}</span>
            <span className="tag bg-white/5 text-slate-400 text-xs">{r.category}</span>
          </div>
          {isAdmin && (
            <div className="flex gap-1 shrink-0">
              <button onClick={onEdit} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all"><Pencil className="w-3.5 h-3.5" /></button>
              <button onClick={onDelete} className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          )}
        </div>
        <h3 className="font-display font-bold text-white text-base mb-2">{r.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{r.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {r.tags.map(t => <span key={t} className="tag bg-white/5 text-slate-500 text-xs">{t}</span>)}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600 text-xs">by {r.addedBy}</span>
          <a href={r.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-brand-300 hover:text-brand-200 text-sm font-medium transition-colors">
            Open <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function ResourceModal({ resource, onClose, onSave }: { resource: Resource | null; onClose: () => void; onSave: (r: Resource) => void }) {
  const [form, setForm] = useState<Partial<Resource>>(resource || {
    title: '', description: '', type: 'course', category: 'Web Development', link: '', tags: [], addedBy: '', featured: false, thumbnail: ''
  })

  const handleSubmit = () => {
    if (!form.title || !form.description || !form.link) { toast.error('Fill in required fields'); return }
    onSave({
      ...form,
      id: resource?.id || Math.random().toString(36).substr(2, 9),
      tags: typeof form.tags === 'string' ? (form.tags as string).split(',').map(t => t.trim()).filter(Boolean) : form.tags || [],
    } as Resource)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center modal-overlay p-4">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-[#0f0f2a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display font-bold text-white">{resource ? 'Edit Resource' : 'Add Resource'}</h3>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <div className="form-group"><label className="label">Title *</label><input className="input-field" value={form.title || ''} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Resource title" /></div>
          <div className="form-group"><label className="label">Description *</label><textarea rows={3} className="input-field" value={form.description || ''} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="What will the learner get from this?" /></div>
          <div className="form-group"><label className="label">Link *</label><input className="input-field" value={form.link || ''} onChange={e => setForm(p => ({ ...p, link: e.target.value }))} placeholder="https://..." /></div>
          <div className="form-group"><label className="label">Thumbnail URL</label><input className="input-field" value={form.thumbnail || ''} onChange={e => setForm(p => ({ ...p, thumbnail: e.target.value }))} placeholder="https://..." /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="form-group">
              <label className="label">Type</label>
              <select className="input-field" value={form.type || 'course'} onChange={e => setForm(p => ({ ...p, type: e.target.value as Resource['type'] }))}>
                {['article', 'video', 'course', 'tool', 'book', 'workshop'].map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="label">Category</label>
              <select className="input-field" value={form.category || 'Web Development'} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {['Web Development', 'App Development', 'AI/ML', 'DSA', 'Design', 'DevOps', 'Other'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group"><label className="label">Tags (comma-separated)</label><input className="input-field" value={Array.isArray(form.tags) ? form.tags.join(', ') : ''} onChange={e => setForm(p => ({ ...p, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} placeholder="React, Beginner, Free" /></div>
          <div className="form-group"><label className="label">Added By</label><input className="input-field" value={form.addedBy || ''} onChange={e => setForm(p => ({ ...p, addedBy: e.target.value }))} placeholder="Your name" /></div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="resfeatured" checked={form.featured || false} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="w-4 h-4 rounded border-white/20 bg-white/5" />
            <label htmlFor="resfeatured" className="text-slate-300 text-sm cursor-pointer">Featured resource</label>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={handleSubmit} className="btn-primary flex-1">{resource ? 'Save Changes' : 'Add Resource'}</button>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  )
}
