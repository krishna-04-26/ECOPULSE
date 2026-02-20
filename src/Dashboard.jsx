import { useState } from "react";
import CountUp from "react-countup";
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { FaBolt, FaMoneyBill, FaLeaf } from "react-icons/fa";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [hours, setHours] = useState(8);
  const savings = hours * 30 * 1.5;

  const data = {
    labels: ["AC", "Fans", "Lights", "Fridge"],
    datasets: [
      {
        data: [40, 20, 15, 25],
        backgroundColor: ["#00ff88", "#00cfff", "#ffcc00", "#ff4d4d"],
      },
    ],
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>⚡ EcoPulse</h2>
      </aside>

      <main className="main">
        <div className="kpi-grid">
          <div className="card">
            <FaBolt /> 350 kWh
          </div>
          <div className="card">
            <FaMoneyBill /> ₹4200
          </div>
          <div className="card">
            <FaLeaf /> 287 kg CO₂
          </div>
        </div>

        <div className="card">
          <Pie data={data} />
        </div>

        <div className="card">
          <h3>What-If Simulator</h3>
          <input
            type="range"
            min="1"
            max="12"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
          <p>AC Usage: {hours} hrs/day</p>
          <p>Estimated Savings: ₹{savings}</p>
        </div>
      </main>
    </div>
  );
}