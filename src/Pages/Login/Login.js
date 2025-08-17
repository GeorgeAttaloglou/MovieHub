import { useState } from "react"
import { useAuth } from "../../Contexts/authContexts"
import { useNavigate } from "react-router-dom";
import PopupMessage from "../../Components/PopupMessage/PopupMessage";
import './Login.css'

export default function Login() {
  // Get the login/signup functions from the authentication context
  const { login, signup } = useAuth()

  // Keep user credentials and login/signup mode in state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true)

  const navigate = useNavigate();

  const [popup, setPopup] = useState({ visible: false, type: "", message: "" });

  const showPopup = (type, message) => {
    setPopup({ visible: true, type, message });
  };

  // When the form is submitted (either for login or signup)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const { error } = await login(email, password);
      if (error) showPopup("error", error.message);
      else {
        navigate("/profile");
      }
    } else {
      const { error } = await signup(email, password, username);
      if (error) showPopup("error", error.message);
      else {
        navigate("../");
      }
    }
  };

  return (
    <>
      {/* Show popup message if it is visible */}
      {popup.visible && (
        <PopupMessage
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup({ ...popup, visible: false })}
        />
      )}
      {/* The login/signup form */}
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {/* Input for username (only for signup) */}
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        {/* Input for email */}
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {/* Input for password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* Submit button (Login or Sign Up) */}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>

        {/* Toggle between login and signup */}
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need to sign up?" : "Already have an account?"}
        </p>
      </form>
    </>
  )
}
