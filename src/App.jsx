import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Calendar, BookOpen, Video, FileText, Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { getCalApi } from "@calcom/embed-react";
import LiquidZenScene from './components/LiquidZenScene';

const App = () => {
  const [selectedCounselling, setSelectedCounselling] = useState('online');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBursting, setIsBursting] = useState(false);

  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What is non-clinical counselling?",
      answer: "Non-clinical counselling focuses on personal growth, self-understanding, and navigating life's challenges without relying on medical diagnoses or clinical frameworks. It is a person-centred approach where we explore your experiences in a safe, non-judgmental space. Please note that it is not a substitute for psychiatric treatment or crisis intervention."
    },
    {
      question: "How do the psychology tutoring sessions work?",
      answer: "Tutoring sessions are designed around your specific curriculum and learning goals, whether you are in Class XI/XII, an undergraduate, or a postgraduate student. We move beyond rote learning, focusing on deep conceptual clarity and critical thinking through dialogue and practice."
    },
    {
      question: "Are sessions held online or in person?",
      answer: "Both options are available. Online sessions are conducted via video call, offering flexibility to suit your schedule. In-person sessions take place at our calm, welcoming space in Kalighat, Kolkata."
    },
    {
      question: "What are your fees?",
      answer: "Pricing is personalised and tailored to your circumstances, reflecting our commitment to accessible support. There is no one-size-fits-all approach. Please reach out to discuss what feels right and feasible for you."
    },
    {
      question: "How long is a typical session?",
      answer: "A standard counselling or tutoring session lasts for 50 to 60 minutes. We can adjust the frequency and duration based on your evolving needs and learning pace."
    }
  ];

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
  
  // Reintegrate cloud when window regains focus (e.g. returning from WhatsApp)
  useEffect(() => {
    const handleFocus = () => setIsBursting(false);
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const scrollTimeoutRef = React.useRef(null);
  const [darkModePreference, setDarkModePreference] = useState(() => {
    const saved = localStorage.getItem('darkModePreference');
    if (saved) return saved;
    return 'auto';
  });
  
  // Determine actual dark mode based on preference
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkModePreference');
    const pref = saved ? saved : 'auto';
    if (pref === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return pref === 'dark';
  });

  // Save dark mode preference to localStorage and update actual dark mode
  useEffect(() => {
    localStorage.setItem('darkModePreference', darkModePreference);
    
    let actualDarkMode;
    if (darkModePreference === 'auto') {
      actualDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      actualDarkMode = darkModePreference === 'dark';
    }
    
    setDarkMode(actualDarkMode);
    
    if (actualDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkModePreference]);
  
  // Listen for system dark mode changes when in auto mode
  useEffect(() => {
    if (darkModePreference !== 'auto') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const actualDarkMode = mediaQuery.matches;
      setDarkMode(actualDarkMode);
      if (actualDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [darkModePreference]);


  // Initialize Cal.com embed API once
  useEffect(() => {
    (async function () {
      await getCalApi({ calOrigin: "https://cal.com" });
    })();
  }, []);

  // Handle scroll for navbar shrink/expand with debounce
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setScrolled(window.scrollY > 100);
      }, 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Check if maintenance mode is enabled
  const maintenanceMode = process.env.REACT_APP_MAINTENANCE_MODE === 'true';

  // Maintenance Mode Page
  if (maintenanceMode) {
    return (
      <div className="bg-stone-50 text-stone-900 min-h-screen flex items-center justify-center px-6">

        <div className="max-w-md text-center">
          <img src="/logo.png" alt="Nothingness Well-Being" className="w-24 h-24 rounded-full object-cover mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">
            Nothingness<br />Well-Being
          </h1>
          <div className="w-10 h-0.5 bg-gradient-to-r from-stone-400 to-transparent mx-auto mb-8"></div>
          <h2 className="text-2xl md:text-3xl font-light mb-6">Coming Back Soon</h2>
          <p className="text-stone-600 mb-8 leading-relaxed">
            We're making some improvements to serve you better. Thank you for your patience.
          </p>
          <p className="text-sm text-stone-500 mb-6">
            In the meantime, feel free to reach out:
          </p>
          <div className="mt-6 space-y-2">
            <a href="https://wa.me/918240213971" target="_blank" rel="noopener noreferrer" className="block text-stone-600 hover:text-stone-900 transition py-2 px-4 rounded-lg hover:bg-stone-100">
              💬 WhatsApp: +91 82402 13971 (Preferred)
            </a>
            <a href="tel:+918902460513" className="block text-stone-600 hover:text-stone-900 transition py-2 px-4 rounded-lg hover:bg-stone-100">
              📞 Call: +91 89024 60513
            </a>
            <a href="mailto:circle5.nothingness@proton.me" className="block text-stone-600 hover:text-stone-900 transition py-2 px-4 rounded-lg hover:bg-stone-100">
              📧 circle5.nothingness@proton.me
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="fixed inset-0 z-0">
        <LiquidZenScene darkMode={darkMode} isBursting={isBursting} />
      </div>


      <div className={`relative z-10 min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-black/40 text-slate-50' : 'bg-stone-50/40 text-stone-900'}`}>
      
      {/* Navigation */}
      <nav className={`fixed z-50 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl transition-all duration-500 ease-in-out glass-nav ${scrolled ? 'top-2 py-2 glass-nav-scrolled' : 'top-6 py-4'}`}>
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <a href="/" className={`flex items-center gap-3 hover:opacity-80 transition ${scrolled ? 'scale-90' : 'scale-100'}`}>
            <img src="/logo.png" alt="Nothingness Well-Being" className={`rounded-full object-cover transition-all duration-300 ${scrolled ? 'w-8 h-8 md:w-9 md:h-9' : 'w-10 h-10 md:w-12 md:h-12'}`} />
          </a>
          
          {/* Desktop Navigation + Dark Mode Toggle */}
          <div className="hidden md:flex gap-6 items-center">
            <div className={`flex gap-8 transition-all duration-300 ${scrolled ? 'text-xs' : 'text-sm'}`}>
              <a href="#counselling" className={`${darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 hover:text-stone-900'} transition`}>Counselling</a>
              <a href="#tutoring" className={`${darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 hover:text-stone-900'} transition`}>Psychology Tutoring</a>
              <a href="#resources" className={`${darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 hover:text-stone-900'} transition`}>Resources</a>
            </div>
            
            {/* Theme Mode Selector */}
            <div className={`flex gap-1 p-1 rounded-lg transition ${darkMode ? 'bg-gray-900' : 'bg-stone-100'}`}>
              <button 
                onClick={() => setDarkModePreference('light')}
                className={`p-1.5 rounded transition ${darkModePreference === 'light' ? (darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-slate-700') : 'text-gray-500'}`}
                title="Light mode"
              >
                <Sun className={`transition-all duration-300 ${scrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
              </button>
              <button 
                onClick={() => setDarkModePreference('dark')}
                className={`p-1.5 rounded transition ${darkModePreference === 'dark' ? (darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-slate-700') : 'text-gray-500'}`}
                title="Dark mode"
              >
                <Moon className={`transition-all duration-300 ${scrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
              </button>
              <button 
                onClick={() => setDarkModePreference('auto')}
                className={`p-1.5 rounded transition flex items-center gap-1 text-xs ${darkModePreference === 'auto' ? (darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-slate-700') : 'text-gray-500'}`}
                title="Auto mode (system preference)"
              >
                Auto
              </button>
            </div>
          </div>

          {/* Mobile Menu Button + Dark Mode Toggle */}
          <div className="md:hidden flex gap-2 items-center">
            <div className={`flex gap-1 p-1 rounded-lg transition ${darkMode ? 'bg-gray-900' : 'bg-stone-100'}`}>
              <button 
                onClick={() => setDarkModePreference('light')}
                className={`p-1 rounded transition ${darkModePreference === 'light' ? (darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-slate-700') : 'text-gray-500'}`}
                title="Light mode"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setDarkModePreference('dark')}
                className={`p-1 rounded transition ${darkModePreference === 'dark' ? (darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-slate-700') : 'text-gray-500'}`}
                title="Dark mode"
              >
                <Moon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setDarkModePreference('auto')}
                className={`p-1 rounded transition text-xs ${darkModePreference === 'auto' ? (darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-slate-700') : 'text-gray-500'}`}
                title="Auto mode"
              >
                A
              </button>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-stone-100'}`}
            >
              {mobileMenuOpen ? (
                <X className={`w-5 h-5 ${darkMode ? 'text-slate-300' : 'text-stone-600'}`} />
              ) : (
                <Menu className={`w-5 h-5 ${darkMode ? 'text-slate-300' : 'text-stone-600'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu md:hidden absolute top-full left-0 right-0 mt-4 mx-4 glass-card rounded-2xl overflow-hidden border-opacity-50">
            <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3">
              <a 
                href="#counselling" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm transition py-2 ${darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 hover:text-stone-900'}`}
              >
                Counselling
              </a>
              <a 
                href="#tutoring" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm transition py-2 ${darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 hover:text-stone-900'}`}
              >
                Psychology Tutoring
              </a>
              <a 
                href="#resources" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm transition py-2 ${darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 hover:text-stone-900'}`}
              >
                Resources
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-section relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10 pointer-events-none">
          <h2 className={`text-4xl md:text-6xl font-light mb-4 tracking-tight fade-in stagger-1 ${darkMode ? 'text-slate-50' : 'text-stone-900'}`}>
            Nothingness<br />Well-Being
          </h2>
          <div className="zen-line fade-in stagger-2"></div>
          <p className={`text-base md:text-lg mt-8 leading-relaxed max-w-xl mx-auto font-light fade-in stagger-3 ${darkMode ? 'text-slate-300' : 'text-stone-700'}`}>
            Non-clinical counselling and psychology tutoring based on being present with the person. A place where the self dissolves down into clarity, healing, and understanding.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* COUNSELLING SECTION */}
        <section id="counselling" className="mb-20 reveal-on-scroll">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-light mb-3">Counselling</h3>
            <div className="zen-line"></div>
            <p className="text-stone-600 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              Non-clinical counselling that focuses on the person and respects your experience without judging you. Sessions that are tailored to your needs, either online or in person. Meet yourself with kindness.
            </p>
          </div>

          {/* Toggle for Online/In-person */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
            <button
              onClick={() => {
                setSelectedCounselling('online');
              }}
              className={`px-4 md:px-6 py-2 rounded-full transition toggle-button text-sm md:text-base ${
                selectedCounselling === 'online'
                  ? 'toggle-active'
                  : 'toggle-inactive'
              }`}
            >
              Online Sessions
            </button>
            <button
              onClick={() => {
                setSelectedCounselling('inperson');
              }}
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
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
            <div className="info-card hover-lift glass-card">
              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-stone-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-base md:text-lg font-medium mb-2">Flexible Scheduling</h4>
                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                    {selectedCounselling === 'online'
                      ? 'Book online sessions at times that suit your rhythm. Sessions via video call, with flexibility around your life.'
                      : 'Available for in-person sessions in Kolkata. A calm, welcoming space designed for authentic dialogue.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="info-card hover-lift glass-card">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-stone-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-base md:text-lg font-medium mb-2">Personalised Approach</h4>
                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                    Pricing tailored to your circumstances. No one-size-fits-all. Reach out to explore what feels right for you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Info for In-person */}
          {selectedCounselling === 'inperson' && (
            <div className="glass-card p-6 rounded-2xl mb-10 fade-in">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-stone-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-stone-900 text-sm md:text-base">Kolkata, Hazra More, Kalighat</p>
                  <p className={`text-xs md:text-sm mt-1 ${darkMode ? 'text-slate-300' : 'text-stone-600'}`}>Near Kalighat Fire Station, 700026</p>
                  <p className="text-xs text-stone-500 mt-2 italic">(Exact location confirmed upon booking)</p>
                </div>
              </div>
            </div>
          )}

          {/* Booking Section */}
          <div className="cta-section mb-8">
            <h4 className="text-lg md:text-xl font-light mb-4">Book Your First Session</h4>
            <p className="text-xs text-stone-500 mb-4 italic">💡 <strong>Quick Tip:</strong> Use WhatsApp (+91 82402 13971) for fastest response, or call +91 89024 60513 anytime.</p>
            <button
              onClick={() => setIsBursting(true)}
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
              className="button-glass inline-flex items-center gap-2 text-sm md:text-base px-6 py-3 rounded-full font-medium"
            >
              Open Booking Calendar
            </button>
          </div>

          {/* Fallback email contact */}
          <div className="text-center text-xs md:text-sm text-stone-500 mt-6">
            Prefer email? Reach out directly to <a href="mailto:circle5.nothingness@proton.me" className="text-stone-700 hover:text-stone-900 underline">circle5.nothingness@proton.me</a>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* TUTORING SECTION */}
        <section id="tutoring" className="mb-20 reveal-on-scroll">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-light mb-3">Psychology Tutoring</h3>
            <div className="zen-line"></div>
            <p className="text-stone-600 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              Non-clinical psychology tutoring for <strong>Class XI onwards</strong>—high school, undergraduate, postgraduate, and beyond. 
              Building understanding from the ground up. Learning as dialogue.
            </p>
          </div>

          {/* Tutoring Info */}
          <div className="glass-card p-6 md:p-10 rounded-2xl mb-10">
            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
              <div>
                <h4 className="text-base md:text-lg font-medium mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  What We Cover
                </h4>
                <ul className="text-stone-600 space-y-2 text-xs md:text-sm leading-relaxed">
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
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                  Get in touch to discuss your learning goals, current curriculum, and pace. Whether you're a high school student preparing for boards, a college student deepening your understanding, or a postgraduate exploring research—tutoring sessions are designed around what you need, not a template. We explore psychology concepts through dialogue, examples, and practice. We build a learning relationship that respects your journey at every stage.
                </p>
              </div>
            </div>
          </div>

          {/* Tutoring CTA */}
          <div className="cta-section">
            <p className="text-stone-600 mb-4 text-sm md:text-base">Ready to explore Psychology together?</p>
            <div className="flex flex-col gap-4 items-center">
              <a href="https://wa.me/918240213971?text=Hello%21%20I%27m%20interested%20in%20psychology%20tuitions%2E%20Could%20we%20discuss%20how%20it%20might%20work%3F" target="_blank" rel="noopener noreferrer" onClick={() => setIsBursting(true)} className="button-glass inline-flex items-center gap-2 text-sm md:text-base px-6 py-3 rounded-full font-medium">
                💬 WhatsApp / Call
              </a>
              <p className="text-xs text-stone-500">
                Or email: circle5.nothingness@proton.me
              </p>
            </div>
            <p className="text-xs text-stone-500 mt-4">
              We'll discuss your goals, curriculum, availability, and the best approach for you.
            </p>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* RESOURCES SECTION */}
        <section id="resources" className="mb-20 reveal-on-scroll">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-light mb-3">Resources & Learning</h3>
            <div className="zen-line"></div>
            <p className="text-stone-600 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              Free and open materials—videos, writing, and reflections to support your journey. Coming soon.
            </p>
          </div>

          {/* Resource Cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="resource-card hover-lift glass-card">
              <div className="icon-wrapper">
                <Video className="w-7 h-7" />
              </div>
              <h4 className="text-base md:text-lg font-medium mb-2">YouTube Channel</h4>
              <p className="text-stone-600 text-xs md:text-sm mb-6 leading-relaxed">
                Video reflections, guided meditations, and teachings on psychology, counselling, and well-being.
              </p>
              <button className="button-secondary text-xs md:text-sm cursor-default">Coming Soon</button>
            </div>

            <div className="resource-card hover-lift glass-card">
              <div className="icon-wrapper">
                <FileText className="w-7 h-7" />
              </div>
              <h4 className="text-base md:text-lg font-medium mb-2">Blog & Writing</h4>
              <p className="text-stone-600 text-xs md:text-sm mb-6 leading-relaxed">
                Thoughts on person-centred practice, psychology, and the deeper aspects of healing and presence.
              </p>
              <button className="button-secondary text-xs md:text-sm cursor-default">Coming Soon</button>
            </div>

            <div className="resource-card hover-lift glass-card">
              <div className="icon-wrapper">
                <BookOpen className="w-7 h-7" />
              </div>
              <h4 className="text-base md:text-lg font-medium mb-2">Learning Materials</h4>
              <p className="text-stone-600 text-xs md:text-sm mb-6 leading-relaxed">
                Curated articles, frameworks, research guides, and resources for independent study.
              </p>
              <button className="button-secondary text-xs md:text-sm cursor-default">Coming Soon</button>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* FAQ SECTION */}
        <section id="faq" className="mb-20 reveal-on-scroll">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-light mb-3">Frequently Asked Questions</h3>
            <div className="zen-line"></div>
            <p className="text-stone-600 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              Answers to some common questions about our practice.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((item, index) => (
              <div 
                key={index} 
                className="glass-card rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <div className="p-5 md:p-6 flex justify-between items-center gap-4">
                  <h4 className={`text-base md:text-lg font-medium ${darkMode ? 'text-slate-50' : 'text-stone-900'}`}>{item.question}</h4>
                  <div className={`transition-transform duration-300 flex-shrink-0 ${expandedFaq === index ? 'rotate-180' : ''}`}>
                    <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-stone-500'}`} />
                  </div>
                </div>
                <div className={`faq-answer ${expandedFaq === index ? 'open' : ''}`}>
                  <div className="faq-answer-inner">
                    <div className="px-5 md:px-6 pb-6 pt-0">
                      <div className="w-full h-px bg-stone-200 dark:bg-white/10 mb-4"></div>
                      <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-stone-600'}`}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Testimonials Section */}
      <section className="py-16 px-6 relative z-10 reveal-on-scroll">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className={`text-3xl md:text-4xl font-light mb-3 ${darkMode ? 'text-slate-50' : 'text-stone-900'}`}>What Others Say</h3>
            <div className="zen-line"></div>
            <p className={`${darkMode ? 'text-slate-400' : 'text-stone-600'} mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base`}>
              Real experiences from people on their journey towards clarity and presence.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-block px-8 py-6 rounded-2xl glass-card">
              <p className={`${darkMode ? 'text-slate-300' : 'text-stone-600'} text-sm md:text-base italic`}>
                We're gathering real feedback from our clients. Check back soon to see what they have to say.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 py-12 border-t border-stone-200 dark:border-white/10 transition-colors duration-500 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className={`font-light text-base md:text-lg mb-4 ${darkMode ? 'text-slate-50' : 'text-stone-900'}`}>Nothingness Well-Being</h4>
              <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-stone-600'}`}>
                Non-clinical counselling and psychology tutoring that focuses on the person. A practice based on being present, being clear, and making authentic connections.
              </p>
            </div>
            <div>
              <h4 className={`font-light text-base md:text-lg mb-4 ${darkMode ? 'text-slate-50' : 'text-stone-900'}`}>Contact</h4>
              <div className="mb-3">
                <p className={`text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>Primary Contact</p>
                <a href="tel:+918902460513" className={`text-xs md:text-sm hover:opacity-70 transition flex items-center gap-2 ${darkMode ? 'text-slate-300' : 'text-stone-600'}`}>
                  📞 +91 89024 60513 (Calls & Messages)
                </a>
              </div>
              <div className="mb-3">
                <p className={`text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>WhatsApp Preferred</p>
                <a href="https://wa.me/918240213971" target="_blank" rel="noopener noreferrer" className={`text-xs md:text-sm hover:opacity-70 transition flex items-center gap-2 ${darkMode ? 'text-slate-300' : 'text-stone-600'}`}>
                  💬 +91 82402 13971 (WhatsApp Direct)
                </a>
              </div>
              <a href="mailto:circle5.nothingness@proton.me" className={`text-xs md:text-sm hover:opacity-70 transition flex items-center gap-2 mb-3 ${darkMode ? 'text-slate-300' : 'text-stone-600'}`}>
                <Mail className="w-4 h-4 flex-shrink-0" />
                circle5.nothingness@proton.me
              </a>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>
                Response within 24-48 hours
              </p>
            </div>
            <div>
              <h4 className={`font-light text-base md:text-lg mb-4 ${darkMode ? 'text-slate-50' : 'text-stone-900'}`}>Location</h4>
              <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-stone-600'}`}>
                Near Kalighat Fire Station<br />
                Kolkata, India 700026<br />
              </p>
              <p className={`text-xs mt-2 ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>In-person & Online</p>
            </div>
          </div>
          
          <div className="border-t border-stone-200 dark:border-white/10 pt-8">
            <p className={`text-xs text-center leading-relaxed ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>
              © 2026 Nothingness Well-Being. All practices rooted in presence, clarity, and the courage to be fully yourself.
            </p>
          </div>
        </div>
      </footer>
      </div>
      <SpeedInsights />
      <Analytics />
    </div>
  );
};

export default App;
