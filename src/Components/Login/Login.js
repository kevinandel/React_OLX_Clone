import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../store/FirebaseContext"; // Adjust this import if needed
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import necessary functions from Firebase Auth
import Logo from "../../olx-logo.png";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useContext(FirebaseContext); // Get auth from context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Use the new auth methods
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert("Email or password Incorrect!");
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email" // Use unique IDs for accessibility
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Make the field required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password" // Use unique IDs for accessibility
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Make the field required
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <a href="/signup">Signup</a> {/* Add a link to signup page */}
      </div>
    </div>
  );
}

export default Login;
