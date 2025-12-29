import React, { useEffect, useState, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  animateOnHover?: boolean;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

const DecryptedText: React.FC<DecryptedTextProps> = ({ text, className = "", animateOnHover = true }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const startAnimation = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText((prev) => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 2; // Speed control
    }, 30);
  };

  useEffect(() => {
    startAnimation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const handleMouseEnter = () => {
    if (animateOnHover) startAnimation();
  };

  return (
    <span 
      className={`font-mono inline-block cursor-default ${className}`} 
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  );
};

export default DecryptedText;