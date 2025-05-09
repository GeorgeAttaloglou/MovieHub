import { useState } from "react"
import { useAuth } from "../../Contexts/authContexts"
import './Login.css'

export default function Login() {
  const { login, signup } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fn = isLogin ? login : signup
    const { error } = await fn(email, password)
    if (error) alert(error.message)
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      <p onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Need to sign up?" : "Already have an account?"}</p>
    </form>
  )
}
