import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export function BackgroundAnimation() {
  const { darkMode } = useTheme();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-1000">
      {/* Ocean Blue / Icy Blue */}
      <div className={`absolute top-[0%] left-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-40 dark:opacity-20 animate-blob ${darkMode ? 'bg-[#15669c]' : 'bg-[#d0e1e8]'}`}></div>
      {/* Sage Green / Emerald */}
      <div className={`absolute top-[20%] right-[10%] w-[45vw] h-[45vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-20 animate-blob animation-delay-2000 ${darkMode ? 'bg-[#1b7a58]' : 'bg-[#d6e3dc]'}`}></div>
      {/* Golden Warmth */}
      <div className={`absolute bottom-[-10%] left-[30%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] opacity-30 dark:opacity-15 animate-blob animation-delay-4000 ${darkMode ? 'bg-[#a37f17]' : 'bg-[#e8dec5]'}`}></div>
    </div>
  );
}
