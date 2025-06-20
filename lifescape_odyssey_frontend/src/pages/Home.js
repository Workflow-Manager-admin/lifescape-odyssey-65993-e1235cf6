import React, { useState } from "react";

// PUBLIC_INTERFACE
function Home({ onBeginSimulation }) {
  // State hooks
  const [whatIf, setWhatIf] = useState("");
  const [career, setCareer] = useState("");
  const [relationship, setRelationship] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState("");
  const [personality, setPersonality] = useState("");
  const [personalityType, setPersonalityType] = useState("MBTI");

  // MBTI and Enneagram list
  const MBTI = [
    "INTJ", "INTP", "ENTJ", "ENTP",
    "INFJ", "INFP", "ENFJ", "ENFP",
    "ISTJ", "ISFJ", "ESTJ", "ESFJ",
    "ISTP", "ISFP", "ESTP", "ESFP",
  ];
  const ENNEAGRAM = [
    "One (Reformer)",
    "Two (Helper)",
    "Three (Achiever)",
    "Four (Individualist)",
    "Five (Investigator)",
    "Six (Loyalist)",
    "Seven (Enthusiast)",
    "Eight (Challenger)",
    "Nine (Peacemaker)"
  ];

  // Example lists
  const careers = ["Artist", "Scientist", "Entrepreneur", "Teacher", "Athlete", "Engineer", "Designer", "Doctor"];
  const relationships = ["Single", "Married", "In a relationship", "Divorced", "It's complicated"];
  const locations = ["New York", "Tokyo", "Paris", "London", "Anywhere", "Remote Island", "Space Colony"];
  const educations = ["High School", "College", "PhD", "Self-taught", "Dropped out", "None"];

  // Begin simulation handler
  function handleBegin() {
    // Pass data to parent if used, or redirect via hash (template)
    if (onBeginSimulation) {
      onBeginSimulation({
        whatIf,
        career,
        relationship,
        location,
        education,
        personalityType,
        personality,
      });
    } else {
      window.location.hash = "#/path";
      window.scrollTo(0,0);
    }
  }

  return (
    <div className="container hero" style={{ paddingTop: 110, textAlign: "center" }}>
      <div className="subtitle" style={{ color: "#0ff", fontSize: "1.45rem" }}>
        Welcome to <span style={{ color: "#800080" }}>LifeScape Odyssey</span>
      </div>
      <h1
        className="title"
        style={{
          letterSpacing: "0.06em",
          fontWeight: 700,
          fontSize: "3.4rem",
          textShadow: "0 0 22px #0ff6, 0 2px 40px #8000807b",
          color: "#fff",
        }}
      >
        What if you could live infinite timelines?
      </h1>
      <div className="description" style={{ color: "#e3e3e3", fontSize: "1.16rem", marginBottom: 14 }}>
        Shape alternate realities by making key decisions. Traverse your LifeScape, earn achievements, and witness how even the smallest choices echo across the cosmic multiverse.
      </div>
      <div style={{
        margin: "34px auto 0 auto",
        maxWidth: 470,
        padding: "24px 32px 26px 32px",
        background: "rgba(60,11,70,0.68)",
        borderRadius: 16,
        boxShadow: "0 8px 44px #0ff3, 0 3px 14px #8000801a",
        border: "1px solid #0ff2",
        position: "relative"
      }}>
        <label htmlFor="whatif" style={{ color: "#0ff", fontSize: "1.14rem", fontWeight: 600, marginBottom: 10, display: "block" }}>
          What if...
        </label>
        <input
          id="whatif"
          type="text"
          className="form-input"
          value={whatIf}
          placeholder="(e.g. I had chosen a different career)"
          onChange={e => setWhatIf(e.target.value)}
          style={{
            width: "100%",
            fontSize: "1.08rem",
            border: "1.5px solid #0ff2",
            borderRadius: 9,
            padding: "12px 17px",
            marginBottom: 24,
            background: "rgba(15,12,28,0.92)",
            color: "#fff",
            outline: 0,
            marginTop: 4
          }}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
          <div>
            <label htmlFor="career" style={{ fontWeight: "bold", color: "#fff", fontSize: ".98rem" }}>Career</label>
            <select
              id="career"
              value={career}
              onChange={e => setCareer(e.target.value)}
              style={{
                width: "100%",
                borderRadius: 7,
                border: "1px solid #0ff3",
                fontSize: "1rem",
                padding: "6px 10px",
                background: "#17003d",
                color: "#fff",
                outline: 0
              }}
            >
              <option value="">Pick...</option>
              {careers.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="relationship" style={{ fontWeight: "bold", color: "#fff", fontSize: ".98rem" }}>Relationship</label>
            <select
              id="relationship"
              value={relationship}
              onChange={e => setRelationship(e.target.value)}
              style={{
                width: "100%",
                borderRadius: 7,
                border: "1px solid #0ff3",
                fontSize: "1rem",
                padding: "6px 10px",
                background: "#17003d",
                color: "#fff",
                outline: 0
              }}
            >
              <option value="">Pick...</option>
              {relationships.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="location" style={{ fontWeight: "bold", color: "#fff", fontSize: ".98rem" }}>Location</label>
            <select
              id="location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              style={{
                width: "100%",
                borderRadius: 7,
                border: "1px solid #0ff3",
                fontSize: "1rem",
                padding: "6px 10px",
                background: "#17003d",
                color: "#fff",
                outline: 0
              }}
            >
              <option value="">Pick...</option>
              {locations.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="education" style={{ fontWeight: "bold", color: "#fff", fontSize: ".98rem" }}>Education</label>
            <select
              id="education"
              value={education}
              onChange={e => setEducation(e.target.value)}
              style={{
                width: "100%",
                borderRadius: 7,
                border: "1px solid #0ff3",
                fontSize: "1rem",
                padding: "6px 10px",
                background: "#17003d",
                color: "#fff",
                outline: 0
              }}
            >
              <option value="">Pick...</option>
              {educations.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
        </div>
        {/* Personality Selector */}
        <div style={{ marginBottom: 22 }}>
          <span style={{ color: "#0ff", fontWeight: "bold", marginRight: 10 }}>Personality:</span>
          <button
            style={{
              marginRight: 10,
              background: personalityType === "MBTI" ? "linear-gradient(90deg,#0ffb,#800080 82%)" : "transparent",
              color: personalityType === "MBTI" ? "#fff" : "#0ff",
              border: "1px solid #0ff2",
              borderRadius: 6,
              padding: "5px 13px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
            onClick={() => {
              setPersonalityType("MBTI");
              setPersonality("");
            }}
          >
            MBTI
          </button>
          <button
            style={{
              background: personalityType === "Enneagram" ? "linear-gradient(90deg,#800080 20%,#0ffb 90%)" : "transparent",
              color: personalityType === "Enneagram" ? "#fff" : "#0ff",
              border: "1px solid #0ff2",
              borderRadius: 6,
              padding: "5px 13px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
            onClick={() => {
              setPersonalityType("Enneagram");
              setPersonality("");
            }}
          >
            Enneagram
          </button>
          <select
            value={personality}
            onChange={e => setPersonality(e.target.value)}
            style={{
              marginLeft: 14,
              minWidth: 132,
              borderRadius: 7,
              border: "1px solid #0ff3",
              fontSize: "1rem",
              padding: "6px 12px",
              background: "#17003d",
              color: "#fff",
              outline: 0
            }}
          >
            <option value="">Type...</option>
            {personalityType === "MBTI"
              ? MBTI.map(m => (
                <option key={m} value={m}>{m}</option>
              ))
              : ENNEAGRAM.map(e => (
                <option key={e} value={e}>{e}</option>
              ))
            }
          </select>
        </div>
        <button
          className="btn btn-large"
          style={{
            fontWeight: 700,
            fontSize: "1.17rem",
            margin: "18px auto 8px auto",
            width: "100%",
            boxShadow: "0 2px 16px #8000805b",
            letterSpacing: ".07em"
          }}
          onClick={handleBegin}
          disabled={
            !whatIf || !career || !relationship || !location || !education || !personality
          }
        >
          Begin Simulation
        </button>
      </div>
      <div style={{ marginTop: 48, color: "#888", fontSize: ".96rem", userSelect: "none" }}>
        <span>✨ Your LifeScape choices spark new stories each session.</span>
      </div>
    </div>
  );
}

export default Home;
