import React, { useState } from 'react';
import { Calendar, Mail, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { GlowingCard } from '../animations/GlowingCard';

export function CounsellingSection() {
  const { darkMode } = useTheme();
  const [selectedCounselling, setSelectedCounselling] = useState('online');

  return (
    <section id="counselling" className="mb-20 reveal-on-scroll">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-light mb-3">Counselling</h3>
        <div className="zen-line"></div>
        <p className="text-stone-600 dark:text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          Non-clinical counselling that focuses on the person and respects your experience without judging you. Sessions that are tailored to your needs, either online or in person. Meet yourself with kindness.
        </p>
      </div>

      {/* Toggle for Online/In-person */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
        <button
          onClick={() => setSelectedCounselling('online')}
          className={`px-4 md:px-6 py-2 rounded-full transition toggle-button text-sm md:text-base ${
            selectedCounselling === 'online'
              ? 'toggle-active'
              : 'toggle-inactive'
          }`}
        >
          Online Sessions
        </button>
        <button
          onClick={() => setSelectedCounselling('inperson')}
          className={`px-4 md:px-6 py-2 rounded-full transition toggle-button text-sm md:text-base ${
            selectedCounselling === 'inperson'
              ? 'toggle-active'
              : 'toggle-inactive'
          }`}
        >
          In-Person Sessions
        </button>
      </div>

      {/* Session Info Cards */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-12">
        <GlowingCard darkMode={darkMode} className="glass-card hover-lift h-full">
          <div className="p-10 md:p-12 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-stone-100 dark:bg-stone-900/50 group-hover:bg-[#a89968] dark:group-hover:bg-[#d4af37] mb-6 shadow-inner border border-stone-200 dark:border-white/5 transition-all duration-500 group-hover:scale-110">
              <Calendar className="w-7 h-7 text-[#a89968] dark:text-[#d4af37] group-hover:text-white dark:group-hover:text-[#050505]" />
            </div>
            
            <h4 className="text-lg md:text-xl font-medium mb-4">Flexible Scheduling</h4>
            <p className="text-stone-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
              {selectedCounselling === 'online'
                ? 'Book online sessions at times that suit your rhythm. Sessions via video call, with flexibility around your life.'
                : 'Available for in-person sessions in Kolkata. A calm, welcoming space designed for authentic dialogue.'}
            </p>
          </div>
        </GlowingCard>

        <GlowingCard darkMode={darkMode} className="glass-card hover-lift h-full">
          <div className="p-10 md:p-12 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-stone-100 dark:bg-stone-900/50 group-hover:bg-[#a89968] dark:group-hover:bg-[#d4af37] mb-6 shadow-inner border border-stone-200 dark:border-white/5 transition-all duration-500 group-hover:scale-110">
              <Mail className="w-7 h-7 text-[#a89968] dark:text-[#d4af37] group-hover:text-white dark:group-hover:text-[#050505]" />
            </div>
            
            <h4 className="text-lg md:text-xl font-medium mb-4">Personalised Approach</h4>
            <p className="text-stone-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
              Pricing tailored to your circumstances. No one-size-fits-all. Reach out to explore what feels right for you.
            </p>
          </div>
        </GlowingCard>
      </div>

      {/* Location Info for In-person */}
      {selectedCounselling === 'inperson' && (
        <div className="glass-card p-6 rounded-2xl mb-10 fade-in">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-stone-600 dark:text-slate-300 group-hover:text-white dark:group-hover:text-[#050505] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-stone-900 dark:text-slate-50 text-sm md:text-base">Kolkata, {process.env.REACT_APP_LOCATION}</p>
              <p className={`text-xs md:text-sm mt-1 ${darkMode ? 'text-slate-300' : 'text-stone-600 dark:text-slate-300 group-hover:text-white dark:group-hover:text-[#050505]'}`}>Near Kalighat Fire Station, 700026</p>
              <p className="text-xs text-stone-500 dark:text-slate-400 mt-2 italic">(Exact location confirmed upon booking)</p>
            </div>
          </div>
        </div>
      )}

      {/* Booking Section */}
      <GlowingCard darkMode={darkMode} className="mb-8 flex flex-col items-center justify-center p-8 md:p-12 glass-card rounded-2xl w-full text-center hover-lift">
        <h4 className="text-lg md:text-xl font-light mb-3">Book Your First Session</h4>
        <p className="text-xs text-stone-500 dark:text-slate-400 mb-6 italic max-w-md mx-auto">💡 <strong>Quick Tip:</strong> Use WhatsApp ({process.env.REACT_APP_WHATSAPP_PHONE}) for fastest response, or call {process.env.REACT_APP_CONTACT_PHONE} anytime.</p>
        <button
          data-cal-link={selectedCounselling === 'online' ? 'nothingness-wb/online' : 'nothingness-wb/in-person'}
          data-cal-origin="https://cal.com"
          data-cal-config={JSON.stringify({ 
            layout: "month_view", 
            theme: darkMode ? "dark" : "light",
            cssVarsPerTheme: {
              light: { "cal-brand": "#a89968", "cal-brand-emphasis": "#7a6a48", "cal-bg": "#faf8f3", "cal-text": "#292524" },
              dark: { "cal-brand": "#d4af37", "cal-brand-emphasis": "#b8942d", "cal-bg": "#000000", "cal-bg-muted": "#0a0a0a", "cal-text": "#f1f5f9", "cal-border": "#2d2d2d" }
            }
          })}
          className="button-glass inline-flex items-center justify-center gap-2 text-sm md:text-base px-8 py-4 rounded-full font-medium z-30"
        >
          Open Booking Calendar
        </button>
      </GlowingCard>

      {/* Fallback email contact */}
      <div className="text-center text-xs md:text-sm text-stone-500 dark:text-slate-400 mt-8 mb-4">
        Prefer email? Reach out directly to <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`} className="text-stone-700 dark:text-slate-200 dark:text-slate-300 hover:text-stone-900 dark:text-slate-50 dark:hover:text-white underline">{process.env.REACT_APP_CONTACT_EMAIL}</a>
      </div>
    </section>
  );
}
