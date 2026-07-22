import React, { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { PenTool, CheckCircle, AlertCircle, Key, ExternalLink } from 'lucide-react';
import { createPost } from '../../services/github';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export function BlogManager() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [token, setToken] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  // Load token from local storage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('github_pat');
    if (savedToken) setToken(savedToken);
  }, []);

  const handleTokenChange = (e) => {
    setToken(e.target.value);
    localStorage.setItem('github_pat', e.target.value);
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      setStatus({ type: 'error', message: 'Title and content cannot be empty.' });
      return;
    }
    if (!token.trim()) {
      setStatus({ type: 'error', message: 'GitHub Personal Access Token is required to publish.' });
      return;
    }

    setIsPublishing(true);
    setStatus(null);

    try {
      const issueNumber = await createPost(title, content, token);
      setStatus({ type: 'success', message: 'Published successfully! Redirecting...' });
      
      // Clear form
      setTitle('');
      setContent('');
      
      // Redirect to the new post after a short delay
      setTimeout(() => {
        navigate(`/blog/${issueNumber}`);
      }, 1500);
      
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Failed to publish post. Check your token.' });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto fade-in">
      
      <div className={`glass-card p-6 md:p-8 rounded-2xl mb-8 border ${darkMode ? 'border-white/5' : 'border-stone-200/50'}`}>
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-5 h-5 text-[#d4af37]" />
          <h3 className="text-xl font-light text-stone-900 dark:text-slate-50">GitHub Authentication</h3>
        </div>
        
        <p className="text-sm text-stone-600 dark:text-slate-400 mb-4 font-sans">
          To publish articles, provide a GitHub Personal Access Token (classic) with <strong>repo</strong> scope. 
          This is saved securely in your browser's local storage.
        </p>
        
        <div className="flex gap-4 items-center">
          <input
            type="password"
            value={token}
            onChange={handleTokenChange}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className={`flex-1 px-4 py-2 rounded-lg bg-transparent border focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all font-sans text-sm ${
              darkMode 
                ? 'border-white/10 text-white placeholder-slate-500 focus:border-[#d4af37]' 
                : 'border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[#d4af37]'
            }`}
          />
          <a 
            href="https://github.com/settings/tokens/new?scopes=repo&description=Nothingness+WellBeing+Blog+CMS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs flex items-center gap-1 text-[#d4af37] hover:underline whitespace-nowrap font-sans"
          >
            Generate Token <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className={`glass-card p-6 md:p-8 rounded-2xl border ${darkMode ? 'border-white/5' : 'border-stone-200/50'}`}>
        <div className="flex items-center gap-3 mb-8">
          <PenTool className="w-6 h-6 text-[#d4af37]" />
          <h2 className="text-2xl font-light text-stone-900 dark:text-slate-50">Write an Article</h2>
        </div>

        {status && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 font-sans text-sm border ${
            status.type === 'error' 
              ? 'bg-red-50/50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-900/50 dark:text-red-300'
              : 'bg-green-50/50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900/50 dark:text-green-300'
          }`}>
            {status.type === 'error' ? <AlertCircle className="w-5 h-5 flex-shrink-0" /> : <CheckCircle className="w-5 h-5 flex-shrink-0" />}
            <p>{status.message}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article Title"
              className={`w-full text-3xl font-light px-0 py-3 bg-transparent border-b focus:outline-none focus:border-[#d4af37] transition-colors ${
                darkMode 
                  ? 'border-white/10 text-white placeholder-slate-600' 
                  : 'border-stone-200 text-stone-900 placeholder-stone-400'
              }`}
            />
          </div>

          <div data-color-mode={darkMode ? 'dark' : 'light'} className="font-sans">
            <MDEditor
              value={content}
              onChange={setContent}
              height={500}
              preview="edit"
              className="!rounded-xl overflow-hidden shadow-inner border border-transparent"
              style={{
                backgroundColor: darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)',
                borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)'
              }}
            />
            <p className="text-xs text-stone-500 dark:text-slate-400 mt-3 flex justify-between">
              <span>Supports full Markdown and HTML.</span>
              <span>To add a Cover Image, upload or paste an image on the very first line.</span>
            </p>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className={`px-8 py-3 rounded-full font-sans text-sm tracking-wide font-medium transition-all flex items-center gap-2 ${
                isPublishing
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed dark:bg-stone-800 dark:text-stone-600'
                  : 'bg-stone-900 text-white hover:bg-stone-800 hover:shadow-lg dark:bg-white dark:text-stone-900 dark:hover:bg-slate-100 dark:hover:shadow-white/10'
              }`}
            >
              {isPublishing ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-500 dark:border-stone-400 border-t-transparent rounded-full animate-spin"></div>
                  Publishing...
                </>
              ) : (
                'Publish Article'
              )}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
