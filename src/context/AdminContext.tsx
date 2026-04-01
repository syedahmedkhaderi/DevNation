import React, { createContext, useContext, useState, useCallback } from 'react'

const ADMIN_PASSWORD_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH ?? ''
const ADMIN_KEY = 'devnation_admin_session'

interface AdminContextType {
  isAdmin: boolean
  login: (password: string) => Promise<boolean>
  logout: () => void
}

const AdminContext = createContext<AdminContextType | null>(null)

async function sha256Hex(input: string) {
  const data = new TextEncoder().encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_KEY) === 'true'
    } catch {
      return false
    }
  })

  const login = useCallback(async (password: string) => {
    if (!ADMIN_PASSWORD_HASH) return false

    const passwordHash = await sha256Hex(password)
    if (passwordHash === ADMIN_PASSWORD_HASH) {
      setIsAdmin(true)
      localStorage.setItem(ADMIN_KEY, 'true')
      return true
    }

    return false
  }, [])

  const logout = useCallback(() => {
    setIsAdmin(false)
    localStorage.removeItem(ADMIN_KEY)
  }, [])

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
