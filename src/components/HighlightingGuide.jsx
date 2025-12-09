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
    <div className="text-center py-5">
      <p className="text-slate-200 text-sm mb-4 tracking-wide font-medium">Highlighting Guide</p>
      <div className="flex justify-center items-center gap-5 sm:gap-7 flex-wrap px-4">
        {highlights.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 group cursor-default">
            <div className={`w-5 h-5 rounded-full ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-200`} />
            <span className="text-slate-100 text-xs sm:text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default HighlightingGuide;