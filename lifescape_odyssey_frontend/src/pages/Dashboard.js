import React, { useState } from "react";

// Demo chart/dial components
function Dial({ label, value, color, min=0, max=100 }) {
  const v = Math.max(min, Math.min(max, value));
  const radius = 45, stroke = 13, circ = 2 * Math.PI * radius;
  const progress = ((v - min) / (max - min));
  const dash = circ * progress;
  const bg = "#222870";
  return (
    <div style={{ textAlign: "center", margin: "18px 19px" }}>
      <svg width={115} height={115} style={{ display: "block" }}>
        <circle
          cx={57} cy={57} r={radius}
          fill="#101020"
          stroke={bg}
          strokeWidth={stroke}
        />
        <circle
          cx={57} cy={57} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${dash},${circ-dash}`}
          transform="rotate(-90 57 57)"
          style={{ transition: "stroke-dasharray 0.48s cubic-bezier(.5,0,.3,1)" }}
          opacity={0.99}
        />
        <text
          x={57} y={61}
          textAnchor="middle"
          fill="#0ff"
          fontSize="1.75rem"
          fontFamily="'Orbitron','Space Mono',monospace"
          fontWeight={600}
        >{Math.round(v)}</text>
      </svg>
      <div style={{ color: "#fff", fontSize: "1rem", marginTop: 10, fontFamily: "Orbitron", letterSpacing: ".04em" }}>{label}</div>
    </div>
  );
}

// Demo chart
function MiniChart({ values, color, label }) {
  const maxVal = Math.max(...values, 1);
  return (
    <div style={{ margin: "18px", flex: 1, minWidth: 100 }}>
      <div style={{ height: 56, width: "100%", overflow: "visible" }}>
        <svg width={124} height={54}>
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="3"
            points={values.map((v, i) =>
              `${8 + i * 28},${48 - ((v / maxVal) * 36)}`
            ).join(" ")}
            opacity="0.93"
            style={{ filter: "drop-shadow(0 0 7px #0ff6)" }}
          />
        </svg>
      </div>
      <div style={{ color: "#0ff", fontWeight: 600, fontSize: "1.01rem", marginTop: 3 }}>{label}</div>
    </div>
  );
}

// PUBLIC_INTERFACE
function Dashboard() {
  // Stats state (interactive)
  const [fulfillment, setFulfillment] = useState(70);
  const [stability, setStability] = useState(65);
  const [emotion, setEmotion] = useState(54);
  const [impact, setImpact] = useState(71);

  // Chart data
  const [trend, setTrend] = useState([
    [60,65,71,70,75,80],
    [50,60,59,64,65,60],
    [40,48,45,56,54,53],
    [26,51,62,69,71,68]
  ]);

  return (
    <div className="container" style={{ paddingTop: 70, maxWidth: 1050 }}>
      <h2 className="title" style={{ fontFamily: "Orbitron", color: "#0ff" }}>
        Multiverse Dashboard
      </h2>
      <div className="description" style={{ color: "#fff", marginBottom: 22 }}>
        Visualize your many timelines. Adjust dials to see projected scores across alternate realities!
      </div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
        <Dial label="Life Fulfillment" value={fulfillment} color="#0ff" />
        <Dial label="Stability" value={stability} color="#800080" />
        <Dial label="Emotional Score" value={emotion} color="#47f3f8" />
        <Dial label="Social Impact" value={impact} color="#93eaff" />
      </div>
      <div style={{ display: "flex", gap: 18, marginTop: 38, flexWrap: "wrap" }}>
        <MiniChart values={trend[0]} color="#0ff" label="Timeline Trend" />
        <MiniChart values={trend[1]} color="#800080" label="Pathways" />
        <MiniChart values={trend[2]} color="#93eaff" label="Stability Drift" />
        <MiniChart values={trend[3]} color="#fff" label="Impact" />
      </div>
      <div style={{ margin: "29px auto 0 auto", maxWidth: 720, background: "rgba(0,255,255,0.08)", padding: "18px 24px", borderRadius: 11 }}>
        <div style={{ color: "#0ff", fontFamily: "Orbitron, monospace", fontWeight: 700, fontSize: "1.1rem", marginBottom: 12 }}>
          Adjust Your Dials
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
          <label>
            Fulfillment:
            <input type="range" min="0" max="100" value={fulfillment}
              onChange={e => setFulfillment(Number(e.target.value))}
              style={{
                width: "80%",
                accentColor: "#0ff",
                marginLeft: 8,
                verticalAlign: "middle"
              }}
            />
          </label>
          <label>
            Stability:
            <input type="range" min="0" max="100" value={stability}
              onChange={e => setStability(Number(e.target.value))}
              style={{
                width: "80%",
                accentColor: "#800080",
                marginLeft: 8,
                verticalAlign: "middle"
              }}
            />
          </label>
          <label>
            Emotional Score:
            <input type="range" min="0" max="100" value={emotion}
              onChange={e => setEmotion(Number(e.target.value))}
              style={{
                width: "80%",
                accentColor: "#47f3f8",
                marginLeft: 8,
                verticalAlign: "middle"
              }}
            />
          </label>
          <label>
            Social Impact:
            <input type="range" min="0" max="100" value={impact}
              onChange={e => setImpact(Number(e.target.value))}
              style={{
                width: "80%",
                accentColor: "#93eaff",
                marginLeft: 8,
                verticalAlign: "middle"
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
