import { useEffect, useRef } from 'react';
import { createTimeline, stagger } from 'animejs';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger letter animation for the name
    if (nameRef.current) {
      const text = nameRef.current.textContent || '';
      nameRef.current.innerHTML = '';
      
      // Wrap each letter in a span
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space
        span.style.display = 'inline-block';
        span.className = 'letter';
        nameRef.current?.appendChild(span);
      });

      createTimeline()
        .add('.letter', {
          translateY: [40, 0],
          opacity: [0, 1],
          easing: 'easeOutExpo',
          duration: 1200,
          delay: (_: any, i: number) => 150 + i * 40,
        })
        .add(subtitleRef.current!, {
          translateY: [20, 0],
          opacity: [0, 1],
          easing: 'easeOutExpo',
          duration: 800,
        }, '-=800')
        .add(descRef.current!, {
          translateY: [20, 0],
          opacity: [0, 1],
          easing: 'easeOutExpo',
          duration: 800,
        }, '-=600')
        .add(btnContainerRef.current!.children, {
          scale: [0.9, 1],
          opacity: [0, 1],
          easing: 'easeOutExpo',
          duration: 600,
          delay: stagger(100),
        }, '-=400');
    }
  }, []);

  return (
    <section className="section hero-section" id="hero" style={styles.container}>
      <div style={styles.content}>
        <div style={styles.greeting} className="pulse-glow">
          SYSTEM.INIT(SUCCESS)
        </div>
        
        <h1 ref={nameRef} style={styles.name} className="text-gradient-cyan-purple">
          NAMEET AHIRE
        </h1>
        
        <div ref={subtitleRef} style={styles.subtitle}>
          <span style={styles.subtitleItem}>AI/ML Engineer</span>
          <span style={styles.divider}>•</span>
          <span style={styles.subtitleItem}>Cloud & DevOps</span>
          <span style={styles.divider}>•</span>
          <span style={styles.subtitleItem}>M.Tech pursuing</span>
        </div>
        
        <p ref={descRef} style={styles.desc}>
          Architecting containerized cloud solutions, developing state-of-the-art computer vision models, and building secure cyber threat intelligence engines. Actively pursuing M.Tech in Computer Engineering at SPIT with a CGPA of 9.55.
        </p>
        
        <div ref={btnContainerRef} style={styles.btnContainer}>
          <button 
            onClick={() => onNavigate('projects')} 
            style={styles.primaryBtn}
            className="glass-panel"
          >
            Explore Projects
          </button>
          
          <button 
            onClick={() => onNavigate('contact')} 
            style={styles.secondaryBtn}
            className="glass-panel"
          >
            Contact Me
          </button>
        </div>
      </div>

      <div style={styles.scrollIndicator} onClick={() => onNavigate('about')}>
        <div style={styles.scrollMouse}>
          <div style={styles.scrollWheel} />
        </div>
        <span style={styles.scrollText}>SCROLL DOWN</span>
      </div>
    </section>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative' as const,
    textAlign: 'center' as const,
  },
  content: {
    maxWidth: '800px',
    padding: '0 20px',
    zIndex: 10,
  },
  greeting: {
    fontFamily: 'var(--font-display)',
    color: 'var(--color-cyan)',
    fontSize: '14px',
    letterSpacing: '0.2em',
    marginBottom: '16px',
    fontWeight: 500,
  },
  name: {
    fontSize: '72px',
    letterSpacing: '0.02em',
    marginBottom: '16px',
    lineHeight: 1.1,
    fontFamily: 'var(--font-display)',
  },
  subtitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '18px',
    color: 'var(--color-text-secondary)',
    letterSpacing: '0.05em',
    marginBottom: '28px',
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    gap: '12px',
  },
  subtitleItem: {
    whiteSpace: 'nowrap' as const,
  },
  divider: {
    color: 'var(--color-purple)',
  },
  desc: {
    color: 'var(--color-text-secondary)',
    fontSize: '17px',
    lineHeight: 1.6,
    marginBottom: '40px',
    maxWidth: '650px',
    marginInline: 'auto',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap' as const,
  },
  primaryBtn: {
    padding: '14px 28px',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.05em',
    color: '#0a0b10',
    background: 'linear-gradient(135deg, var(--color-cyan) 0%, var(--color-purple) 100%)',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(34, 211, 238, 0.3)',
  },
  secondaryBtn: {
    padding: '14px 28px',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.05em',
    color: 'var(--color-text-primary)',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid var(--border-glass)',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  scrollIndicator: {
    position: 'absolute' as const,
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    zIndex: 10,
    opacity: 0.8,
  },
  scrollMouse: {
    width: '24px',
    height: '38px',
    border: '2px solid var(--color-text-secondary)',
    borderRadius: '12px',
    position: 'relative' as const,
  },
  scrollWheel: {
    width: '4px',
    height: '8px',
    backgroundColor: 'var(--color-cyan)',
    borderRadius: '2px',
    position: 'absolute' as const,
    top: '6px',
    left: '50%',
    transform: 'translateX(-50%)',
    animation: 'scrollAnim 1.8s infinite ease-in-out',
  },
  scrollText: {
    fontFamily: 'var(--font-display)',
    fontSize: '10px',
    letterSpacing: '0.2em',
    color: 'var(--color-text-secondary)',
  },
};

// Add standard keyframe scroll helper to document style
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes scrollAnim {
      0% { transform: translate(-50%, 0); opacity: 1; }
      50% { transform: translate(-50%, 10px); opacity: 0.3; }
      100% { transform: translate(-50%, 0); opacity: 1; }
    }
    .letter:hover {
      color: var(--color-cyan);
      transform: scale(1.15) translateY(-5px) !important;
      text-shadow: 0 0 10px var(--color-cyan-glow);
    }
  `;
  document.head.appendChild(style);
}
