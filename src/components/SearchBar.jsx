import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { chapters } from '@/pages/Home';
import { chapterContent } from '@/components/chapterContent';
import { chapterContent2 } from '@/components/chapterContent2';
import { chapterContent3 } from '@/components/chapterContent3';
import { chapterContent4 } from '@/components/chapterContent4';
import { chapterContent5 } from '@/components/chapterContent5';
import { chapterContent6 } from '@/components/chapterContent6';
import { chapterContent7 } from '@/components/chapterContent7';
import { chapterContent8 } from '@/components/chapterContent8';
import { chapterContent9 } from '@/components/chapterContent9';
import { chapterContent10 } from '@/components/chapterContent10';
import { chapterContent11 } from '@/components/chapterContent11';

const allContent = {
  ...chapterContent,
  ...chapterContent2,
  ...chapterContent3,
  ...chapterContent4,
  ...chapterContent5,
  ...chapterContent6,
  ...chapterContent7,
  ...chapterContent8,
  ...chapterContent9,
  ...chapterContent10,
  ...chapterContent11
};

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchResults = [];
    const lowerQuery = query.toLowerCase();

    chapters.forEach(chapter => {
      const content = allContent[chapter.slug];
      if (!content) return;

      const plainText = stripHtml(content);
      const lowerText = plainText.toLowerCase();
      const index = lowerText.indexOf(lowerQuery);

      if (index !== -1) {
        const start = Math.max(0, index - 40);
        const end = Math.min(plainText.length, index + query.length + 40);
        let snippet = plainText.substring(start, end);
        if (start > 0) snippet = '...' + snippet;
        if (end < plainText.length) snippet = snippet + '...';

        searchResults.push({
          chapter,
          snippet,
          matchIndex: index
        });
      }
    });

    setResults(searchResults.slice(0, 10));
  }, [query]);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Search the book..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-500"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
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
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
              className="block px-4 py-3 hover:bg-slate-600 border-b border-slate-600 last:border-b-0"
            >
              <p className="text-teal-400 text-sm font-medium">{result.chapter.title}</p>
              <p className="text-slate-300 text-xs mt-1 line-clamp-2">{result.snippet}</p>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-slate-700 border border-slate-600 rounded-lg shadow-xl z-50 p-4">
          <p className="text-slate-400 text-sm text-center">No results found</p>
        </div>
      )}
    </div>
  );
}