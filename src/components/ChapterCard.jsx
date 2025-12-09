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
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl 
             bg-white/5 backdrop-blur-xl border border-white/10
             p-4 sm:p-5 transition-all duration-500 
             hover:bg-white/8 hover:border-[#5EAAFF]/40 hover:shadow-2xl hover:shadow-[#5EAAFF]/20
             hover:scale-[1.02] active:scale-[0.98]
             shadow-lg shadow-black/20 flex items-center justify-between will-change-auto" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(94, 170, 255, 0.03) 10px, rgba(94, 170, 255, 0.03) 20px);">
        <div className="flex items-center gap-3 flex-1">
          {showNumber && displayNumber && (
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 backdrop-blur-xl
                  flex items-center justify-center border border-white/20 flex-shrink-0
                  shadow-xl shadow-[#5EAAFF]/30 group-hover:shadow-[#5EAAFF]/50
                  group-hover:bg-white/15 transition-all duration-500">
              <span className="text-base sm:text-lg font-bold text-[#5EAAFF]">{displayNumber.replace('.', '')}</span>
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-bold text-[#FFFFFD] font-title tracking-wide">{title}</h3>
            {pages && <p className="text-[10px] sm:text-xs font-semibold text-[#5EAAFF] tracking-wider mt-0.5 font-body">{pages}</p>}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1.5
                text-[#5EAAFF]/60 group-hover:text-[#5EAAFF] 
                group-hover:bg-white/10 group-hover:border-[#5EAAFF]/30
                transition-all duration-500 group-hover:translate-x-1
                shadow-lg shadow-black/20 flex-shrink-0">
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
    </Link>
  );
});

export default ChapterCard;