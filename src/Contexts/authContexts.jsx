import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		// Check if user is already logged in
		const session = supabase.auth.getSession().then(({ data }) => {
			setUser(data?.session?.user || null)
		})

		// Listen for auth state changes
		const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user || null)
		})

		// Cleanup subscription on unmount
		return () => listener?.subscription.unsubscribe()
	}, [])

	const login = (email, password) => supabase.auth.signInWithPassword({ email, password })
	const signup = async (email, password, username) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { username }  // this saves username in user_metadata
			}
		});
		return { data, error };
	};

	const logout = () => supabase.auth.signOut()

	return (
		<AuthContext.Provider value={{ user, login, signup, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
