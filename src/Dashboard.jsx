import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { FaBolt, FaMoneyBill, FaLeaf } from "react-icons/fa";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
} from "chart.js";

import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

export default function Dashboard({ energyData }) {
  const [hours, setHours] = useState(8);

  // Calculate total usage dynamically
  const currentUsage =
    energyData.ac +
    energyData.fans +
    energyData.lights +
    energyData.fridge;

  const optimizedUsage = Math.round(currentUsage * 0.75);
  const savings = hours * 30 * 1.5;

  // PIE DATA
  const pieData = {
    labels: ["AC", "Fans", "Lights", "Fridge"],
    datasets: [
      {
        data: [
          energyData.ac,
          energyData.fans,
          energyData.lights,
          energyData.fridge
        ],
        backgroundColor: ["#00ff88", "#00cfff", "#ffcc00", "#ff4d4d"],
      },
    ],
  };

  // BAR DATA
  const barData = {
    labels: ["Current Usage", "Optimized Usage"],
    datasets: [
      {
        label: "Energy (kWh)",
        data: [currentUsage, optimizedUsage],
        backgroundColor: ["#ff4d4d", "#00ff88"],
        borderRadius: 8,
      },
    ],
  };

  // LINE DATA
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Energy Trend (kWh)",
        data: [
          currentUsage - 50,
          currentUsage - 30,
          currentUsage - 20,
          currentUsage - 10,
          currentUsage - 5,
          currentUsage
        ],
        borderColor: "#00ff88",
        backgroundColor: "rgba(0,255,136,0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#00ff88",
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "white" },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <div className="container">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>⚡ EcoPulse</h2>

        <Link to="/">
          <button>Enter Data</button>
        </Link>

        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">

        {/* KPI SECTION */}
        <div className="kpi-grid">
          <div className="card">
            <FaBolt /> {currentUsage} kWh
          </div>

          <div className="card">
            <FaMoneyBill /> ₹{currentUsage * 12}
          </div>

          <div className="card">
            <FaLeaf /> {Math.round(currentUsage * 0.82)} kg CO₂
          </div>
        </div>

        {/* CHARTS GRID */}
        <div className="chart-grid">

          <div className="card">
            <h3>Energy Distribution</h3>
            <Pie data={pieData} options={commonOptions} />
          </div>

          <div className="card">
            <h3>Energy Optimization Comparison</h3>
            <Bar data={barData} options={commonOptions} />
          </div>

          <div className="card">
            <h3>📈 Monthly Energy Trend</h3>
            <Line data={lineData} options={commonOptions} />
          </div>

        </div>

        {/* SIMULATOR */}
        <div className="card">
          <h3>⚡ What-If Simulator</h3>
          <input
            type="range"
            min="1"
            max="12"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
          <p>AC Usage: {hours} hrs/day</p>
          <p>Estimated Savings: ₹{savings}</p>
        </div>

      </main>
    </div>
  );
}