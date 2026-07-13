import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Calendar, BookOpen, Video, FileText, Menu, X, Moon, Sun } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { getCalApi } from "@calcom/embed-react";
import LiquidZenScene from './components/LiquidZenScene';

const App = () => {
  const [selectedCounselling, setSelectedCounselling] = useState('online');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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


  // Initialize Cal.com embed — re-runs whenever dark mode changes to sync theme
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ calOrigin: "https://cal.com" });
      cal("ui", {
        theme: darkMode ? "dark" : "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: {
            "cal-brand":           "#a89968",
            "cal-brand-emphasis":  "#7a6a48",
            "cal-bg":              "#faf8f3",
            "cal-text":            "#292524",
          },
          dark: {
            "cal-brand":           "#d4af37",
            "cal-brand-emphasis":  "#b8942d",
            "cal-bg":              "#000000",
            "cal-bg-muted":        "#0a0a0a",
            "cal-text":            "#f1f5f9",
            "cal-border":          "#2d2d2d",
          },
        },
      });
    })();
  }, [darkMode]);

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
    <div className={`${darkMode ? 'dark bg-black text-slate-50' : 'bg-stone-50 text-stone-900'} min-h-screen transition-colors duration-300`}>
      {/* Custom font styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Lora:wght@400;500&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Lora', serif;
          background-color: #faf8f3;
          color: #292524;
        }
        
        body.dark {
          background-color: #000000;
          color: #f1f5f9;
        }
        
        /* Dark mode color transitions - AMOLED style */
        .dark {
          --bg-primary: #000000;
          --bg-secondary: #0a0a0a;
          --bg-tertiary: #1a1a1a;
          --text-primary: #f1f5f9;
          --text-secondary: #cbd5e1;
          --border-color: #2d2d2d;
          --accent-light: #d4af37;
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
          box-shadow: 0 12px 24px rgba(255, 255, 255, 0.08);
        }
        
        .section-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #d4c5b9, transparent);
          margin: 4rem 0;
        }
        
        .dark .section-divider {
          background: linear-gradient(to right, transparent, #2d2d2d, transparent);
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
          background: #0a0a0a;
          border-color: #2d2d2d;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
        }
        
        /* Dark mode for cards and containers */
        .dark .bg-white {
          background-color: #0a0a0a;
          color: #f1f5f9;
        }
        
        .dark .bg-stone-100 {
          background-color: #1a1a1a;
        }
        
        .dark .border-stone-200 {
          border-color: #2d2d2d;
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
          background-color: #000000;
          border-top-color: #2d2d2d;
        }
        
        /* Dark mode button styling */
        .dark .button-primary {
          background: #2d2d2d;
          color: #f1f5f9;
        }
        
        .dark .button-primary:hover {
          background: #3d3d3d;
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
          background: #0a0a0a;
          border-color: #2d2d2d;
        }
        
        .dark .info-card:hover {
          border-color: #d4af37;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.8);
        }
        
        /* Dark mode CTA section */
        .dark .cta-section {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
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
        
        /* Dark mode intro description fix */
        .dark .hero-section p {
          color: #cbd5e1 !important;
        }
        
        /* Dark mode email section fix */
        .dark .text-stone-500 {
          color: #cbd5e1 !important;
        }
        
        .dark .text-stone-700 {
          color: #e2e8f0 !important;
        }
        
        /* DARK MODE RESOURCE CARDS & COMPONENTS */
        .dark .resource-card {
          background: #0a0a0a !important;
          border-color: #2d2d2d !important;
        }
        
        .dark .resource-card h4 {
          color: #f1f5f9 !important;
        }
        
        .dark .resource-card p {
          color: #cbd5e1 !important;
        }
        
        .dark .icon-wrapper {
          background: #1a1a1a !important;
          color: #cbd5e1 !important;
        }
        
        .dark .button-secondary {
          background: transparent !important;
          color: #cbd5e1 !important;
          border-color: #2d2d2d !important;
        }
        
        .dark .button-secondary:hover {
          background: #1a1a1a !important;
          color: #f1f5f9 !important;
        }
        
        .dark .toggle-active {
          background: #2d2d2d !important;
          color: #f1f5f9 !important;
        }
        
        .dark .toggle-inactive {
          background: #1a1a1a !important;
          color: #cbd5e1 !important;
        }
        
        .dark .toggle-inactive:hover {
          background: #2d2d2d !important;
          color: #f1f5f9 !important;
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
        
        /* Dark mode button styling */
        .dark-mode .button-secondary {
          color: #cbd5e1;
          border-color: #cbd5e1;
        }
        
        .dark-mode .button-secondary:hover {
          background: #cbd5e1;
          color: #1e293b;
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
        
        .dark-mode .resource-card {
          background: #1e293b;
          border-color: #334155;
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
          color: #000;
        }
        
        .dark-mode .icon-wrapper {
          background: #334155;
          color: #cbd5e1;
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
        
        /* =========================================
           LIQUID GLASS DESIGN SYSTEM 
           ========================================= */

        /* 1. Atmospheric Liquid Background (Hero Section) */
        .hero-section {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background-color: #faf8f3;
        }

        .dark .hero-section {
          background-color: var(--bg-primary, #000000);
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(168, 153, 104, 0.15) 0%, transparent 40%),
                      radial-gradient(circle at 80% 20%, rgba(0, 0, 0, 0.03) 0%, transparent 30%);
          animation: slowLiquidMove 20s ease-in-out infinite alternate;
          z-index: 0;
          will-change: transform;
          transform: translateZ(0);
        }

        .dark .hero-section::before {
          background: radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 40%),
                      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 30%);
        }

        @keyframes slowLiquidMove {
          0% { transform: translate(0, 0) scale(1) translateZ(0); }
          100% { transform: translate(-3%, 3%) scale(1.05) translateZ(0); }
        }

        /* 2. Glass Cards (Resources, Info boxes) */
        .glass-card {
          background: rgba(255, 255, 255, 0.6); 
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
          transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
          will-change: transform, box-shadow;
        }

        .dark .glass-card {
          background: rgba(255, 255, 255, 0.03); 
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.1);
          transform: translateY(-4px) translateZ(0);
          box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.1);
        }

        .dark .glass-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.5);
        }

        /* 3. Liquid Floating Navbar */
        .glass-nav {
          background: rgba(250, 248, 243, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 9999px;
          transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, background-color, box-shadow;
        }

        .dark .glass-nav {
          background: rgba(10, 10, 10, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .glass-nav-scrolled {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(168, 153, 104, 0.2); 
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .dark .glass-nav-scrolled {
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid rgba(212, 175, 55, 0.2); 
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        /* 4. Glass Buttons */
        .button-glass {
          background: rgba(168, 153, 104, 0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(168, 153, 104, 0.3);
          color: #a89968;
          transition: all 400ms ease;
          position: relative;
          overflow: hidden;
          will-change: transform, background-color;
        }

        .dark .button-glass {
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #d4af37;
        }

        .button-glass::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 150%;
          height: 150%;
          background: radial-gradient(circle, rgba(168, 153, 104, 0.2) 0%, transparent 60%);
          transform: translate(-50%, -50%) scale(0);
          transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          will-change: transform, opacity;
        }

        .dark .button-glass::after {
          background: radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 60%);
        }

        .button-glass:hover {
          background: rgba(168, 153, 104, 0.2);
          border-color: rgba(168, 153, 104, 0.6);
          box-shadow: 0 0 20px rgba(168, 153, 104, 0.15);
        }

        .dark .button-glass:hover {
          background: rgba(212, 175, 55, 0.2);
          border-color: rgba(212, 175, 55, 0.6);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.15);
        }

        .button-glass:hover::after {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
      `}</style>

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
        <LiquidZenScene darkMode={darkMode} />
        
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
        <section id="counselling" className="mb-20">
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
              data-cal-link={selectedCounselling === 'online' ? 'nothingness-wb/online' : 'nothingness-wb/in-person'}
              data-cal-origin="https://cal.com"
              data-cal-config={JSON.stringify({ layout: "month_view", theme: darkMode ? "dark" : "light" })}
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
        <section id="tutoring" className="mb-20">
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
              <a href="https://wa.me/918240213971?text=Hello%21%20I%27m%20interested%20in%20psychology%20tuitions%2E%20Could%20we%20discuss%20how%20it%20might%20work%3F" target="_blank" rel="noopener noreferrer" className="button-glass inline-flex items-center gap-2 text-sm md:text-base px-6 py-3 rounded-full font-medium">
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
      </div>

      {/* Testimonials Section */}
      <section className="py-16 px-6 relative z-10">
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
                Hazra More, Kalighat<br />
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
      <SpeedInsights />
      <Analytics />
    </div>
  );
};

export default App;
