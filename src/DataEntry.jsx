import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function DataEntry({ energyData, setEnergyData }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEnergyData({
      ...energyData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = () => {
    navigate("/dashboard"); // ✅ go to dashboard
  };

  return (
    <div className="container">
      <main className="main">
        <div className="card">
          <h2>⚡ Enter Appliance Usage Data</h2>

          <label>AC</label>
          <input
            type="number"
            name="ac"
            value={energyData.ac}
            onChange={handleChange}
          />

          <label>Fans</label>
          <input
            type="number"
            name="fans"
            value={energyData.fans}
            onChange={handleChange}
          />

          <label>Lights</label>
          <input
            type="number"
            name="lights"
            value={energyData.lights}
            onChange={handleChange}
          />

          <label>Fridge</label>
          <input
            type="number"
            name="fridge"
            value={energyData.fridge}
            onChange={handleChange}
          />

          <br /><br />

          <button onClick={handleSubmit}>
            Update Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}