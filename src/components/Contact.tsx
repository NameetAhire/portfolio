import { useState, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Send, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    width="20" 
    height="20" 
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

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    width="20" 
    height="20" 
    stroke="currentColor" 
    strokeWidth="2" 
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

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'Job Opportunity',
    customSubject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSimulated, setIsSimulated] = useState(false);

  const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID;
  const isDemoMode = !web3formsKey && !formspreeId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.subject === 'Other' && !formData.customSubject.trim()) {
      setError('Please specify your custom subject.');
      return;
    }

    setIsSubmitting(true);

    const triggerSuccessAnimation = (simulated: boolean) => {
      setIsSubmitting(false);
      setIsSimulated(simulated);

      // AnimeJS transition animation to success screen
      if (formRef.current && successRef.current) {
        animate(formRef.current, {
          opacity: [1, 0],
          translateY: [0, -20],
          duration: 400,
          easing: 'easeOutQuad',
          complete: () => {
            if (formRef.current) formRef.current.style.display = 'none';
            if (successRef.current) {
              successRef.current.style.display = 'flex';
              animate(successRef.current.children, {
                opacity: [0, 1],
                translateY: [20, 0],
                delay: stagger(150),
                duration: 600,
                easing: 'easeOutExpo',
              });
            }
          }
        });
      }
    };

    if (isDemoMode) {
      // Mock API call in demo mode
      setTimeout(() => {
        triggerSuccessAnimation(true);
      }, 1500);
      return;
    }

    const finalSubject = formData.subject === 'Other' 
      ? formData.customSubject 
      : formData.subject;

    try {
      if (web3formsKey) {
        // Web3Forms submission
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: formData.name,
            email: formData.email,
            company: formData.company || 'N/A',
            message: formData.message,
            subject: `[Portfolio] ${finalSubject} - ${formData.name}`,
            from_name: 'Nameet Portfolio',
          }),
        });

        const data = await response.json();
        if (data.success) {
          triggerSuccessAnimation(false);
        } else {
          throw new Error(data.message || 'Routing rejected by Web3Forms.');
        }
      } else if (formspreeId) {
        // Formspree submission
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company || 'N/A',
            subject: finalSubject,
            message: formData.message,
          }),
        });

        if (response.ok) {
          triggerSuccessAnimation(false);
        } else {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || 'Routing failed at Formspree endpoint.');
        }
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setError(err?.message || 'Transmission disrupted. Please check your network connection.');
    }
  };

  return (
    <section className="section" id="contact" style={{ minHeight: 'auto', paddingBottom: '120px' }}>
      <div style={styles.header}>
        <h2 style={styles.sectionTitle} className="text-gradient-cyan-purple">
          CONNECT_NODE
        </h2>
        <div style={styles.subtitleLine}></div>
      </div>

      <div style={styles.grid} className="grid">
        {/* Info Box */}
        <div style={styles.infoBox} className="glass-panel">
          <h3 style={styles.infoTitle}>Contact Details</h3>
          <p style={styles.infoDesc}>
            Feel free to reach out for research collaborations, engineering opportunities, or general queries. System status: Online.
          </p>

          <div style={styles.detailsList}>
            <div style={styles.detailItem}>
              <Mail size={18} color="var(--color-cyan)" />
              <a href="mailto:nameet.7800@gmail.com" style={styles.detailLink}>
                nameet.7800@gmail.com
              </a>
            </div>

            <div style={styles.detailItem}>
              <Phone size={18} color="var(--color-cyan)" />
              <a href="tel:+919689217478" style={styles.detailLink}>
                +91 9689217478
              </a>
            </div>

            <div style={styles.detailItem}>
              <MapPin size={18} color="var(--color-cyan)" />
              <span style={styles.detailText}>Mumbai, India</span>
            </div>
          </div>

          <div style={styles.socialRow}>
            <a 
              href="https://github.com/NameetAhire" 
              target="_blank" 
              rel="noreferrer" 
              style={styles.socialLink}
              className="social-btn"
              title="GitHub Profile"
            >
              <GithubIcon />
            </a>
            <a 
              href="https://linkedin.com/in/nameet-ahire" 
              target="_blank" 
              rel="noreferrer" 
              style={styles.socialLink}
              className="social-btn"
              title="LinkedIn Profile"
            >
              <LinkedinIcon />
            </a>
          </div>
        </div>

        {/* Form Box */}
        <div style={styles.formBox} className="glass-panel">
          {/* Main Form */}
          <form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
            {isDemoMode && (
              <div style={styles.noticeBox}>
                <span style={styles.noticeTitle}>[SYSTEM_NOTICE: DEMO_MODE]</span>
                <p style={styles.noticeDesc}>
                  Submissions are currently simulated. To enable real email delivery, configure your <code>VITE_WEB3FORMS_ACCESS_KEY</code> in the <code>.env</code> file.
                </p>
              </div>
            )}
            <div style={styles.inputGroup}>
              <label style={styles.label}>IDENTIFIER (NAME)</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                style={styles.input}
                disabled={isSubmitting}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>ENDPOINT (EMAIL)</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john@example.com"
                style={styles.input}
                disabled={isSubmitting}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>ORGANIZATION (COMPANY / UNIVERSITY)</label>
              <input 
                type="text" 
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. SPIT, Mumbai (Optional)"
                style={styles.input}
                disabled={isSubmitting}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>TRANSMISSION_PURPOSE (SUBJECT)</label>
              <select 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                style={styles.select}
                disabled={isSubmitting}
              >
                <option value="Job Opportunity">Job / Career Opportunity</option>
                <option value="Research Collaboration">Research Collaboration</option>
                <option value="Freelance / Contract">Freelance / Contract Project</option>
                <option value="Other">Other / Custom Inquiry</option>
              </select>
            </div>

            {formData.subject === 'Other' && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>SPECIFY PURPOSE (CUSTOM SUBJECT)</label>
                <input 
                  type="text" 
                  name="customSubject"
                  value={formData.customSubject}
                  onChange={handleChange}
                  placeholder="e.g. Thesis Collaboration Request"
                  style={styles.input}
                  disabled={isSubmitting}
                />
              </div>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>PAYLOAD (MESSAGE)</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your transmission here..."
                style={styles.textarea}
                rows={5}
                disabled={isSubmitting}
              />
            </div>

            {error && <div style={styles.errorText}>{error}</div>}

            <button 
              type="submit" 
              style={{
                ...styles.submitBtn,
                opacity: isSubmitting ? 0.6 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
              <Send size={14} style={{ marginLeft: '8px' }} />
            </button>
          </form>

          {/* Success Screen */}
          <div 
            ref={successRef} 
            style={{ ...styles.successContainer, display: 'none' }}
          >
            <CheckCircle2 size={56} color="var(--color-teal)" style={{ marginBottom: '16px' }} />
            <h4 style={styles.successTitle}>TRANSMISSION_COMPLETE</h4>
            <p style={styles.successDesc}>
              {isSimulated ? (
                <>
                  [DEMO_MODE] Your mock transmission completed successfully. Add your access key to <code>.env</code> for real email routing.
                </>
              ) : (
                <>
                  Your message was routed successfully. System response status: <strong>200 OK</strong>.
                </>
              )}
            </p>
            <button 
              onClick={() => {
                setFormData({
                  name: '',
                  email: '',
                  company: '',
                  subject: 'Job Opportunity',
                  customSubject: '',
                  message: ''
                });
                if (formRef.current) formRef.current.style.display = 'flex';
                if (successRef.current) successRef.current.style.display = 'none';
                animate(formRef.current!, {
                  opacity: [0, 1],
                  translateY: [-10, 0],
                  duration: 400,
                  easing: 'easeOutQuad',
                });
              }}
              style={styles.resetBtn}
              className="reset-btn"
            >
              Send Another
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  header: {
    marginBottom: '60px',
    textAlign: 'center' as const,
  },
  sectionTitle: {
    fontSize: '32px',
    letterSpacing: '0.1em',
    marginBottom: '8px',
  },
  subtitleLine: {
    width: '60px',
    height: '4px',
    background: 'linear-gradient(90deg, var(--color-cyan), var(--color-purple))',
    margin: '0 auto',
    borderRadius: '2px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.3fr',
    gap: '30px',
  },
  infoBox: {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
  },
  infoTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '20px',
    letterSpacing: '0.05em',
  },
  infoDesc: {
    fontSize: '14.5px',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
  },
  detailsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    marginTop: '10px',
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    fontSize: '14.5px',
  },
  detailLink: {
    color: 'var(--color-text-secondary)',
    textDecoration: 'none',
    transition: 'var(--transition-fast)',
  },
  detailText: {
    color: 'var(--color-text-secondary)',
  },
  socialRow: {
    display: 'flex',
    gap: '12px',
    marginTop: 'auto',
  },
  socialLink: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-secondary)',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--border-glass)',
    transition: 'all 0.3s ease',
  },
  formBox: {
    padding: '40px',
    position: 'relative' as const,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    width: '100%',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  label: {
    fontFamily: 'var(--font-display)',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    color: 'var(--color-text-secondary)',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-glass)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14.5px',
    outline: 'none',
    transition: 'var(--transition-fast)',
  },
  select: {
    padding: '12px 16px',
    borderRadius: '8px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-glass)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14.5px',
    outline: 'none',
    transition: 'var(--transition-fast)',
    cursor: 'pointer',
  },
  textarea: {
    padding: '12px 16px',
    borderRadius: '8px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-glass)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14.5px',
    outline: 'none',
    resize: 'none' as const,
    transition: 'var(--transition-fast)',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '13px',
    fontWeight: 500,
  },
  submitBtn: {
    padding: '14px 24px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, var(--color-cyan) 0%, var(--color-purple) 100%)',
    border: 'none',
    color: '#0a0b10',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    letterSpacing: '0.05em',
    fontSize: '13px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(34, 211, 238, 0.2)',
  },
  successContainer: {
    display: 'none',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    minHeight: '280px',
  },
  successTitle: {
    fontSize: '20px',
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.05em',
    marginBottom: '8px',
    color: 'var(--color-text-primary)',
  },
  successDesc: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    maxWidth: '300px',
    lineHeight: 1.5,
    marginBottom: '24px',
  },
  resetBtn: {
    padding: '10px 20px',
    borderRadius: '30px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-glass)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-display)',
    fontSize: '11px',
    letterSpacing: '0.05em',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  },
  noticeBox: {
    padding: '14px 18px',
    borderRadius: '8px',
    background: 'rgba(245, 158, 11, 0.05)',
    border: '1px dashed rgba(245, 158, 11, 0.3)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    marginBottom: '10px',
    textAlign: 'left' as const,
  },
  noticeTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: 'var(--color-amber)',
  },
  noticeDesc: {
    fontSize: '12.5px',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.45,
    margin: 0,
  },
};

