import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Cloud, BrainCircuit, GraduationCap, Zap, ArrowRight } from 'lucide-react';

import profileImg from '../assets/n1-removebg-preview.png';
import NeuralNetwork from '../components/NeuralNetwork';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    width="12" 
    height="12" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    width="12" 
    height="12" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FingerprintIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    width="44" 
    height="44" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M12 10a2 2 0 0 0-2 2v3" />
    <path d="M14 10a4 4 0 0 0-8 0v4" />
    <path d="M8 10a6 6 0 0 1 12 0v3" />
    <path d="M18 10a8 8 0 0 0-16 0v3" />
    <path d="M6 18a10 10 0 0 1 14-8v3" />
    <path d="M10 18a12 12 0 0 0 8-7" />
    <path d="M12 2v1" />
  </svg>
);

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
  'PILOT CREDENTIALS: VALIDATED (NAMEET SUDAM AHIRE)',
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
  const titleText = useTypingEffect('NAMEET SUDAM AHIRE', 80, 300);

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

          <div className="hud-socials">
            <a 
              href="https://github.com/NameetAhire" 
              target="_blank" 
              rel="noreferrer" 
              className="hud-social-btn"
              title="GitHub Profile"
            >
              <GithubIcon />
              GITHUB_LOGS
            </a>
            <a 
              href="https://linkedin.com/in/nameet-ahire" 
              target="_blank" 
              rel="noreferrer" 
              className="hud-social-btn"
              title="LinkedIn Profile"
            >
              <LinkedinIcon />
              LINKEDIN_SYS
            </a>
          </div>
        </div>

        {/* Center Panel: Profile Image */}
        <div className="cockpit-center">
          <div className="center-profile-wrapper">
            {/* Background scanner animation layer */}
            <div className="profile-scan-overlay">
              <div className="fingerprint-scan-container">
                <FingerprintIcon className="fingerprint-svg" />
                <span className="fingerprint-status">SCANNING_BIOMETRICS...</span>
              </div>
              <div className="fingerprint-scanner-bar"></div>
            </div>
            
            {/* Foreground transparent profile photo (Always fully visible) */}
            <img src={profileImg} alt="Nameet Ahire" className="center-profile-img" />
          </div>
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

      {/* ── Neural Network Topology ─────────────────────────────────── */}
      <NeuralNetwork />

    </div>
  );
}
