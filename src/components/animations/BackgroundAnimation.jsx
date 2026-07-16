import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export function BackgroundAnimation() {
  const { darkMode } = useTheme();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-1000">
      <div className={`absolute top-[0%] left-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-30 animate-blob ${darkMode ? 'bg-[#3d3111]' : 'bg-[#e0d6b8]'}`}></div>
      <div className={`absolute top-[20%] right-[10%] w-[45vw] h-[45vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-30 animate-blob animation-delay-2000 ${darkMode ? 'bg-[#1f1f1f]' : 'bg-[#e8e2d5]'}`}></div>
      <div className={`absolute bottom-[-10%] left-[30%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] opacity-20 animate-blob animation-delay-4000 ${darkMode ? 'bg-[#2b2410]' : 'bg-[#d6ccaf]'}`}></div>
    </div>
  );
}
