import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null)
    })

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => listener?.subscription.unsubscribe()
  }, [])


  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url, bio")
        .eq("id", user.id)
        .single()

      if (!error) setProfile(data)
    }
  fetchProfile()
  }, [user])

  const login = (email, password) =>
    supabase.auth.signInWithPassword({ email, password })

  const signup = async (email, password, username) => {
    // Step 1: create user in Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) return { error }

    const user = data.user

    // Step 2: insert into profiles table
    if (user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,       // same as auth.users.id
          username: username,
          avatar_url: null,  // placeholder for now
          bio: null
        }
      ])
      if (profileError) {
        console.error("Profile insert failed:", profileError)
        return { error: profileError }
      }
    }

    return { data, error: null }
  }

  const logout = () => supabase.auth.signOut()

  return (
    <AuthContext.Provider value={{ user, profile, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
