import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Plus, Pencil, Trash2, X, Linkedin, Instagram, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useAdmin } from '../context/AdminContext'
import { Member } from '../data/defaults'
import toast from 'react-hot-toast'

function generateId() { return Math.random().toString(36).substr(2, 9) }

const groups = ['DSA', 'AI/ML', 'Web Development', 'App Development']

const groupMeta: Record<string, { bg: string; text: string; border: string; accent: string; num: string }> = {
  'DSA': { bg: 'bg-emerald-500/8', text: 'text-emerald-300', border: 'border-emerald-500/20', accent: '#10b981', num: '01' },
  'AI/ML': { bg: 'bg-violet-500/8', text: 'text-violet-300', border: 'border-violet-500/20', accent: '#8b5cf6', num: '02' },
  'Web Development': { bg: 'bg-sky-500/8', text: 'text-sky-300', border: 'border-sky-500/20', accent: '#0ea5e9', num: '03' },
  'App Development': { bg: 'bg-orange-500/8', text: 'text-orange-300', border: 'border-orange-500/20', accent: '#f97316', num: '04' },
}

const levelRing = [
  'ring-amber-400/60',
  'ring-brand-400/60',
  'ring-cyan-400/60',
  'ring-emerald-400/60',
]
const levelDot = [
  'bg-amber-400',
  'bg-brand-400',
  'bg-cyan-400',
  'bg-emerald-400',
]

