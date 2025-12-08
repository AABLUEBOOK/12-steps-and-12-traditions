import React, { Suspense, lazy, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPageUrl } from '@/utils';
import HighlightingGuide from '@/components/HighlightingGuide';
import Settings from '@/components/Settings';
import { chapters } from '@/pages/Home';
import { getChapterContent } from '@/components/allChapterContent';

// Lazy load heavy components
const AudioPlayer = lazy(() => import('@/components/AudioPlayer'));
const HighlightableContent = lazy(() => import('@/components/HighlightableContent'));

export default function ChapterReader() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  
  const { chapter, prevChapter, nextChapter, content } = useMemo(() => {
    const currentIndex = chapters.findIndex(c => c.slug === slug);
    return {
      chapter: chapters[currentIndex],
      prevChapter: currentIndex > 0 ? chapters[currentIndex - 1] : null,
      nextChapter: currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null,
      content: getChapterContent(slug)
    };
  }, [slug]);

  if (!chapter) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-200 mb-4">Chapter not found</p>
          <Link to={createPageUrl('Home')} className="text-accent text-accent-hover flex items-center gap-2 justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 w-full will-change-auto">
      <header className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 z-10" role="banner">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link to={createPageUrl('Home')} className="text-accent text-accent-hover flex items-center gap-2 text-sm mb-3">
            <ArrowLeft className="w-4 h-4" /> Back to Contents
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-serif text-white">{chapter.title}</h1>
              {chapter.pages && <p className="text-slate-200 text-sm mt-1">{chapter.pages}</p>}
            </div>
            <Settings />
          </div>
        </div>
      </header>

      <div className="border-b border-slate-700">
        <div className="max-w-3xl mx-auto">
          <HighlightingGuide />
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-8" role="main">
        <Suspense fallback={<div className="h-20 bg-slate-700/30 rounded-lg animate-pulse" />}>
          {content && <AudioPlayer content={content} />}
        </Suspense>

        <div className="bg-white rounded-lg p-6 md:p-8 border border-slate-600/50 shadow-2xl">
          <Suspense fallback={<div className="h-40 bg-gray-100 rounded animate-pulse" />}>
            {content ? (
              <HighlightableContent content={content} chapterSlug={slug} />
            ) : (
              <p className="text-gray-600 text-center italic">Content for "{chapter.title}" will be added here.</p>
            )}
          </Suspense>
        </div>
      </main>

      <nav className="max-w-3xl mx-auto px-4 pb-12" role="navigation" aria-label="Chapter navigation">
        <div className="flex items-center justify-between gap-4" role="group">
          {prevChapter ? (
            <Link to={createPageUrl(`ChapterReader?slug=${prevChapter.slug}`)} className="flex items-center gap-2 text-slate-200 hover:text-white group flex-1">
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <p className="text-xs text-slate-300">Previous</p>
                <p className="text-sm">{prevChapter.title}</p>
              </div>
            </Link>
          ) : <div className="flex-1" />}

          {nextChapter ? (
            <Link to={createPageUrl(`ChapterReader?slug=${nextChapter.slug}`)} className="flex items-center gap-2 text-slate-200 hover:text-white group flex-1 justify-end text-right">
              <div>
                <p className="text-xs text-slate-300">Next</p>
                <p className="text-sm">{nextChapter.title}</p>
              </div>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </nav>
    </div>
  );
}