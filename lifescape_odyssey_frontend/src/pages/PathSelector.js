import React, { useState } from "react";

// Example branching data
const PATHS = [
  {
    id: "start",
    label: "Origin Point",
    outcomes: [
      { id: "a", label: "Pursue Creativity", theme: "#0ff", next: "b" },
      { id: "b", label: "Value Security", theme: "#800080", next: "c" }
    ]
  },
  {
    id: "b",
    label: "Creativity Path",
    outcomes: [
      { id: "d", label: "Embrace Uncertainty", theme: "#5ef9de", next: "x1" },
      { id: "e", label: "Seek Collaboration", theme: "#a67efb", next: "x2" }
    ]
  },
  {
    id: "c",
    label: "Security Path",
    outcomes: [
      { id: "f", label: "Climb Ladder", theme: "#99ffbb", next: "x3" },
      { id: "g", label: "Start From Scratch", theme: "#e29fff", next: "x4" }
    ]
  }
];

// Extra nodes
const EXTRAS = {
  x1: { branch: "Creative Odyssey", description: "You discover new art forms, inspiring countless others.", color: "#0ff9" },
  x2: { branch: "Unified Vision", description: "Collaborations lead to breathtaking achievements.", color: "#800080d4" },
  x3: { branch: "Corporate Titan", description: "Security paves the way to success, but challenges your individuality.", color: "#68f7eb" },
  x4: { branch: "Fresh Start", description: "Reinvention takes courage—your journey is unique.", color: "#8629dd90" }
};


// PUBLIC_INTERFACE
function PathSelector({ onSelectPath }) {
  // Step state: flow is deterministic for demo, real version would serialize all choices
  const [flow, setFlow] = useState(["start"]);
  const [completed, setCompleted] = useState(false);
  const current = flow[flow.length - 1];
  const pathData = PATHS.find(p => p.id === current);

  function handleChoice(choice) {
    setFlow(f => [...f, choice.next]);
    if (choice.next.startsWith("x")) setCompleted(true);
    if (onSelectPath) onSelectPath(choice.next); // For parent hook
  }

  function handleRestart() {
    setFlow(["start"]);
    setCompleted(false);
  }

  return (
    <div className="container" style={{ paddingTop: 76, minHeight: 600 }}>
      <h2 className="title" style={{ fontFamily: "Orbitron", color: "#0ff" }}>
        Simulation Path Selector
      </h2>
      <div className="description" style={{ color: "#eee", marginBottom: 20 }}>
        Where will your decisions lead? Branch into possible realities—each fork reshapes your Odyssey.
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: 320 }}>
        <div style={{
          background: "rgba(35,10,58,0.7)",
          border: "2px solid #0ff6",
          borderRadius: 14,
          padding: 24,
          minWidth: 300,
          boxShadow: "0 0 40px #0ff2"
        }}>
          {!completed && pathData && (
            <>
              <div style={{ fontWeight: 600, fontSize: "1.13rem", color: "#0ff", marginBottom: 12 }}>
                <span style={{ color: "#fff" }}>{pathData.label}</span>
              </div>
              <div>
                {pathData.outcomes.map(outcome => (
                  <button
                    key={outcome.id}
                    className="btn btn-large"
                    style={{
                      width: "100%",
                      marginBottom: 13,
                      background: `linear-gradient(90deg, ${outcome.theme} 67%, #800080dc 100%)`,
                      border: `1.5px solid #0ff6`,
                      color: "#fff",
                      letterSpacing: ".08em",
                      fontWeight: 700
                    }}
                    onClick={() => handleChoice(outcome)}
                  >
                    {outcome.label}
                  </button>
                ))}
              </div>
            </>
          )}
          {completed && (
            <>
              {EXTRAS[flow[flow.length - 1]] && (
                <div>
                  <div style={{
                    fontWeight: "bold",
                    fontSize: "1.19rem",
                    color: "#fff",
                    marginBottom: 8,
                    marginTop: 6
                  }}>
                    {EXTRAS[flow[flow.length - 1]].branch}
                  </div>
                  <div style={{
                    color: EXTRAS[flow[flow.length - 1]].color,
                    marginBottom: 20,
                    fontSize: "1.06rem"
                  }}>
                    {EXTRAS[flow[flow.length - 1]].description}
                  </div>
                  <button className="btn btn-large" style={{
                    background: "linear-gradient(90deg,#800080 30%,#0ff 100%)"
                  }} onClick={handleRestart}>
                    Restart Path Selection
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div style={{
          marginLeft: 34, minWidth: 210, maxWidth: 280, marginTop: 8, opacity: completed ? 0.9 : 0.55,
          transition: "opacity 0.4s"
        }}>
          {/* Branching flowchart illustration */}
          <svg width="210" height="230" style={{ display: "block", margin: "auto" }}>
            {/* Timeline line */}
            <polyline
              points="105,0 105,35 65,75 105,115 145,155"
              fill="none"
              stroke="#0ff"
              strokeWidth="2"
              opacity="0.6"
            />
            {/* Branches */}
            <line x1="65" y1="75" x2="25" y2="115" stroke="#800080" strokeWidth="2.1" opacity="0.7" />
            <line x1="105" y1="115" x2="65" y2="155" stroke="#5ef9de" strokeWidth="2.1" opacity="0.7" />
            <line x1="105" y1="115" x2="145" y2="155" stroke="#a67efb" strokeWidth="2.1" opacity="0.7" />
            <circle cx="105" cy="0" r="7" fill="#0ff" />
            <circle cx="65" cy="75" r="7" fill="#0ff" />
            <circle cx="105" cy="115" r="7" fill="#0ff" />
            <circle cx="145" cy="155" r="7" fill="#5ef9de" />
            <circle cx="65" cy="155" r="7" fill="#a67efb" />
            <circle cx="25" cy="115" r="7" fill="#800080" />
            {/* Node labels */}
            <text x="118" y="11" fill="#0ff" fontSize={13}>Origin</text>
            <text x="68" y="65" fill="#0ff" fontSize={12}>Creativity</text>
            <text x="125" y="154" fill="#5ef9de" fontSize={12}>Art</text>
            <text x="35" y="110" fill="#800080" fontSize={12}>Security</text>
            <text x="21" y="180" fill="#fff" fontSize={10}>Fresh Start</text>
            <text x="145" y="180" fill="#fff" fontSize={10}>Collaboration</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default PathSelector;
