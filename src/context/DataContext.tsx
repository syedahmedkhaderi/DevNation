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

  const updateClubInfo = (info: ClubInfo) => setClubInfo(info)

  const addMember = (m: Member) => setMembers(prev => [...prev, m])
  const updateMember = (m: Member) => setMembers(prev => prev.map(x => x.id === m.id ? m : x))
  const removeMember = (id: string) => setMembers(prev => prev.filter(x => x.id !== id))

  const addEvent = (e: Event) => setEvents(prev => [...prev, e])
  const updateEvent = (e: Event) => setEvents(prev => prev.map(x => x.id === e.id ? e : x))
  const removeEvent = (id: string) => setEvents(prev => prev.filter(x => x.id !== id))

  const addTeamToEvent = (eventId: string, team: Team) =>
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, teams: [...e.teams, team] } : e))
  const updateTeamInEvent = (eventId: string, team: Team) =>
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, teams: e.teams.map(t => t.id === team.id ? team : t) } : e))
  const removeTeamFromEvent = (eventId: string, teamId: string) =>
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, teams: e.teams.filter(t => t.id !== teamId) } : e))
  const joinTeam = (eventId: string, teamId: string, memberName: string) =>
    setEvents(prev => prev.map(e => e.id === eventId ? {
      ...e,
      teams: e.teams.map(t => t.id === teamId && t.members.length < t.slots ? { ...t, members: [...t.members, memberName] } : t)
    } : e))

  const addProject = (p: Project) => setProjects(prev => [...prev, p])
  const updateProject = (p: Project) => setProjects(prev => prev.map(x => x.id === p.id ? p : x))
  const removeProject = (id: string) => setProjects(prev => prev.filter(x => x.id !== id))

  const addResource = (r: Resource) => setResources(prev => [...prev, r])
  const updateResource = (r: Resource) => setResources(prev => prev.map(x => x.id === r.id ? r : x))
  const removeResource = (id: string) => setResources(prev => prev.filter(x => x.id !== id))

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
