import React from 'react';

export default function HighlightingGuide() {
  const highlights = [
    { label: 'Problem', color: 'bg-yellow-300' },
    { label: 'Solution', color: 'bg-pink-400' },
    { label: 'Action', color: 'bg-blue-400' },
    { label: 'Result', color: 'bg-green-400' },
  ];

  return (
    <div className="text-center py-4">
      <p className="text-slate-400 text-sm mb-3 tracking-wide">Highlighting Guide</p>
      <div className="flex justify-center items-center gap-6 flex-wrap">
        {highlights.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${item.color}`} />
            <span className="text-slate-300 text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}