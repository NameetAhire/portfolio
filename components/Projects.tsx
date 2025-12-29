import React, { useEffect, useState } from 'react';
import anime from 'animejs';
import { PROJECTS } from '../constants';
import { Folder, ArrowUpRight } from 'lucide-react';

const Projects: React.FC = () => {
  // Track failed images to show fallback
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    anime({
      targets: '.project-card',
      translateY: [100, 0],
      opacity: [0, 1],
      delay: anime.stagger(150),
      easing: 'easeOutExpo',
      duration: 800
    });
  }, []);

  const handleImageError = (id: string) => {
    setFailedImages(prev => new Set(prev).add(id));
  };

  return (
    <section className="min-h-screen py-12 px-6 animate-fade-in">
      <div className="container mx-auto">
        <div className="flex flex-col items-start mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <span className="text-primary">/</span> Projects
            </h2>
            <p className="text-slate-400 max-w-2xl">
              A collection of my work in machine learning, web development, and cloud computing.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {PROJECTS.map((project) => (
            <div 
              key={project.id} 
              className="project-card opacity-0 group bg-card rounded-2xl overflow-hidden border border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <a 
                    href={project.link || "#"}
                    target={project.link ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className={`absolute inset-0 bg-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center ${project.link ? 'cursor-pointer' : 'cursor-default'}`}
                    onClick={(e) => !project.link && e.preventDefault()}
                >
                    <span className="bg-darker/80 text-white px-4 py-2 rounded-full text-sm font-mono flex items-center gap-2 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-white hover:text-darker">
                        {project.link ? "View Repository" : "View Project"} <ArrowUpRight className="w-4 h-4" />
                    </span>
                </a>
                
                {project.image && !failedImages.has(project.id) ? (
                   <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={() => handleImageError(project.id)}
                   />
                ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                        <Folder className="w-12 h-12 text-slate-600" />
                    </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                        {project.title}
                    </h3>
                </div>
                
                <p className="text-xs font-mono text-secondary mb-4 bg-secondary/10 inline-block px-2 py-1 rounded w-fit">
                    {project.period}
                </p>
                
                <div className="space-y-2 mb-6 text-slate-400 text-sm leading-relaxed flex-1">
                  {project.description.slice(0, 2).map((desc, i) => (
                    <p key={i} className="line-clamp-2">• {desc}</p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-800/50">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="text-[10px] font-mono uppercase tracking-wider text-slate-300 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                      <span className="text-[10px] font-mono text-slate-500 px-2 py-1">+more</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;