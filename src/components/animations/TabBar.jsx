import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function TabBar({ tabs, activeTab, onTabClick, darkMode, scrolled, asLink = false }) {
  return (
    <div className={`flex gap-1 p-1.5 rounded-[20px] transition-all duration-300 backdrop-blur-md border ${
      darkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'
    } ${scrolled ? 'text-xs shadow-md' : 'text-sm'}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        const content = (
          <>
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className={`absolute inset-0 rounded-full z-[-1] overflow-hidden ${
                  darkMode ? 'bg-gradient-to-b from-white/10 to-white/5 border border-white/10 shadow-[inset_0_-1px_0_rgba(255,255,255,0.1)]' 
                           : 'bg-gradient-to-b from-black/5 to-black/10 border border-black/10 shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)]'
                }`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              >
                {/* Subtle bottom line glow */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[1px] ${
                  darkMode ? 'bg-gradient-to-r from-transparent via-white/30 to-transparent' 
                           : 'bg-gradient-to-r from-transparent via-black/20 to-transparent'
                }`} />
              </motion.div>
            )}
            {tab.label}
          </>
        );

        const className = `relative px-4 py-1.5 rounded-full transition-colors duration-300 ${
          isActive 
            ? (darkMode ? 'text-white' : 'text-stone-900') 
            : (darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 hover:text-stone-900')
        } font-medium z-10`;

        if (asLink) {
          return (
            <Link key={tab.id} to={tab.path} className={className}>
              {content}
            </Link>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={className}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
