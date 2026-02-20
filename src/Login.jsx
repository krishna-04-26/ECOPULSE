import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";

export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true);
      navigate("/dashboard");   // go to dashboard after login
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="container">
      <main className="main">
        <div className="card" style={{ maxWidth: "400px", margin: "auto" }}>
          <h2>🔐 Login to EcoPulse</h2>

          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br /><br />

          <button onClick={handleLogin}>
            Login
          </button>

          {/* Signup Link */}
          <p style={{ marginTop: "15px" }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>

          {/* Back Button */}
          <button
            style={{ marginTop: "10px", background: "#555", color: "#fff" }}
            onClick={() => navigate(-1)}
          >
            ⬅ Back
          </button>

        </div>
      </main>
    </div>
  );
}