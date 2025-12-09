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
      <div className="glass-material glass-elevation glass-interactive rounded-3xl px-6 py-5 flex items-center justify-between will-change-auto">
        <div className="flex items-center gap-3">
          {showNumber && displayNumber && (
            <span className="text-accent font-mono text-sm min-w-[24px] font-semibold">{displayNumber}</span>
          )}
          <span className="text-white font-medium tracking-wide">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          {pages && <span className="text-slate-300/90 text-sm">{pages}</span>}
          <ChevronRight className="w-5 h-5 text-accent/70 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </Link>
  );
});

export default ChapterCard;