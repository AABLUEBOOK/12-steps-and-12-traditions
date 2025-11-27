import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { chapters } from '@/pages/Home';

// Lazy load content only when needed
let cachedContent = null;
const getContent = async () => {
  if (!cachedContent) {
    const { allContent } = await import('./allChapterContent');
    cachedContent = allContent;
  }
  return cachedContent;
};

const stripHtml = (html) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load content lazily on first focus
  const handleFocus = useCallback(async () => {
    setIsOpen(true);
    if (!content) {
      const loadedContent = await getContent();
      setContent(loadedContent);
    }
  }, [content]);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    if (query.length < 2 || !content) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const searchResults = [];

      for (const chapter of chapters) {
        const chapterContent = content[chapter.slug];
        if (!chapterContent) continue;

        const plainText = stripHtml(chapterContent);
        const lowerText = plainText.toLowerCase();
        const index = lowerText.indexOf(lowerQuery);

        if (index !== -1) {
          const start = Math.max(0, index - 40);
          const end = Math.min(plainText.length, index + query.length + 40);
          let snippet = plainText.substring(start, end);
          if (start > 0) snippet = '...' + snippet;
          if (end < plainText.length) snippet += '...';

          searchResults.push({ chapter, snippet });
          if (searchResults.length >= 10) break;
        }
      }
      setResults(searchResults);
    }, 150);

    return () => clearTimeout(debounceRef.current);
  }, [query, content]);

  const handleClear = useCallback(() => {
    setQuery('');
    setResults([]);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Search the book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-500"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-slate-700 border border-slate-600 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          {results.map((result, idx) => (
            <Link
              key={idx}
              to={createPageUrl(`ChapterReader?slug=${result.chapter.slug}`)}
              onClick={() => { setIsOpen(false); setQuery(''); }}
              className="block px-4 py-3 hover:bg-slate-600 border-b border-slate-600 last:border-b-0"
            >
              <p className="text-teal-400 text-sm font-medium">{result.chapter.title}</p>
              <p className="text-slate-300 text-xs mt-1 line-clamp-2">{result.snippet}</p>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && content && (
        <div className="absolute top-full mt-2 w-full bg-slate-700 border border-slate-600 rounded-lg shadow-xl z-50 p-4">
          <p className="text-slate-400 text-sm text-center">No results found</p>
        </div>
      )}
    </div>
  );
}