export interface Member {
  id: string
  name: string
  position: string
  department: string
  image: string
  bio?: string
  skills?: string[]
  achievements?: string[]
  website?: string
  linkedin?: string
  instagram?: string
  whatsapp?: string
  level: number
  parentId?: string
  group?: string
}

export interface Event {
  id: string
  title: string
  date: string
  endDate?: string
  location: string
  description: string
  image: string
  category: string
  registrationLink?: string
  qrCode?: string
  teams: Team[]
  isOpen: boolean
  tags: string[]
}

export interface Team {
  id: string
  name: string
  description: string
  slots: number
  members: string[]
  whatsappLink?: string
  skills: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
  techStack: string[]
  githubLink?: string
  liveLink?: string
  team: string[]
  status: 'active' | 'completed' | 'planning'
  year: number
  featured: boolean
}

export interface Resource {
  id: string
  title: string
  description: string
  type: 'article' | 'video' | 'course' | 'tool' | 'book' | 'workshop'
  category: string
  link: string
  tags: string[]
  addedBy: string
  featured: boolean
  thumbnail?: string
}

export interface ClubInfo {
  name: string
  tagline: string
  vision: string
  mission: string
  instagram: string
  linkedin: string
  whatsapp: string
  email: string
  foundedYear: number
  university: string
}

import rawDefaults from './defaultData.json'

export const defaultClubInfo: ClubInfo = rawDefaults.clubInfo
export const defaultMembers = rawDefaults.members as Member[]
export const defaultEvents = rawDefaults.events as Event[]
export const defaultProjects = rawDefaults.projects as Project[]
export const defaultResources = rawDefaults.resources as Resource[]
