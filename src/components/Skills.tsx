import { useState } from 'react';
import { Code2, BrainCircuit, Cloud, ShieldCheck, Settings } from 'lucide-react';

interface SkillInfo {
  name: string;
  category: string;
  usage: string;
  proficiency: string;
  details: string;
}

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<SkillInfo | null>(null);
  const [clickedKey, setClickedKey] = useState<string | null>(null);
  const [backlightMode, setBacklightMode] = useState<string>('rgb'); // rgb, cyan, purple, teal, amber

  const skillsData: Record<string, SkillInfo> = {
    'Python': {
      name: 'Python',
      category: 'Languages & Frameworks',
      usage: 'Data analysis, AI models training, Flask server engines',
      proficiency: 'Expert / Advanced',
      details: 'Primary backend language. Used to engineer the SecureCheck security engine, preprocess datasets with Pandas, and construct deep learning models.'
    },
    'JavaScript': {
      name: 'JavaScript',
      category: 'Languages & Frameworks',
      usage: 'Interactive frontends, Canvas animations, WebGL controls',
      proficiency: 'Advanced',
      details: 'Utilized to build interactive single-page portfolios, manage Three.js renderers, and handle reactive states in React.'
    },
    'HTML5/CSS3': {
      name: 'HTML5/CSS3',
      category: 'Languages & Frameworks',
      usage: '3D CSS layouts, Glassmorphism design, Custom variables',
      proficiency: 'Advanced',
      details: 'Mastered premium styling concepts including CSS custom properties (variables), grid systems, keyframe animations, and 3D space transforms.'
    },
    'Flask': {
      name: 'Flask',
      category: 'Languages & Frameworks',
      usage: 'Threat intel APIs, server routes, lightweight services',
      proficiency: 'Advanced',
      details: 'Leveraged Flask in SecureCheck to expose REST endpoints that stream real-time threat scores and query large credential breach lists.'
    },
    'Django': {
      name: 'Django',
      category: 'Languages & Frameworks',
      usage: 'Monolithic web apps, ORM queries, administrative panels',
      proficiency: 'Intermediate',
      details: 'Configured secure Django models, database migrations, and administrative templates for structured enterprise sites.'
    },
    'React.js': {
      name: 'React.js',
      category: 'Languages & Frameworks',
      usage: 'Component rendering, Virtual DOM hooks, UI libraries',
      proficiency: 'Advanced',
      details: 'Created component architectures, custom hooks, and managed animations with Anime.js for premium web interfaces.'
    },
    'Express.js': {
      name: 'Express.js',
      category: 'Languages & Frameworks',
      usage: 'LMS microservices, JWT router middleware, REST integrations',
      proficiency: 'Advanced',
      details: 'Developed backend controllers for the Learning Management System, integrating MongoDB and securing request pipelines.'
    },
    'YOLO v8': {
      name: 'YOLO v8',
      category: 'AI/ML & Computer Vision',
      usage: 'Road incident detection, bounding boxes, speed tracking',
      proficiency: 'Expert / Research-Level',
      details: 'Trained custom YOLO v8 weights to identify vehicle collisions, fire hazards, and track moving bounding boxes in high-fps video.'
    },
    'OpenCV': {
      name: 'OpenCV',
      category: 'AI/ML & Computer Vision',
      usage: 'Video stream processing, framing adjustments, color filtering',
      proficiency: 'Advanced',
      details: 'Processed raw camera feeds, cropped license plates, drew bounding box overlays, and managed live RTSP buffer pipelines.'
    },
    'TensorFlow': {
      name: 'TensorFlow',
      category: 'AI/ML & Computer Vision',
      usage: 'CNN classification, neural nets evaluation, regression modeling',
      proficiency: 'Intermediate',
      details: 'Evaluated convolutional layers, optimized weights, and designed multi-category models for computer vision tests.'
    },
    'PyTorch': {
      name: 'PyTorch',
      category: 'AI/ML & Computer Vision',
      usage: 'Model backpropagation, tensor calculations, custom weights',
      proficiency: 'Advanced',
      details: 'Primary library for ML research. Implemented gradient descents, fine-tuned neural models, and preprocessed tensor shapes.'
    },
    'NumPy': {
      name: 'NumPy',
      category: 'AI/ML & Computer Vision',
      usage: 'Array slicing, matrix operations, statistical transformations',
      proficiency: 'Advanced',
      details: 'Performed fast numerical actions on high-dimensional arrays, representing image pixels and model weights matrices.'
    },
    'Pandas': {
      name: 'Pandas',
      category: 'AI/ML & Computer Vision',
      usage: 'CSV datasets merging, dataframes indexing, security scoring',
      proficiency: 'Expert / Advanced',
      details: 'Used inside SecureCheck to read, clean, and query through millions of raw credentials records, calculating risk severity.'
    },
    'AWS EC2': {
      name: 'AWS EC2',
      category: 'Cloud & DevOps',
      usage: 'Microservices hosting, Linux instances setup, security groups',
      proficiency: 'Advanced',
      details: 'Deployed containerized full-stack LMS containers, configured Nginx proxy redirections, and mapped VPC routing rules.'
    },
    'AWS S3': {
      name: 'AWS S3',
      category: 'Cloud & DevOps',
      usage: 'Static assets hosting, course files uploads, private buckets',
      proficiency: 'Advanced',
      details: 'Configured AWS SDK integrations to stream files into secure S3 buckets, handling access policies and lifecycle rules.'
    },
    'GCP': {
      name: 'GCP',
      category: 'Cloud & DevOps',
      usage: 'VPC subnets configuration, IAM roles management, Cloud Shell',
      proficiency: 'Associate Cloud Engineer level',
      details: 'Certified GCP practitioner. Managed persistent disks, configured load balancers, and configured Google Cloud storage buckets.'
    },
    'Docker': {
      name: 'Docker',
      category: 'Cloud & DevOps',
      usage: 'Microservices containerization, Dockerfiles, Docker Compose',
      proficiency: 'Advanced',
      details: 'Constructed isolated multi-container systems. Decoupled frontend, backend, and database dependencies using Docker Compose.'
    },
    'Git': {
      name: 'Git',
      category: 'Cloud & DevOps',
      usage: 'Code version control, branching, PR integrations',
      proficiency: 'Advanced',
      details: 'Maintained semantic versioning, resolved merge conflicts, and automated deployment tasks using webhook integrations.'
    },
    'Linux': {
      name: 'Linux',
      category: 'Cloud & DevOps',
      usage: 'Bash scripting, systemd server daemons, user permissions',
      proficiency: 'Advanced',
      details: 'Administered Ubuntu server targets, configured firewall rules, wrote cron automation, and managed file system permissions.'
    },
    'MySQL': {
      name: 'MySQL',
      category: 'Cloud & DevOps',
      usage: 'Relational data query, index optimization, user permissions',
      proficiency: 'Advanced',
      details: 'Formulated optimized transactional SQL scripts, indexing parameters, and designed relational entity schemas.'
    },
    'JWT Auth': {
      name: 'JWT Auth',
      category: 'Security Concepts & Tools',
      usage: 'Bearer tokens, auth headers validation, claims verification',
      proficiency: 'Advanced',
      details: 'Secured HTTP pipelines by issuing cryptographically signed tokens to users and validating signatures in middleware.'
    },
    'Cryptography': {
      name: 'Cryptography',
      category: 'Security Concepts & Tools',
      usage: 'AES/RSA encryptions, hashing keys, environment salts',
      proficiency: 'Intermediate',
      details: 'Implemented secure hashing and symmetric encryption protocols to protect sensitive tokens and environmental parameters.'
    },
    'bcrypt': {
      name: 'bcrypt',
      category: 'Security Concepts & Tools',
      usage: 'Password salting, computational cost parameters, verification',
      proficiency: 'Advanced',
      details: 'Hashed sensitive passwords before saving in MongoDB, verifying hashes during login to prevent database exposure issues.'
    },
    'RBAC': {
      name: 'RBAC',
      category: 'Security Concepts & Tools',
      usage: 'Role-based access permissions, route shielding, admin policies',
      proficiency: 'Advanced',
      details: 'Engineered user access systems isolating administrator panels, teacher courses, and student view files.'
    },
    'Wireshark': {
      name: 'Wireshark',
      category: 'Security Concepts & Tools',
      usage: 'Packet analysis, packet streams auditing, protocols tracking',
      proficiency: 'Intermediate',
      details: 'Analyzed network interfaces packet streams to trace vulnerabilities and detect unencrypted plain-text packets.'
    },
    'Nmap': {
      name: 'Nmap',
      category: 'Security Concepts & Tools',
      usage: 'Port scanning, service discovery, network inventory mapping',
      proficiency: 'Advanced',
      details: 'Scanned ports, evaluated firewalls, and discovered active services running on test network topologies.'
    },
    'Postman': {
      name: 'Postman',
      category: 'Security Concepts & Tools',
      usage: 'API requests modeling, response validation, tests automation',
      proficiency: 'Advanced',
      details: 'Created API testing suites, simulated network headers, and validated server response schemas.'
    },
    'Power BI': {
      name: 'Power BI',
      category: 'Security Concepts & Tools',
      usage: 'Data relation modeling, charts plotting, severity logs reporting',
      proficiency: 'Intermediate',
      details: 'Modeled CSV security metrics, mapped relationships, and designed data reports to visualize server incident clusters.'
    }
  };

  const keyboardRows = [
    {
      title: 'LANGUAGES & WEB',
      icon: Code2,
      color: 'var(--color-cyan)',
      skills: ['Python', 'JavaScript', 'HTML5/CSS3', 'Flask', 'Django', 'React.js', 'Express.js']
    },
    {
      title: 'AI/ML & COMPUTER VISION',
      icon: BrainCircuit,
      color: 'var(--color-purple)',
      skills: ['YOLO v8', 'OpenCV', 'TensorFlow', 'PyTorch', 'NumPy', 'Pandas']
    },
    {
      title: 'CLOUD & DEVOPS',
      icon: Cloud,
      color: 'var(--color-teal)',
      skills: ['AWS EC2', 'AWS S3', 'GCP', 'Docker', 'Git', 'Linux', 'MySQL']
    },
    {
      title: 'SECURITY & TOOLS',
      icon: ShieldCheck,
      color: 'var(--color-cyan)',
      skills: ['JWT Auth', 'Cryptography', 'bcrypt', 'RBAC', 'Wireshark', 'Nmap', 'Postman', 'Power BI']
    }
  ];

  // Procedural Sound Generator using Web Audio API
  const playKeyboardClick = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // 1. Transient click snap (high frequency burst)
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.06);
      
      gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.06);

      // 2. White noise snap for the mechanical tactile clack
      const bufferSize = audioCtx.sampleRate * 0.015; // 15ms buffer
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = buffer;
      
      const noiseFilter = audioCtx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 2500;
      
      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.015);
      
      noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      
      noiseNode.start();
    } catch (error) {
      // AudioContext blocked or not supported
    }
  };

  const handleKeyInteraction = (skillName: string) => {
    const skill = skillsData[skillName];
    if (skill) {
      setActiveSkill(skill);
      playKeyboardClick();
      setClickedKey(skillName);
      setTimeout(() => setClickedKey(null), 150);
    }
  };

  // Determine backlighting color variable
  const getGlowColor = (rowColor: string) => {
    if (backlightMode === 'cyan') return 'var(--color-cyan)';
    if (backlightMode === 'purple') return 'var(--color-purple)';
    if (backlightMode === 'teal') return 'var(--color-teal)';
    if (backlightMode === 'amber') return '#f59e0b'; // Amber
    return rowColor; // RGB row-based mode
  };

  return (
    <section className="section" id="skills" style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.sectionTitle} className="text-gradient-cyan-purple">
          SKILLS_DECK_CONSOLE
        </h2>
        <p style={styles.headerSubtitle}>
          Interact with Nameet's mechanical skills deck to query documentation and systems analytics.
        </p>
        <div style={styles.subtitleLine}></div>
      </div>

      <div style={styles.deckContainer}>
        {/* LED Backlight Customizer Toolbar */}
        <div style={styles.ledToolbar} className="glass-panel">
          <div style={styles.ledHeader}>
            <Settings size={14} color="var(--color-cyan)" />
            <span style={styles.ledTitle}>LED_DECK_BACKLIGHT_CONTROL</span>
          </div>
          
          <div style={styles.ledSelectors}>
            {[
              { id: 'rgb', label: 'RGB ZONE', color: 'linear-gradient(135deg, var(--color-cyan), var(--color-purple), var(--color-teal))' },
              { id: 'cyan', label: 'CYAN', color: 'var(--color-cyan)' },
              { id: 'purple', label: 'PURPLE', color: 'var(--color-purple)' },
              { id: 'teal', label: 'TEAL', color: 'var(--color-teal)' },
              { id: 'amber', label: 'AMBER', color: '#f59e0b' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setBacklightMode(mode.id);
                  playKeyboardClick();
                }}
                style={{
                  ...styles.ledBtn,
                  border: backlightMode === mode.id ? `1.5px solid ${mode.id === 'rgb' ? 'var(--color-cyan)' : mode.color}` : '1px solid var(--border-glass)',
                  boxShadow: backlightMode === mode.id ? `0 0 10px ${mode.id === 'rgb' ? 'var(--color-cyan-glow)' : mode.color + '44'}` : 'none',
                }}
                className="led-btn-hover"
              >
                <span style={{ ...styles.ledColorDot, background: mode.color }}></span>
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Glowing Terminal HUD Screen */}
        <div 
          style={{
            ...styles.hudScreen,
            border: `1px solid ${getGlowColor('rgba(45, 212, 191, 0.25)')} !important`,
            boxShadow: `0 0 20px ${getGlowColor('rgba(45, 212, 191, 0.05)')} !important`,
          }}
          className="glass-panel neon-hud-screen"
        >
          <div style={styles.hudScreenHeader}>
            <div style={styles.hudDots}>
              <span style={{ ...styles.hudDot, backgroundColor: '#ef4444' }}></span>
              <span style={{ ...styles.hudDot, backgroundColor: '#eab308' }}></span>
              <span style={{ ...styles.hudDot, backgroundColor: '#22c55e' }}></span>
            </div>
            <div style={styles.hudStatus}>
              STATUS: <span style={{ color: getGlowColor('var(--color-teal)') }}>DECK_ONLINE</span>
            </div>
          </div>
          
          <div style={styles.hudScreenContent}>
            {activeSkill ? (
              <div style={styles.terminalOutput}>
                <div style={styles.termRow}>
                  <span style={{ ...styles.termPrompt, color: getGlowColor('var(--color-teal)') }}>$ QUERY SKILL:</span>
                  <span style={{ ...styles.termValHighlight, color: getGlowColor('var(--color-cyan)') }}>{activeSkill.name}</span>
                </div>
                <div style={styles.termRow}>
                  <span style={{ ...styles.termPrompt, color: getGlowColor('var(--color-teal)') }}>$ CLASS:</span>
                  <span style={styles.termVal}>{activeSkill.category}</span>
                </div>
                <div style={styles.termRow}>
                  <span style={{ ...styles.termPrompt, color: getGlowColor('var(--color-teal)') }}>$ INTEGRATION:</span>
                  <span style={styles.termVal}>{activeSkill.usage}</span>
                </div>
                <div style={styles.termRow}>
                  <span style={{ ...styles.termPrompt, color: getGlowColor('var(--color-teal)') }}>$ PROFICIENCY:</span>
                  <span style={{ ...styles.termVal, color: getGlowColor('var(--color-teal)'), fontWeight: 700 }}>
                    {activeSkill.proficiency}
                  </span>
                </div>
                <div style={{ ...styles.termDivider, color: getGlowColor('rgba(45, 212, 191, 0.15)') }}>------------------------------------------------------</div>
                <div style={styles.termDesc}>
                  <span style={{ ...styles.termPrompt, color: getGlowColor('var(--color-teal)') }} className="pulse-glow">&gt; DETAILS: </span>
                  {activeSkill.details}
                </div>
              </div>
            ) : (
              <div style={styles.termDefault}>
                <div className="pulse-glow" style={{ color: getGlowColor('var(--color-cyan)'), fontSize: '14px', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
                  AWAITING KEYPRESS SIGNAL...
                </div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
                  Hover over or press any mechanical keycap on the console deck below to audit technical specifications, framework details, and implementation scope.
                </p>
                <div style={{ ...styles.cursorBlink, color: getGlowColor('var(--color-cyan)') }}>_</div>
              </div>
            )}
          </div>
        </div>

        {/* 3D Mechanical Keyboard Deck */}
        <div style={styles.keyboardDeckFrame}>
          <div 
            style={{
              ...styles.keyboardDeck,
              boxShadow: `0 25px 50px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255,255,255,0.05), 0 0 30px ${getGlowColor('rgba(34, 211, 238, 0.03)')}`,
            }} 
            className="keyboard-deck"
          >
            {keyboardRows.map((row, rIdx) => (
              <div key={rIdx} style={styles.keyboardRow}>
                <div style={styles.rowLabelCol}>
                  <row.icon size={14} color={getGlowColor(row.color)} style={{ marginRight: '6px' }} />
                  <span style={{ ...styles.rowLabelText, color: getGlowColor(row.color) }}>{row.title}</span>
                </div>
                
                <div style={styles.keysList}>
                  {row.skills.map((skillName) => {
                    const isClicked = clickedKey === skillName;
                    const isHovered = activeSkill?.name === skillName;
                    const activeGlow = getGlowColor(row.color);
                    
                    return (
                      <button
                        key={skillName}
                        onClick={() => handleKeyInteraction(skillName)}
                        onMouseEnter={() => handleKeyInteraction(skillName)}
                        className={`keyboard-keycap ${isClicked ? 'pressed' : ''} ${isHovered ? 'hovered' : ''}`}
                        style={{
                          ...styles.keycap,
                          '--key-neon': activeGlow,
                        } as React.CSSProperties}
                      >
                        <span style={styles.keycapLabel}>{skillName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '120px 0',
    position: 'relative' as const,
    zIndex: 10,
  },
  header: {
    marginBottom: '60px',
    textAlign: 'center' as const,
  },
  sectionTitle: {
    fontSize: '32px',
    letterSpacing: '0.1em',
    marginBottom: '12px',
  },
  headerSubtitle: {
    color: 'var(--color-text-secondary)',
    fontSize: '15px',
    maxWidth: '550px',
    margin: '0 auto 16px auto',
    lineHeight: 1.5,
  },
  subtitleLine: {
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, var(--color-cyan), var(--color-purple))',
    margin: '0 auto',
    borderRadius: '2px',
  },
  deckContainer: {
    maxWidth: '960px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '30px',
  },
  ledToolbar: {
    padding: '14px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap' as const,
    backgroundColor: 'rgba(10, 11, 16, 0.65) !important',
  },
  ledHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  ledTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: 'var(--color-text-primary)',
  },
  ledSelectors: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap' as const,
  },
  ledBtn: {
    padding: '6px 12px',
    borderRadius: '4px',
    fontFamily: 'var(--font-display)',
    fontSize: '9px',
    fontWeight: 600,
    letterSpacing: '0.05em',
    color: 'var(--color-text-secondary)',
    background: 'rgba(255,255,255,0.03)',
    cursor: 'pointer',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.25s ease',
  },
  ledColorDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  hudScreen: {
    width: '100%',
    padding: '24px',
    minHeight: '200px',
    backgroundColor: 'rgba(10, 11, 16, 0.85) !important',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  hudScreenHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    paddingBottom: '12px',
    marginBottom: '16px',
  },
  hudDots: {
    display: 'flex',
    gap: '6px',
  },
  hudDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  hudStatus: {
    fontFamily: 'var(--font-display)',
    fontSize: '10px',
    letterSpacing: '0.1em',
    color: 'var(--color-text-secondary)',
  },
  hudScreenContent: {
    flex: 1,
    fontFamily: 'monospace, Courier New, Courier',
  },
  terminalOutput: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    textAlign: 'left' as const,
  },
  termRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap' as const,
  },
  termPrompt: {
    fontWeight: 'bold',
  },
  termValHighlight: {
    fontWeight: 'bold',
  },
  termVal: {
    color: 'var(--color-text-primary)',
  },
  termDivider: {
    letterSpacing: '1px',
    userSelect: 'none' as const,
  },
  termDesc: {
    color: 'var(--color-text-secondary)',
    lineHeight: 1.5,
  },
  termDefault: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center' as const,
    minHeight: '120px',
    padding: '0 20px',
  },
  cursorBlink: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    animation: 'blink 1s infinite steps(2)',
    fontSize: '18px',
    marginTop: '6px',
  },
  keyboardDeckFrame: {
    perspective: '1200px',
    width: '100%',
  },
  keyboardDeck: {
    transform: 'rotateX(20deg) rotateY(-2deg)',
    transformStyle: 'preserve-3d' as const,
    background: 'linear-gradient(180deg, #161824 0%, #0d0e15 100%)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
  },
  keyboardRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    transformStyle: 'preserve-3d' as const,
    flexWrap: 'wrap' as const,
  },
  rowLabelCol: {
    width: '180px',
    display: 'flex',
    alignItems: 'center',
    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
  },
  rowLabelText: {
    fontFamily: 'var(--font-display)',
    fontSize: '10px',
    letterSpacing: '0.1em',
    fontWeight: 700,
  },
  keysList: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '12px',
    transformStyle: 'preserve-3d' as const,
  },
  keycap: {
    padding: '10px 16px',
    borderRadius: '6px',
    background: '#1d2030',
    color: 'var(--color-text-secondary)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderBottom: '5px solid #0d0f18',
    cursor: 'pointer',
    position: 'relative' as const,
    transformStyle: 'preserve-3d' as const,
    transition: 'all 0.15s cubic-bezier(0.25, 0.8, 0.25, 1)',
    fontFamily: 'var(--font-display)',
    fontSize: '11px',
    fontWeight: 600,
    outline: 'none',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
  },
  keycapLabel: {
    display: 'block',
    pointerEvents: 'none' as const,
  },
};

