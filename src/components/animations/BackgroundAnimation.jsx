import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export function BackgroundAnimation() {
  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Apple Music-style fluid morphing and popping blobs
  // We use keyframes for x, y (in vw/vh for large sweeping movements)
  // and opacity (fading in and out to simulate "popping up here and there")
  const blobs = [
    {
      id: 1, // Ocean Blue
      colorLight: 'bg-[#d0e1e8]', colorDark: 'bg-[#15669c]',
      size: 'w-[45vw] h-[45vw] md:w-[35vw] md:h-[35vw]',
      initialPosition: { top: '10%', left: '10%' },
      animate: {
        x: ['0vw', '40vw', '-10vw', '20vw', '0vw'],
        y: ['0vh', '-20vh', '50vh', '10vh', '0vh'],
        scale: [1, 1.5, 0.8, 1.2, 1],
        opacity: [0, 0.6, 0, 0.5, 0],
      },
      duration: 35, delay: 0
    },
    {
      id: 2, // Sage Green
      colorLight: 'bg-[#d6e3dc]', colorDark: 'bg-[#1b7a58]',
      size: 'w-[55vw] h-[55vw] md:w-[45vw] md:h-[45vw]',
      initialPosition: { top: '40%', right: '10%' },
      animate: {
        x: ['0vw', '-30vw', '20vw', '-40vw', '0vw'],
        y: ['0vh', '40vh', '-20vh', '30vh', '0vh'],
        scale: [1, 0.7, 1.4, 0.9, 1],
        opacity: [0, 0.5, 0.2, 0.7, 0],
      },
      duration: 42, delay: 5
    },
    {
      id: 3, // Golden Warmth
      colorLight: 'bg-[#e8dec5]', colorDark: 'bg-[#a37f17]',
      size: 'w-[50vw] h-[50vw] md:w-[40vw] md:h-[40vw]',
      initialPosition: { bottom: '-10%', left: '30%' },
      animate: {
        x: ['0vw', '30vw', '-40vw', '10vw', '0vw'],
        y: ['0vh', '-50vh', '20vh', '-30vh', '0vh'],
        scale: [1, 1.3, 0.6, 1.4, 1],
        opacity: [0.3, 0, 0.6, 0, 0.3], // Starts visible, fades out, pops elsewhere
      },
      duration: 38, delay: 2
    },
    {
      id: 4, // Soft Violet / Deep Purple (Extra color for richness)
      colorLight: 'bg-[#e3dcf0]', colorDark: 'bg-[#4c2d73]',
      size: 'w-[60vw] h-[60vw] md:w-[50vw] md:h-[50vw]',
      initialPosition: { top: '50%', left: '50%' },
      animate: {
        x: ['-50vw', '20vw', '40vw', '-30vw', '-50vw'],
        y: ['-50vh', '30vh', '-40vh', '10vh', '-50vh'],
        scale: [0.8, 1.5, 1, 1.3, 0.8],
        opacity: [0, 0.4, 0, 0.5, 0],
      },
      duration: 45, delay: 10
    },
    {
      id: 5, // Peach / Coral
      colorLight: 'bg-[#faebd7]', colorDark: 'bg-[#8a3e2e]',
      size: 'w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw]',
      initialPosition: { top: '-10%', right: '-10%' },
      animate: {
        x: ['0vw', '-60vw', '10vw', '-40vw', '0vw'],
        y: ['0vh', '60vh', '-10vh', '40vh', '0vh'],
        scale: [1, 1.1, 1.6, 0.9, 1],
        opacity: [0.4, 0, 0.5, 0, 0.4],
      },
      duration: 32, delay: 7
    }
  ];

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-1000 bg-transparent">
      {blobs.map((blob) => {
        // Adjust opacities globally based on theme so dark mode isn't overwhelming
        const targetOpacity = blob.animate.opacity.map(val => 
          darkMode ? val * 0.6 : val * 0.9
        );

        return (
          <motion.div
            key={blob.id}
            className={`absolute rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] md:blur-[120px] ${blob.size} ${darkMode ? blob.colorDark : blob.colorLight}`}
            style={blob.initialPosition}
            animate={{
              x: blob.animate.x,
              y: blob.animate.y,
              scale: blob.animate.scale,
              opacity: targetOpacity,
            }}
            transition={{
              duration: blob.duration,
              delay: blob.delay,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
          />
        );
      })}
    </div>
  );
}
