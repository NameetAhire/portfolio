import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { PERSONAL_INFO } from '../constants';
import { Github, Linkedin, Mail, ChevronRight, Terminal, Cpu, Database, Code, Globe, Zap, ArrowDown, Folder, User, Send } from 'lucide-react';
import DecryptedText from './DecryptedText';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial entrance animation
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000
    });

    tl.add({
      targets: [titleRef.current, descRef.current],
      translateX: [-30, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
    }, '+=100')
    .add({
      targets: socialRef.current?.children,
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100)
    }, '-=600')
    .add({
      targets: imageRef.current,
      scale: [0.8, 1],
      opacity: [0, 1],
      rotate: ['-10deg', '0deg'],
    }, '-=800');

    // Continuous floating animation for image
    anime({
      targets: '.floating-image',
      translateY: [-15, 15],
      duration: 3000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    // Scroll down indicator animation
    anime({
        targets: '.scroll-indicator',
        translateY: [0, 10],
        opacity: [0.5, 1],
        duration: 1500,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutQuad'
    });

  }, []);

  // Tech Stack Ticker Items
  const techStack = ["PYTHON", "TENSORFLOW", "AWS", "REACT", "DOCKER", "KUBERNETES", "SQL", "OPENCV", "YOLO", "GIT", "LINUX"];

  return (
    <div className="animate-fade-in pb-20">
      {/* --- SECTION 1: HERO FOLD --- */}
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden px-6">
        
        {/* Dynamic Background Text Marquee */}
        <div className="absolute top-20 left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none z-0">
          <div className="whitespace-nowrap animate-marquee text-[12rem] font-black font-mono text-white">
            DEVELOPER ENGINEER CREATOR MACHINE_LEARNING CLOUD PYTHON 
          </div>
        </div>
        <div className="absolute bottom-20 left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none z-0">
          <div className="whitespace-nowrap animate-marquee text-[12rem] font-black font-mono text-white" style={{ animationDirection: 'reverse' }}>
            FULLSTACK SYSTEM_DESIGN INNOVATION DEEP_LEARNING AI 
          </div>
        </div>

        {/* HUD Decorative Elements */}
        <div className="absolute top-10 left-10 hidden md:block opacity-50">
          <div className="flex items-center gap-2 font-mono text-xs text-primary">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-fast"></div>
            SYSTEM ONLINE
          </div>
          <div className="w-32 h-px bg-gradient-to-r from-primary to-transparent mt-2"></div>
        </div>
        
        <div className="absolute bottom-10 right-10 hidden md:block opacity-50 font-mono text-xs text-slate-500 text-right">
           <p>COORDS: 47.21°N, 12.03°E</p>
           <p>SESSION_ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
        </div>

        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-4 md:p-8 z-0">
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-primary/30 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/30 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-primary/30 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary/30 rounded-br-lg"></div>
        </div>


        <div className="container mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 rounded-full bg-primary/5 backdrop-blur-sm">
               <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
               <h2 className="text-primary font-mono text-sm tracking-wide">Identity Verified</h2>
            </div>
            
            <div className="h-20 md:h-24 overflow-visible">
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                <DecryptedText text={PERSONAL_INFO.name} />
              </h1>
            </div>
            
            <div ref={titleRef} className="space-y-4 opacity-0">
               <p className="text-xl md:text-2xl text-slate-300 font-light border-l-4 border-primary pl-4">
                  {PERSONAL_INFO.title}
               </p>
               {/* Tech Stats Row */}
               <div className="flex flex-wrap gap-4 py-2">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded border border-slate-800 text-xs font-mono text-slate-300">
                      <Terminal size={14} className="text-primary" />
                      <span>ML & AI</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded border border-slate-800 text-xs font-mono text-slate-300">
                      <Cpu size={14} className="text-secondary" />
                      <span>Python Expert</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded border border-slate-800 text-xs font-mono text-slate-300">
                      <Database size={14} className="text-emerald-500" />
                      <span>Data Engineering</span>
                  </div>
               </div>
            </div>
            
            <p ref={descRef} className="text-slate-400 text-lg leading-relaxed max-w-lg opacity-0">
              {PERSONAL_INFO.about}
            </p>

            <div ref={socialRef} className="flex flex-col sm:flex-row gap-6 pt-4 opacity-0 items-start sm:items-center">
               <button 
                  onClick={() => onNavigate('projects')}
                  className="group relative px-6 py-3 bg-primary/10 text-primary border border-primary rounded hover:bg-primary hover:text-white transition-all duration-300 font-mono font-bold flex items-center gap-2 overflow-hidden"
               >
                  <span className="relative z-10 flex items-center gap-2">
                     Initialize Projects <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
               </button>

               <div className="flex gap-4">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" 
                     className="group p-3 bg-darker/50 border border-slate-700 rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-300">
                    <Github className="w-5 h-5 text-slate-300 group-hover:text-primary" />
                  </a>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" 
                     className="group p-3 bg-darker/50 border border-slate-700 rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-300">
                    <Linkedin className="w-5 h-5 text-slate-300 group-hover:text-primary" />
                  </a>
                  <a href={`mailto:${PERSONAL_INFO.email}`} 
                     className="group p-3 bg-darker/50 border border-slate-700 rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-300">
                    <Mail className="w-5 h-5 text-slate-300 group-hover:text-primary" />
                  </a>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div ref={imageRef} className="relative hidden lg:block perspective-1000 group opacity-0">
               {/* Spinning Orbit Ring */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-slate-700 rounded-full animate-spin-slow pointer-events-none"></div>
               
               <div className="floating-image relative z-10 w-80 h-80 mx-auto transform transition-transform duration-500 preserve-3d group-hover:rotate-y-12 group-hover:rotate-x-12">
                 <div className="absolute inset-0 border-2 border-primary/50 rounded-2xl transform translate-x-4 translate-y-4 -z-10 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6"></div>
                 <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-2xl transform -translate-x-4 -translate-y-4 opacity-20 blur-xl -z-20"></div>
                 
                 <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-card relative">
                    <img 
                      src={PERSONAL_INFO.avatar} 
                      alt={PERSONAL_INFO.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-darker/80 to-transparent"></div>
                    <div className="absolute top-2 right-2 flex gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                 </div>
              </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 scroll-indicator">
           <span className="text-[10px] font-mono tracking-widest text-primary">SCROLL TO EXPLORE</span>
           <ArrowDown className="w-4 h-4 text-primary" />
        </div>
      </section>

      {/* --- SECTION 2: TECH TICKER --- */}
      <div className="bg-slate-900/50 border-y border-slate-800 py-6 overflow-hidden relative z-20">
         <div className="flex gap-12 whitespace-nowrap animate-marquee items-center">
            {techStack.concat(techStack).map((tech, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-500 font-mono font-bold text-xl opacity-70 hover:opacity-100 hover:text-primary transition-colors">
                   <Zap size={16} className="text-secondary" />
                   {tech}
                </div>
            ))}
         </div>
      </div>

      {/* --- SECTION 3: SYSTEM CORE & NAVIGATION --- */}
      <section className="container mx-auto px-6 py-24">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Terminal Window */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                   <Terminal className="text-primary" />
                   System Log
                </h3>
                <div className="w-full bg-black/80 rounded-lg border border-slate-700 p-6 font-mono text-sm h-[300px] overflow-hidden relative shadow-2xl">
                    <div className="flex gap-2 mb-4 border-b border-slate-800 pb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="space-y-2 text-slate-300">
                       <TypewriterLog />
                    </div>
                    {/* Scanline overlay for terminal */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)50%,rgba(0,0,0,0.25)50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
                </div>
            </div>

            {/* Navigation Cards */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                   <Globe className="text-secondary" />
                   Navigation Matrix
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    
                    {/* Projects Card */}
                    <div 
                        onClick={() => onNavigate('projects')}
                        className="group relative h-24 bg-card border border-slate-800 rounded-lg p-6 flex items-center justify-between cursor-pointer overflow-hidden hover:border-primary/50 transition-all"
                    >
                        <div className="absolute inset-0 bg-primary/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                        <div className="relative z-10 flex items-center gap-4">
                           <div className="p-3 bg-slate-900 rounded border border-slate-700 group-hover:border-primary group-hover:text-primary transition-colors">
                              <Folder size={24} />
                           </div>
                           <div>
                              <h4 className="font-bold text-white text-lg">Project Archives</h4>
                              <p className="text-xs text-slate-500 font-mono">ACCESS SOURCE CODE & CASE STUDIES</p>
                           </div>
                        </div>
                        <ChevronRight className="text-slate-600 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                    </div>

                    {/* About Card */}
                    <div 
                        onClick={() => onNavigate('about')}
                        className="group relative h-24 bg-card border border-slate-800 rounded-lg p-6 flex items-center justify-between cursor-pointer overflow-hidden hover:border-secondary/50 transition-all"
                    >
                        <div className="absolute inset-0 bg-secondary/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                        <div className="relative z-10 flex items-center gap-4">
                           <div className="p-3 bg-slate-900 rounded border border-slate-700 group-hover:border-secondary group-hover:text-secondary transition-colors">
                              <User size={24} />
                           </div>
                           <div>
                              <h4 className="font-bold text-white text-lg">Profile Data</h4>
                              <p className="text-xs text-slate-500 font-mono">VIEW SKILLS & EXPERIENCE</p>
                           </div>
                        </div>
                        <ChevronRight className="text-slate-600 group-hover:text-secondary group-hover:translate-x-2 transition-all" />
                    </div>

                    {/* Contact Card */}
                    <div 
                        onClick={() => onNavigate('contact')}
                        className="group relative h-24 bg-card border border-slate-800 rounded-lg p-6 flex items-center justify-between cursor-pointer overflow-hidden hover:border-emerald-500/50 transition-all"
                    >
                        <div className="absolute inset-0 bg-emerald-500/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                        <div className="relative z-10 flex items-center gap-4">
                           <div className="p-3 bg-slate-900 rounded border border-slate-700 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors">
                              <Send size={24} />
                           </div>
                           <div>
                              <h4 className="font-bold text-white text-lg">Establish Link</h4>
                              <p className="text-xs text-slate-500 font-mono">INITIATE COMMUNICATION PROTOCOL</p>
                           </div>
                        </div>
                        <ChevronRight className="text-slate-600 group-hover:text-emerald-500 group-hover:translate-x-2 transition-all" />
                    </div>

                </div>
            </div>

         </div>
      </section>
    </div>
  );
};

// Logs moved outside to prevent re-creation
const SYSTEM_LOGS = [
    "> Initializing system core...",
    "> Loading user profile: Nameet Ahire",
    "> Fetching repositories from GitHub...",
    "> Analyzing technical stack...",
    "> Python: DETECTED",
    "> Cloud Infrastructure: ONLINE",
    "> Machine Learning Models: READY",
    "> Establishing secure connection...",
    "> Welcome, User. System is ready for interaction."
];

// Sub-component for typing log effect
const TypewriterLog: React.FC = () => {
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < SYSTEM_LOGS.length) {
                setLines(prev => {
                    const newLine = SYSTEM_LOGS[currentIndex];
                    // Ensure we don't add undefined
                    if (newLine) {
                        return [...prev, newLine];
                    }
                    return prev;
                });
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {lines.map((line, i) => (
                <div key={i} className={`${line?.includes("SUCCESS") ? "text-green-400" : "text-slate-300"}`}>
                    {line}
                </div>
            ))}
            <div className="animate-pulse text-primary">_</div>
        </>
    );
};

export default Hero;