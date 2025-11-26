import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Highlighter } from 'lucide-react';
import { toast } from 'sonner';

const HIGHLIGHT_COLORS = {
  yellow: 'bg-yellow-300/50',
  green: 'bg-green-400/50',
  blue: 'bg-blue-400/50',
  pink: 'bg-pink-400/50',
  orange: 'bg-orange-400/50'
};

export default function HighlightableContent({ content, chapterSlug }) {
  const [userHighlights, setUserHighlights] = useState([]);
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');
  const contentRef = useRef(null);

  useEffect(() => {
    loadHighlights();
  }, [chapterSlug]);

  const loadHighlights = async () => {
    try {
      const highlights = await base44.entities.UserHighlight.filter({ chapter_slug: chapterSlug });
      setUserHighlights(highlights);
    } catch (error) {
      console.error('Error loading highlights:', error);
    }
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (text && text.length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      setSelectedText(text);
      setPickerPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 50
      });
      setShowColorPicker(true);
    } else {
      setShowColorPicker(false);
    }
  };

  const saveHighlight = async (color) => {
    if (!selectedText) return;

    try {
      await base44.entities.UserHighlight.create({
        chapter_slug: chapterSlug,
        text: selectedText,
        color: color
      });
      
      await loadHighlights();
      setShowColorPicker(false);
      window.getSelection()?.removeAllRanges();
      toast.success('Highlight saved');
    } catch (error) {
      console.error('Error saving highlight:', error);
      toast.error('Failed to save highlight');
    }
  };

  const applyUserHighlights = (htmlContent) => {
    let result = htmlContent;
    
    userHighlights.forEach(highlight => {
      const escapedText = highlight.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedText})`, 'gi');
      result = result.replace(regex, `<mark class="${HIGHLIGHT_COLORS[highlight.color]} px-0.5 rounded user-highlight" data-id="${highlight.id}">$1</mark>`);
    });

    return result;
  };

  const processedContent = applyUserHighlights(content || '');

  return (
    <div className="relative">
      {showColorPicker && (
        <div
          className="fixed z-50 bg-slate-800 rounded-lg shadow-xl border border-slate-600 p-2 flex gap-2"
          style={{
            left: `${pickerPosition.x}px`,
            top: `${pickerPosition.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <Highlighter className="w-4 h-4 text-slate-400 mr-1" />
          {Object.entries(HIGHLIGHT_COLORS).map(([color, bgClass]) => (
            <button
              key={color}
              onClick={() => saveHighlight(color)}
              className={`w-6 h-6 rounded ${bgClass.replace('/50', '')} hover:scale-110 transition-transform border-2 border-transparent hover:border-white`}
              title={color}
            />
          ))}
          <button
            onClick={() => setShowColorPicker(false)}
            className="ml-1 text-slate-400 hover:text-white text-xs px-2"
          >
            ✕
          </button>
        </div>
      )}

      <div
        ref={contentRef}
        onMouseUp={handleMouseUp}
        className="chapter-content select-text"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </div>
  );
}