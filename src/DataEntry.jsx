import { useNavigate } from "react-router-dom";
import { FaSnowflake, FaFan, FaLightbulb, FaBoxOpen } from "react-icons/fa";
import "./styles.css";

export default function DataEntry({ energyData, setEnergyData }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEnergyData({
      ...energyData,
      [e.target.name]: Number(e.target.value),
    });
  };

  return (
    <div className="container">

      <main className="main">

        <div className="card form-card">
          <h2 style={{ marginBottom: "25px" }}>⚡ Enter Appliance Usage (kWh)</h2>

          <div className="form-grid">

            <div className="input-group">
              <FaSnowflake className="input-icon" />
              <label>AC</label>
              <input
                type="number"
                name="ac"
                value={energyData.ac}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <FaFan className="input-icon" />
              <label>Fans</label>
              <input
                type="number"
                name="fans"
                value={energyData.fans}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <FaLightbulb className="input-icon" />
              <label>Lights</label>
              <input
                type="number"
                name="lights"
                value={energyData.lights}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <FaBoxOpen className="input-icon" />
              <label>Fridge</label>
              <input
                type="number"
                name="fridge"
                value={energyData.fridge}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            className="view-btn"
            onClick={() => navigate("/dashboard")}
          >
            View Dashboard →
          </button>

        </div>

      </main>
    </div>
  );
}