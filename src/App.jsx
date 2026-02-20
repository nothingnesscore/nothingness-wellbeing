import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Calendar, BookOpen, Video, FileText, ChevronDown, Menu, X, Moon, Sun } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  const [selectedCounselling, setSelectedCounselling] = useState('online');
  const [showCalendly, setShowCalendly] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Check if maintenance mode is enabled
  const maintenanceMode = process.env.REACT_APP_MAINTENANCE_MODE === 'true';

  useEffect(() => {
    // Load Calendly script if showing
    if (showCalendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [showCalendly]);

  // Maintenance Mode Page
  if (maintenanceMode) {
    return (
      <div className="bg-stone-50 text-stone-900 min-h-screen flex items-center justify-center px-6">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Lora:wght@400;500&display=swap');
          
          body {
            font-family: 'Lora', serif;
            background-color: #faf8f3;
            color: #292524;
          }
          
          h1, h2 {
            font-family: 'Playfair Display', serif;
            font-weight: 400;
            letter-spacing: 0.5px;
          }
        `}</style>
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
    <div className={`${darkMode ? 'dark bg-slate-950 text-slate-50' : 'bg-stone-50 text-stone-900'} min-h-screen transition-colors duration-300`}>
      {/* Custom font styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Lora:wght@400;500&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Lora', serif;
          background-color: #faf8f3;
          color: #292524;
        }
        
        body.dark {
          background-color: #0f172a;
          color: #f1f5f9;
        }
        
        /* Dark mode color transitions */
        .dark {
          --bg-primary: #0f172a;
          --bg-secondary: #1e293b;
          --bg-tertiary: #334155;
          --text-primary: #f1f5f9;
          --text-secondary: #cbd5e1;
          --border-color: #475569;
          --accent-light: #a89968;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Playfair Display', serif;
          font-weight: 400;
          letter-spacing: 0.5px;
        }
        
        .dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6 {
          color: #f1f5f9;
        }
        
        .zen-line {
          width: 40px;
          height: 1px;
          background: linear-gradient(to right, #a89968, transparent);
          margin: 0.75rem auto;
        }
        
        .dark .zen-line {
          background: linear-gradient(to right, #d4af37, transparent);
        }
        
        .zen-line-left {
          margin-left: 0;
          margin-right: auto;
        }
        
        .hero-section {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #faf8f3 0%, #f5f1e8 100%);
          position: relative;
          overflow: hidden;
        }
        
        .dark .hero-section {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        
        .circle-accent {
          position: absolute;
          border-radius: 50%;
          opacity: 0.08;
        }
        
        .circle-1 {
          width: 400px;
          height: 400px;
          background: #a89968;
          top: -100px;
          right: -100px;
          animation: floatSlowly 6s ease-in-out infinite;
        }
        
        .circle-2 {
          width: 300px;
          height: 300px;
          background: #7a7a7a;
          bottom: -80px;
          left: -80px;
          animation: floatSlowly 8s ease-in-out infinite;
        }
        
        @keyframes floatSlowly {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        
        .fade-in {
          animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }
        
        .dark .hover-lift:hover {
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
        }
        
        .section-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #d4c5b9, transparent);
          margin: 4rem 0;
        }
        
        .dark .section-divider {
          background: linear-gradient(to right, transparent, #64748b, transparent);
        }
        
        .calendly-container {
          background: white;
          border-radius: 8px;
          padding: 2rem;
          margin-top: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
          border: 1px solid #efe9e0;
          animation: slideInDown 0.5s ease-out;
        }
        
        .dark .calendly-container {
          background: #1e293b;
          border-color: #334155;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }
        
        /* Dark mode for cards and containers */
        .dark .bg-white {
          background-color: #1e293b;
          color: #f1f5f9;
        }
        
        .dark .bg-stone-100 {
          background-color: #334155;
        }
        
        .dark .border-stone-200 {
          border-color: #475569;
        }
        
        .dark .text-stone-600 {
          color: #cbd5e1;
        }
        
        .dark .text-stone-900 {
          color: #f1f5f9;
        }
        
        .dark .text-stone-400 {
          color: #94a3b8;
        }
        
        .dark .text-stone-500 {
          color: #94a3b8;
        }
        
        .dark footer {
          background-color: #0f172a;
          border-top-color: #334155;
        }
        
        /* Dark mode button styling */
        .dark .button-primary {
          background: #4c5a6b;
          color: #f1f5f9;
        }
        
        .dark .button-primary:hover {
          background: #5a6b7f;
        }
        
        .dark .button-secondary {
          color: #cbd5e1;
          border-color: #475569;
        }
        
        .dark .button-secondary:hover {
          background-color: #334155;
          color: #f1f5f9;
        }
        
        /* Dark mode section styling */
        .dark .section-divider {
          background: linear-gradient(to right, transparent, #475569, transparent);
        }
        
        /* Dark mode info cards */
        .dark .info-card {
          background: #1e293b;
          border-color: #334155;
        }
        
        .dark .info-card:hover {
          border-color: #475569;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
        }
        
        /* Dark mode CTA section */
        .dark .cta-section {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        }
        
        /* Dark mode section backgrounds */
        .dark section {
          background-color: transparent;
        }
        
        .dark .mobile-menu {
          background-color: #1e293b;
        }
        
        /* Dark mode footer links and text */
        .dark .text-stone-300 {
          color: #cbd5e1;
        }
        
        .dark .text-stone-300:hover {
          color: #f1f5f9;
        }
        
        .dark .text-stone-50 {
          color: #f1f5f9;
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .button-primary {
          background: #7a7a7a;
          color: white;
          padding: 0.875rem 1.75rem;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          font-family: 'Lora', serif;
          font-size: 1rem;
          transition: all 0.3s ease;
          letter-spacing: 0.3px;
        }
        
        .button-primary:hover {
          background: #5a5a5a;
          transform: translateY(-1px);
        }
        
        .button-primary:active {
          transform: translateY(0);
        }
        
        .button-secondary {
          background: transparent;
          color: #7a7a7a;
          padding: 0.75rem 1.5rem;
          border: 1px solid #7a7a7a;
          border-radius: 4px;
          cursor: pointer;
          font-family: 'Lora', serif;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .button-secondary:hover {
          background: #7a7a7a;
          color: white;
        }
        
        .toggle-button {
          px-6 py-2;
          rounded-full;
          transition: all 0.3s ease;
          font-family: 'Lora', serif;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
          letter-spacing: 0.3px;
        }
        
        .toggle-active {
          background: #7a7a7a;
          color: white;
        }
        
        .toggle-inactive {
          background: #f3f0ec;
          color: #7a7a7a;
        }
        
        .toggle-inactive:hover {
          background: #e8e3d9;
        }
        
        .resource-card {
          text-align: center;
          padding: 2rem 1.5rem;
          background: white;
          border-radius: 8px;
          transition: all 0.3s ease;
          border: 1px solid #efe9e0;
        }
        
        .resource-card:hover {
          border-color: #a89968;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
        }
        
        .icon-wrapper {
          width: 60px;
          height: 60px;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f1e8;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .resource-card:hover .icon-wrapper {
          background: #a89968;
          color: white;
        }
        
        .cta-section {
          text-align: center;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(168, 153, 104, 0.04) 0%, rgba(122, 122, 122, 0.04) 100%);
          border-radius: 8px;
          border: 1px solid #efe9e0;
        }
        
        .info-card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          border: 1px solid #efe9e0;
          transition: all 0.3s ease;
        }
        
        .info-card:hover {
          border-color: #a89968;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
        }
        
        .dark .info-card {
          background: #1e293b;
          border-color: #334155;
        }
        
        .dark .info-card:hover {
          border-color: #d4af37;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        }

        .mobile-menu {
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className={`sticky top-0 ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-stone-50 border-stone-200'} bg-opacity-95 backdrop-blur-sm z-50 border-b border-opacity-30 transition-colors duration-300`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <img src="/logo.png" alt="Nothingness Well-Being" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
            <h1 className={`text-xl md:text-2xl font-light tracking-wide ${darkMode ? 'text-slate-50' : 'text-stone-900'}`}>Nothingness</h1>
          </a>
          
          {/* Desktop Navigation + Dark Mode Toggle */}
          <div className="hidden md:flex gap-6 items-center">
            <div className="flex gap-8 text-sm">
              <a href="#counselling" className={`${darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 hover:text-stone-900'} transition`}>Counselling</a>
              <a href="#tutoring" className={`${darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 hover:text-stone-900'} transition`}>Psychology Tutoring</a>
              <a href="#resources" className={`${darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 hover:text-stone-900'} transition`}>Resources</a>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-stone-100 text-slate-700 hover:bg-stone-200'}`}
              title="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button + Dark Mode Toggle */}
          <div className="md:hidden flex gap-2 items-center">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-stone-100 text-slate-700 hover:bg-stone-200'}`}
              title="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
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
          <div className={`mobile-menu md:hidden ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-stone-200'} border-t border-opacity-30`}>
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
      <section className="hero-section">
        <div className="circle-accent circle-1"></div>
        <div className="circle-accent circle-2"></div>
        
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-light mb-4 tracking-tight fade-in stagger-1">
            Nothingness<br />Well-Being
          </h2>
          <div className="zen-line fade-in stagger-2"></div>
          <p className="text-base md:text-lg text-stone-700 mt-8 leading-relaxed max-w-xl mx-auto font-light fade-in stagger-3">
            Counselling and psychology tutoring rooted in person-centred presence. 
            A space where the self dissolves into clarity, healing, and understanding.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* COUNSELLING SECTION */}
        <section id="counselling" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-light mb-3">Counselling</h3>
            <div className="zen-line"></div>
            <p className="text-stone-600 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              Person-centred counselling that honours your experience without judgment. 
              Online or in-person sessions tailored to your needs. Meet yourself with kindness.
            </p>
          </div>

          {/* Toggle for Online/In-person */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
            <button
              onClick={() => {
                setSelectedCounselling('online');
                setShowCalendly(false);
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
                setShowCalendly(false);
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
            <div className="info-card hover-lift">
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

            <div className="info-card hover-lift">
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
            <div className="bg-stone-100 bg-opacity-40 p-6 rounded-lg mb-10 border border-stone-200 border-opacity-30 fade-in">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-stone-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-stone-900 text-sm md:text-base">Kolkata, Hazra More, Kalighat</p>
                  <p className="text-xs md:text-sm text-stone-600 mt-1">Behind Khirode Ghosh Market, 700026</p>
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
              onClick={() => setShowCalendly(!showCalendly)}
              className="button-primary inline-flex items-center gap-2 text-sm md:text-base"
            >
              {showCalendly ? 'Hide Calendar' : 'Open Booking Calendar'}
              <ChevronDown className={`w-4 h-4 transition-transform ${showCalendly ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Calendly Embed */}
          {showCalendly && (
            <div className="calendly-container">
              <div style={{ position: 'relative', paddingBottom: '100%', height: 0, overflow: 'hidden' }}>
                <iframe
                  title="Book a Counselling Session"
                  src={`https://calendly.com/circle5-nothingness/${selectedCounselling === 'online' ? 'online' : 'inperson'}?hide_event_type_details=1&hide_gdpr_banner=1`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  frameBorder="0"
                  scrolling="no"
                ></iframe>
              </div>
              <p className="text-xs text-stone-500 text-center mt-4">
                Adjust the calendar if needed. For any questions, email circle5.nothingness@proton.me
              </p>
            </div>
          )}

          {/* Fallback if Calendly not used */}
          {!showCalendly && (
            <div className="text-center text-xs md:text-sm text-stone-500 mt-6">
              Prefer email? Reach out directly to <a href="mailto:circle5.nothingness@proton.me" className="text-stone-700 hover:text-stone-900 underline">circle5.nothingness@proton.me</a>
            </div>
          )}
        </section>

        <div className="section-divider"></div>

        {/* TUTORING SECTION */}
        <section id="tutoring" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-light mb-3">Psychology Tutoring</h3>
            <div className="zen-line"></div>
            <p className="text-stone-600 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              Personalized tutoring in psychology for <strong>Class XI onwards</strong>—high school, undergraduate, postgraduate, and beyond. 
              Building understanding from the ground up, without pretence. Learning as dialogue, not transmission.
            </p>
          </div>

          {/* Tutoring Info */}
          <div className="bg-white p-6 md:p-10 rounded-lg border border-stone-200 border-opacity-50 mb-10">
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
              <a href="https://wa.me/918240213971?text=Hello%21%20I%27m%20interested%20in%20psychology%20tuitions%2E%20Could%20we%20discuss%20how%20it%20might%20work%3F" target="_blank" rel="noopener noreferrer" className="button-primary inline-flex items-center gap-2 text-sm md:text-base">
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
        <section id="resources" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-light mb-3">Resources & Learning</h3>
            <div className="zen-line"></div>
            <p className="text-stone-600 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              Free and open materials—videos, writing, and reflections to support your journey. Coming soon.
            </p>
          </div>

          {/* Resource Cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="resource-card hover-lift">
              <div className="icon-wrapper">
                <Video className="w-7 h-7" />
              </div>
              <h4 className="text-base md:text-lg font-medium mb-2">YouTube Channel</h4>
              <p className="text-stone-600 text-xs md:text-sm mb-6 leading-relaxed">
                Video reflections, guided meditations, and teachings on psychology, counselling, and well-being.
              </p>
              <button className="button-secondary text-xs md:text-sm cursor-default">Coming Soon</button>
            </div>

            <div className="resource-card hover-lift">
              <div className="icon-wrapper">
                <FileText className="w-7 h-7" />
              </div>
              <h4 className="text-base md:text-lg font-medium mb-2">Blog & Writing</h4>
              <p className="text-stone-600 text-xs md:text-sm mb-6 leading-relaxed">
                Thoughts on person-centred practice, psychology, and the deeper aspects of healing and presence.
              </p>
              <button className="button-secondary text-xs md:text-sm cursor-default">Coming Soon</button>
            </div>

            <div className="resource-card hover-lift">
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
      </div>

      {/* Testimonials Section */}
      <section className={`${darkMode ? 'bg-slate-900' : 'bg-stone-100 bg-opacity-50'} py-16 px-6`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className={`text-3xl md:text-4xl font-light mb-3 ${darkMode ? 'text-slate-50' : 'text-stone-900'}`}>What Others Say</h3>
            <div className="zen-line"></div>
            <p className={`${darkMode ? 'text-slate-400' : 'text-stone-600'} mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base`}>
              Real experiences from people on their journey towards clarity and presence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                quote: "The sessions helped me understand myself better. No judgement, just genuine listening.",
                author: "Priya S.",
                role: "College Student"
              },
              {
                quote: "Finally found someone who understands psychology not just academically, but deeply.",
                author: "Arjun M.",
                role: "Psychology Major"
              },
              {
                quote: "The person-centred approach made all the difference. I felt truly heard.",
                author: "Meera K.",
                role: "Working Professional"
              }
            ].map((testimonial, idx) => (
              <div 
                key={idx}
                className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-stone-200'} p-6 rounded-lg border info-card`}
              >
                <p className={`${darkMode ? 'text-slate-300' : 'text-stone-600'} text-sm md:text-base leading-relaxed mb-4 italic`}>
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className={`${darkMode ? 'text-slate-50' : 'text-stone-900'} text-sm md:text-base font-medium`}>
                    {testimonial.author}
                  </p>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-stone-500'} text-xs md:text-sm`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={`${darkMode ? 'bg-slate-950' : 'bg-gradient-to-r from-stone-900 to-stone-800'} py-16 px-6 text-white`}>
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-light mb-3">Stay Connected</h3>
          <div className="zen-line"></div>
          <p className="text-slate-300 mt-6 mb-8 leading-relaxed text-sm md:text-base">
            Get insights, reflections, and updates on new resources. No spam, just presence-centered content.
          </p>
          
          <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); alert('Thank you! Newsletter signup coming soon.'); }}>
            <input
              type="email"
              placeholder="your@email.com"
              className="px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-950 font-medium rounded-lg hover:from-yellow-500 hover:to-yellow-400 transition"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-xs text-slate-400 mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-50 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-light text-base md:text-lg mb-4">Nothingness Well-Being</h4>
              <p className="text-stone-300 text-xs md:text-sm leading-relaxed">
                Person-centred counselling and psychology tutoring. A practice rooted in presence, clarity, and authentic connection.
              </p>
            </div>
            <div>
              <h4 className="font-light text-base md:text-lg mb-4">Contact</h4>
              <div className="mb-3">
                <p className="text-stone-400 text-xs mb-1">Primary Contact</p>
                <a href="tel:+918902460513" className="text-stone-300 text-xs md:text-sm hover:text-stone-50 transition flex items-center gap-2">
                  📞 +91 89024 60513 (Calls & Messages)
                </a>
              </div>
              <div className="mb-3">
                <p className="text-stone-400 text-xs mb-1">WhatsApp Preferred</p>
                <a href="https://wa.me/918240213971" target="_blank" rel="noopener noreferrer" className="text-stone-300 text-xs md:text-sm hover:text-stone-50 transition flex items-center gap-2">
                  💬 +91 82402 13971 (WhatsApp Direct)
                </a>
              </div>
              <a href="mailto:circle5.nothingness@proton.me" className="text-stone-300 text-xs md:text-sm hover:text-stone-50 transition flex items-center gap-2 mb-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                circle5.nothingness@proton.me
              </a>
              <p className="text-stone-400 text-xs">
                Response within 24-48 hours
              </p>
            </div>
            <div>
              <h4 className="font-light text-base md:text-lg mb-4">Location</h4>
              <p className="text-stone-300 text-xs md:text-sm leading-relaxed">
                Hazra More, Kalighat<br />
                Kolkata, India 700026<br />
              </p>
              <p className="text-stone-400 text-xs mt-2">In-person & Online</p>
            </div>
          </div>
          
          <div className="border-t border-stone-800 pt-8">
            <p className="text-stone-400 text-xs text-center leading-relaxed">
              © 2026 Nothingness Well-Being. All practices rooted in presence, clarity, and the courage to be fully yourself.
            </p>
          </div>
        </div>
      </footer>
      <SpeedInsights />
      <Analytics />
    </div>
  );
};

export default App;
