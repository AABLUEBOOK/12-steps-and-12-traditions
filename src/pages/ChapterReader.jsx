import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPageUrl } from '@/utils';
import HighlightingGuide from '@/components/HighlightingGuide';

const chapters = [
  { id: 1, title: 'Contents', slug: 'contents', pages: 'p. 5-13', order: 1, section: 'front_matter' },
  { id: 2, title: 'Introduction', slug: 'introduction', pages: 'p. 14', order: 2, section: 'front_matter' },
  { id: 3, title: 'Foreword', slug: 'foreword', pages: 'p. 15-18', order: 3, section: 'front_matter' },
  { id: 4, title: 'Step One', slug: 'step-one', pages: 'p. 21-24', order: 4, section: 'steps', step_number: 1 },
  { id: 5, title: 'Step Two', slug: 'step-two', pages: 'p. 25-33', order: 5, section: 'steps', step_number: 2 },
  { id: 6, title: 'Step Three', slug: 'step-three', pages: 'p. 34-41', order: 6, section: 'steps', step_number: 3 },
  { id: 7, title: 'Step Four', slug: 'step-four', pages: 'p. 42-54', order: 7, section: 'steps', step_number: 4 },
  { id: 8, title: 'Step Five', slug: 'step-five', pages: 'p. 55-62', order: 8, section: 'steps', step_number: 5 },
  { id: 9, title: 'Step Six', slug: 'step-six', pages: 'p. 63-69', order: 9, section: 'steps', step_number: 6 },
  { id: 10, title: 'Step Seven', slug: 'step-seven', pages: 'p. 70-76', order: 10, section: 'steps', step_number: 7 },
  { id: 11, title: 'Step Eight', slug: 'step-eight', pages: 'p. 77-82', order: 11, section: 'steps', step_number: 8 },
  { id: 12, title: 'Step Nine', slug: 'step-nine', pages: 'p. 83-87', order: 12, section: 'steps', step_number: 9 },
  { id: 13, title: 'Step Ten', slug: 'step-ten', pages: 'p. 88-95', order: 13, section: 'steps', step_number: 10 },
  { id: 14, title: 'Step Eleven', slug: 'step-eleven', pages: 'p. 96-105', order: 14, section: 'steps', step_number: 11 },
  { id: 15, title: 'Step Twelve', slug: 'step-twelve', pages: 'p. 106-125', order: 15, section: 'steps', step_number: 12 },
  { id: 16, title: 'Tradition One', slug: 'tradition-one', pages: 'p. 129-131', order: 16, section: 'traditions', step_number: 1 },
  { id: 17, title: 'Tradition Two', slug: 'tradition-two', pages: 'p. 132-138', order: 17, section: 'traditions', step_number: 2 },
  { id: 18, title: 'Tradition Three', slug: 'tradition-three', pages: 'p. 139-145', order: 18, section: 'traditions', step_number: 3 },
  { id: 19, title: 'Tradition Four', slug: 'tradition-four', pages: 'p. 146-150', order: 19, section: 'traditions', step_number: 4 },
  { id: 20, title: 'Tradition Five', slug: 'tradition-five', pages: 'p. 151-155', order: 20, section: 'traditions', step_number: 5 },
  { id: 21, title: 'Tradition Six', slug: 'tradition-six', pages: 'p. 156-160', order: 21, section: 'traditions', step_number: 6 },
  { id: 22, title: 'Tradition Seven', slug: 'tradition-seven', pages: 'p. 161-167', order: 22, section: 'traditions', step_number: 7 },
  { id: 23, title: 'Tradition Eight', slug: 'tradition-eight', pages: 'p. 168-173', order: 23, section: 'traditions', step_number: 8 },
  { id: 24, title: 'Tradition Nine', slug: 'tradition-nine', pages: 'p. 174-178', order: 24, section: 'traditions', step_number: 9 },
  { id: 25, title: 'Tradition Ten', slug: 'tradition-ten', pages: 'p. 179-182', order: 25, section: 'traditions', step_number: 10 },
  { id: 26, title: 'Tradition Eleven', slug: 'tradition-eleven', pages: 'p. 183-186', order: 26, section: 'traditions', step_number: 11 },
  { id: 27, title: 'Tradition Twelve', slug: 'tradition-twelve', pages: 'p. 187-191', order: 27, section: 'traditions', step_number: 12 },
  { id: 28, title: 'The Twelve Traditions (Long Form)', slug: 'traditions-long-form', pages: 'p. 192-195', order: 28, section: 'traditions' },
];

export default function ChapterReader() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  
  const currentIndex = chapters.findIndex(c => c.slug === slug);
  const chapter = chapters[currentIndex];
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

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
          <p className="text-slate-300 text-center italic">
            Content for "{chapter.title}" will be added here.
          </p>
          <p className="text-slate-500 text-sm text-center mt-4">
            You can provide the text content to populate this chapter.
          </p>
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
    </div>
  );
}