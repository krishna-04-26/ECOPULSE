import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !password) {
      alert("Please fill all fields!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(user => user.username === username);
    if (userExists) {
      alert("User already exists!");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <div className="container">
      <main className="main">
        <div className="card" style={{ maxWidth: "400px", margin: "auto" }}>
          <h2>📝 Create Account</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br /><br />

          <button onClick={handleSignup}>
            Register
          </button>

          <p style={{ marginTop: "15px" }}>
            Already have an account? <Link to="/login">Login</Link>
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