function MemberCard({
  member, isAdmin, onEdit, onDelete, size = 'md'
}: {
  member: Member
  isAdmin: boolean
  onEdit: () => void
  onDelete: () => void
  size?: 'lg' | 'md' | 'sm'
}) {
  const ringClass = levelRing[Math.min(member.level, 3)]
  const dotClass = levelDot[Math.min(member.level, 3)]
  const imgSize = size === 'lg' ? 'w-20 h-20' : size === 'md' ? 'w-14 h-14' : 'w-12 h-12'
  const nameSize = size === 'lg' ? 'text-base' : 'text-sm'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="member-card p-4 flex flex-col items-center text-center relative group"
      style={{ width: size === 'lg' ? 200 : size === 'md' ? 170 : 150 }}
    >
      {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button onClick={onEdit} className="p-1.5 rounded-md text-slate-500 hover:text-white hover:bg-white/10 transition-all">
            <Pencil className="w-3 h-3" />
          </button>
          <button onClick={onDelete} className="p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Dot indicator */}
      <div className={`absolute top-3 left-3 w-1.5 h-1.5 rounded-full ${dotClass}`} />

      {/* Avatar */}
      <div className={`${imgSize} rounded-full ring-2 ${ringClass} ring-offset-2 ring-offset-[#060610] mb-3 overflow-hidden shrink-0`}>
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover bg-[#0b0b1f]"
          onError={e => {
            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=6366f1&textColor=ffffff`
          }}
        />
      </div>

      <h3 className={`font-display font-bold text-white ${nameSize} leading-snug mb-0.5`}>{member.name}</h3>
      <p className="text-slate-500 text-xs leading-tight mb-2">{member.position}</p>

      {member.group && (
        <span className={`tag ${groupMeta[member.group]?.bg || 'bg-white/5'} ${groupMeta[member.group]?.text || 'text-slate-400'} text-xs mb-3`}>
          {member.group}
        </span>
      )}

      <div className="flex items-center gap-1.5 mt-auto">
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
            className="w-6 h-6 rounded-md bg-white/5 hover:bg-blue-600 flex items-center justify-center text-slate-500 hover:text-white transition-all duration-200" aria-label="LinkedIn">
            <Linkedin className="w-3 h-3" />
          </a>
        )}
        {member.instagram && (
          <a href={member.instagram} target="_blank" rel="noopener noreferrer"
            className="w-6 h-6 rounded-md bg-white/5 hover:bg-pink-600 flex items-center justify-center text-slate-500 hover:text-white transition-all duration-200" aria-label="Instagram">
            <Instagram className="w-3 h-3" />
          </a>
        )}
        {member.whatsapp && (
          <a href={member.whatsapp} target="_blank" rel="noopener noreferrer"
            className="w-6 h-6 rounded-md bg-white/5 hover:bg-green-600 flex items-center justify-center text-slate-500 hover:text-white transition-all duration-200" aria-label="WhatsApp">
            <MessageCircle className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.div>
  )
}

function LevelSection({ label, color, members, isAdmin, onEdit, onDelete, size = 'md' }: {
  label: string
  color: string
  members: Member[]
  isAdmin: boolean
  onEdit: (m: Member) => void
  onDelete: (id: string) => void
  size?: 'lg' | 'md' | 'sm'
}) {
  if (members.length === 0) return null
  return (
    <div>
      <div className="level-divider" style={{ '--line-color': color } as React.CSSProperties}>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap" style={{ color }}>
          {label}
        </span>
      </div>
      <style>{`.level-divider::before { background: linear-gradient(to right, transparent, ${color}30); } .level-divider::after { background: linear-gradient(to left, transparent, ${color}30); }`}</style>
      <div className="members-row">
        {members.map(m => (
          <MemberCard
            key={m.id}
            member={m}
            isAdmin={isAdmin}
            size={size}
            onEdit={() => onEdit(m)}
            onDelete={() => onDelete(m.id)}
          />
        ))}
      </div>
    </div>
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

  const toggleGroup = (group: string) =>
    setExpandedGroups(p => ({ ...p, [group]: p[group] === false ? true : false }))

  const leadership = members.filter(m => m.level === 0)
  const level1 = members.filter(m => m.level === 1)
  const level2 = members.filter(m => m.level === 2)
  const level3plus = members.filter(m => m.level >= 3)

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-400 mb-3">The People</p>
              <h1 className="text-5xl font-display font-bold text-white leading-none mb-3">
                Our<br /><span className="text-gradient">Members</span>
              </h1>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                Organizers, builders, and community leaders — the humans behind DevNation.
              </p>
            </div>
            {isAdmin && (
              <button onClick={() => { setEditing(null); setShowModal(true) }} className="btn-primary flex items-center gap-2 self-start mt-2">
                <Plus className="w-4 h-4" /> Add Member
              </button>
            )}
          </div>
        </motion.div>

        {/* View Toggle */}
        <div className="inline-flex bg-white/4 border border-white/8 rounded-xl p-1 mb-12 gap-1">
          {(['hierarchy', 'groups'] as const).map(v => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200 ${activeView === v ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {v === 'hierarchy' ? 'Org Hierarchy' : 'By Groups'}
            </button>
          ))}
        </div>

        {/* ── Hierarchy View ───────────────────────────────────── */}
        {activeView === 'hierarchy' && (
          <div className="space-y-14">
            {/* Connector: vertical line between levels */}
            {leadership.length > 0 && (
              <LevelSection label="Founding Leadership" color="#f59e0b" members={leadership} isAdmin={isAdmin} onEdit={m => { setEditing(m); setShowModal(true) }} onDelete={handleDelete} size="lg" />
            )}
            {leadership.length > 0 && level1.length > 0 && (
              <div className="flex justify-center -mt-8 -mb-8">
                <div className="w-px h-10 bg-gradient-to-b from-amber-500/40 to-brand-500/40" />
              </div>
            )}
            {level1.length > 0 && (
              <LevelSection label="Core Leadership" color="#6366f1" members={level1} isAdmin={isAdmin} onEdit={m => { setEditing(m); setShowModal(true) }} onDelete={handleDelete} size="md" />
            )}
            {level1.length > 0 && level2.length > 0 && (
              <div className="flex justify-center -mt-8 -mb-8">
                <div className="w-px h-10 bg-gradient-to-b from-brand-500/40 to-cyan-500/40" />
              </div>
            )}
            {level2.length > 0 && (
              <LevelSection label="Department Heads" color="#06b6d4" members={level2} isAdmin={isAdmin} onEdit={m => { setEditing(m); setShowModal(true) }} onDelete={handleDelete} size="md" />
            )}
            {level2.length > 0 && level3plus.length > 0 && (
              <div className="flex justify-center -mt-8 -mb-8">
                <div className="w-px h-10 bg-gradient-to-b from-cyan-500/40 to-emerald-500/40" />
              </div>
            )}
            {level3plus.length > 0 && (
              <LevelSection label="Core Members" color="#10b981" members={level3plus} isAdmin={isAdmin} onEdit={m => { setEditing(m); setShowModal(true) }} onDelete={handleDelete} size="sm" />
            )}
            {members.length === 0 && (
              <div className="text-center py-16">
                <Users className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-600">No members yet.</p>
              </div>
            )}
          </div>
        )}

        {/* ── Groups View ──────────────────────────────────────── */}
        {activeView === 'groups' && (
          <div className="space-y-4">
            {groups.map((group, idx) => {
              const groupMembers = members.filter(m => m.group === group)
              const meta = groupMeta[group]
              const isExpanded = expandedGroups[group] !== false

              return (
                <motion.div
                  key={group}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  className={`rounded-2xl border overflow-hidden ${meta.border}`}
                  style={{ background: 'rgba(8,8,24,0.7)' }}
                >
                  <button
                    onClick={() => toggleGroup(group)}
                    className="w-full flex items-center justify-between px-6 py-5 hover:bg-white/3 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-bold text-slate-600">{meta.num}</span>
                      <span className={`font-display font-bold text-xl ${meta.text}`}>{group}</span>
                      <span className={`tag ${meta.bg} ${meta.text} border ${meta.border} text-xs`}>
                        {groupMembers.length} members
                      </span>
                    </div>
                    {isExpanded
                      ? <ChevronUp className={`w-4 h-4 ${meta.text} opacity-60`} />
                      : <ChevronDown className={`w-4 h-4 ${meta.text} opacity-60`} />}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2">
                          {groupMembers.length === 0 ? (
                            <p className="text-slate-600 text-sm text-center py-6">No members in this group yet.</p>
                          ) : (
                            <div className="members-row">
                              {groupMembers.map(m => (
                                <MemberCard
                                  key={m.id}
                                  member={m}
                                  isAdmin={isAdmin}
                                  size="sm"
                                  onEdit={() => { setEditing(m); setShowModal(true) }}
                                  onDelete={() => handleDelete(m.id)}
                                />
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

            {/* Non-grouped members */}
            {members.filter(m => !m.group).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/8 overflow-hidden"
                style={{ background: 'rgba(8,8,24,0.7)' }}
              >
                <div className="flex items-center gap-4 px-6 py-5 border-b border-white/5">
                  <span className="font-mono text-xs font-bold text-slate-600">00</span>
                  <span className="font-display font-bold text-xl text-slate-300">General Team</span>
                  <span className="tag bg-white/5 text-slate-500 text-xs">{members.filter(m => !m.group).length} members</span>
                </div>
                <div className="px-6 pb-6 pt-4">
                  <div className="members-row">
                    {members.filter(m => !m.group).map(m => (
                      <MemberCard key={m.id} member={m} isAdmin={isAdmin} size="sm"
                        onEdit={() => { setEditing(m); setShowModal(true) }}
                        onDelete={() => handleDelete(m.id)} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Member Modal */}
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

function MemberModal({ member, members, onClose, onSave }: {
  member: Member | null
  members: Member[]
  onClose: () => void
  onSave: (m: Member) => void
}) {
  const [form, setForm] = useState<Partial<Member>>(member || {
    name: '', position: '', department: '', image: '', level: 3, group: '', linkedin: '', instagram: '', whatsapp: ''
  })

  const handleSubmit = () => {
    if (!form.name || !form.position) { toast.error('Fill in required fields'); return }
    if (!form.image) {
      form.image = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(form.name || '')}&backgroundColor=6366f1&textColor=ffffff`
    }
    onSave({ ...form, id: member?.id || generateId() } as Member)
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
      <motion.div
        initial={{ scale: 0.92, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 16 }}
        className="bg-[#0b0b1f] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display font-bold text-white">{member ? 'Edit Member' : 'Add Member'}</h3>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-all"><X className="w-4 h-4" /></button>
        </div>
        <div className="space-y-3.5">
          <div className="form-group"><label className="label">Full Name *</label><input className="input-field" value={form.name || ''} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Ahmed Al-Rashid" /></div>
          <div className="form-group">
            <label className="label">Position *</label>
            <select className="input-field" value={form.position || ''} onChange={e => setForm(p => ({ ...p, position: e.target.value }))}>
              <option value="">Select or type below...</option>
              {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
            </select>
          </div>
          <div className="form-group"><label className="label">Custom Position (overrides above)</label><input className="input-field" value={form.position || ''} onChange={e => setForm(p => ({ ...p, position: e.target.value }))} placeholder="e.g. Deputy Head of Design" /></div>
          <div className="form-group"><label className="label">Department</label><input className="input-field" value={form.department || ''} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} placeholder="Leadership / DSA / AI/ML / etc." /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="form-group">
              <label className="label">Hierarchy Level</label>
              <select className="input-field" value={form.level ?? 3} onChange={e => setForm(p => ({ ...p, level: Number(e.target.value) }))}>
                <option value={0}>0 — Founder</option>
                <option value={1}>1 — Core Leadership</option>
                <option value={2}>2 — Dept. Head</option>
                <option value={3}>3 — Core Member</option>
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
            <label className="label">Reports To</label>
            <select className="input-field" value={form.parentId || ''} onChange={e => setForm(p => ({ ...p, parentId: e.target.value || undefined }))}>
              <option value="">None</option>
              {members.filter(m => m.id !== member?.id).map(m => <option key={m.id} value={m.id}>{m.name} — {m.position}</option>)}
            </select>
          </div>
          <div className="form-group"><label className="label">Photo URL (blank = auto-generated)</label><input className="input-field" value={form.image || ''} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} placeholder="https://..." /></div>
          <div className="form-group"><label className="label">LinkedIn URL</label><input className="input-field" value={form.linkedin || ''} onChange={e => setForm(p => ({ ...p, linkedin: e.target.value }))} placeholder="https://linkedin.com/in/..." /></div>
          <div className="form-group"><label className="label">Instagram URL</label><input className="input-field" value={form.instagram || ''} onChange={e => setForm(p => ({ ...p, instagram: e.target.value }))} placeholder="https://instagram.com/..." /></div>
          <div className="form-group"><label className="label">WhatsApp URL</label><input className="input-field" value={form.whatsapp || ''} onChange={e => setForm(p => ({ ...p, whatsapp: e.target.value }))} placeholder="https://wa.me/..." /></div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={handleSubmit} className="btn-primary flex-1">{member ? 'Save Changes' : 'Add Member'}</button>
          <button onClick={onClose} className="btn-secondary px-5">Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  )
}