// CSS inputs focus styling injection
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    .detailLink:hover {
      color: var(--color-cyan) !important;
      text-shadow: 0 0 5px var(--color-cyan-glow);
    }
    .social-btn:hover {
      color: var(--color-cyan) !important;
      border-color: var(--color-cyan) !important;
      transform: translateY(-3px);
      box-shadow: 0 0 10px var(--color-cyan-glow);
    }
    input:focus, textarea:focus, select:focus {
      border-color: var(--color-cyan) !important;
      box-shadow: 0 0 10px rgba(34, 211, 238, 0.15);
    }
    [data-theme="dark"] select option {
      background-color: #0e1017 !important;
      color: #f0f2ff !important;
    }
    [data-theme="light"] select option {
      background-color: #f0f2ff !important;
      color: #0f1033 !important;
    }
    .submit-btn:hover {
      box-shadow: 0 4px 20px rgba(34, 211, 238, 0.4), 0 0 10px rgba(192, 132, 252, 0.4);
      transform: translateY(-2px);
    }
    .reset-btn:hover {
      background: var(--color-cyan) !important;
      color: #0a0b10 !important;
      border-color: var(--color-cyan) !important;
    }
    @media (max-width: 900px) {
      #contact .grid {
        grid-template-columns: 1fr !important;
      }
      .glass-panel {
        padding: 20px !important;
      }
    }
    @media (max-width: 500px) {
      .glass-panel {
        padding: 16px !important;
      }
    }
  `;
  document.head.appendChild(style);
}
