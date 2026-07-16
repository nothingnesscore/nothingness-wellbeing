import React from 'react';
import { motion } from 'framer-motion';

export function TabBar({ tabs, activeTab, onTabClick, darkMode, scrolled }) {
  return (
    <div className={`flex gap-2 p-1 transition-all duration-300 ${scrolled ? 'text-xs' : 'text-sm'}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={`relative px-4 py-1.5 rounded-full transition-colors duration-300 ${
              isActive 
                ? (darkMode ? 'text-[#050505]' : 'text-stone-900') 
                : (darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 hover:text-stone-900')
            } font-medium z-10`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className={`absolute inset-0 rounded-full z-[-1] ${
                  darkMode ? 'bg-[#d4af37]' : 'bg-[#a89968]'
                }`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
