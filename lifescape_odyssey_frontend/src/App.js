// Main container for LifeScape Odyssey app
import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import "./App.css";

// Supported fonts: Orbitron/Space Mono (headings), Inter/Lato (body).
// For demo, load fonts from Google Fonts
const orbitronFont =
  "https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Space+Mono:wght@700&family=Inter:wght@400;700&family=Lato:wght@400;700&display=swap";

// Modular page components for code splitting
const Home = lazy(() => import("./pages/Home"));
const PathSelector = lazy(() => import("./pages/PathSelector"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const StoryChamber = lazy(() => import("./pages/StoryChamber"));
const TimelineVault = lazy(() => import("./pages/TimelineVault"));

const PAGES = [
  { key: "home", label: "Home", component: Home },
  { key: "path", label: "Paths", component: PathSelector },
  { key: "dashboard", label: "Dashboard", component: Dashboard },
  { key: "story", label: "Story Chamber", component: StoryChamber },
  { key: "vault", label: "Timeline Vault", component: TimelineVault }
];

// Starfield (canvas) background
function Starfield({ count = 220, animate = true }) {
  const canvasRef = useRef();
  const [dimensions, setDimensions] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const rand = (min, max) => Math.random() * (max - min) + min;
    let stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: rand(0, dimensions.w),
        y: rand(0, dimensions.h),
        z: rand(0.2, 1.0),
        r: rand(0.25, 1.4),
        speed: rand(0.02, 0.15)
      });
    }
    let animationFrame = null;
    let hue = 220;

    function render() {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, dimensions.w, dimensions.h);
      // animated gradient
      let grad = ctx.createLinearGradient(0, 0, dimensions.w, dimensions.h);
      grad.addColorStop(0, "rgba(22,0,36,1)");
      grad.addColorStop(0.3, "rgba(24,5,60,1)");
      grad.addColorStop(0.8, `rgba(0,255,255,0.11)`);
      grad.addColorStop(1, "rgba(128,0,128,0.21)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, dimensions.w, dimensions.h);

      for (let star of stars) {
        let color = `hsla(${hue + Math.round(star.x/20)}, 95%, 75%, ${0.5+0.5*star.z})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8 * star.z;
        ctx.fill();
      }
      // Animate movement
      if (animate) {
        for (let star of stars) {
          star.x += Math.sin(star.z * 3) * star.speed;
          star.y += (star.speed + 0.04 * Math.sin(star.z * 12)) * 1.15;
          // parallax bounce for subtlety
          if (star.y > dimensions.h) star.y = 0;
          if (star.x > dimensions.w) star.x = 0;
          if (star.x < 0) star.x = dimensions.w;
        }
        hue += 0.005;
        if (hue > 320) hue = 220;
        animationFrame = requestAnimationFrame(render);
      }
    }
    render();
    return () => animationFrame && cancelAnimationFrame(animationFrame);
    // eslint-disable-next-line
  }, [dimensions, animate]);

  // Responsive resize
  useEffect(() => {
    function handleResize() {
      setDimensions({ w: window.innerWidth, h: window.innerHeight });
    }
    window.addEventListener("resize", handleResize); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.w}
      height={dimensions.h}
      className="starfield-bg"
      style={{
        position: "fixed",
        left: 0, 
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        background: "linear-gradient(180deg, #0e044c 0%, #800080 90%)",
        pointerEvents: "none"
      }}
      aria-hidden="true"
    />
  );
}

// Background music: synthwave/ambient, provided as mp3 in public folder (for demo we use a Creative Commons track)
const demoTrack =
  "https://cdn.pixabay.com/audio/2022/11/16/audio_12e7c9ab1b.mp3";

// PUBLIC_INTERFACE
function MusicToggle({ musicOn, setMusicOn }) {
  const audioRef = useRef();
  useEffect(() => {
    if (musicOn) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [musicOn]);
  return (
    <div className="music-toggle">
      <button
        aria-label={musicOn ? "Mute Background Music" : "Play Background Music"}
        className={musicOn ? "btn music-on" : "btn music-off"}
        onClick={() => setMusicOn((v) => !v)}
      >
        {musicOn ? "🔊 Music" : "🔈 Music"}
      </button>
      {/* eslint-disable-next-line */}
      <audio loop ref={audioRef} src={demoTrack} />
    </div>
  );
}

// PUBLIC_INTERFACE
function TransitionWrapper({ children, pageKey }) {
  const [visible, setVisible] = useState(true);
  const lastChildren = useRef(children);

  useEffect(() => {
    setVisible(false);
    const id = setTimeout(() => {
      lastChildren.current = children;
      setVisible(true);
    }, 290);
    return () => clearTimeout(id);
  }, [pageKey, children]);

  return (
    <div
      className={`page-transition${visible ? " in" : " out"}`}
      style={{
        transition: "opacity 340ms cubic-bezier(.4,0,.2,1), transform 355ms cubic-bezier(.4,0,.2,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(25px)"
      }}
    >
      {visible ? children : lastChildren.current}
    </div>
  );
}

// PUBLIC_INTERFACE - Main container
function App() {
  // Inject custom fonts (Orbitron, Space Mono, Inter, Lato)
  useEffect(() => {
    const ln = document.createElement("link");
    ln.rel = "stylesheet";
    ln.href = orbitronFont;
    document.head.appendChild(ln);
    return () => document.head.removeChild(ln);
  }, []);

  // Master state for navigation and simulation info
  const [page, setPage] = useState("home");
  const [musicOn, setMusicOn] = useState(false);

  // Simulation state propagated between Home->PathSelector->Story Chamber
  const [simConfig, setSimConfig] = useState({});
  const [selectedPathTag, setSelectedPathTag] = useState("");

  // Handle keyboard navigation (accessibility/immersion)
  useEffect(() => {
    function handleKeys(e) {
      if (e.altKey || e.metaKey) return;
      if (e.key === "ArrowRight" || e.key === "d") {
        setPage((cur) => {
          const idx = PAGES.findIndex((p) => p.key === cur);
          return PAGES[(idx + 1) % PAGES.length].key;
        });
      } else if (e.key === "ArrowLeft" || e.key === "a") {
        setPage((cur) => {
          const idx = PAGES.findIndex((p) => p.key === cur);
          return PAGES[(idx - 1 + PAGES.length) % PAGES.length].key;
        });
      }
    }
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, []);

  // Render mapping with props passing
  const renderPage = () => {
    if (page === "home") {
      return (
        <Home
          onBeginSimulation={(cfg) => {
            setSimConfig(cfg);
            setPage("path");
          }}
        />
      );
    }
    if (page === "path") {
      return (
        <PathSelector
          onSelectPath={pathTag => {
            setSelectedPathTag(pathTag);
            setPage("story");
          }}
        />
      );
    }
    if (page === "dashboard") {
      return <Dashboard />;
    }
    if (page === "story") {
      return (
        <StoryChamber lastPathTag={selectedPathTag} />
      );
    }
    if (page === "vault") {
      return <TimelineVault />;
    }
    return <Home />;
  };

  return (
    <div className="lsodyssey-app" style={{ fontFamily: "Inter, Lato, sans-serif" }}>
      {/* Background starfield */}
      <Starfield />
      {/* Overlay for dark theme, gradient */}
      <div
        className="gradient-overlay"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background: "radial-gradient(ellipse at top right, #0ff5, #80008077 78%, #000018dd 100%)"
        }}
      />

      {/* Navbar */}
      <nav
        className="navbar ody-navbar"
        style={{
          background: "rgba(14, 4, 76, 0.83)",
          borderBottom: "1px solid #39304b",
          fontFamily: "'Orbitron','Space Mono', sans-serif",
          zIndex: 4
        }}
      >
        <div className="container" style={{ maxWidth: 1120, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="logo" style={{ fontSize: "1.65rem", letterSpacing: "1.5px", alignItems: "center" }}>
            <span className="logo-symbol" role="img" aria-label="Cosmic Logo" style={{ color: "#0ff", fontSize: "2.1rem" }}>★</span>
            LifeScape<span style={{ color: "#0ff", marginLeft: 4 }}>Odyssey</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {PAGES.map((p) => (
              <button
                key={p.key}
                className={`btn navlink${p.key === page ? " active" : ""}`}
                style={{
                  background: p.key === page
                    ? "linear-gradient(90deg,#4441faBA 0%, #0707ccBB 65%, #0ff2 100%)"
                    : "transparent",
                  color: p.key === page ? "#0ff" : "#fff",
                  fontFamily: "'Orbitron','Space Mono',sans-serif"
                }}
                onClick={() => setPage(p.key)}
                tabIndex={0}
              >
                {p.label}
              </button>
            ))}
            <MusicToggle musicOn={musicOn} setMusicOn={setMusicOn} />
          </div>
        </div>
      </nav>

      {/* Main app panel */}
      <main
        className="main ody-main"
        style={{
          minHeight: "100vh",
          paddingTop: "74px",
          zIndex: 3,
          position: "relative"
        }}
      >
        <Suspense fallback={<div className="container" style={{ marginTop: 64, textAlign: "center", color: "#0ff" }}>Loading...</div>}>
          <TransitionWrapper pageKey={page}>
            {renderPage()}
          </TransitionWrapper>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
