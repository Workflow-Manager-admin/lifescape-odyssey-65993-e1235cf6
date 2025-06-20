import React from "react";

// PUBLIC_INTERFACE
const StoryChamber = () => (
  <div className="container" style={{ paddingTop: 90, maxWidth: 820 }}>
    <h2 className="title" style={{ fontFamily: "'Orbitron','Space Mono',sans-serif", color: "#0ff" }}>
      Story Chamber
    </h2>
    <div className="description" style={{ color: "#e2e2e2" }}>
      Journey across alternate timelines. <br />
      <em>Stories</em> unfold and branch out based on your choices.
    </div>
    <div style={{
      background: "rgba(0,0,0,0.45)",
      border: "1px solid #0ff2",
      margin: "30px 0",
      padding: "19px 32px",
      borderRadius: 17
    }}>
      <strong>Module #1: The Doorway</strong> <br />
      <span style={{ color: "#0ff" }}>
        As you approach the shimmering doorway, you feel a pulse of energy. <br />
        <span style={{ color: "#800080" }}>Will you: </span>
        <button className="btn btn-large" style={{ marginLeft: 12 }}>Step Forward</button>
        <button className="btn btn-large" style={{ marginLeft: 12 }}>Look Back</button>
      </span>
    </div>
  </div>
);

export default StoryChamber;
