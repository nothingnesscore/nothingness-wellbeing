import React from 'react';
import { Activity } from 'lucide-react';

export function AppDashboard() {


  return (
    <div className="max-w-5xl mx-auto px-6 py-32 min-h-[85vh]">
      <div className="text-center mb-16 fade-in">
        <h1 className="text-4xl md:text-5xl font-light mb-4">Well-Being App</h1>
        <div className="zen-line"></div>
        <p className="text-stone-600 dark:text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed">
          Your personal space for reflection, progress, and resources.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center p-12 glass-card rounded-2xl w-full text-center fade-in stagger-1">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-stone-100 dark:bg-stone-900/50 mb-6 shadow-inner border border-stone-200 dark:border-white/5">
          <Activity className="w-7 h-7 text-[#a89968] dark:text-[#d4af37]" />
        </div>
        <h2 className="text-2xl font-light mb-4">Under Construction</h2>
        <p className="text-stone-600 dark:text-slate-400 max-w-md">
          We're building something special here. This section will soon host interactive tools and a personal dashboard for our clients.
        </p>
      </div>
    </div>
  );
}
