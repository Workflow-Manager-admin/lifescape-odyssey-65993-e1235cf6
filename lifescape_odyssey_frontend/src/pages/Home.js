import React from "react";

// PUBLIC_INTERFACE
const Home = () => (
  <div className="container hero" style={{ paddingTop: 140, textAlign: "center" }}>
    <div className="subtitle" style={{ fontFamily: "'Orbitron','Space Mono',sans-serif", color: "#0ff", fontSize: "1.45rem" }}>
      Welcome to <span style={{ color: "#800080" }}>LifeScape Odyssey</span>
    </div>
    <h1
      className="title"
      style={{
        fontFamily: "'Orbitron','Space Mono',sans-serif",
        letterSpacing: "0.06em",
        fontWeight: 700,
        fontSize: "3.6rem",
        textShadow: "0 0 16px #0ff7, 0 2px 40px #8000807b",
        color: "#fff"
      }}
    >
      Embark On Infinite Timelines
    </h1>
    <div
      className="description"
      style={{
        color: "#e3e3e3",
        fontSize: "1.25rem",
        maxWidth: "600px",
        margin: "32px auto 8px auto"
      }}
    >
      Shape alternate realities by making key decisions. Traverse your LifeScape, earn achievements, save timelines, and witness how choices echo across cosmic possibilities.
    </div>
    <a href="#" className="btn btn-large" style={{ margin: "auto", marginTop: 22, fontFamily: "'Orbitron','Space Mono',sans-serif" }}>Start Your Journey</a>
  </div>
);

export default Home;
