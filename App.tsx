import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Intro from './components/Intro';
import InteractiveBackground from './components/InteractiveBackground';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Hero onNavigate={setActivePage} />;
      case 'projects': return <Projects />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      default: return <Hero onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="bg-darker min-h-screen text-slate-300 selection:bg-primary selection:text-white relative overflow-x-hidden scanlines">
      {/* 1. Global Interactive Particles */}
      <InteractiveBackground />
      
      {/* 2. Global Static Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-grid opacity-30"></div>

      {/* 3. Global Glowing Blobs (Visible on all pages) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full filter blur-[120px] animate-blob opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full filter blur-[120px] animate-blob animation-delay-2000 opacity-40"></div>
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-blue-500/10 rounded-full filter blur-[100px] animate-blob animation-delay-4000 opacity-30"></div>
      </div>
      
      {showIntro ? (
        <Intro onComplete={() => setShowIntro(false)} />
      ) : (
        <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar activePage={activePage} setActivePage={setActivePage} />
            <main className="flex-grow pt-24 w-full">
                {renderPage()}
            </main>
        </div>
      )}
    </div>
  );
};

export default App;