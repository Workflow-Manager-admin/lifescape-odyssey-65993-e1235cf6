import React from "react";

// PUBLIC_INTERFACE
const TimelineVault = () => (
  <div className="container" style={{ paddingTop: 95, maxWidth: 760 }}>
    <h2 className="title" style={{ fontFamily: "Orbitron", color: "#0ff" }}>Timeline Vault</h2>
    <div className="description" style={{ color: "#fff", marginBottom: 28 }}>
      <span role="img" aria-label="vault">🗄️</span> <b>Save, compare, and revisit your alternate timelines here.</b>
    </div>
    <div style={{
      background: "rgba(10,8,30, 0.55)",
      border: "1px solid #0ff7",
      margin: "0 0 30px",
      padding: "19px 32px",
      borderRadius: 17
    }}>
      <div style={{ color: "#0ff", fontWeight: "bold", fontSize: "1.08rem" }}>
        No timelines saved yet.<br/> Explore alternate life paths and save timelines for later discovery!
      </div>
    </div>
  </div>
);

export default TimelineVault;
