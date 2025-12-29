import React, { useEffect } from 'react';
import anime from 'animejs';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  useEffect(() => {
    // 1. Text enters
    anime({
      targets: '.intro-text',
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: 300
    });

    // 2. Grid animates out
    const tl = anime.timeline({
      complete: onComplete
    });

    tl.add({
      duration: 1200 // Reading time
    })
    .add({
      targets: '.intro-tile',
      scale: [1, 0],
      duration: 800,
      easing: 'easeInOutQuad',
      delay: anime.stagger(50, {grid: [10, 10], from: 'center'})
    })
    .add({
      targets: '.intro-text',
      opacity: 0,
      duration: 500,
      easing: 'easeOutQuad'
    }, '-=800'); // Fade out text while tiles disappear
    
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 w-full h-full">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="intro-tile bg-darker w-full h-full border border-slate-900/30"></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 intro-text opacity-0 flex flex-col items-center">
        <h1 className="text-6xl md:text-9xl font-bold text-white font-mono tracking-tighter">
          NA<span className="text-primary">.</span>
        </h1>
        <p className="mt-4 text-primary font-mono tracking-[0.3em] text-sm md:text-xl uppercase">
          System Initialized
        </p>
      </div>
      
    </div>
  );
};

export default Intro;