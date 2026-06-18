import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import InteractiveCore3D from '../components/InteractiveCore3D';
import { ShieldCheck, Cloud, BrainCircuit, GraduationCap, Zap, ArrowRight } from 'lucide-react';

/* ─── Typing Effect Hook ─────────────────────────────────────────────────── */
function useTypingEffect(text: string, speed = 60, delay = 0) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, ++i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);
  return displayed;
}

const diagnosticStrings = [
  'SYSTEM INITIALIZATION: SUCCESSFUL',
  'ESTABLISHING LINK TO SPACE CONSOLE...',
  'PILOT CREDENTIALS: VALIDATED (NAMEET AHIRE)',
  'M.TECH STUDENT DETECTED: SPIT (CGPA 9.55)',
  'AI/ML CORE: YOLO v8 DEEP LEARNING STABLE',
  'CLOUD NETWORKS: AWS CI/CD BADGES INTEGRATED',
  'SECURITY STATUS: SECURECHECK SCANNERS ARMED',
  'DOCKER COMPOSE ROUTERS: PORT BRIDGE ONLINE',
  'GCP CLOUD ASSETS: BUCKETS SECURED',
  'COMPUTING PLATFORMS: DOCKER DAEMONS READY',
  'SYSTEM METRICS REPORT: 100% OPERATIONAL',
  'AWAITING INPUT ON HUD NAVIGATION...',
];

export default function Home() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null); // the scrollable terminal box
  const logsEndRef = useRef<HTMLDivElement>(null);
  const titleText = useTypingEffect('NAMEET AHIRE', 80, 300);

  // Build diagnostic log feed
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < diagnosticStrings.length) {
        setLogs(prev => [...prev, diagnosticStrings[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll ONLY the terminal box — never the page
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="home-wrapper">
      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <header className="home-hero">
        <div className="home-status pulse-glow">
          ◉ SYSTEM_STATUS: COCKPIT_ACTIVE
        </div>
        <h1 className="home-title text-gradient-cyan-purple">
          {titleText}
          <span className="cursor-blink">_</span>
        </h1>
        <p className="home-subtitle">
          System Architect &nbsp;•&nbsp; Artificial Intelligence &nbsp;•&nbsp; Secure Cloud Environments
        </p>
        <div className="home-badges">
          <span className="home-badge"><BrainCircuit size={12} /> AI / ML</span>
          <span className="home-badge"><Cloud size={12} /> DevOps</span>
          <span className="home-badge"><ShieldCheck size={12} /> Security</span>
          <span className="home-badge"><GraduationCap size={12} /> CGPA 9.55</span>
        </div>
      </header>

      {/* ── Cockpit Grid ──────────────────────────────────────────────── */}
      <div className="cockpit-grid">
        {/* Left HUD: Pilot Identity */}
        <div className="glass-panel cockpit-card border-glow-cyan home-hud-panel">
          <div className="hud-header">
            <GraduationCap size={15} color="var(--color-cyan)" />
            <h3 className="hud-title">PILOT_IDENTITY_FILE</h3>
          </div>

          <p className="hud-bio">
            Highly analytical Computer Engineering graduate student, bridging the gap between
            deep learning vision models and scalable cloud microservices.
          </p>

          <div className="hud-metrics">
            <div className="metric-row">
              <span className="metric-label">M.Tech · SPIT Mumbai</span>
              <span className="metric-val">9.55 CGPA</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">B.E. Computer Engineering</span>
              <span className="metric-val">8.82 CGPA</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">AWS Cloud Badges</span>
              <span className="metric-val cyan">3 Earned</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">GitHub Projects</span>
              <span className="metric-val purple">8+ Public</span>
            </div>
          </div>
        </div>

        {/* Center Panel: 3D Orb */}
        <div className="cockpit-center">
          <InteractiveCore3D />
        </div>

        {/* Right HUD: Diagnostic Telemetry */}
        <div className="glass-panel cockpit-card border-glow-purple home-hud-panel">
          <div className="hud-header">
            <Zap size={15} color="var(--color-purple)" />
            <h3 className="hud-title">DIAGNOSTIC_TELEMETRY</h3>
          </div>

          <div className="terminal-console" ref={terminalRef}>
            {logs.map((log, idx) => (
              <div key={idx} className="log-entry">
                <span className="log-tag">[INFO]</span>
                <span className="log-text">{log}</span>
              </div>
            ))}
            <div className="log-cursor" ref={logsEndRef}>█</div>
          </div>
        </div>
      </div>

      {/* ── Navigation CTAs ───────────────────────────────────────────── */}
      <nav className="home-nav-row" aria-label="Section navigation">
        <button
          onClick={() => navigate('/journey')}
          className="cockpit-btn nav-btn-journey home-nav-btn"
        >
          <span className="btn-dot" />
          MISSION TIMELINE
          <ArrowRight size={14} />
        </button>
        <button
          onClick={() => navigate('/skills')}
          className="cockpit-btn nav-btn-skills home-nav-btn"
        >
          <span className="btn-dot" />
          SKILL CONSOLE
          <ArrowRight size={14} />
        </button>
        <button
          onClick={() => navigate('/contact')}
          className="cockpit-btn nav-btn-contact home-nav-btn"
        >
          <span className="btn-dot" />
          ESTABLISH COMMS
          <ArrowRight size={14} />
        </button>
      </nav>
    </div>
  );
}
