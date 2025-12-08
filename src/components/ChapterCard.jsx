import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { createPageUrl } from '@/utils';

const ChapterCard = memo(function ChapterCard({ chapter }) {
  const { title, pages, step_number, section } = chapter;
  const showNumber = section === 'steps' || section === 'traditions';
  const displayNumber = step_number ? `${step_number}.` : null;

  return (
    <Link to={createPageUrl(`ChapterReader?slug=${chapter.slug}`)} className="block group chapter-card">
      <div className="bg-slate-700/50 hover:bg-slate-700/80 border border-slate-600/50 rounded-lg px-5 py-4 transition-all duration-200 flex items-center justify-between will-change-auto">
        <div className="flex items-center gap-3">
          {showNumber && displayNumber && (
            <span className="text-teal-300 font-mono text-sm min-w-[24px]">{displayNumber}</span>
          )}
          <span className="text-slate-50 font-medium tracking-wide">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          {pages && <span className="text-slate-300 text-sm">{pages}</span>}
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-200 transition-colors" />
        </div>
      </div>
    </Link>
  );
});

export default ChapterCard;