import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  ExternalLink,
  CloudLightning,
  Server,
  Database,
  ShieldAlert,
  BrainCircuit,
  Eye
} from 'lucide-react';

import profileImg from '../assets/profile.png';
import lmsImg from '../assets/lms_preview.png';
import threatImg from '../assets/threat_preview.png';
import roadImg from '../assets/road_preview.png';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    width="14" 
    height="14" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface TimelineItemData {
  id: string;
  type: 'project' | 'education' | 'certification';
  date: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  image?: string;
  github?: string;
  icon: React.ComponentType<any>;
  accentColor: string;
}

export default function JourneyTimeline() {
  const profileCardRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [revealedItems, setRevealedItems] = useState<Record<string, boolean>>({});

  const timelineData: TimelineItemData[] = [
    {
      id: 'gcp-engineer',
      type: 'certification',
      date: 'Aug – Sep 2023',
      title: 'GCP Associate Cloud Engineer Track',
      subtitle: 'Google Cloud Platform (GCP) Certification',
      description: 'Acquired core competencies in deploying and monitoring cloud-native web applications, managing VPC networks, and configuring GKE clusters and IAM access control.',
      skills: ['GCP', 'GKE', 'VPC Routing', 'Cloud Storage', 'IAM Roles'],
      icon: CloudLightning,
      accentColor: 'var(--color-purple)'
    },
    {
      id: 'road-incident',
      type: 'project',
      date: 'Jun 2023 – Apr 2024',
      title: 'Intelligent Road Incident Detection System',
      subtitle: 'Deep Learning Computer Vision Project',
      description: 'Engineered a real-time YOLO v8 and OpenCV pipeline capable of detecting accidents, vehicle breakdowns, and fire hazards in live video feeds with 96% accuracy. Designed for ultra-low latency streams.',
      skills: ['YOLO v8', 'OpenCV', 'PyTorch', 'Streamlit', 'Python'],
      image: roadImg,
      github: 'https://github.com/NameetAhire/yolov8-streamlit-project',
      icon: BrainCircuit,
      accentColor: 'var(--color-cyan)'
    },
    {
      id: 'gcp-analyst',
      type: 'certification',
      date: 'Mar – Apr 2024',
      title: 'GCP Data Analyst Track',
      subtitle: 'Google Cloud Platform (GCP) Certification',
      description: 'Mastered data analytics workflows including querying petabyte-scale datasets in BigQuery, orchestrating pipelines via Dataflow, and building data intelligence dashboards in Looker.',
      skills: ['BigQuery', 'SQL Analytics', 'Looker', 'Dataflow', 'Dataproc'],
      icon: Database,
      accentColor: 'var(--color-purple)'
    },
    {
      id: 'be-grad',
      type: 'education',
      date: 'July 2024',
      title: 'B.E. Computer Engineering',
      subtitle: 'MCT Rajiv Gandhi Institute of Technology',
      description: 'Graduated with a CGPA of 8.82/10. Formed a rigorous foundation in algorithms design, database management systems, networking, and software engineering methodologies.',
      skills: ['Data Structures', 'Database Systems', 'Network Routing', 'Software Engineering'],
      icon: BookOpen,
      accentColor: 'var(--color-teal)'
    },
    {
      id: 'securecheck',
      type: 'project',
      date: 'Jan – Feb 2026',
      title: 'SecureCheck - Dark Web Threat Intelligence Engine',
      subtitle: 'Cybersecurity Data Scan Platform',
      description: 'Developed an event-driven credential threat engine that searches through millions of compromised breach logs using Pandas and notifies users in real time. Designed a reactive dashboard for severity insights.',
      skills: ['Python', 'Flask', 'Pandas', 'JWT Auth', 'REST APIs', 'Cyber Security'],
      image: threatImg,
      github: 'https://github.com/NameetAhire/SecureCheck',
      icon: ShieldAlert,
      accentColor: 'var(--color-cyan)'
    },
    {
      id: 'aws-badges',
      type: 'certification',
      date: 'Apr – May 2026',
      title: 'AWS Cloud Badges Suite',
      subtitle: 'Amazon Web Services (AWS) Credentials',
      description: 'Successfully obtained multiple AWS badges validating architectural proficiency: Cloud CI/CD Pipelines (CodePipeline, CodeBuild), Cloud Architecture best practices, and Cloud Foundations.',
      skills: ['AWS CodePipeline', 'AWS EC2/RDS', 'CloudFormation', 'Serverless'],
      icon: Server,
      accentColor: 'var(--color-teal)'
    },
    {
      id: 'lms-platform',
      type: 'project',
      date: 'Apr – May 2026',
      title: 'Cloud-Native Learning Management System',
      subtitle: 'Containerized Microservices LMS',
      description: 'Designed and deployed a containerized full-stack LMS utilizing Express.js microservices isolated with Docker Compose. Deployed to AWS EC2 with assets served securely via AWS S3.',
      skills: ['Express.js', 'React.js', 'Docker', 'AWS EC2', 'AWS S3', 'MongoDB'],
      image: lmsImg,
      github: 'https://github.com/NameetAhire/lms-project',
      icon: CloudLightning,
      accentColor: 'var(--color-purple)'
    },
    {
      id: 'mtech-spit',
      type: 'education',
      date: 'Present',
      title: 'M.Tech Computer Engineering',
      subtitle: 'Sardar Patel Institute of Technology (SPIT)',
      description: 'Pursuing M.Tech degree with a current CGPA of 9.55/10. Specialized in advanced deep learning architectures, cloud computing platforms, and distributed microservices architectures.',
      skills: ['Deep Learning', 'Distributed Architectures', 'Cloud Infrastructures', 'Research Seminars'],
      icon: GraduationCap,
      accentColor: 'var(--color-cyan)'
    }
  ];

  useEffect(() => {
    // 1. Profile card fade-in animation
    if (profileCardRef.current) {
      animate(profileCardRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 200,
      });
    }

    // 2. Intersection Observer to trigger scroll-reveal on timeline items
    const observerOptions = {
      root: null,
      rootMargin: '0px -50px -100px -50px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const itemId = entry.target.getAttribute('data-id');
          if (itemId) {
            setRevealedItems(prev => ({ ...prev, [itemId]: true }));
            
            // Anime.js target animation on entry
            const cardElement = entry.target.querySelector('.timeline-card');
            const nodeElement = entry.target.querySelector('.journey-node');
            
            if (cardElement) {
              animate(cardElement, {
                opacity: [0, 1],
                translateX: cardElement.classList.contains('left-card') ? [-40, 0] : [40, 0],
                translateY: [20, 0],
                duration: 850,
                easing: 'easeOutExpo'
              });
            }
            if (nodeElement) {
              animate(nodeElement, {
                scale: [0, 1],
                duration: 500,
                easing: 'easeOutBack'
              });
            }
            
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    const timelineItems = document.querySelectorAll('.timeline-item-container');
    timelineItems.forEach(item => observer.observe(item));

    return () => {
      timelineItems.forEach(item => observer.unobserve(item));
    };
  }, []);

  return (
    <section className="section" id="journey" style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.sectionTitle} className="text-gradient-cyan-purple">
          MISSION_LOG_JOURNEY
        </h2>
        <p style={styles.headerSubtitle}>
          Navigating through the milestones, deployments, and academic achievements.
        </p>
        <div style={styles.subtitleLine}></div>
      </div>

      {/* Profile HUD Card */}
      <div 
        ref={profileCardRef} 
        style={styles.profileCard} 
        className="glass-panel profile-hud-card"
      >
        <div style={styles.profileLayout}>
          <div style={styles.imageCol}>
            <div style={styles.profileImageContainer}>
              <img 
                src={profileImg} 
                alt="Nameet Ahire" 
                style={styles.profileImg} 
              />
              <div style={styles.profileImgScanner} className="scanner-line"></div>
            </div>
            <div style={styles.statusIndicator}>
              <span className="pulse-dot"></span>
              <span style={styles.statusText}>PILOT_STATUS: READY_TO_DEPLOY</span>
            </div>
          </div>
          
          <div style={styles.profileInfoCol}>
            <h3 style={styles.profileName}>NAMEET AHIRE</h3>
            <h4 style={styles.profileTitle} className="text-gradient-cyan-purple">
              SYSTEM ARCHITECT & AI RESEARCHER
            </h4>
            
            <p style={styles.profileBio}>
              Highly analytical Computer Engineering graduate student combining AI/ML vision pipelines with secure, containerized cloud infrastructure. Experienced in building responsive full-stack dashboards, deploying deep learning models, and configuring automated CI/CD pipelines.
            </p>

            <div style={styles.statsRow}>
              <div style={styles.statItem}>
                <span style={styles.statVal} className="text-gradient-cyan-purple">9.55</span>
                <span style={styles.statLabel}>M.Tech CGPA</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statVal} className="text-gradient-purple-teal">8.82</span>
                <span style={styles.statLabel}>B.E. CGPA</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statVal} className="text-gradient-cyan-purple">5+</span>
                <span style={styles.statLabel}>Cloud Badges</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Timeline Section */}
      <div ref={timelineRef} style={styles.timelineContainer}>
        {/* Glowing timeline track */}
        <div style={styles.timelineLine}></div>
        
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;
          const isItemRevealed = revealedItems[item.id];
          
          return (
            <div 
              key={item.id}
              data-id={item.id}
              className="timeline-item-container"
              style={{
                ...styles.timelineItem,
                flexDirection: isLeft ? 'row' as const : 'row-reverse' as const,
              }}
            >
              {/* Left/Right Card Container */}
              <div style={styles.cardCol}>
                <div 
                  className={`glass-panel timeline-card ${isLeft ? 'left-card' : 'right-card'}`}
                  style={{
                    ...styles.timelineCard,
                    opacity: isItemRevealed ? 1 : 0,
                    borderTop: `3px solid ${item.accentColor}`,
                  }}
                >
                  <div style={styles.cardMeta}>
                    <span style={styles.cardTypeBadge}>{item.type.toUpperCase()}</span>
                    <span style={styles.cardDate}>
                      <Calendar size={12} style={{ marginRight: '4px' }} />
                      {item.date}
                    </span>
                  </div>

                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <h4 style={{ ...styles.cardSubtitle, color: item.accentColor }}>{item.subtitle}</h4>
                  
                  {item.image && (
                    <div style={styles.imageWrapper} className="timeline-img-wrapper">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={styles.cardImg} 
                      />
                      <div style={styles.imgOverlay}>
                        {item.github && (
                          <a 
                            href={item.github} 
                            target="_blank" 
                            rel="noreferrer" 
                            style={styles.viewCodeBtn}
                            className="view-code-btn"
                          >
                            <Eye size={14} style={{ marginRight: '6px' }} />
                            PREVIEW_CODE
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  <p style={styles.cardDesc}>{item.description}</p>

                  <div style={styles.skillsContainer}>
                    {item.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        style={{
                          ...styles.skillTag,
                          borderColor: `${item.accentColor}33`,
                          color: 'var(--color-text-secondary)'
                        }}
                        className="timeline-skill-tag"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {item.github && (
                    <div style={styles.cardActionRow}>
                      <a 
                        href={item.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        style={styles.githubLink}
                        className="timeline-github-link"
                      >
                        <GithubIcon style={{ marginRight: '6px' }} />
                        GitHub Repository
                        <ExternalLink size={12} style={{ marginLeft: '6px' }} />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Central Timeline Node */}
              <div style={styles.nodeCol}>
                <div 
                  className="journey-node"
                  style={{
                    ...styles.nodeCircle,
                    boxShadow: `0 0 15px ${item.accentColor}`,
                    border: `2px solid ${item.accentColor}`,
                    opacity: isItemRevealed ? 1 : 0,
                    transform: isItemRevealed ? 'scale(1)' : 'scale(0)'
                  }}
                >
                  <item.icon size={15} color={item.accentColor} />
                </div>
              </div>

              {/* Space Filler to keep layout balanced */}
              <div style={styles.fillerCol}></div>
            </div>
          );
        })}
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
    marginBottom: '80px',
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
    maxWidth: '500px',
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
  profileCard: {
    maxWidth: '900px',
    margin: '0 auto 80px auto',
    padding: '40px',
    position: 'relative' as const,
  },
  profileLayout: {
    display: 'flex',
    gap: '40px',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  },
  imageCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '16px',
    flex: '1 1 200px',
  },
  profileImageContainer: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    position: 'relative' as const,
    overflow: 'hidden',
    border: '2px solid var(--color-cyan)',
    boxShadow: '0 0 25px var(--color-cyan-glow)',
  },
  profileImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  profileImgScanner: {
    position: 'absolute' as const,
    left: 0,
    width: '100%',
    height: '3px',
    backgroundColor: 'var(--color-cyan)',
    boxShadow: '0 0 8px var(--color-cyan)',
    animation: 'scanAnim 4s infinite ease-in-out',
  },
  statusIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 14px',
    borderRadius: '20px',
    backgroundColor: 'rgba(45, 212, 191, 0.05)',
    border: '1px solid rgba(45, 212, 191, 0.2)',
  },
  statusText: {
    fontFamily: 'var(--font-display)',
    fontSize: '9px',
    letterSpacing: '0.05em',
    color: 'var(--color-teal)',
    fontWeight: 600,
  },
  profileInfoCol: {
    flex: '2 1 450px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '14px',
  },
  profileName: {
    fontSize: '28px',
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.05em',
    color: 'var(--color-text-primary)',
  },
  profileTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '14px',
    letterSpacing: '0.1em',
    fontWeight: 600,
    marginTop: '-8px',
  },
  profileBio: {
    color: 'var(--color-text-secondary)',
    fontSize: '14.5px',
    lineHeight: 1.6,
  },
  statsRow: {
    display: 'flex',
    gap: '24px',
    marginTop: '10px',
    paddingTop: '20px',
    borderTop: '1px solid var(--border-glass)',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  statVal: {
    fontSize: '24px',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
  },
  statLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase' as const,
  },
  timelineContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
    position: 'relative' as const,
  },
  timelineLine: {
    position: 'absolute' as const,
    left: '50%',
    top: 0,
    bottom: 0,
    width: '2px',
    background: 'linear-gradient(to bottom, var(--color-cyan) 0%, var(--color-purple) 50%, var(--color-teal) 100%)',
    transform: 'translateX(-50%)',
    zIndex: 1,
    boxShadow: '0 0 10px rgba(34, 211, 238, 0.15)',
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '60px',
    width: '100%',
    position: 'relative' as const,
  },
  cardCol: {
    width: '46%',
    zIndex: 5,
  },
  timelineCard: {
    padding: '28px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  },
  cardMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
  },
  cardTypeBadge: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '9px',
    letterSpacing: '0.1em',
    color: 'var(--color-text-primary)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid var(--border-glass)',
    padding: '3px 8px',
    borderRadius: '4px',
  },
  cardDate: {
    color: 'var(--color-text-muted)',
    display: 'flex',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    lineHeight: 1.3,
  },
  cardSubtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 500,
    marginTop: '-8px',
  },
  imageWrapper: {
    width: '100%',
    height: '180px',
    borderRadius: '8px',
    position: 'relative' as const,
    overflow: 'hidden',
    border: '1px solid var(--border-glass)',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    transition: 'transform 0.5s ease',
  },
  imgOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(10, 11, 16, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none' as const,
  },
  viewCodeBtn: {
    padding: '8px 16px',
    fontSize: '11px',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: '#0a0b10',
    backgroundColor: 'var(--color-cyan)',
    borderRadius: '20px',
    textDecoration: 'none',
    boxShadow: '0 0 15px var(--color-cyan-glow)',
    transform: 'translateY(10px)',
    transition: 'all 0.3s ease',
    pointerEvents: 'auto' as const,
  },
  cardDesc: {
    fontSize: '13.5px',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.5,
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px',
  },
  skillTag: {
    fontSize: '11px',
    padding: '4px 10px',
    borderRadius: '6px',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid',
  },
  cardActionRow: {
    display: 'flex',
    marginTop: '4px',
  },
  githubLink: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: 'var(--font-display)',
    color: 'var(--color-text-primary)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  nodeCol: {
    width: '8%',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 5,
  },
  nodeCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#0a0b10',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  fillerCol: {
    width: '46%',
  },
};

