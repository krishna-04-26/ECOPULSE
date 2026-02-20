import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";

export default function Signup({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !password || !confirmPassword) {
      alert("Please fill all fields!");
      return;
    }

    if (password.length < 4) {
      alert("Password must be at least 4 characters long!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((user) => user.username === username);
    if (userExists) {
      alert("User already exists!");
      return;
    }

    const newUser = { username, password };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("currentUser", JSON.stringify(newUser));
    if (setIsLoggedIn) setIsLoggedIn(true);

    alert("Account created successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <main className="main" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
            📝 Create Account
          </h2>

          <label style={{ fontSize: "14px" }}>Username</label>
          <input
            type="text"
            placeholder="Enter username"
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
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          <label style={{ fontSize: "14px" }}>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={handleSignup}
          >
            Register
          </button>

          <p style={{ marginTop: "18px", textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#00ff88", fontWeight: "600" }}>
              Login
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