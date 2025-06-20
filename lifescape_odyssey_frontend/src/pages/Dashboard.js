import React from "react";

// PUBLIC_INTERFACE
const Dashboard = () => (
  <div className="container" style={{ paddingTop: 90, maxWidth: 960, margin: "0 auto" }}>
    <h2 className="title" style={{ fontFamily: "Orbitron", color: "#0ff" }}>
      Dashboard & Achievements
    </h2>
    <div className="description" style={{ color: "#fff", marginBottom: 30 }}>
      <span role="img" aria-label="badge">🏅</span> Your unlocked badges, path summaries & progression live here.<br />
      (Achievements visually unlock as you journey further!)
    </div>
    <div style={{
      display: "flex",
      gap: 32,
      flexWrap: "wrap"
    }}>
      <div style={{
        background: "linear-gradient(145deg,#80008099,#0ff2 80%)",
        color: "#fff",
        borderRadius: 13,
        padding: "18px 35px",
        minWidth: 140
      }}>
        <span style={{fontSize:"2.5rem"}} role="img" aria-label="Odyssey Pro">🪐</span><br />
        <span style={{fontWeight:'bold'}}>Odyssey Beginner</span>
      </div>
      <div style={{
        background: "linear-gradient(145deg,#0ff3,#80008099 95%)",
        color: "#fff",
        borderRadius: 13,
        padding: "18px 35px",
        minWidth: 140
      }}>
        <span style={{fontSize:"2.5rem"}} role="img" aria-label="Badge Explorer">👁️</span><br />
        <span style={{fontWeight:'bold'}}>Explorer</span>
      </div>
      <div style={{
        background: "linear-gradient(145deg,#0ff3,#80008099 70%)",
        color: "#fff",
        borderRadius: 13,
        padding: "18px 35px",
        minWidth: 140
      }}>
        <span style={{fontSize:"2.5rem"}} role="img" aria-label="Future Seeker">🔮</span><br />
        <span style={{fontWeight:'bold'}}>Future Seeker</span>
      </div>
    </div>
  </div>
);

export default Dashboard;
