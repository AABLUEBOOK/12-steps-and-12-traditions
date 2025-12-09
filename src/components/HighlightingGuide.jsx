import React, { memo } from 'react';

const HighlightingGuide = memo(function HighlightingGuide() {
  const highlights = [
    { label: 'Steps', color: 'bg-orange-400' },
    { label: 'Prayers', color: 'bg-green-400' },
    { label: 'Promises', color: 'bg-blue-400' },
    { label: 'General Info', color: 'bg-yellow-300' },
    { label: 'Tab Reference', color: 'bg-pink-400' },
  ];

  return (
    <div className="px-3 sm:px-4 py-4 sm:py-6">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-6 shadow-xl shadow-[#5EAAFF]/5">
          <h2 className="text-base sm:text-lg font-bold text-[#FFFFFD] mb-3 sm:mb-4 text-center font-title tracking-wide">Highlighting Guide</h2>
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              {highlights.slice(0, 3).map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded ${item.color} flex-shrink-0`}></span>
                  <span className="text-xs sm:text-sm text-[#FFFFFD] font-medium font-body">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              {highlights.slice(3).map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded ${item.color} flex-shrink-0`}></span>
                  <span className="text-xs sm:text-sm text-[#FFFFFD] font-medium font-body">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HighlightingGuide;