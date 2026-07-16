import React from 'react';
import { Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer className="mt-12 py-12 border-t border-stone-200 dark:border-white/10 bg-white/20 dark:bg-black/30 backdrop-blur-xl transition-colors duration-500 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className={`font-light text-base md:text-lg mb-4 ${darkMode ? 'text-slate-50' : 'text-stone-900 dark:text-slate-50'}`}>Nothingness Well-Being</h4>
            <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-stone-600 dark:text-slate-300 group-hover:text-white dark:group-hover:text-[#050505]'}`}>
              Non-clinical counselling and psychology tutoring that focuses on the person. A practice based on being present, being clear, and making authentic connections.
            </p>
          </div>
          <div>
            <h4 className={`font-light text-base md:text-lg mb-4 ${darkMode ? 'text-slate-50' : 'text-stone-900 dark:text-slate-50'}`}>Contact</h4>
            <div className="mb-3">
              <p className={`text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-stone-500 dark:text-slate-400'}`}>Primary Contact</p>
              <a href="tel:+918902460513" className={`text-xs md:text-sm hover:opacity-70 transition flex items-center gap-2 ${darkMode ? 'text-slate-300' : 'text-stone-600 dark:text-slate-300 group-hover:text-white dark:group-hover:text-[#050505]'}`}>
                📞 +91 89024 60513 (Calls & Messages)
              </a>
            </div>
            <div className="mb-3">
              <p className={`text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-stone-500 dark:text-slate-400'}`}>WhatsApp Preferred</p>
              <a href="https://wa.me/918240213971" target="_blank" rel="noopener noreferrer" className={`text-xs md:text-sm hover:opacity-70 transition flex items-center gap-2 ${darkMode ? 'text-slate-300' : 'text-stone-600 dark:text-slate-300 group-hover:text-white dark:group-hover:text-[#050505]'}`}>
                💬 +91 82402 13971 (WhatsApp Direct)
              </a>
            </div>
            <a href="mailto:circle5.nothingness@proton.me" className={`text-xs md:text-sm hover:opacity-70 transition flex items-center gap-2 mb-3 ${darkMode ? 'text-slate-300' : 'text-stone-600 dark:text-slate-300 group-hover:text-white dark:group-hover:text-[#050505]'}`}>
              <Mail className="w-4 h-4 flex-shrink-0" />
              circle5.nothingness@proton.me
            </a>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-stone-500 dark:text-slate-400'}`}>
              Response within 24-48 hours
            </p>
          </div>
          <div>
            <h4 className={`font-light text-base md:text-lg mb-4 ${darkMode ? 'text-slate-50' : 'text-stone-900 dark:text-slate-50'}`}>Location</h4>
            <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-stone-600 dark:text-slate-300 group-hover:text-white dark:group-hover:text-[#050505]'}`}>
              Near Kalighat Fire Station<br />
              Kolkata, India 700026<br />
            </p>
            <p className={`text-xs mt-2 ${darkMode ? 'text-slate-400' : 'text-stone-500 dark:text-slate-400'}`}>In-person & Online</p>
          </div>
        </div>
        
        <div className="border-t border-stone-200 dark:border-white/10 pt-8">
          <p className={`text-xs text-center leading-relaxed ${darkMode ? 'text-slate-400' : 'text-stone-500 dark:text-slate-400'}`}>
            © 2026 Nothingness Well-Being. All practices rooted in presence, clarity, and the courage to be fully yourself.
          </p>
        </div>
      </div>
    </footer>
  );
}
