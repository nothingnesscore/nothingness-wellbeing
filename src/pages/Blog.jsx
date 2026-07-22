import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { getPosts } from '../services/github';
import { useTheme } from '../context/ThemeContext';

export function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    getPosts().then((fetchedPosts) => {
      setPosts(fetchedPosts);
      setLoading(false);
    });
  }, []);

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto">
      
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight text-stone-900 dark:text-slate-50">
          Thoughts & <span className="italic text-[#d4af37]">Reflections</span>
        </h1>
        <p className="text-lg text-stone-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
          Exploring psychology, person-centred therapy, and the philosophy of well-being.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {posts.length > 0 ? posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.number}`} className="block group">
              <div className={`h-full glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#d4af37]/10 ${darkMode ? 'border-white/5' : 'border-stone-200/50'}`}>
                {post.coverImage && post.coverImage.url && (
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={post.coverImage.url} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-slate-400 mb-4 font-sans">
                    {post.publishedAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                    {post.readTimeInMinutes && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTimeInMinutes} min read
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-light mb-3 text-stone-900 dark:text-slate-50 group-hover:text-[#d4af37] transition-colors leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm text-stone-600 dark:text-slate-400 mb-6 font-sans line-clamp-3 leading-relaxed">
                    {post.brief}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-stone-800 dark:text-slate-200 group-hover:text-[#d4af37] transition-colors">
                    Read Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          )) : (
            <div className="col-span-full text-center py-20">
              <p className="text-stone-500 dark:text-slate-400 text-lg mb-4">No articles found just yet.</p>
              <p className="text-sm text-stone-400">Create a GitHub Issue in the repository with the label <strong>blog</strong> to add one!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
