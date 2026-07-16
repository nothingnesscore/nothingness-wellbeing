import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { getCalApi } from "@calcom/embed-react";

import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { AppDashboard } from './pages/AppDashboard';
import { BackgroundAnimation } from './components/animations/BackgroundAnimation';

const AppContent = () => {
  const { darkMode } = useTheme();

  // Initialize Cal.com embed API once
  useEffect(() => {
    (async function () {
      await getCalApi({ calOrigin: "https://cal.com" });
    })();
  }, []);

  return (
    <div className={`relative min-h-screen transition-colors duration-500 overflow-hidden ${darkMode ? 'text-slate-50 bg-[#050505]' : 'text-stone-900 bg-[#faf8f3]'}`}>
      <BackgroundAnimation />
      
      <Navbar />
      <main className="relative z-10 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/app" element={<AppDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
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
    <ThemeProvider>
      <Router>
        <AppContent />
        <SpeedInsights />
        <Analytics />
      </Router>
    </ThemeProvider>
  );
};

export default App;
