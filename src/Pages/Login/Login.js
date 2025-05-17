import { useState } from "react"
import { useAuth } from "../../Contexts/authContexts"
import { useNavigate } from "react-router-dom";
import './Login.css'

export default function Login() {
  // Παίρνουμε τις login/signup συναρτήσεις από το authentication context
  const { login, signup } = useAuth()

  // Κρατάμε σε state τα στοιχεία του χρήστη και το αν είναι σε login ή signup mode
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)

  const navigate = useNavigate(); 

  // Όταν γίνεται submit η φόρμα (είτε για login είτε για signup)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Επιλογή λειτουργίας login ή signup
    const fn = isLogin ? login : signup;
    const { error, data } = await fn(email, password);
  
    // Αν υπήρξε σφάλμα, το εμφανίζουμε
    if (error) {
      alert(error.message);
    } 
    // Αν όλα πήγαν καλά και υπάρχει ενεργή session, πηγαίνουμε στην αρχική σελίδα
    else if (data?.session) {
      navigate("/");
    } 
    // Αλλιώς εμφανίζουμε γενικό σφάλμα
    else {
      alert("Login failed: no active session.");
    }
  };

  return (
    // Η φόρμα σύνδεσης/εγγραφής
    <form onSubmit={handleSubmit} className="login-form">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      {/* Input για email */}
      <input 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />

      {/* Input για κωδικό */}
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />

      {/* Κουμπί υποβολής (Login ή Sign Up) */}
      <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>

      {/* Εναλλαγή μεταξύ login και signup */}
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need to sign up?" : "Already have an account?"}
      </p>
    </form>
  )
}
