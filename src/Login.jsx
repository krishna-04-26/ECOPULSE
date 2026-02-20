import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";

export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please fill all fields!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (validUser) {
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="container">
      <main
        className="main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="card"
          style={{
            maxWidth: "420px",
            width: "100%",
            margin: "auto",
            padding: "40px",
            borderRadius: "25px",
            backdropFilter: "blur(25px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
            🔐 Login to EcoPulse
          </h2>

          <label style={{ fontSize: "14px" }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              marginBottom: "18px",
            }}
          />

          <label style={{ fontSize: "14px" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              marginBottom: "25px",
            }}
          />

          <button
            className="primary-btn"
            style={{ width: "100%", padding: "14px", borderRadius: "14px" }}
            onClick={handleLogin}
          >
            Login
          </button>

          <p style={{ marginTop: "18px", textAlign: "center" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#00ff88", fontWeight: "600" }}>
              Sign Up
            </Link>
          </p>

          <button
            style={{
              marginTop: "12px",
              width: "100%",
              padding: "10px",
              borderRadius: "12px",
              background: "#444",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => navigate(-1)}
          >
            ⬅ Back
          </button>
        </div>
      </main>
    </div>
  );
}