import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { SKILLS } from '../constants';
import { Code, Cpu, Cloud, Terminal, Database, Wrench, Zap } from 'lucide-react';

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered entrance animation for cards
    anime({
      targets: '.skill-card',
      translateY: [30, 0],
      scale: [0.95, 1],
      opacity: [0, 1],
      delay: anime.stagger(150),
      easing: 'easeOutExpo',
      duration: 1000
    });

    // Subtle floating animation for the badges inside
    anime({
      targets: '.skill-badge',
      translateY: [-2, 2],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      delay: anime.stagger(50, { from: 'center' }),
      duration: 3000
    });
  }, []);

  const getIcon = (categoryName: string) => {
    switch (categoryName) {
      case "Programming & Web": return <Code className="w-6 h-6 text-primary" />;
      case "Machine Learning": return <Cpu className="w-6 h-6 text-secondary" />;
      case "Cloud & DevOps": return <Cloud className="w-6 h-6 text-emerald-400" />;
      case "Tools": return <Wrench className="w-6 h-6 text-amber-400" />;
      default: return <Terminal className="w-6 h-6 text-slate-400" />;
    }
  };

  const getColor = (categoryName: string) => {
    switch (categoryName) {
      case "Programming & Web": return "group-hover:border-primary/50 group-hover:shadow-primary/20";
      case "Machine Learning": return "group-hover:border-secondary/50 group-hover:shadow-secondary/20";
      case "Cloud & DevOps": return "group-hover:border-emerald-400/50 group-hover:shadow-emerald-400/20";
      default: return "group-hover:border-amber-400/50 group-hover:shadow-amber-400/20";
    }
  };

  return (
    <section className="px-6 py-8" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-10">
            <h3 className="text-2xl font-bold text-white border-l-4 border-primary pl-4">
            Technical Arsenal
            </h3>
            <div className="h-px flex-grow bg-slate-800/50 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary/50 rounded-full animate-pulse"></div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map((category, idx) => (
            <div 
                key={idx} 
                className={`skill-card opacity-0 group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${getColor(category.name)}`}
            >
              {/* Decorative Scanline */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent translate-y-[-100%] group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {getIcon(category.name)}
                </div>
                <h3 className="text-xl font-bold text-slate-200 font-mono tracking-wide">
                    {category.name}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="flex flex-wrap gap-3 relative z-10">
                {category.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="skill-badge px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded flex items-center gap-2 text-sm text-slate-300 font-mono transition-all duration-300 hover:bg-slate-700 hover:text-white hover:border-slate-500 cursor-default"
                  >
                    <Zap className="w-3 h-3 text-slate-600 group-hover:text-primary transition-colors" />
                    {skill}
                  </div>
                ))}
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 border-t border-r border-slate-500"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 border-b border-l border-slate-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
};

export default Skills;