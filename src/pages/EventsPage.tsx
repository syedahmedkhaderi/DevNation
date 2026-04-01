import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Tag, Users, Plus, Pencil, Trash2, X, ExternalLink, MessageCircle, ChevronDown, ChevronUp, Search } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useAdmin } from '../context/AdminContext'
import { Event, Team } from '../data/defaults'
import toast from 'react-hot-toast'

function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  Hackathon: { bg: 'rgba(226,106,27,0.08)', text: 'var(--brand)' },
  Workshop: { bg: 'rgba(176,125,79,0.08)', text: 'var(--accent)' },
  Bootcamp: { bg: 'rgba(232,131,60,0.08)', text: 'var(--brand-light)' },
  Seminar: { bg: 'rgba(255,255,255,0.05)', text: 'var(--text-primary)' },
  Competition: { bg: 'rgba(226,106,27,0.08)', text: 'var(--brand)' },
  Other: { bg: 'rgba(255,255,255,0.03)', text: 'var(--text-muted)' },
}

interface JoinTeamModal {
  eventId: string
  team: Team
}

export default function EventsPage() {
  const { events, addEvent, updateEvent, removeEvent, addTeamToEvent, updateTeamInEvent, removeTeamFromEvent, joinTeam } = useData()
  const { isAdmin } = useAdmin()
  const [search, setSearch] = useState('')
  const [filterOpen, setFilterOpen] = useState<boolean | null>(null)
  const [showEventModal, setShowEventModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)
  const [showTeamModal, setShowTeamModal] = useState<{ eventId: string; team?: Team } | null>(null)
  const [joinModal, setJoinModal] = useState<JoinTeamModal | null>(null)
  const [joinName, setJoinName] = useState('')

  const filtered = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase())
    const matchOpen = filterOpen === null ? true : e.isOpen === filterOpen
    return matchSearch && matchOpen
  })

  const handleDeleteEvent = (id: string) => {
    if (!window.confirm('Delete this event?')) return
    removeEvent(id)
    toast.success('Event removed')
  }

  const handleJoin = (eventId: string, teamId: string) => {
    if (!joinName.trim()) { toast.error('Enter your name'); return }
    const event = events.find(e => e.id === eventId)
    const team = event?.teams.find(t => t.id === teamId)
    if (!team) return
    if (team.members.length >= team.slots) { toast.error('Team is full'); return }
    joinTeam(eventId, teamId, joinName.trim())
    toast.success(`Joined ${team.name}! Contact via WhatsApp to connect.`)
    setJoinModal(null)
    setJoinName('')
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="tag mb-4 inline-block"
            style={{ background: 'rgba(226,106,27,0.08)', color: 'var(--brand)', border: '1px solid rgba(226,106,27,0.15)' }}
          >
            <Calendar className="w-3.5 h-3.5 inline mr-1" />
            Events
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between gap-4 flex-wrap"
          >
            <div>
              <h1 className="section-heading mb-2">Events & Programs</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Hackathons, workshops, bootcamps and more — stay updated with what DevNation has on.</p>
            </div>
            {isAdmin && (
              <button onClick={() => { setEditingEvent(null); setShowEventModal(true) }} className="btn-primary flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Event
              </button>
            )}
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-2">
            {[null, true, false].map((val, i) => (
              <button
                key={i}
                onClick={() => setFilterOpen(val)}
                className="px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200"
                style={{
                  background: filterOpen === val ? 'var(--brand)' : 'rgba(255,255,255,0.03)',
                  color: filterOpen === val ? '#fff' : 'var(--text-secondary)',
                  border: filterOpen === val ? 'none' : '1px solid var(--border-subtle)',
                }}
              >
                {val === null ? 'All' : val ? 'Open' : 'Closed'}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
            <p style={{ color: 'var(--text-muted)' }}>No events found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((event, i) => {
              const catStyle = categoryColors[event.category] || categoryColors.Other
              return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-lg overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-72 h-48 md:h-auto shrink-0">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="tag" style={{ background: catStyle.bg, color: catStyle.text }}>{event.category}</span>
                        <span className="tag" style={{
                          background: event.isOpen ? 'rgba(226,106,27,0.08)' : 'rgba(255,255,255,0.05)',
                          color: event.isOpen ? 'var(--brand)' : 'var(--text-muted)'
                        }}>
                          {event.isOpen ? 'Open' : 'Closed'}
                        </span>
                      </div>
                      {isAdmin && (
                        <div className="flex items-center gap-1">
                          <button onClick={() => { setEditingEvent(event); setShowEventModal(true) }} className="p-2 rounded-md transition-all" style={{ color: 'var(--text-muted)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteEvent(event.id)} className="p-2 rounded-md transition-all" style={{ color: 'var(--text-muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    <h2 className="text-xl font-display font-bold mb-2" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{event.title}</h2>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{event.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                        {event.endDate && ` – ${new Date(event.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </span>
                    </div>

                    {event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {event.tags.map(tag => (
                          <span key={tag} className="tag text-xs" style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}><Tag className="w-3 h-3" />{tag}</span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3 flex-wrap">
                      {event.registrationLink && event.isOpen && (
                        <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm flex items-center gap-1.5">
                          Register Now <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {event.teams.length > 0 && (
                        <button
                          onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all"
                          style={{ background: 'rgba(176,125,79,0.08)', color: 'var(--accent)', border: '1px solid rgba(176,125,79,0.15)' }}
                        >
                          <Users className="w-4 h-4" />
                          Finding Teams ({event.teams.length})
                          {expandedEvent === event.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      )}
                      {isAdmin && (
                        <button
                          onClick={() => setShowTeamModal({ eventId: event.id })}
                          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all"
                          style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
                        >
                          <Plus className="w-4 h-4" /> Add Team
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Finding Teams Panel */}
                <AnimatePresence>
                  {expandedEvent === event.id && event.teams.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ borderTop: '1px solid var(--border-subtle)' }}
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-lg font-display font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                              <Users className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                              Finding Teams
                            </h3>
                            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Join an existing team or browse open slots</p>
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {event.teams.map(team => (
                            <div key={team.id} className="rounded-lg p-5 transition-all" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}
                              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(176,125,79,0.2)'}
                              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{team.name}</h4>
                                {isAdmin && (
                                  <div className="flex gap-1">
                                    <button onClick={() => setShowTeamModal({ eventId: event.id, team })} className="p-1 transition-colors" style={{ color: 'var(--text-muted)' }}><Pencil className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => { removeTeamFromEvent(event.id, team.id); toast.success('Team removed') }} className="p-1 transition-colors" style={{ color: 'var(--text-muted)' }}><Trash2 className="w-3.5 h-3.5" /></button>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{team.description}</p>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {team.skills.map(s => <span key={s} className="tag text-xs" style={{ background: 'rgba(226,106,27,0.08)', color: 'var(--brand)' }}>{s}</span>)}
                              </div>
                              <div className="flex items-center justify-between text-sm mb-4">
                                <span className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                                  <Users className="w-3.5 h-3.5" />
                                  {team.members.length}/{team.slots} members
                                </span>
                                <span className="text-xs font-medium" style={{ color: team.members.length < team.slots ? 'var(--brand)' : 'var(--text-muted)' }}>
                                  {team.members.length < team.slots ? `${team.slots - team.members.length} slots open` : 'Full'}
                                </span>
                              </div>
                              {team.members.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {team.members.map(m => (
                                    <span key={m} className="tag text-xs" style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>{m}</span>
                                  ))}
                                </div>
                              )}
                              <div className="flex gap-2">
                                {team.members.length < team.slots && event.isOpen && (
                                  <button
                                    onClick={() => setJoinModal({ eventId: event.id, team })}
                                    className="flex-1 py-2 rounded-md text-xs font-medium transition-all"
                                    style={{ background: 'rgba(176,125,79,0.1)', color: 'var(--accent)', border: '1px solid rgba(176,125,79,0.15)' }}
                                  >
                                    Join Team
                                  </button>
                                )}
                                {team.whatsappLink && (
                                  <a
                                    href={team.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 py-2 px-3 rounded-md text-xs font-medium transition-all"
                                    style={{ background: 'rgba(226,106,27,0.08)', color: 'var(--brand)', border: '1px solid rgba(226,106,27,0.15)' }}
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    WhatsApp
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )})}
          </div>
        )}
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {showEventModal && (
          <EventModal
            event={editingEvent}
            onClose={() => { setShowEventModal(false); setEditingEvent(null) }}
            onSave={e => {
              if (editingEvent) { updateEvent(e); toast.success('Event updated') }
              else { addEvent({ ...e, id: generateId(), teams: [] }); toast.success('Event added') }
              setShowEventModal(false); setEditingEvent(null)
            }}
          />
        )}
      </AnimatePresence>

      {/* Team Modal */}
      <AnimatePresence>
        {showTeamModal && (
          <TeamModal
            team={showTeamModal.team}
            onClose={() => setShowTeamModal(null)}
            onSave={team => {
              if (showTeamModal.team) {
                updateTeamInEvent(showTeamModal.eventId, team)
                toast.success('Team updated')
              } else {
                addTeamToEvent(showTeamModal.eventId, { ...team, id: generateId(), members: [] })
                toast.success('Team added')
              }
              setShowTeamModal(null)
            }}
          />
        )}
      </AnimatePresence>

      {/* Join Team Modal */}
      <AnimatePresence>
        {joinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center modal-overlay p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="rounded-lg p-6 w-full max-w-md"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-display font-bold" style={{ color: 'var(--text-primary)' }}>Join {joinModal.team.name}</h3>
                <button onClick={() => { setJoinModal(null); setJoinName('') }} className="p-2 rounded-md transition-all" style={{ color: 'var(--text-muted)' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Enter your name to join this team. You'll receive a WhatsApp contact to coordinate.</p>
              <div className="form-group mb-4">
                <label className="label">Your Full Name</label>
                <input type="text" value={joinName} onChange={e => setJoinName(e.target.value)} className="input-field" placeholder="e.g. Ahmed Al-Rashid" onKeyDown={e => e.key === 'Enter' && handleJoin(joinModal.eventId, joinModal.team.id)} />
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleJoin(joinModal.eventId, joinModal.team.id)} className="btn-primary flex-1">Join Team</button>
                <button onClick={() => { setJoinModal(null); setJoinName('') }} className="btn-secondary">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function EventModal({ event, onClose, onSave }: { event: Event | null; onClose: () => void; onSave: (e: Event) => void }) {
  const [form, setForm] = useState<Partial<Event>>(event || {
    title: '', date: '', location: '', description: '', image: '', category: 'Workshop', isOpen: true, tags: [], teams: []
  })

  const handleSubmit = () => {
    if (!form.title || !form.date || !form.location || !form.description) { toast.error('Fill in all required fields'); return }
    onSave({
      ...form,
      id: event?.id || generateId(),
      teams: form.teams || [],
      tags: typeof form.tags === 'string' ? (form.tags as string).split(',').map(t => t.trim()).filter(Boolean) : form.tags || [],
    } as Event)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center modal-overlay p-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display font-bold" style={{ color: 'var(--text-primary)' }}>{event ? 'Edit Event' : 'Add Event'}</h3>
          <button onClick={onClose} className="p-2 rounded-md transition-all" style={{ color: 'var(--text-muted)' }}><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <div className="form-group"><label className="label">Title *</label><input className="input-field" value={form.title || ''} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Event title" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="form-group"><label className="label">Start Date *</label><input type="date" className="input-field" value={form.date || ''} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} /></div>
            <div className="form-group"><label className="label">End Date</label><input type="date" className="input-field" value={form.endDate || ''} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))} /></div>
          </div>
          <div className="form-group"><label className="label">Location *</label><input className="input-field" value={form.location || ''} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="e.g. UDST Campus, Building C" /></div>
          <div className="form-group"><label className="label">Description *</label><textarea rows={3} className="input-field" value={form.description || ''} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Event description" /></div>
          <div className="form-group"><label className="label">Image URL</label><input className="input-field" value={form.image || ''} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} placeholder="https://..." /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="form-group">
              <label className="label">Category</label>
              <select className="input-field" value={form.category || 'Workshop'} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {['Hackathon', 'Workshop', 'Bootcamp', 'Seminar', 'Competition', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="label">Status</label>
              <select className="input-field" value={form.isOpen ? 'open' : 'closed'} onChange={e => setForm(p => ({ ...p, isOpen: e.target.value === 'open' }))}>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
          <div className="form-group"><label className="label">Registration Link</label><input className="input-field" value={form.registrationLink || ''} onChange={e => setForm(p => ({ ...p, registrationLink: e.target.value }))} placeholder="https://forms.google.com/..." /></div>
          <div className="form-group"><label className="label">Tags (comma-separated)</label><input className="input-field" value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags || ''} onChange={e => setForm(p => ({ ...p, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} placeholder="Workshop, React, Beginner" /></div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={handleSubmit} className="btn-primary flex-1">{event ? 'Save Changes' : 'Add Event'}</button>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function TeamModal({ team, onClose, onSave }: { team?: Team; onClose: () => void; onSave: (t: Team) => void }) {
  const [form, setForm] = useState<Partial<Team>>(team || { name: '', description: '', slots: 4, members: [], skills: [], whatsappLink: '' })

  const handleSubmit = () => {
    if (!form.name || !form.description) { toast.error('Fill in required fields'); return }
    onSave({
      ...form,
      id: team?.id || generateId(),
      members: team?.members || [],
      slots: Number(form.slots) || 4,
      skills: typeof form.skills === 'string' ? (form.skills as string).split(',').map(s => s.trim()).filter(Boolean) : form.skills || [],
    } as Team)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center modal-overlay p-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="rounded-lg p-6 w-full max-w-md" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display font-bold" style={{ color: 'var(--text-primary)' }}>{team ? 'Edit Team' : 'Add Team'}</h3>
          <button onClick={onClose} className="p-2 rounded-md transition-all" style={{ color: 'var(--text-muted)' }}><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <div className="form-group"><label className="label">Team Name *</label><input className="input-field" value={form.name || ''} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Team Alpha" /></div>
          <div className="form-group"><label className="label">Description *</label><textarea rows={2} className="input-field" value={form.description || ''} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="What is this team building?" /></div>
          <div className="form-group"><label className="label">Max Slots</label><input type="number" className="input-field" value={form.slots || 4} onChange={e => setForm(p => ({ ...p, slots: Number(e.target.value) }))} min={1} max={10} /></div>
          <div className="form-group"><label className="label">Required Skills (comma-separated)</label><input className="input-field" value={Array.isArray(form.skills) ? form.skills.join(', ') : ''} onChange={e => setForm(p => ({ ...p, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} placeholder="React, Python, UI/UX" /></div>
          <div className="form-group"><label className="label">WhatsApp Link</label><input className="input-field" value={form.whatsappLink || ''} onChange={e => setForm(p => ({ ...p, whatsappLink: e.target.value }))} placeholder="https://wa.me/..." /></div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={handleSubmit} className="btn-primary flex-1">{team ? 'Save Changes' : 'Add Team'}</button>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  )
}
