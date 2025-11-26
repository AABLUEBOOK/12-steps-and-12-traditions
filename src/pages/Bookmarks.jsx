import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, Trash2 } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const data = await base44.entities.Bookmark.list('-created_date');
      setBookmarks(data);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBookmark = async (id) => {
    try {
      await base44.entities.Bookmark.delete(id);
      setBookmarks(bookmarks.filter(b => b.id !== id));
      toast.success('Bookmark removed');
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      toast.error('Failed to remove bookmark');
    }
  };

  return (
    <div className="min-h-screen bg-slate-800">
      <header className="sticky top-0 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link 
            to={createPageUrl('Home')}
            className="text-teal-400 hover:text-teal-300 flex items-center gap-2 text-sm mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Contents
          </Link>
          <h1 className="text-xl md:text-2xl font-serif text-white flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-teal-400" />
            My Bookmarks
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-slate-400 py-12">Loading...</div>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No bookmarks yet</p>
            <p className="text-slate-500 text-sm mt-2">
              Tap the bookmark icon on any chapter to save it here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50 flex items-center justify-between"
              >
                <Link
                  to={createPageUrl(`ChapterReader?slug=${bookmark.chapter_slug}`)}
                  className="flex-1 text-white hover:text-teal-400 transition-colors"
                >
                  {bookmark.chapter_title}
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteBookmark(bookmark.id)}
                  className="text-slate-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}