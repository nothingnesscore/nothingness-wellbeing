import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function AnimatedAccordion({ title, children, darkMode, isOpen, onToggle }) {
  return (
    <div 
      className="glass-card rounded-2xl overflow-hidden cursor-pointer mb-4"
      onClick={onToggle}
    >
      <div className="p-5 md:p-6 flex justify-between items-center gap-4">
        <h4 className={`text-base md:text-lg font-medium ${darkMode ? 'text-slate-50' : 'text-stone-900 dark:text-slate-50'}`}>
          {title}
        </h4>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-stone-500 dark:text-slate-400'}`} />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 pt-0">
              <div className="w-full h-px bg-stone-200 dark:bg-white/10 mb-4"></div>
              <div className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-stone-600 dark:text-slate-300'}`}>
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
