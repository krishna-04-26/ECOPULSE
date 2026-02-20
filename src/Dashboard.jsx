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

  // ===== TOTAL USAGE =====
  const currentUsage =
    energyData.ac +
    energyData.fans +
    energyData.lights +
    energyData.fridge;

  const optimizedUsage = Math.round(currentUsage * 0.75);
  const savings = hours * 30 * 1.5;

  // ===== DYNAMIC ANALYSIS =====
  const appliances = [
    { name: "AC", value: energyData.ac },
    { name: "Fans", value: energyData.fans },
    { name: "Lights", value: energyData.lights },
    { name: "Fridge", value: energyData.fridge }
  ];

  const highest = appliances.reduce((prev, current) =>
    prev.value > current.value ? prev : current
  );

  const highestPercentage =
    currentUsage > 0
      ? ((highest.value / currentUsage) * 100).toFixed(1)
      : 0;

  // ===== PIE DATA =====
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

  // ===== BAR DATA =====
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

  // ===== LINE DATA =====
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
        <Link to="/"><button>Enter Data</button></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/signup"><button>Sign Up</button></Link>
      </aside>

      {/* MAIN */}
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

        {/* ENERGY ANALYSIS */}
        <div className="card">
          <h3>📊 Energy Consumption Analysis</h3>

          <p>
            Your total energy consumption is <strong>{currentUsage} kWh</strong>.
          </p>

          <p>
            The highest consuming appliance is <strong>{highest.name}</strong>,
            contributing <strong>{highestPercentage}%</strong> of total usage.
          </p>

          <p>
            Reducing usage of <strong>{highest.name}</strong> can significantly
            lower your electricity cost and carbon emissions.
          </p>

          {currentUsage > 100 ? (
            <p style={{ color: "#ff4d4d" }}>
              ⚠ High consumption detected. Consider reducing appliance usage.
            </p>
          ) : (
            <p style={{ color: "#00ff88" }}>
              ✅ Your energy usage is within a reasonable range.
            </p>
          )}
        </div><br></br>

        {/* CHARTS */}
        <div className="chart-grid">

          <div className="card">
            <h3>🥧 Energy Distribution</h3>
            <Pie data={pieData} options={commonOptions} />
            <p style={{ marginTop: "15px", opacity: 0.85 }}>
              {highest.name} contributes the largest share of energy usage
              at {highestPercentage}%. Focus on optimizing this appliance
              to reduce overall consumption.
            </p>
          </div>

          <div className="card">
            <h3>📊 Current vs Optimized Usage</h3>
            <Bar data={barData} options={commonOptions} />
            <p style={{ marginTop: "15px", opacity: 0.85 }}>
              By improving efficiency, you could reduce consumption by{" "}
              <strong>{currentUsage - optimizedUsage} kWh</strong>,
              saving approximately ₹{(currentUsage - optimizedUsage) * 12}.
            </p>
          </div>

          <div className="card">
            <h3>📈 Monthly Energy Trend</h3>
            <Line data={lineData} options={commonOptions} />
            <p style={{ marginTop: "15px", opacity: 0.85 }}>
              The trend shows your energy stabilizing near {currentUsage} kWh.
              Maintaining a downward trend over time improves sustainability.
            </p>
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
          {/* ENERGY AWARENESS SECTION */}
<div className="card" style={{ marginTop: "30px" }}>
  <h3>🌍 Why Saving Energy Matters</h3>

  <p style={{ marginTop: "10px", opacity: 0.9 }}>
    Energy conservation is not just about reducing electricity bills —
    it directly impacts the environment and future generations.
  </p>

  <ul style={{ marginTop: "15px", paddingLeft: "20px" }}>
    <li>
      ⚡ Lower energy consumption reduces fossil fuel usage and carbon emissions.
    </li>
    <li>
      💰 Efficient usage saves money on electricity bills over time.
    </li>
    <li>
      🌱 Reduced carbon footprint helps combat climate change.
    </li>
    <li>
      🔌 Sustainable energy practices ensure long-term resource availability.
    </li>
  </ul>

  <p style={{ marginTop: "15px", fontWeight: "500" }}>
    Small daily improvements in energy usage can create a big positive
    environmental impact.
  </p>
</div>
      </main>
    </div>
  );
}