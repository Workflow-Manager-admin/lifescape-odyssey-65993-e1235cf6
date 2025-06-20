import React, { useState } from "react";

// Demo template poems by outcome/choice
const memoryPoems = [
  {
    tag: "creative",
    lines: [
      "In abstract dusk I found new wings,",
      "Colors unknown, a truth that sings.",
      "Each fork in twilight, I became anew—",
      "Dancing in starscapes that never withdrew."
    ]
  },
  {
    tag: "secure",
    lines: [
      "Under city lights my shadow grew,",
      "Brick by brick, a self I knew.",
      "Yet in the silent neon haze,",
      "I dreamed of roads beyond the maze."
    ]
  },
  {
    tag: "collaborate",
    lines: [
      "Hands interlaced on dawn-lit sand,",
      "Visions built by many hands.",
      "Shared laughter climbing through time's window,",
      "A garden grown from what we sow."
    ]
  },
  {
    tag: "freshstart",
    lines: [
      "Old pages closed, I turned around,",
      "My footprints fading on hallowed ground.",
      "A pulse, a promise, in cosmic sea:",
      "This brand new odyssey is me."
    ]
  }
];

function choosePoem(selected) {
  switch(selected) {
    case "creative":
    case "a": return memoryPoems[0];
    case "secure":
    case "b": return memoryPoems[1];
    case "collaborate":
    case "e": return memoryPoems[2];
    case "freshstart":
    case "g": return memoryPoems[3];
    default: return memoryPoems[Math.floor(Math.random() * memoryPoems.length)];
  }
}

// PUBLIC_INTERFACE
function StoryChamber({ lastPathTag = "" }) {
  const [showPoem, setShowPoem] = useState(false);
  const [audioOn, setAudioOn] = useState(true);

  // Visuals/audio adapt by path. For demo: color overlays.
  let bgColor, bgImg, glowEffect;
  switch(lastPathTag) {
    case "creative":
    case "a":
      bgColor = "linear-gradient(120deg,#05002c 0%,#0ff6 90%)";
      glowEffect = "0 0 36px #0ffb, 0 3px 60px #8000804c";
      bgImg = "";
      break;
    case "secure":
    case "b":
      bgColor = "linear-gradient(120deg,#06003a 5%,#800080 100%)";
      glowEffect = "0 0 36px #800080,0 2px 80px #0ff4";
      bgImg = "";
      break;
    case "collaborate":
    case "e":
      bgColor = "linear-gradient(140deg,#800080 0%,#0ff4,#fff3 90%)";
      glowEffect = "0 0 60px #a87efb,0 2px 90px #0ff3";
      bgImg = "";
      break;
    case "freshstart":
    case "g":
      bgColor = "linear-gradient(130deg,#0c0053 0%,#a67efb 50%,#0ffb 100%)";
      glowEffect = "0 0 60px #0ff8,0 2px 90px #a67efb";
      bgImg = "";
      break;
    default:
      bgColor = "linear-gradient(135deg,#800080 20%,#0ff2 77%,#0a0033 100%)";
      glowEffect = "0 0 42px #0ff7,0 2px 70px #80008044";
      bgImg = "";
      break;
  }

  // Audio: play or not (for demo, we use a default ambient MP3)
  const demoAudio = "https://cdn.pixabay.com/audio/2022/10/16/audio_12a5404f17.mp3";

  const poem = choosePoem(lastPathTag);

  return (
    <div
      className="container"
      style={{
        paddingTop: 85,
        maxWidth: 900,
        minHeight: 420,
        background: bgColor,
        boxShadow: glowEffect,
        borderRadius: 28,
        position: "relative",
        zIndex: 2,
      }}
    >
      <h2 className="title" style={{
        fontFamily: "'Orbitron','Space Mono',sans-serif",
        color: "#0ff",
        marginBottom: 4,
        textShadow: "0 2px 26px #8000805c"
      }}>
        Story Chamber
      </h2>
      <div className="description" style={{ color: "#e2e2e2", marginBottom: 12 }}>
        A cinematic reveal of your narrative across alternate realities.
      </div>
      <div style={{ marginBottom: 12, color: "#fff", fontWeight: "bold", fontSize: "1.12rem" }}>
        <em>Background adapts to your journey—ambient audio for full immersion.</em>
      </div>
      <div style={{ marginBottom: 34 }}>
        <button
          className="btn"
          style={{ marginRight: 12, fontWeight: 600, fontSize: "1.03rem", background: audioOn ? "#0ff" : "#800080" }}
          onClick={() => setAudioOn(v => !v)}
        >
          {audioOn ? "🔊 Ambient Audio On" : "🔈 Ambient Audio Off"}
        </button>
        {/* eslint-disable-next-line */}
        <audio src={demoAudio} autoPlay={audioOn} loop volume={0.27} style={{ display: "none" }} />
      </div>

      <div style={{
        background: "rgba(0,0,0,0.51)",
        border: "1.5px solid #0ff6",
        padding: "19px 30px 28px 30px",
        borderRadius: 19,
        margin: "25px auto 10px auto",
        boxShadow: "0 0 34px #0ff4"
      }}>
        <div style={{ color: "#0ff", fontWeight: "bold", fontSize: "1.12rem", marginBottom: 7 }}>
          Module #1: {poem.tag === "creative" ? "Awakening" : poem.tag === "secure" ? "Neon Labyrinth" : poem.tag === "collaborate" ? "Shared Odyssey" : "Blank Slate"}
        </div>
        <div style={{ color: "#fff", fontWeight: "bold", fontSize: "1.09rem" }}>
          As you cross the threshold of memory...
        </div>
        <div style={{ marginTop: 15, marginBottom: 12 }}>
          {!showPoem ? (
            <button
              className="btn btn-large"
              style={{
                background: "linear-gradient(90deg,#0ff 35%,#800080 100%)",
                margin: "auto",
                display: "block"
              }}
              onClick={() => setShowPoem(true)}
            >Reveal Memory Poem</button>
          ) : (
            <div style={{
              textAlign: "center",
              marginTop: 2,
              marginBottom: 12,
              color: "#0ff",
              fontFamily: "'Space Mono','Orbitron',monospace",
              fontWeight: "bold",
              fontSize: "1.22rem"
            }}>
              {poem.lines.map((line, i) => (
                <div key={i} style={{ margin: "10px 0" }}>{line}</div>
              ))}
            </div>
          )}
        </div>
        {showPoem && (
          <div style={{ textAlign: "center", color: "#fff", fontStyle: "italic", marginTop: 13, fontSize: ".98rem" }}>
            <span>— A memory drawn from choices across your multiverse</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoryChamber;
