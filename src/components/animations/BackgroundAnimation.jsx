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
      id: 1,
      colorLight: 'bg-[#d0e1e8]', colorDark: 'bg-[#15669c]',
      size: 'w-[45vw] h-[45vw] md:w-[35vw] md:h-[35vw]',
      initialPosition: { top: '15%', left: '20%' },
      animate: {
        x: ['0vw', '5vw', '-5vw', '3vw', '0vw'],
        y: ['0vh', '-5vh', '5vh', '-2vh', '0vh'],
        scale: [1, 1.2, 0.9, 1.1, 1],
        opacity: [0, 0.7, 0, 0, 0.6],
        hue: [0, 45, 90, 45, 0]
      },
      duration: 65, delay: 0
    },
    {
      id: 2,
      colorLight: 'bg-[#d6e3dc]', colorDark: 'bg-[#1b7a58]',
      size: 'w-[55vw] h-[55vw] md:w-[45vw] md:h-[45vw]',
      initialPosition: { top: '45%', right: '15%' },
      animate: {
        x: ['0vw', '-4vw', '3vw', '-5vw', '0vw'],
        y: ['0vh', '6vh', '-4vh', '3vh', '0vh'],
        scale: [0.9, 1.3, 0.8, 1.2, 0.9],
        opacity: [0.5, 0, 0, 0.8, 0],
        hue: [0, 60, 120, 60, 0]
      },
      duration: 72, delay: 5
    },
    {
      id: 3,
      colorLight: 'bg-[#e8dec5]', colorDark: 'bg-[#a37f17]',
      size: 'w-[50vw] h-[50vw] md:w-[40vw] md:h-[40vw]',
      initialPosition: { bottom: '5%', left: '25%' },
      animate: {
        x: ['0vw', '4vw', '-3vw', '5vw', '0vw'],
        y: ['0vh', '-6vh', '4vh', '-3vh', '0vh'],
        scale: [1, 1.1, 0.8, 1.3, 1],
        opacity: [0, 0, 0.7, 0, 0.6],
        hue: [0, -30, -60, -30, 0]
      },
      duration: 58, delay: 15
    },
    {
      id: 4,
      colorLight: 'bg-[#e3dcf0]', colorDark: 'bg-[#4c2d73]',
      size: 'w-[60vw] h-[60vw] md:w-[50vw] md:h-[50vw]',
      initialPosition: { top: '35%', left: '45%' },
      animate: {
        x: ['-2vw', '5vw', '2vw', '-4vw', '-2vw'],
        y: ['-4vh', '2vh', '-5vh', '3vh', '-4vh'],
        scale: [0.8, 1.2, 0.9, 1.1, 0.8],
        opacity: [0.6, 0, 0.8, 0, 0],
        hue: [0, 40, 80, 40, 0]
      },
      duration: 80, delay: 10
    },
    {
      id: 5,
      colorLight: 'bg-[#faebd7]', colorDark: 'bg-[#8a3e2e]',
      size: 'w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw]',
      initialPosition: { top: '5%', right: '5%' },
      animate: {
        x: ['0vw', '-5vw', '4vw', '-3vw', '0vw'],
        y: ['0vh', '5vh', '-3vh', '6vh', '0vh'],
        scale: [1, 0.9, 1.4, 0.8, 1],
        opacity: [0, 0.8, 0, 0, 0.7],
        hue: [0, -45, -90, -45, 0]
      },
      duration: 62, delay: 20
    }
  ];

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-1000 bg-transparent">
      {blobs.map((blob) => {
        const targetOpacity = blob.animate.opacity.map(val => 
          darkMode ? val * 0.5 : val * 0.8
        );
        const blurValue = window.innerWidth >= 768 ? '120px' : '80px';
        const targetFilter = blob.animate.hue.map(deg => `blur(${blurValue}) hue-rotate(${deg}deg)`);

        return (
          <motion.div
            key={blob.id}
            className={`absolute rounded-full mix-blend-multiply dark:mix-blend-screen ${blob.size} ${darkMode ? blob.colorDark : blob.colorLight}`}
            style={blob.initialPosition}
            animate={{
              x: blob.animate.x,
              y: blob.animate.y,
              scale: blob.animate.scale,
              opacity: targetOpacity,
              filter: targetFilter,
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
