import React, { useState } from 'react';
import { Activity, PenTool } from 'lucide-react';
import { BlogManager } from '../components/dashboard/BlogManager';

export function AppDashboard() {
  const [activeTab, setActiveTab] = useState('blog');

  return (
    <div className="max-w-5xl mx-auto px-6 py-32 min-h-[85vh]">
      <div className="text-center mb-12 fade-in">
        <h1 className="text-4xl md:text-5xl font-light mb-4">Well-Being App</h1>
        <div className="zen-line"></div>
        <p className="text-stone-600 dark:text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed font-sans">
          Your personal space for reflection, progress, and resources.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-12 fade-in stagger-1">
        <button
          onClick={() => setActiveTab('blog')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all font-sans ${
            activeTab === 'blog'
              ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-lg'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10'
          }`}
        >
          <PenTool className="w-4 h-4" />
          Blog Manager
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all font-sans ${
            activeTab === 'tools'
              ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-lg'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10'
          }`}
        >
          <Activity className="w-4 h-4" />
          Tools (Coming Soon)
        </button>
      </div>

      <div className="fade-in stagger-2">
        {activeTab === 'blog' ? (
          <BlogManager />
        ) : (
          <div className="flex flex-col items-center justify-center p-12 glass-card rounded-2xl w-full text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-stone-100 dark:bg-stone-900/50 mb-6 shadow-inner border border-stone-200 dark:border-white/5">
              <Activity className="w-7 h-7 text-[#a89968] dark:text-[#d4af37]" />
            </div>
            <h2 className="text-2xl font-light mb-4">Under Construction</h2>
            <p className="text-stone-600 dark:text-slate-400 max-w-md font-sans">
              We're building something special here. This section will soon host interactive tools and a personal dashboard for our clients.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
