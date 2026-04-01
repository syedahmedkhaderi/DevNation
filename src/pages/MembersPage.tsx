import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Plus, Pencil, Trash2, X, Linkedin, Instagram, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useAdmin } from '../context/AdminContext'
import { Member } from '../data/defaults'
import toast from 'react-hot-toast'

function generateId() { return Math.random().toString(36).substr(2, 9) }

const groups = ['DSA', 'AI/ML', 'Web Development', 'App Development']

const groupColors: Record<string, { bg: string; text: string; border: string }> = {
  'DSA': { bg: 'bg-green-500/10', text: 'text-green-300', border: 'border-green-500/20' },
  'AI/ML': { bg: 'bg-purple-500/10', text: 'text-purple-300', border: 'border-purple-500/20' },
  'Web Development': { bg: 'bg-blue-500/10', text: 'text-blue-300', border: 'border-blue-500/20' },
  'App Development': { bg: 'bg-orange-500/10', text: 'text-orange-300', border: 'border-orange-500/20' },
}

const levelColors = [
  'from-amber-500 to-yellow-600',
  'from-brand-500 to-violet-600',
  'from-cyan-500 to-blue-600',
  'from-green-500 to-emerald-600',
]

function MemberCard({ member, isAdmin, onEdit, onDelete }: { member: Member; isAdmin: boolean; onEdit: () => void; onDelete: () => void }) {
  const group = member.group ? groupColors[member.group] : null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-2xl p-5 flex flex-col items-center text-center relative group"
    >
      {isAdmin && (
        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all"><Pencil className="w-3.5 h-3.5" /></button>
          <button onClick={onDelete} className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      )}
      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${levelColors[Math.min(member.level, 3)]} p-0.5 mb-4`}>
        <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover bg-[#0f0f2a]" />
      </div>
      <h3 className="font-display font-bold text-white text-sm leading-tight mb-1">{member.name}</h3>
      <p className="text-slate-400 text-xs mb-3 leading-tight">{member.position}</p>
      {member.group && group && (
        <span className={`tag ${group.bg} ${group.text} border ${group.border} text-xs mb-3`}>{member.group}</span>
      )}
      <div className="flex items-center gap-2 mt-auto">
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-blue-600/20 hover:bg-blue-600 rounded-lg flex items-center justify-center text-blue-400 hover:text-white transition-all duration-200" aria-label="LinkedIn">
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        )}
        {member.instagram && (
          <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-pink-600/20 hover:bg-pink-600 rounded-lg flex items-center justify-center text-pink-400 hover:text-white transition-all duration-200" aria-label="Instagram">
            <Instagram className="w-3.5 h-3.5" />
          </a>
        )}
        {member.whatsapp && (
          <a href={member.whatsapp} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-green-600/20 hover:bg-green-600 rounded-lg flex items-center justify-center text-green-400 hover:text-white transition-all duration-200" aria-label="WhatsApp">
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function MembersPage() {
  const { members, addMember, updateMember, removeMember } = useData()
  const { isAdmin } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Member | null>(null)
  const [activeView, setActiveView] = useState<'hierarchy' | 'groups'>('hierarchy')
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})

  const handleDelete = (id: string) => {
    if (!window.confirm('Remove this member?')) return
    removeMember(id)
    toast.success('Member removed')
  }

  const toggleGroup = (group: string) => {
    setExpandedGroups(p => ({ ...p, [group]: !p[group] }))
  }

  // Hierarchy: level 0 first
  const leadership = members.filter(m => m.level === 0)
  const level1 = members.filter(m => m.level === 1)
  const level2 = members.filter(m => m.level === 2)
  const level3 = members.filter(m => m.level === 3)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tag bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4 inline-block">
            <Users className="w-3.5 h-3.5 inline mr-1" /> Team
          </motion.span>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="section-heading mb-2">Our Members</h1>
              <p className="text-slate-400">Meet the people who make DevNation what it is — organizers, builders, and community leaders.</p>
            </div>
            {isAdmin && (
              <button onClick={() => { setEditing(null); setShowModal(true) }} className="btn-primary flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Member
              </button>
            )}
          </motion.div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-10">
          <button onClick={() => setActiveView('hierarchy')} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeView === 'hierarchy' ? 'bg-brand-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
            Org Hierarchy
          </button>
          <button onClick={() => setActiveView('groups')} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeView === 'groups' ? 'bg-brand-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
            By Groups
          </button>
        </div>

        {activeView === 'hierarchy' && (
          <div className="space-y-12">
            {/* Level 0: Founder */}
            {leadership.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/20" />
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400 whitespace-nowrap">Founding Leadership</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/20" />
                </div>
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 max-w-xs w-full">
                    {leadership.map(m => (
                      <MemberCard key={m.id} member={m} isAdmin={isAdmin} onEdit={() => { setEditing(m); setShowModal(true) }} onDelete={() => handleDelete(m.id)} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Connector line */}
            {level1.length > 0 && (
              <div className="flex justify-center">
                <div className="w-px h-8 bg-gradient-to-b from-amber-500/40 to-brand-500/40" />
              </div>
            )}

            {/* Level 1: Leads */}
            {level1.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-500/20" />
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-400 whitespace-nowrap">Core Leadership</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-500/20" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                  {level1.map(m => (
                    <MemberCard key={m.id} member={m} isAdmin={isAdmin} onEdit={() => { setEditing(m); setShowModal(true) }} onDelete={() => handleDelete(m.id)} />
                  ))}
                </div>
              </div>
            )}

            {level2.length > 0 && (
              <div className="flex justify-center">
                <div className="w-px h-8 bg-gradient-to-b from-brand-500/40 to-cyan-500/40" />
              </div>
            )}

            {/* Level 2: Department Heads */}
            {level2.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/20" />
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 whitespace-nowrap">Department Heads</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/20" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                  {level2.map(m => (
                    <MemberCard key={m.id} member={m} isAdmin={isAdmin} onEdit={() => { setEditing(m); setShowModal(true) }} onDelete={() => handleDelete(m.id)} />
                  ))}
                </div>
              </div>
            )}

            {level3.length > 0 && (
              <div className="flex justify-center">
                <div className="w-px h-8 bg-gradient-to-b from-cyan-500/40 to-green-500/40" />
              </div>
            )}

            {/* Level 3: Core Members */}
            {level3.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-green-500/20" />
                  <span className="text-xs font-bold uppercase tracking-widest text-green-400 whitespace-nowrap">Core Members</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-green-500/20" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                  {level3.map(m => (
                    <MemberCard key={m.id} member={m} isAdmin={isAdmin} onEdit={() => { setEditing(m); setShowModal(true) }} onDelete={() => handleDelete(m.id)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeView === 'groups' && (
          <div className="space-y-6">
            {groups.map(group => {
              const groupMembers = members.filter(m => m.group === group)
              const colors = groupColors[group]
              const isExpanded = expandedGroups[group] !== false

              return (
                <motion.div key={group} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`border ${colors.border} rounded-2xl overflow-hidden`}>
                  <button
                    onClick={() => toggleGroup(group)}
                    className={`w-full flex items-center justify-between px-6 py-5 ${colors.bg} hover:bg-opacity-20 transition-all`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-display font-bold text-lg ${colors.text}`}>{group}</span>
                      <span className={`tag ${colors.bg} ${colors.text} ${colors.border} border text-xs`}>{groupMembers.length} members</span>
                    </div>
                    {isExpanded ? <ChevronUp className={`w-5 h-5 ${colors.text}`} /> : <ChevronDown className={`w-5 h-5 ${colors.text}`} />}
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="p-6">
                          {groupMembers.length === 0 ? (
                            <p className="text-slate-500 text-sm text-center py-4">No members in this group yet.</p>
                          ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                              {groupMembers.map(m => (
                                <MemberCard key={m.id} member={m} isAdmin={isAdmin} onEdit={() => { setEditing(m); setShowModal(true) }} onDelete={() => handleDelete(m.id)} />
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}

            {/* Non-group members */}
            {members.filter(m => !m.group).length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-white/10 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-5 bg-white/3">
                  <span className="font-display font-bold text-lg text-slate-300">General Team</span>
                  <span className="tag bg-white/5 text-slate-400 text-xs">{members.filter(m => !m.group).length} members</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                    {members.filter(m => !m.group).map(m => (
                      <MemberCard key={m.id} member={m} isAdmin={isAdmin} onEdit={() => { setEditing(m); setShowModal(true) }} onDelete={() => handleDelete(m.id)} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <MemberModal
            member={editing}
            members={members}
            onClose={() => { setShowModal(false); setEditing(null) }}
            onSave={m => {
              if (editing) { updateMember(m); toast.success('Member updated') }
              else { addMember({ ...m, id: generateId() }); toast.success('Member added') }
              setShowModal(false); setEditing(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function MemberModal({ member, members, onClose, onSave }: { member: Member | null; members: Member[]; onClose: () => void; onSave: (m: Member) => void }) {
  const [form, setForm] = useState<Partial<Member>>(member || {
    name: '', position: '', department: '', image: '', level: 3, group: '', linkedin: '', instagram: '', whatsapp: ''
  })

  const handleSubmit = () => {
    if (!form.name || !form.position) { toast.error('Fill in required fields'); return }
    if (!form.image) {
      form.image = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(form.name || '')}&backgroundColor=b6e3f4`
    }
    onSave({ ...form, id: member?.id || Math.random().toString(36).substr(2, 9) } as Member)
  }

  const positions = [
    'Founder & Director', 'Co-Founder & Strategic Lead',
    'Head of DSA', 'Head of AI/ML', 'Head of Web Development', 'Head of App Development',
    'Media Team Lead', 'Events & Programs Lead',
    'DSA Core Member', 'AI/ML Core Member', 'Web Dev Core Member', 'App Dev Core Member',
    'General Member',
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center modal-overlay p-4">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-[#0f0f2a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display font-bold text-white">{member ? 'Edit Member' : 'Add Member'}</h3>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <div className="form-group"><label className="label">Full Name *</label><input className="input-field" value={form.name || ''} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Ahmed Al-Rashid" /></div>
          <div className="form-group">
            <label className="label">Position *</label>
            <select className="input-field" value={form.position || ''} onChange={e => setForm(p => ({ ...p, position: e.target.value }))}>
              <option value="">Select position...</option>
              {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
            </select>
          </div>
          <div className="form-group"><label className="label">Custom Position (if not in list)</label><input className="input-field" value={form.position || ''} onChange={e => setForm(p => ({ ...p, position: e.target.value }))} placeholder="Enter custom position" /></div>
          <div className="form-group"><label className="label">Department</label><input className="input-field" value={form.department || ''} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} placeholder="Leadership / DSA / AI/ML / etc." /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="form-group">
              <label className="label">Hierarchy Level</label>
              <select className="input-field" value={form.level ?? 3} onChange={e => setForm(p => ({ ...p, level: Number(e.target.value) }))}>
                <option value={0}>0 - Founder</option>
                <option value={1}>1 - Core Leadership</option>
                <option value={2}>2 - Department Head</option>
                <option value={3}>3 - Core Member</option>
              </select>
            </div>
            <div className="form-group">
              <label className="label">Group</label>
              <select className="input-field" value={form.group || ''} onChange={e => setForm(p => ({ ...p, group: e.target.value || undefined }))}>
                <option value="">None</option>
                {groups.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="label">Parent (reports to)</label>
            <select className="input-field" value={form.parentId || ''} onChange={e => setForm(p => ({ ...p, parentId: e.target.value || undefined }))}>
              <option value="">None</option>
              {members.filter(m => m.id !== member?.id).map(m => <option key={m.id} value={m.id}>{m.name} - {m.position}</option>)}
            </select>
          </div>
          <div className="form-group"><label className="label">Profile Photo URL (leave blank for auto)</label><input className="input-field" value={form.image || ''} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} placeholder="https://..." /></div>
          <div className="form-group"><label className="label">LinkedIn URL</label><input className="input-field" value={form.linkedin || ''} onChange={e => setForm(p => ({ ...p, linkedin: e.target.value }))} placeholder="https://linkedin.com/in/..." /></div>
          <div className="form-group"><label className="label">Instagram URL</label><input className="input-field" value={form.instagram || ''} onChange={e => setForm(p => ({ ...p, instagram: e.target.value }))} placeholder="https://instagram.com/..." /></div>
          <div className="form-group"><label className="label">WhatsApp URL</label><input className="input-field" value={form.whatsapp || ''} onChange={e => setForm(p => ({ ...p, whatsapp: e.target.value }))} placeholder="https://wa.me/..." /></div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={handleSubmit} className="btn-primary flex-1">{member ? 'Save Changes' : 'Add Member'}</button>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  )
}
