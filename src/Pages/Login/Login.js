import { useState } from "react"
import { useAuth } from "../../Contexts/authContexts"
import { useNavigate } from "react-router-dom";
import './Login.css'

export default function Login() {
  // Get the login/signup functions from the authentication context
  const { login, signup } = useAuth()

  // Keep user credentials and login/signup mode in state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)

  const navigate = useNavigate(); 

  // When the form is submitted (either for login or signup)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Choose login or signup function
    const fn = isLogin ? login : signup;
    const { error, data } = await fn(email, password);
  
    // If there was an error, show it
    if (error) {
      alert(error.message);
    } 
    // If everything went well and there is an active session, go to the home page
    else if (data?.session) {
      navigate("/");
    } 
    // Otherwise show a generic error
    else {
      alert("Login failed: no active session.");
    }
  };

  return (
    // The login/signup form
    <form onSubmit={handleSubmit} className="login-form">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

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
  )
}
