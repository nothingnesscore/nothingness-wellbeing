import React from 'react';
import { Video, FileText, BookOpen, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { LiquidGlassCard } from '../animations/LiquidGlassCard';

export function ResourcesSection() {
  const { darkMode } = useTheme();

  return (
    <section id="resources" className="mb-24 scroll-mt-32 reveal-on-scroll relative">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-light mb-3">Resources & Learning</h3>
        <div className="zen-line"></div>
        <p className="text-stone-600 dark:text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          Free and open materials—videos, writing, and reflections to support your journey.
        </p>
      </div>

      {/* Resource Cards with Liquid Glass */}
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        <LiquidGlassCard darkMode={darkMode} className="h-full">
          <div className="p-8 md:p-10 flex flex-col items-center text-center h-full justify-between">
            <div>
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-stone-100/80 dark:bg-stone-900/60 mb-6 shadow-inner border border-stone-200/80 dark:border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-[#d4af37]/50">
                <Video className="w-7 h-7 text-[#a89968] dark:text-[#d4af37] transition-colors" />
              </div>
              <h4 className="text-lg md:text-xl font-medium mb-3 text-stone-900 dark:text-slate-50">YouTube Channel</h4>
              <p className="text-stone-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed font-sans mb-6">
                Video reflections, guided meditations, and teachings on psychology, counselling, and well-being.
              </p>
            </div>
            <span 
              className="py-2 px-5 rounded-full text-xs font-medium font-sans"
              style={{
                background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.8)',
                color: darkMode ? '#94a3b8' : '#78716c',
              }}
            >
              In Production
            </span>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard darkMode={darkMode} className="h-full">
          <div className="p-8 md:p-10 flex flex-col items-center text-center h-full justify-between">
            <div>
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-stone-100/80 dark:bg-stone-900/60 mb-6 shadow-inner border border-stone-200/80 dark:border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-[#d4af37]/50">
                <FileText className="w-7 h-7 text-[#a89968] dark:text-[#d4af37] transition-colors" />
              </div>
              <h4 className="text-lg md:text-xl font-medium mb-3 text-stone-900 dark:text-slate-50">Blog & Articles</h4>
              <p className="text-stone-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed font-sans mb-6">
                Thoughts on person-centred practice, psychology, and the deeper aspects of healing and presence.
              </p>
            </div>
            <Link
              to="/blog"
              className="py-2 px-5 rounded-full text-xs font-medium font-sans flex items-center gap-1.5 transition-all duration-300 hover:scale-105"
              style={{
                background: darkMode ? 'rgba(212, 175, 55, 0.15)' : 'rgba(168, 153, 104, 0.12)',
                border: darkMode ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid rgba(168, 153, 104, 0.3)',
                color: darkMode ? '#f3e5ab' : '#8a7029',
              }}
            >
              <span>Explore Blog</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard darkMode={darkMode} className="h-full">
          <div className="p-8 md:p-10 flex flex-col items-center text-center h-full justify-between">
            <div>
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-stone-100/80 dark:bg-stone-900/60 mb-6 shadow-inner border border-stone-200/80 dark:border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-[#d4af37]/50">
                <BookOpen className="w-7 h-7 text-[#a89968] dark:text-[#d4af37] transition-colors" />
              </div>
              <h4 className="text-lg md:text-xl font-medium mb-3 text-stone-900 dark:text-slate-50">Learning Materials</h4>
              <p className="text-stone-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed font-sans mb-6">
                Curated articles, frameworks, research guides, and resources for independent and guided study.
              </p>
            </div>
            <span 
              className="py-2 px-5 rounded-full text-xs font-medium font-sans"
              style={{
                background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.8)',
                color: darkMode ? '#94a3b8' : '#78716c',
              }}
            >
              Curating
            </span>
          </div>
        </LiquidGlassCard>
      </div>
    </section>
  );
}
