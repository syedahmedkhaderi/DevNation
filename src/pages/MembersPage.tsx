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
  'DSA': { bg: 'rgba(194,149,106,0.06)', text: '#c2956a', border: 'rgba(194,149,106,0.15)', accent: '#c2956a', num: '01' },
  'AI/ML': { bg: 'rgba(226,106,27,0.06)', text: '#e26a1b', border: 'rgba(226,106,27,0.15)', accent: '#e26a1b', num: '02' },
  'Web Development': { bg: 'rgba(176,125,79,0.06)', text: '#b07d4f', border: 'rgba(176,125,79,0.15)', accent: '#b07d4f', num: '03' },
  'App Development': { bg: 'rgba(244,131,60,0.06)', text: '#e8833c', border: 'rgba(244,131,60,0.15)', accent: '#e8833c', num: '04' },
}

const levelColors = [
  { ring: 'rgba(226,106,27,0.5)', dot: '#e26a1b' },
  { ring: 'rgba(232,131,60,0.5)', dot: '#e8833c' },
  { ring: 'rgba(176,125,79,0.5)', dot: '#b07d4f' },
  { ring: 'rgba(194,149,106,0.5)', dot: '#c2956a' },
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
  const lc = levelColors[Math.min(member.level, 3)]
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
          <button onClick={onEdit} className="p-1.5 rounded-md transition-all" style={{ color: 'var(--text-muted)' }}>
            <Pencil className="w-3 h-3" />
          </button>
          <button onClick={onDelete} className="p-1.5 rounded-md transition-all" style={{ color: 'var(--text-muted)' }}>
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Dot indicator */}
      <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full" style={{ background: lc.dot }} />

      {/* Avatar */}
      <div
        className={`${imgSize} rounded-full mb-3 overflow-hidden shrink-0`}
        style={{ boxShadow: `0 0 0 2px var(--bg-primary), 0 0 0 4px ${lc.ring}` }}
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          style={{ background: 'var(--bg-secondary)' }}
          onError={e => {
            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=e26a1b&textColor=ffffff`
          }}
        />
      </div>

      <h3 className={`font-display font-bold ${nameSize} leading-snug mb-0.5`} style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{member.name}</h3>
      <p className="text-xs leading-tight mb-2" style={{ color: 'var(--text-muted)' }}>{member.position}</p>

      {member.group && (
        <span className="tag text-xs mb-3" style={{
          background: groupMeta[member.group]?.bg || 'rgba(255,255,255,0.03)',
          color: groupMeta[member.group]?.text || 'var(--text-muted)'
        }}>
          {member.group}
        </span>
      )}

      <div className="flex items-center gap-1.5 mt-auto">
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
            className="w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0a66c2'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-muted)' }}
            aria-label="LinkedIn">
            <Linkedin className="w-3 h-3" />
          </a>
        )}
        {member.instagram && (
          <a href={member.instagram} target="_blank" rel="noopener noreferrer"
            className="w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c13584'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-muted)' }}
            aria-label="Instagram">
            <Instagram className="w-3 h-3" />
          </a>
        )}
        {member.whatsapp && (
          <a href={member.whatsapp} target="_blank" rel="noopener noreferrer"
            className="w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#25d366'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-muted)' }}
            aria-label="WhatsApp">
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
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap font-mono" style={{ color }}>
          {label}
        </span>
      </div>
      <style>{`.level-divider::before { background: linear-gradient(to right, transparent, ${color}25); } .level-divider::after { background: linear-gradient(to left, transparent, ${color}25); }`}</style>
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
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4 font-mono" style={{ color: 'var(--brand)' }}>The People</p>
              <h1 className="text-5xl font-display font-bold leading-none mb-4" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
                Our<br /><span className="text-gradient">Members</span>
              </h1>
              <p className="text-sm max-w-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
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
        <div className="inline-flex rounded-md p-1 mb-14 gap-1" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
          {(['hierarchy', 'groups'] as const).map(v => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className="px-5 py-2 rounded-md text-sm font-semibold capitalize transition-all duration-200"
              style={{
                background: activeView === v ? 'var(--brand)' : 'transparent',
                color: activeView === v ? '#fff' : 'var(--text-muted)',
                boxShadow: activeView === v ? '0 2px 8px rgba(226,106,27,0.25)' : 'none',
              }}
            >
              {v === 'hierarchy' ? 'Organization' : 'By Groups'}
            </button>
          ))}
        </div>

        {/* ── Hierarchy View ───────────────────────────────────── */}
        {activeView === 'hierarchy' && (
          <div className="space-y-14">
            {leadership.length > 0 && (
              <LevelSection label="Founding Leadership" color="#e26a1b" members={leadership} isAdmin={isAdmin} onEdit={m => { setEditing(m); setShowModal(true) }} onDelete={handleDelete} size="lg" />
            )}
            {leadership.length > 0 && level1.length > 0 && (
              <div className="flex justify-center -mt-8 -mb-8">
                <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(226,106,27,0.3), rgba(232,131,60,0.3))' }} />
              </div>
            )}
            {level1.length > 0 && (
              <LevelSection label="Core Leadership" color="#e8833c" members={level1} isAdmin={isAdmin} onEdit={m => { setEditing(m); setShowModal(true) }} onDelete={handleDelete} size="md" />
            )}
            {level1.length > 0 && level2.length > 0 && (
              <div className="flex justify-center -mt-8 -mb-8">
                <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(232,131,60,0.3), rgba(176,125,79,0.3))' }} />
              </div>
            )}
            {level2.length > 0 && (
              <LevelSection label="Department Heads" color="#b07d4f" members={level2} isAdmin={isAdmin} onEdit={m => { setEditing(m); setShowModal(true) }} onDelete={handleDelete} size="md" />
            )}
            {level2.length > 0 && level3plus.length > 0 && (
              <div className="flex justify-center -mt-8 -mb-8">
                <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(176,125,79,0.3), rgba(194,149,106,0.3))' }} />
              </div>
            )}
            {level3plus.length > 0 && (
              <LevelSection label="Core Members" color="#c2956a" members={level3plus} isAdmin={isAdmin} onEdit={m => { setEditing(m); setShowModal(true) }} onDelete={handleDelete} size="sm" />
            )}
            {members.length === 0 && (
              <div className="text-center py-20">
                <Users className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
                <p style={{ color: 'var(--text-muted)' }}>No members yet.</p>
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
                  className="rounded-lg overflow-hidden"
                  style={{ background: 'var(--bg-secondary)', border: `1px solid ${meta.border}` }}
                >
                  <button
                    onClick={() => toggleGroup(group)}
                    className="w-full flex items-center justify-between px-6 py-5 transition-colors"
                    style={{ color: meta.text }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{meta.num}</span>
                      <span className="font-display font-bold text-xl" style={{ color: meta.text }}>{group}</span>
                      <span className="tag text-xs" style={{ background: meta.bg, color: meta.text, border: `1px solid ${meta.border}` }}>
                        {groupMembers.length} members
                      </span>
                    </div>
                    {isExpanded
                      ? <ChevronUp className="w-4 h-4 opacity-60" />
                      : <ChevronDown className="w-4 h-4 opacity-60" />}
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
                            <p className="text-sm text-center py-6" style={{ color: 'var(--text-muted)' }}>No members in this group yet.</p>
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
                className="rounded-lg overflow-hidden"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-4 px-6 py-5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <span className="font-mono text-xs font-bold" style={{ color: 'var(--text-muted)' }}>00</span>
                  <span className="font-display font-bold text-xl" style={{ color: 'var(--text-secondary)' }}>General Team</span>
                  <span className="tag text-xs" style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>{members.filter(m => !m.group).length} members</span>
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
      form.image = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(form.name || '')}&backgroundColor=e26a1b&textColor=ffffff`
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
        initial={{ scale: 0.95, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 16 }}
        className="rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display font-bold" style={{ color: 'var(--text-primary)' }}>{member ? 'Edit Member' : 'Add Member'}</h3>
          <button onClick={onClose} className="p-2 rounded-md transition-all" style={{ color: 'var(--text-muted)' }}><X className="w-4 h-4" /></button>
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
