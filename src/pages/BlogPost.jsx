import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getPostBySlug } from '../services/hashnode';
import { useTheme } from '../context/ThemeContext';

export function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    getPostBySlug(slug).then((fetchedPost) => {
      setPost(fetchedPost);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-light text-stone-900 dark:text-slate-50 mb-6">Post not found</h1>
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#d4af37] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="relative min-h-screen pt-24 pb-20 px-6 max-w-4xl mx-auto z-10">
      <Link to="/blog" className="inline-flex items-center gap-2 text-stone-500 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-50 transition-colors mb-8 font-sans text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to all articles
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-slate-400 mb-6 font-sans">
          {post.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          )}
          {post.readTimeInMinutes && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTimeInMinutes} min read
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-stone-900 dark:text-slate-50 leading-tight">
          {post.title}
        </h1>

        {post.coverImage && (
          <div className={`w-full aspect-[21/9] overflow-hidden rounded-2xl glass-card ${darkMode ? 'border-white/5' : 'border-stone-200/50'}`}>
            <img 
              src={post.coverImage.url} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </header>

      {/* Blog Content with Tailwind Typography */}
      <div className={`
        prose prose-lg max-w-none font-sans leading-relaxed
        prose-headings:font-serif prose-headings:font-light 
        prose-a:text-[#d4af37] prose-a:no-underline hover:prose-a:underline
        ${darkMode 
          ? 'prose-invert prose-p:text-slate-300 prose-headings:text-slate-50 prose-strong:text-slate-200 prose-blockquote:border-[#d4af37] prose-blockquote:text-slate-400 prose-li:text-slate-300' 
          : 'prose-p:text-stone-700 prose-headings:text-stone-900 prose-strong:text-stone-900 prose-blockquote:border-[#d4af37] prose-blockquote:text-stone-500 prose-li:text-stone-700'}
      `}
      dangerouslySetInnerHTML={{ __html: post.content.html }}
      />
    </article>
  );
}
