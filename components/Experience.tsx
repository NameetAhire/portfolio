import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from '../constants';
import { Briefcase, GraduationCap, Award, ExternalLink } from 'lucide-react';

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    anime({
      targets: '.timeline-item',
      translateX: [-50, 0],
      opacity: [0, 1],
      delay: anime.stagger(200),
      easing: 'easeOutExpo'
    });
  }, []);

  return (
    <section className="px-6" ref={containerRef}>
      <div className="container mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience Column */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 border-l-4 border-primary pl-4">
               Experience
            </h3>
            <div className="relative border-l-2 border-slate-800 ml-3 space-y-12">
              {EXPERIENCE.map((exp) => (
                <div key={exp.id} className="timeline-item opacity-0 relative pl-8">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-dark"></div>
                  <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                  <p className="text-primary font-mono text-sm mb-2">{exp.company} | {exp.period}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-white mt-16 mb-8 flex items-center gap-3 border-l-4 border-secondary pl-4">
               Certifications
            </h3>
            <div className="relative border-l-2 border-slate-800 ml-3 space-y-12">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="timeline-item opacity-0 relative pl-8">
                   <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-secondary border-4 border-dark"></div>
                   <h4 className="text-lg font-bold text-white flex items-center gap-2">
                     {cert.name}
                     {cert.link && cert.link !== '#' && (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-secondary transition-colors">
                           <ExternalLink size={16} />
                        </a>
                     )}
                   </h4>
                   <p className="text-secondary text-sm mb-1">{cert.issuer}</p>
                   <div className="flex items-center gap-4">
                     <p className="text-slate-500 text-xs font-mono">{cert.period}</p>
                     {cert.link && (
                         <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-xs text-secondary hover:underline flex items-center gap-1">
                            View Credential <ExternalLink size={10} />
                         </a>
                     )}
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
             <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 border-l-4 border-white pl-4">
               Education
            </h3>
            <div className="relative border-l-2 border-slate-800 ml-3 space-y-12">
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="timeline-item opacity-0 relative pl-8">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-dark"></div>
                  <h4 className="text-xl font-bold text-white">{edu.institution}</h4>
                  <p className="text-primary text-sm mb-2">{edu.degree}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-xs font-mono">{edu.period}</span>
                    {edu.grade && (
                       <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded">{edu.grade}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default Experience;