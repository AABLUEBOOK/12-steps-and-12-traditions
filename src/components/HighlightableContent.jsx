import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { Highlighter, X } from 'lucide-react';
import { toast } from 'sonner';

const COLORS = {
  yellow: 'bg-yellow-300/50',
  green: 'bg-green-400/50',
  blue: 'bg-blue-400/50',
  pink: 'bg-pink-400/50',
  orange: 'bg-orange-400/50'
};

export default function HighlightableContent({ content, chapterSlug }) {
  const [highlights, setHighlights] = useState([]);
  const [picker, setPicker] = useState({ show: false, x: 0, y: 0, text: '' });

  useEffect(() => {
    base44.entities.UserHighlight.filter({ chapter_slug: chapterSlug })
      .then(setHighlights)
      .catch(console.error);
  }, [chapterSlug]);

  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (text?.length > 0) {
      const rect = selection.getRangeAt(0).getBoundingClientRect();
      setPicker({ show: true, x: rect.left + rect.width / 2, y: rect.top - 50, text });
    } else {
      setPicker(p => ({ ...p, show: false }));
    }
  }, []);

  const saveHighlight = useCallback(async (color) => {
    if (!picker.text) return;
    try {
      await base44.entities.UserHighlight.create({
        chapter_slug: chapterSlug,
        text: picker.text,
        color
      });
      const updated = await base44.entities.UserHighlight.filter({ chapter_slug: chapterSlug });
      setHighlights(updated);
      setPicker(p => ({ ...p, show: false }));
      window.getSelection()?.removeAllRanges();
      toast.success('Highlight saved');
    } catch (e) {
      toast.error('Failed to save');
    }
  }, [picker.text, chapterSlug]);

  const processedContent = useMemo(() => {
    if (!content) return '';
    let result = content;
    if (highlights.length === 0) return result;
    
    highlights.forEach(h => {
      const escaped = h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      result = result.replace(new RegExp(`(${escaped})`, 'gi'), 
        `<mark class="${COLORS[h.color]} px-0.5 rounded">$1</mark>`);
    });
    return result;
  }, [content, highlights]);

  return (
    <div className="relative">
      {picker.show && (
        <div
          className="fixed z-50 bg-slate-800 rounded-lg shadow-xl border border-slate-600 p-2 flex gap-2"
          style={{ left: picker.x, top: picker.y, transform: 'translateX(-50%)' }}
        >
          <Highlighter className="w-4 h-4 text-slate-400 mr-1" />
          {Object.entries(COLORS).map(([color, bg]) => (
            <button
              key={color}
              onClick={() => saveHighlight(color)}
              className={`w-6 h-6 rounded ${bg.replace('/50', '')} hover:scale-110 transition-transform`}
            />
          ))}
          <button onClick={() => setPicker(p => ({ ...p, show: false }))} className="ml-1 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <div onMouseUp={handleMouseUp} className="chapter-content select-text text-gray-900 leading-relaxed space-y-4 font-serif text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: processedContent }} />
    </div>
  );
}