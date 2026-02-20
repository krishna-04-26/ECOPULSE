import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Dashboard from "./Dashboard";
import DataEntry from "./DataEntry";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [energyData, setEnergyData] = useState({
    ac: 40,
    fans: 20,
    lights: 15,
    fridge: 25
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>

        {/* 🔹 Data Entry appears FIRST */}
        <Route
          path="/"
          element={
            <DataEntry
              energyData={energyData}
              setEnergyData={setEnergyData}
            />
          }
        />

        {/* 🔹 Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              energyData={energyData}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        {/* 🔹 Login */}
        <Route
          path="/login"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />

        {/* 🔹 Signup */}
        <Route
          path="/signup"
          element={<Signup />}
        />

      </Routes>
    </Router>
  );
}

export default App;