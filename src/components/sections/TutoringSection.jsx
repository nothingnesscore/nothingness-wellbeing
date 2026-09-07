import React from 'react';
import { BookOpen, Sparkles, MessageCircle, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { LiquidGlassCard } from '../animations/LiquidGlassCard';

export function TutoringSection() {
  const { darkMode } = useTheme();
  return (
    <section id="tutoring" className="mb-24 scroll-mt-32 reveal-on-scroll relative">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-light mb-3">Psychology Tutoring</h3>
        <div className="zen-line"></div>
        <p className="text-stone-600 dark:text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          Non-clinical psychology tutoring for <strong>Class XI onwards</strong>—high school, undergraduate, postgraduate, and beyond. 
          Building understanding from the ground up. Learning as dialogue.
        </p>
      </div>

      {/* Tutoring Info in Liquid Glass */}
      <LiquidGlassCard darkMode={darkMode} className="p-8 md:p-12 mb-10 w-full text-left">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h4 className="text-lg md:text-xl font-medium mb-5 flex items-center gap-2.5 text-stone-900 dark:text-slate-50">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#d4af37]/15 border border-[#d4af37]/30">
                <BookOpen className="w-4 h-4 text-[#a89968] dark:text-[#d4af37]" />
              </div>
              What We Cover
            </h4>
            <ul className="text-stone-600 dark:text-slate-300 space-y-2.5 text-sm md:text-base leading-relaxed font-sans">
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">·</span>
                <span>Psychology for all levels: Class XI, XII, Undergrad, Postgrad & beyond</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">·</span>
                <span>Board exam preparation & conceptual scoring strategies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">·</span>
                <span>College & university coursework support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">·</span>
                <span>Masters thesis & research guidance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">·</span>
                <span>Deep conceptual clarity & independent critical thinking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">·</span>
                <span>Custom-tailored learning paths for every individual stage</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg md:text-xl font-medium mb-5 flex items-center gap-2.5 text-stone-900 dark:text-slate-50">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#d4af37]/15 border border-[#d4af37]/30">
                <Sparkles className="w-4 h-4 text-[#a89968] dark:text-[#d4af37]" />
              </div>
              How We Work Together
            </h4>
            <p className="text-stone-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-sans">
              Get in touch to discuss your learning goals, current curriculum, and pace. Whether you're a high school student preparing for boards, a college student deepening your understanding, or a postgraduate exploring research—tutoring sessions are designed around what you need, not a template. We explore psychology concepts through dialogue, examples, and practice, building a respectful learning relationship.
            </p>
          </div>
        </div>
      </LiquidGlassCard>

      {/* Tutoring CTA */}
      <LiquidGlassCard darkMode={darkMode} className="p-8 md:p-12 w-full text-center">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <p className="text-stone-900 dark:text-slate-50 font-light text-xl md:text-2xl mb-4">
            Ready to explore Psychology together?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-2 mb-4">
            <a
              href="https://wa.me/918240213971?text=Hello%21%20I%27m%20interested%20in%20psychology%20tuitions%2E%20Could%20we%20discuss%20how%20it%20might%20work%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
              style={{
                background: darkMode
                  ? 'linear-gradient(135deg, #f5e7b2 0%, #d4af37 50%, #aa8520 100%)'
                  : 'linear-gradient(135deg, #292524 0%, #1c1917 100%)',
                color: darkMode ? '#0a0a0a' : '#ffffff',
              }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp / Call</span>
            </a>

            <a
              href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}
              className="py-3 px-6 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.8)',
                color: darkMode ? '#f1f5f9' : '#292524',
              }}
            >
              <Mail className="w-4 h-4" />
              <span>Email Us</span>
            </a>
          </div>
          <p className="text-xs text-stone-500 dark:text-slate-400 font-sans">
            We'll discuss your goals, syllabus, availability, and tailored approach.
          </p>
        </div>
      </LiquidGlassCard>
    </section>
  );
}