// Injection of extra timeline CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes scanAnim {
      0% { top: 0%; }
      50% { top: 100%; }
      100% { top: 0%; }
    }
    .pulse-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--color-teal);
      margin-right: 4px;
      box-shadow: 0 0 8px var(--color-teal);
      animation: pulseGlow 1.5s infinite ease-in-out;
    }
    .profile-hud-card {
      border: 1px solid var(--border-neon) !important;
      box-shadow: 0 0 20px rgba(34, 211, 238, 0.05) !important;
    }
    .profile-hud-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;
      border-left: 2px solid var(--color-cyan);
      border-top: 2px solid var(--color-cyan);
    }
    .profile-hud-card::before {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-right: 2px solid var(--color-cyan);
      border-bottom: 2px solid var(--color-cyan);
    }
    .timeline-card:hover {
      transform: translateY(-6px) scale(1.02) !important;
      border-color: var(--color-cyan-glow) !important;
      box-shadow: 0 12px 30px rgba(34, 211, 238, 0.08) !important;
    }
    .timeline-img-wrapper:hover .cardImg {
      transform: scale(1.08);
    }
    .timeline-img-wrapper:hover .imgOverlay {
      opacity: 1;
    }
    .timeline-img-wrapper:hover .view-code-btn {
      transform: translateY(0);
    }
    .view-code-btn:hover {
      background-color: var(--color-purple) !important;
      color: #0a0b10 !important;
      box-shadow: 0 0 15px var(--color-purple-glow) !important;
    }
    .timeline-github-link:hover {
      color: var(--color-cyan) !important;
    }
    .timeline-skill-tag:hover {
      background-color: rgba(255, 255, 255, 0.06) !important;
      color: var(--color-text-primary) !important;
      border-color: var(--color-cyan) !important;
    }
    @media (max-width: 900px) {
      .profile-layout {
        flex-direction: column;
        text-align: center;
      }
      .profile-image-container {
        width: 150px;
        height: 150px;
      }
      .stats-row {
        justify-content: center;
      }
      .timeline-container::before {
        left: 20px;
      }
      .timeline-item {
        flex-direction: row-reverse !important;
        margin-bottom: 40px;
      }
      .cardCol {
        width: 85% !important;
      }
      .nodeCol {
        width: 15% !important;
        justify-content: flex-start !important;
        padding-left: 5px;
      }
      .fillerCol {
        display: none !important;
      }
      .timeline-line {
        left: 20px !important;
      }
      .journey-node {
        transform: scale(0.8) !important;
      }
    }
  `;
  document.head.appendChild(style);
}