// Keyboard Deck 3D transformations stylesheet injection
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes blink {
      0%, 100% { opacity: 0; }
      50% { opacity: 1; }
    }
    .led-btn-hover:hover {
      color: var(--color-text-primary) !important;
      background-color: rgba(255,255,255,0.08) !important;
    }
    .neon-hud-screen {
      transition: all 0.3s ease;
    }
    .keyboard-keycap {
      transform: translateZ(10px);
    }
    .keyboard-keycap:hover {
      color: var(--color-text-primary) !important;
      border-color: var(--key-neon) !important;
      box-shadow: 0 0 12px var(--key-neon), 0 2px 4px rgba(0,0,0,0.5);
      border-bottom: 5px solid #0d0f18;
      transform: translateZ(15px);
    }
    .keyboard-keycap.hovered {
      color: var(--color-text-primary) !important;
      border-color: var(--key-neon) !important;
      box-shadow: 0 0 12px var(--key-neon), 0 2px 4px rgba(0,0,0,0.5);
      border-bottom: 5px solid #0d0f18;
      transform: translateZ(15px);
    }
    .keyboard-keycap:active, .keyboard-keycap.pressed {
      border-bottom: 1px solid #0d0f18 !important;
      transform: translateZ(2px) translateY(3px) !important;
      box-shadow: 0 0 15px var(--key-neon), 0 1px 2px rgba(0,0,0,0.8) !important;
    }
    .keyboard-deck:hover {
      transform: rotateX(23deg) rotateY(-1deg);
    }
    @media (max-width: 900px) {
      .keyboard-deck {
        transform: rotateX(0deg) rotateY(0deg) !important;
        padding: 20px;
      }
      .keyboard-deck:hover {
        transform: rotateX(0deg) rotateY(0deg) !important;
      }
      .keyboard-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }
      .rowLabelCol {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        padding-bottom: 6px;
      }
      .keysList {
        width: 100%;
      }
      .keyboard-keycap {
        transform: none !important;
        border-bottom: 2px solid #0d0f18 !important;
      }
      .keyboard-keycap:hover {
        transform: none !important;
      }
      .keyboard-keycap:active, .keyboard-keycap.pressed {
        transform: translateY(2px) !important;
        border-bottom: 0px solid #0d0f18 !important;
      }
    }
  `;
  document.head.appendChild(style);
}
