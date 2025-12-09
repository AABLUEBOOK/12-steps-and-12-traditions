import React, { Suspense, lazy } from 'react';
import { createPageUrl } from '@/utils';
import HighlightingGuide from '@/components/HighlightingGuide';
import ChapterCard from '@/components/ChapterCard';
import Settings from '@/components/Settings';

// Lazy load search (includes heavy content imports)
const SearchBar = lazy(() => import('@/components/SearchBar'));

export const chapters = [
  { id: 1, title: 'Foreword', slug: 'foreword', pages: 'p. 15', order: 1, section: 'front_matter' },
  { id: 2, title: 'Step One', slug: 'step-one', pages: 'p. 21', order: 2, section: 'steps', step_number: 1 },
  { id: 3, title: 'Step Two', slug: 'step-two', pages: 'p. 25', order: 3, section: 'steps', step_number: 2 },
  { id: 4, title: 'Step Three', slug: 'step-three', pages: 'p. 34', order: 4, section: 'steps', step_number: 3 },
  { id: 5, title: 'Step Four', slug: 'step-four', pages: 'p. 42', order: 5, section: 'steps', step_number: 4 },
  { id: 6, title: 'Step Five', slug: 'step-five', pages: 'p. 55', order: 6, section: 'steps', step_number: 5 },
  { id: 7, title: 'Step Six', slug: 'step-six', pages: 'p. 63', order: 7, section: 'steps', step_number: 6 },
  { id: 8, title: 'Step Seven', slug: 'step-seven', pages: 'p. 70', order: 8, section: 'steps', step_number: 7 },
  { id: 9, title: 'Step Eight', slug: 'step-eight', pages: 'p. 77', order: 9, section: 'steps', step_number: 8 },
  { id: 10, title: 'Step Nine', slug: 'step-nine', pages: 'p. 83', order: 10, section: 'steps', step_number: 9 },
  { id: 11, title: 'Step Ten', slug: 'step-ten', pages: 'p. 88', order: 11, section: 'steps', step_number: 10 },
  { id: 12, title: 'Step Eleven', slug: 'step-eleven', pages: 'p. 96', order: 12, section: 'steps', step_number: 11 },
  { id: 13, title: 'Step Twelve', slug: 'step-twelve', pages: 'p. 106', order: 13, section: 'steps', step_number: 12 },
  { id: 14, title: 'Tradition One', slug: 'tradition-one', pages: 'p. 129', order: 14, section: 'traditions', step_number: 1 },
  { id: 15, title: 'Tradition Two', slug: 'tradition-two', pages: 'p. 132', order: 15, section: 'traditions', step_number: 2 },
  { id: 16, title: 'Tradition Three', slug: 'tradition-three', pages: 'p. 139', order: 16, section: 'traditions', step_number: 3 },
  { id: 17, title: 'Tradition Four', slug: 'tradition-four', pages: 'p. 146', order: 17, section: 'traditions', step_number: 4 },
  { id: 18, title: 'Tradition Five', slug: 'tradition-five', pages: 'p. 150', order: 18, section: 'traditions', step_number: 5 },
  { id: 19, title: 'Tradition Six', slug: 'tradition-six', pages: 'p. 155', order: 19, section: 'traditions', step_number: 6 },
  { id: 20, title: 'Tradition Seven', slug: 'tradition-seven', pages: 'p. 160', order: 20, section: 'traditions', step_number: 7 },
  { id: 21, title: 'Tradition Eight', slug: 'tradition-eight', pages: 'p. 166', order: 21, section: 'traditions', step_number: 8 },
  { id: 22, title: 'Tradition Nine', slug: 'tradition-nine', pages: 'p. 172', order: 22, section: 'traditions', step_number: 9 },
  { id: 23, title: 'Tradition Ten', slug: 'tradition-ten', pages: 'p. 176', order: 23, section: 'traditions', step_number: 10 },
  { id: 24, title: 'Tradition Eleven', slug: 'tradition-eleven', pages: 'p. 180', order: 24, section: 'traditions', step_number: 11 },
  { id: 25, title: 'Tradition Twelve', slug: 'tradition-twelve', pages: 'p. 184', order: 25, section: 'traditions', step_number: 12 },
  { id: 26, title: 'The Twelve Traditions (Long Form)', slug: 'traditions-long-form', pages: 'p. 189', order: 26, section: 'traditions' },
];

export default function Home() {
        return (
          <div className="min-h-screen bg-slate-900 w-full will-change-auto">
            <header className="pt-10 pb-6 px-4 text-center" role="banner">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex-1" />
          <div className="flex-1 text-center">
            <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide mb-2">
              Twelve Steps And Twelve Traditions
            </h1>
            <p className="text-accent text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              A Guide for the Twelve Steps and Twelve Traditions of Alcoholics Anonymous
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <Settings />
          </div>
        </div>
      </header>

      <div className="px-4 pb-6">
        <Suspense fallback={<div className="h-12 max-w-md mx-auto glass-material rounded-2xl animate-pulse" />}>
          <SearchBar />
        </Suspense>
      </div>

      <HighlightingGuide />

      <main className="max-w-3xl mx-auto px-4 pb-12 pt-4" role="main">
        <nav className="space-y-2" role="navigation" aria-label="Chapter list">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
          </nav>
          </main>
    </div>
  );
}