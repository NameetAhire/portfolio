import React from 'react';
import Skills from './Skills';
import Experience from './Experience';

const About: React.FC = () => {
  return (
    <div className="min-h-screen animate-fade-in pb-20">
      <div className="container mx-auto px-6 pt-12 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          <span className="text-primary">/</span> About Me
        </h2>
        <p className="text-slate-400 max-w-2xl">
          My technical journey, key skills, and professional experience.
        </p>
      </div>
      
      <div className="space-y-12">
        <Skills />
        <Experience />
      </div>
    </div>
  );
};

export default About;