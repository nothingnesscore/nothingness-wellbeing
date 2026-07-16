import React from 'react';
import { BookOpen } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { GlowingCard } from '../animations/GlowingCard';

export function TutoringSection() {
  const { darkMode } = useTheme();
  return (
    <section id="tutoring" className="mb-20 reveal-on-scroll">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-light mb-3">Psychology Tutoring</h3>
        <div className="zen-line"></div>
        <p className="text-stone-600 dark:text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          Non-clinical psychology tutoring for <strong>Class XI onwards</strong>—high school, undergraduate, postgraduate, and beyond. 
          Building understanding from the ground up. Learning as dialogue.
        </p>
      </div>

      {/* Tutoring Info */}
      <GlowingCard darkMode={darkMode} className="glass-card p-6 md:p-10 rounded-2xl mb-10 w-full text-left hover-lift">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <div>
            <h4 className="text-base md:text-lg font-medium mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#a89968] dark:text-[#d4af37]" />
              What We Cover
            </h4>
            <ul className="text-stone-600 dark:text-slate-300 space-y-2 text-xs md:text-sm leading-relaxed">
              <li>• Psychology for all levels: Class XI, XII, Undergrad, Postgrad & beyond</li>
              <li>• Board exam preparation & scoring strategies</li>
              <li>• College & university coursework support</li>
              <li>• Masters thesis & research guidance</li>
              <li>• Deep conceptual understanding & independent thinking</li>
              <li>• Custom-tailored learning paths for every stage</li>
            </ul>
          </div>
          <div>
            <h4 className="text-base md:text-lg font-medium mb-4">How We Work Together</h4>
            <p className="text-stone-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed">
              Get in touch to discuss your learning goals, current curriculum, and pace. Whether you're a high school student preparing for boards, a college student deepening your understanding, or a postgraduate exploring research—tutoring sessions are designed around what you need, not a template. We explore psychology concepts through dialogue, examples, and practice. We build a learning relationship that respects your journey at every stage.
            </p>
          </div>
        </div>
      </GlowingCard>

      {/* Tutoring CTA */}
      <GlowingCard darkMode={darkMode} className="flex flex-col items-center justify-center p-8 md:p-12 glass-card rounded-2xl w-full text-center hover-lift">
        <p className="text-stone-600 dark:text-slate-300 mb-4 text-sm md:text-base">Ready to explore Psychology together?</p>
        <div className="flex flex-col gap-4 items-center">
          <a href="https://wa.me/918240213971?text=Hello%21%20I%27m%20interested%20in%20psychology%20tuitions%2E%20Could%20we%20discuss%20how%20it%20might%20work%3F" target="_blank" rel="noopener noreferrer" className="button-glass inline-flex items-center gap-2 text-sm md:text-base px-6 py-3 rounded-full font-medium z-30">
            💬 WhatsApp / Call
          </a>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            Or email: {process.env.REACT_APP_CONTACT_EMAIL}
          </p>
        </div>
        <p className="text-xs text-stone-500 dark:text-slate-400 mt-4">
          We'll discuss your goals, curriculum, availability, and the best approach for you.
        </p>
      </GlowingCard>
    </section>
  );
}
