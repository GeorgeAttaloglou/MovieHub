import { useState } from "react"
import { useAuth } from "../../Contexts/authContexts"
import { useNavigate } from "react-router-dom"
import PopupMessage from "../../Components/PopupMessage/PopupMessage"
import './Login.css'

export default function Login() {
  const { login, signup } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [popup, setPopup] = useState({ visible: false, type: "", message: "" })

  const navigate = useNavigate()

  const showPopup = (type, message) => {
    setPopup({ visible: true, type, message })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLogin) {
      const { error } = await login(email, password)
      if (error) showPopup("error", error.message)
      else navigate("/profile")
    } else {
      const { error } = await signup(email, password, username)
      if (error) showPopup("error", error.message)
      else navigate("../")
    }
  }

  return (
    <>
      {popup.visible && (
        <PopupMessage
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup({ ...popup, visible: false })}
        />
      )}
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>

        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need to sign up?" : "Already have an account?"}
        </p>
      </form>
    </>
  )
}
