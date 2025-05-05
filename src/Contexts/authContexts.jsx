import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => listener?.subscription.unsubscribe()
  }, [])

  const login = (email, password) => supabase.auth.signInWithPassword({ email, password })
  const signup = (email, password) => supabase.auth.signUp({ email, password })
  const logout = () => supabase.auth.signOut()

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
