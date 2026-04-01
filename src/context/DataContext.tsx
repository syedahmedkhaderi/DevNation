import React, { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  Member, Event, Project, Resource, ClubInfo,
  defaultMembers, defaultEvents, defaultProjects, defaultResources, defaultClubInfo, Team
} from '../data/defaults'

interface DataContextType {
  clubInfo: ClubInfo
  updateClubInfo: (info: ClubInfo) => void

  members: Member[]
  addMember: (m: Member) => void
  updateMember: (m: Member) => void
  removeMember: (id: string) => void

  events: Event[]
  addEvent: (e: Event) => void
  updateEvent: (e: Event) => void
  removeEvent: (id: string) => void
  addTeamToEvent: (eventId: string, team: Team) => void
  updateTeamInEvent: (eventId: string, team: Team) => void
  removeTeamFromEvent: (eventId: string, teamId: string) => void
  joinTeam: (eventId: string, teamId: string, memberName: string) => void

  projects: Project[]
  addProject: (p: Project) => void
  updateProject: (p: Project) => void
  removeProject: (id: string) => void

  resources: Resource[]
  addResource: (r: Resource) => void
  updateResource: (r: Resource) => void
  removeResource: (id: string) => void
}

const DataContext = createContext<DataContextType | null>(null)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [clubInfo, setClubInfo] = useLocalStorage<ClubInfo>('devnation_clubinfo', defaultClubInfo)
  const [members, setMembers] = useLocalStorage<Member[]>('devnation_members', defaultMembers)
  const [events, setEvents] = useLocalStorage<Event[]>('devnation_events', defaultEvents)
  const [projects, setProjects] = useLocalStorage<Project[]>('devnation_projects', defaultProjects)
  const [resources, setResources] = useLocalStorage<Resource[]>('devnation_resources', defaultResources)

  const persistSection = async (section: 'clubInfo' | 'members' | 'events' | 'projects' | 'resources', data: unknown) => {
    const devMode = (import.meta as any).env?.DEV === true
    if (!devMode) return
    try {
      await fetch('/api/defaults', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data }),
      })
    } catch (error) {
      console.warn('Unable to persist admin data to code:', error)
    }
  }

  const updateClubInfo = (info: ClubInfo) => {
    setClubInfo(info)
    persistSection('clubInfo', info)
  }

  const addMember = (m: Member) => {
    setMembers(prev => {
      const next = [...prev, m]
      persistSection('members', next)
      return next
    })
  }
  const updateMember = (m: Member) => {
    setMembers(prev => {
      const next = prev.map(x => x.id === m.id ? m : x)
      persistSection('members', next)
      return next
    })
  }
  const removeMember = (id: string) => {
    setMembers(prev => {
      const next = prev.filter(x => x.id !== id)
      persistSection('members', next)
      return next
    })
  }

  const addEvent = (e: Event) => {
    setEvents(prev => {
      const next = [...prev, e]
      persistSection('events', next)
      return next
    })
  }
  const updateEvent = (e: Event) => {
    setEvents(prev => {
      const next = prev.map(x => x.id === e.id ? e : x)
      persistSection('events', next)
      return next
    })
  }
  const removeEvent = (id: string) => {
    setEvents(prev => {
      const next = prev.filter(x => x.id !== id)
      persistSection('events', next)
      return next
    })
  }

  const addTeamToEvent = (eventId: string, team: Team) => {
    setEvents(prev => {
      const next = prev.map(e => e.id === eventId ? { ...e, teams: [...e.teams, team] } : e)
      persistSection('events', next)
      return next
    })
  }
  const updateTeamInEvent = (eventId: string, team: Team) => {
    setEvents(prev => {
      const next = prev.map(e => e.id === eventId ? { ...e, teams: e.teams.map(t => t.id === team.id ? team : t) } : e)
      persistSection('events', next)
      return next
    })
  }
  const removeTeamFromEvent = (eventId: string, teamId: string) => {
    setEvents(prev => {
      const next = prev.map(e => e.id === eventId ? { ...e, teams: e.teams.filter(t => t.id !== teamId) } : e)
      persistSection('events', next)
      return next
    })
  }
  const joinTeam = (eventId: string, teamId: string, memberName: string) => {
    setEvents(prev => {
      const next = prev.map(e => e.id === eventId ? {
        ...e,
        teams: e.teams.map(t => t.id === teamId && t.members.length < t.slots ? { ...t, members: [...t.members, memberName] } : t)
      } : e)
      persistSection('events', next)
      return next
    })
  }

  const addProject = (p: Project) => {
    setProjects(prev => {
      const next = [...prev, p]
      persistSection('projects', next)
      return next
    })
  }
  const updateProject = (p: Project) => {
    setProjects(prev => {
      const next = prev.map(x => x.id === p.id ? p : x)
      persistSection('projects', next)
      return next
    })
  }
  const removeProject = (id: string) => {
    setProjects(prev => {
      const next = prev.filter(x => x.id !== id)
      persistSection('projects', next)
      return next
    })
  }

  const addResource = (r: Resource) => {
    setResources(prev => {
      const next = [...prev, r]
      persistSection('resources', next)
      return next
    })
  }
  const updateResource = (r: Resource) => {
    setResources(prev => {
      const next = prev.map(x => x.id === r.id ? r : x)
      persistSection('resources', next)
      return next
    })
  }
  const removeResource = (id: string) => {
    setResources(prev => {
      const next = prev.filter(x => x.id !== id)
      persistSection('resources', next)
      return next
    })
  }

  return (
    <DataContext.Provider value={{
      clubInfo, updateClubInfo,
      members, addMember, updateMember, removeMember,
      events, addEvent, updateEvent, removeEvent, addTeamToEvent, updateTeamInEvent, removeTeamFromEvent, joinTeam,
      projects, addProject, updateProject, removeProject,
      resources, addResource, updateResource, removeResource,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
