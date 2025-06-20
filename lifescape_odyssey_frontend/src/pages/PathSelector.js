import React from "react";

// PUBLIC_INTERFACE
const PathSelector = () => (
  <div className="container" style={{ paddingTop: 85 }}>
    <h2 className="title" style={{ fontFamily: "Orbitron", color: "#0ff" }}>
      Path Selector
    </h2>
    <div className="description" style={{ color: "#eee", marginBottom: 15 }}>
      Choose a new path and explore how small decisions shape your Odyssey.
    </div>
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr 1fr"}}>
      <button className="btn btn-large">Curious Thinker</button>
      <button className="btn btn-large">Bold Explorer</button>
      <button className="btn btn-large">Mindful Visionary</button>
    </div>
  </div>
);

export default PathSelector;
