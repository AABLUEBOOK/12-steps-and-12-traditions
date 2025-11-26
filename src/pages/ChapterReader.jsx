import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPageUrl } from '@/utils';
import HighlightingGuide from '@/components/HighlightingGuide';
import { chapters } from '@/pages/Home';
import { chapterContent } from '@/components/chapterContent';
import { chapterContent2 } from '@/components/chapterContent2';
import { chapterContent3 } from '@/components/chapterContent3';
import { chapterContent4 } from '@/components/chapterContent4';
import { chapterContent5 } from '@/components/chapterContent5';
import { chapterContent6 } from '@/components/chapterContent6';
import { chapterContent7 } from '@/components/chapterContent7';
import { chapterContent8 } from '@/components/chapterContent8';
import { chapterContent9 } from '@/components/chapterContent9';
import { chapterContent10 } from '@/components/chapterContent10';

// Merge all content
const allContent = {
  ...chapterContent,
  ...chapterContent2,
  ...chapterContent3,
  ...chapterContent4,
  ...chapterContent5,
  ...chapterContent6,
  ...chapterContent7,
  ...chapterContent8,
  ...chapterContent9,
  ...chapterContent10
};

export default function ChapterReader() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  
  const currentIndex = chapters.findIndex(c => c.slug === slug);
  const chapter = chapters[currentIndex];
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;
  
  const content = allContent[slug];

  if (!chapter) {
    return (
      <div className="min-h-screen bg-slate-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Chapter not found</p>
          <Link 
            to={createPageUrl('Home')}
            className="text-teal-400 hover:text-teal-300 flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-800">
      {/* Header */}
      <header className="sticky top-0 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link 
            to={createPageUrl('Home')}
            className="text-teal-400 hover:text-teal-300 flex items-center gap-2 text-sm mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Contents
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-serif text-white">
                {chapter.title}
              </h1>
              {chapter.pages && (
                <p className="text-slate-400 text-sm mt-1">{chapter.pages}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Highlighting Guide */}
      <div className="border-b border-slate-700">
        <div className="max-w-3xl mx-auto">
          <HighlightingGuide />
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-slate-700/30 rounded-lg p-6 md:p-8 border border-slate-600/50">
          {content ? (
            <div 
              className="chapter-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <>
              <p className="text-slate-300 text-center italic">
                Content for "{chapter.title}" will be added here.
              </p>
              <p className="text-slate-500 text-sm text-center mt-4">
                You can provide the text content to populate this chapter.
              </p>
            </>
          )}
        </div>
      </main>

      {/* Navigation */}
      <nav className="max-w-3xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between gap-4">
          {prevChapter ? (
            <Link
              to={createPageUrl(`ChapterReader?slug=${prevChapter.slug}`)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group flex-1"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <p className="text-xs text-slate-500">Previous</p>
                <p className="text-sm">{prevChapter.title}</p>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          
          {nextChapter ? (
            <Link
              to={createPageUrl(`ChapterReader?slug=${nextChapter.slug}`)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group flex-1 justify-end text-right"
            >
              <div>
                <p className="text-xs text-slate-500">Next</p>
                <p className="text-sm">{nextChapter.title}</p>
              </div>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </nav>

      <style>{`
        .chapter-content .prose {
          color: #cbd5e1;
        }
        .chapter-content .prose p {
          margin-bottom: 1rem;
          line-height: 1.8;
        }
        .chapter-content .prose h2 {
          color: white;
        }
        .chapter-content .prose h3 {
          color: #2dd4bf;
        }
      `}</style>
    </div>
  );
}