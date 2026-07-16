import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { TabBar } from '../animations/TabBar';

export function Navbar() {
  const { darkMode, darkModePreference, setDarkModePreference } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    if (location.pathname === '/blog') setActiveTab('blog');
    else if (location.pathname === '/app') setActiveTab('app');
    else setActiveTab('counselling');
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  
  const tabs = isHome ? [
    { id: 'counselling', label: 'Counselling' },
    { id: 'tutoring', label: 'Psychology Tutoring' },
    { id: 'resources', label: 'Resources' }
  ] : [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'blog', label: 'Blog', path: '/blog' },
    { id: 'app', label: 'App', path: '/app' }
  ];

  return (
    <nav className={`fixed z-50 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl transition-all duration-500 ease-in-out glass-nav ${scrolled ? 'top-2 py-2 glass-nav-scrolled' : 'top-6 py-4'}`}>
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className={`flex items-center gap-3 hover:opacity-80 transition ${scrolled ? 'scale-90' : 'scale-100'}`}>
          <img src="/logo.png" alt="Nothingness Well-Being" className={`rounded-full object-cover transition-all duration-300 ${scrolled ? 'w-8 h-8 md:w-9 md:h-9' : 'w-10 h-10 md:w-12 md:h-12'}`} />
        </Link>
        
        {/* Desktop Navigation + Dark Mode Toggle */}
        <div className="hidden md:flex gap-6 items-center">
          <TabBar 
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={(id) => {
              if (isHome) {
                setActiveTab(id);
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            darkMode={darkMode}
            scrolled={scrolled}
            asLink={!isHome}
          />
          
          {isHome && (
            <div className={`flex items-center gap-4 text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-stone-600'}`}>
              <Link to="/blog" className="hover:text-stone-900 dark:hover:text-white transition">Blog</Link>
              <Link to="/app" className="hover:text-stone-900 dark:hover:text-white transition">App</Link>
            </div>
          )}
          
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
        <div className="mobile-menu md:hidden absolute top-full left-0 right-0 mt-4 mx-4 bg-white/95 dark:bg-[#050505]/95 backdrop-blur-2xl border border-stone-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3">
            {tabs.filter(tab => tab.id !== 'blog').map((tab) => (
              <React.Fragment key={tab.id}>
                {isHome ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveTab(tab.id);
                      document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`text-sm text-left transition py-2 ${
                      darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ) : (
                  <Link
                    to={tab.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm transition py-2 ${
                      darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {tab.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
            
            {isHome && (
              <>
                <div className={`h-px w-full my-1 ${darkMode ? 'bg-white/10' : 'bg-stone-200'}`}></div>
                <Link
                  to="/app"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm transition py-2 font-medium ${
                    darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  App
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
