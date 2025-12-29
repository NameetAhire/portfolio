import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';
import { Mail, Phone, MapPin, Linkedin, Github, Send, Loader2, CheckCircle, Terminal, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email before submitting
    if (!validateEmail(formState.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Construct the mailto link
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formState.subject}`);
    const body = encodeURIComponent(
`Name: ${formState.name}
Email: ${formState.email}

Message:
${formState.message}`
    );

    const mailtoLink = `mailto:nameet.7800@gmail.com?subject=${subject}&body=${body}`;

    // Simulate processing animation before opening mail client
    setTimeout(() => {
      window.location.href = mailtoLink;
      
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setEmailError('');
      
      // Reset success message after a few seconds
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });

    // Clear error if user fixes it
    if (e.target.name === 'email' && emailError) {
        if (validateEmail(e.target.value)) {
            setEmailError('');
        }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
        if (e.target.value && !validateEmail(e.target.value)) {
            setEmailError('Invalid email format provided.');
        }
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] py-12 px-6 animate-fade-in">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="text-primary">/</span> Initiate Communication
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Ready to collaborate on the next big project? Send a transmission via the secure channel below or connect through social networks.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column: Contact Info & Socials */}
            <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-10 h-1 bg-primary rounded-full"></span>
                    Direct Channels
                </h3>

                <div className="space-y-4">
                    <div className="flex items-start gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-primary/50 transition-all group">
                        <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-slate-300 font-mono text-sm mb-1">EMAIL PROTOCOL</h4>
                            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white text-lg font-bold hover:text-primary transition-colors">
                                {PERSONAL_INFO.email}
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-primary/50 transition-all group">
                        <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-slate-300 font-mono text-sm mb-1">VOICE LINK</h4>
                            <span className="text-white text-lg font-bold">{PERSONAL_INFO.phone}</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-primary/50 transition-all group">
                        <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-slate-300 font-mono text-sm mb-1">BASE COORDINATES</h4>
                            <span className="text-white text-lg font-bold">{PERSONAL_INFO.location}</span>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800">
                    <h4 className="text-slate-400 font-mono text-sm mb-4">SOCIAL NETWORKS</h4>
                    <div className="flex gap-4">
                        <a 
                            href={PERSONAL_INFO.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-900 border border-slate-700 rounded-lg hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all group text-slate-300"
                        >
                            <Linkedin className="w-5 h-5" />
                            <span className="font-bold">LinkedIn</span>
                        </a>
                        <a 
                            href={PERSONAL_INFO.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-900 border border-slate-700 rounded-lg hover:bg-white hover:border-white hover:text-black transition-all group text-slate-300"
                        >
                            <Github className="w-5 h-5" />
                            <span className="font-bold">GitHub</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Right Column: Form */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl blur-xl -z-10"></div>
                <div className="bg-card border border-slate-800 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                    
                    {/* Decorative header */}
                    <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-primary" />
                            <span className="font-mono">MESSAGE_TRANSMITTER_V1</span>
                        </h3>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-xs font-mono text-slate-400 ml-1">USER_NAME</label>
                                <input 
                                    type="text" 
                                    id="name"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono text-sm"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-mono text-slate-400 ml-1">EMAIL_ADDRESS</label>
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        id="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        className={`w-full bg-slate-900/50 border rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all font-mono text-sm ${
                                            emailError 
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
                                            : 'border-slate-700 focus:border-primary focus:ring-primary/50'
                                        }`}
                                        placeholder="name@example.com"
                                    />
                                    {emailError && (
                                        <div className="absolute right-3 top-3 text-red-500 animate-pulse">
                                            <AlertCircle className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                                {emailError && (
                                    <p className="text-red-500 text-xs font-mono flex items-center gap-1 animate-fade-in">
                                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                        {emailError}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-xs font-mono text-slate-400 ml-1">SUBJECT_LINE</label>
                            <input 
                                type="text" 
                                id="subject"
                                name="subject"
                                value={formState.subject}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono text-sm"
                                placeholder="Project Proposal / Inquiry"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-xs font-mono text-slate-400 ml-1">MESSAGE_DATA</label>
                            <textarea 
                                id="message"
                                name="message"
                                value={formState.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono text-sm resize-none"
                                placeholder="Type your message system here..."
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting || isSent}
                            className={`w-full py-4 rounded-lg font-bold font-mono tracking-wide flex items-center justify-center gap-2 transition-all ${
                                isSent 
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                                    : 'bg-primary hover:bg-blue-600 text-white shadow-lg shadow-primary/25'
                            } ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    TRANSMITTING...
                                </>
                            ) : isSent ? (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    TRANSMISSION SUCCESSFUL
                                </>
                            ) : (
                                <>
                                    SEND TRANSMISSION <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <footer className="mt-20 text-center text-slate-600 text-sm font-mono border-t border-slate-800/50 pt-8">
          <p>© 2025 Nameet Ahire. System Online.</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;