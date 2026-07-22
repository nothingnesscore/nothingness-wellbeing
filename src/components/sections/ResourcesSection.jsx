import React from 'react';
import { Video, FileText, BookOpen } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { GlowingCard } from '../animations/GlowingCard';

export function ResourcesSection() {
  const { darkMode } = useTheme();

  return (
    <section id="resources" className="mb-20 scroll-mt-32 reveal-on-scroll">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-light mb-3">Resources & Learning</h3>
        <div className="zen-line"></div>
        <p className="text-stone-600 dark:text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          Free and open materials—videos, writing, and reflections to support your journey. Coming soon.
        </p>
      </div>

      {/* Resource Cards */}
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        <GlowingCard darkMode={darkMode} className="glass-card hover-lift h-full">
          <div className="p-10 md:p-12 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-stone-100 dark:bg-stone-900/50 group-hover:bg-[#a89968] dark:group-hover:bg-[#d4af37] mb-6 shadow-inner border border-stone-200 dark:border-white/5 transition-all duration-500 group-hover:scale-110">
              <Video className="w-7 h-7 text-[#a89968] dark:text-[#d4af37] group-hover:text-white dark:group-hover:text-[#050505]" />
            </div>
            <h4 className="text-base md:text-lg font-medium mb-2">YouTube Channel</h4>
            <p className="text-stone-600 dark:text-slate-300 text-xs md:text-sm mb-6 leading-relaxed">
              Video reflections, guided meditations, and teachings on psychology, counselling, and well-being.
            </p>
            <button className="button-secondary text-xs md:text-sm cursor-default">Coming Soon</button>
          </div>
        </GlowingCard>

        <GlowingCard darkMode={darkMode} className="glass-card hover-lift h-full">
          <div className="p-10 md:p-12 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-stone-100 dark:bg-stone-900/50 group-hover:bg-[#a89968] dark:group-hover:bg-[#d4af37] mb-6 shadow-inner border border-stone-200 dark:border-white/5 transition-all duration-500 group-hover:scale-110">
              <FileText className="w-7 h-7 text-[#a89968] dark:text-[#d4af37] group-hover:text-white dark:group-hover:text-[#050505]" />
            </div>
            <h4 className="text-base md:text-lg font-medium mb-2">Blog & Writing</h4>
            <p className="text-stone-600 dark:text-slate-300 text-xs md:text-sm mb-6 leading-relaxed">
              Thoughts on person-centred practice, psychology, and the deeper aspects of healing and presence.
            </p>
            <button className="button-secondary text-xs md:text-sm cursor-default">Coming Soon</button>
          </div>
        </GlowingCard>

        <GlowingCard darkMode={darkMode} className="glass-card hover-lift h-full">
          <div className="p-10 md:p-12 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-stone-100 dark:bg-stone-900/50 group-hover:bg-[#a89968] dark:group-hover:bg-[#d4af37] mb-6 shadow-inner border border-stone-200 dark:border-white/5 transition-all duration-500 group-hover:scale-110">
              <BookOpen className="w-7 h-7 text-[#a89968] dark:text-[#d4af37] group-hover:text-white dark:group-hover:text-[#050505]" />
            </div>
            <h4 className="text-base md:text-lg font-medium mb-2">Learning Materials</h4>
            <p className="text-stone-600 dark:text-slate-300 text-xs md:text-sm mb-6 leading-relaxed">
              Curated articles, frameworks, research guides, and resources for independent study.
            </p>
            <button className="button-secondary text-xs md:text-sm cursor-default">Coming Soon</button>
          </div>
        </GlowingCard>
      </div>
    </section>
  );
}
