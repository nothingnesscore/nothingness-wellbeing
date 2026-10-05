import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';
import { HeroSection } from '../components/sections/HeroSection';
import { CounsellingSection } from '../components/sections/CounsellingSection';
import { TutoringSection } from '../components/sections/TutoringSection';
import { ResourcesSection } from '../components/sections/ResourcesSection';
import { FaqSection } from '../components/sections/FaqSection';
import { useTheme } from '../context/ThemeContext';
import { LiquidGlassCard } from '../components/animations/LiquidGlassCard';
import { LiquidBackdropBlobs } from '../components/animations/LiquidBackdropBlobs';

export function Home() {
  const { darkMode } = useTheme();
  const contentRef = useRef(null);

  // Gentle scroll depth for the whole content column — slow enough to read as
  // atmosphere rather than motion.
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ['start end', 'end start'],
  });
  const ambientY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <HeroSection />

      <div ref={contentRef} className="max-w-5xl mx-auto px-6 pt-8 pb-20 relative">
        {/* Ambient Section-Wide Fluid Bubbles Drifting Behind Glass Content */}
        <motion.div style={{ y: ambientY }} className="absolute inset-0 -z-10">
          <LiquidBackdropBlobs variant="section" className="opacity-80" />
        </motion.div>

        <CounsellingSection />

        <div className="section-divider"></div>

        <TutoringSection />

        <div className="section-divider"></div>

        <ResourcesSection />

        <div className="section-divider"></div>

        <FaqSection />

        {/* Testimonials Section */}
        <section className="py-16 px-0 md:px-6 relative z-10 reveal-on-scroll">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-light mb-3">What Others Say</h3>
              <div className="zen-line"></div>
              <p className="text-stone-600 dark:text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                Real experiences from people on their journey towards clarity and presence.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <LiquidGlassCard darkMode={darkMode} className="p-8 md:p-12 text-center">
                <Quote
                  className={`w-7 h-7 mx-auto mb-5 ${
                    darkMode ? 'text-[#d4af37]' : 'text-[#a89968]'
                  }`}
                  aria-hidden="true"
                />
                <p className="text-stone-700 dark:text-slate-200 text-sm md:text-base italic font-serif leading-relaxed">
                  &ldquo;We&rsquo;re gathering authentic feedback from our clients as they experience
                  our sessions. Check back soon to read their reflections.&rdquo;
                </p>
                <div
                  className="mt-6 text-xs font-sans font-medium tracking-wide uppercase"
                  style={{ color: darkMode ? '#d4af37' : '#a89968' }}
                >
                  Presence &amp; Dialogue
                </div>
              </LiquidGlassCard>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}