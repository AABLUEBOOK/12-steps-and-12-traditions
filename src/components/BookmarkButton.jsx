import React, { useState, useEffect, useCallback } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function BookmarkButton({ chapterSlug, chapterTitle }) {
  const [bookmark, setBookmark] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Bookmark.filter({ chapter_slug: chapterSlug })
      .then(b => setBookmark(b[0] || null))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [chapterSlug]);

  const toggle = useCallback(async () => {
    try {
      if (bookmark) {
        await base44.entities.Bookmark.delete(bookmark.id);
        setBookmark(null);
        toast.success('Bookmark removed');
      } else {
        const created = await base44.entities.Bookmark.create({
          chapter_slug: chapterSlug,
          chapter_title: chapterTitle
        });
        setBookmark(created);
        toast.success('Bookmark added');
      }
    } catch (e) {
      toast.error('Failed to update bookmark');
    }
  }, [bookmark, chapterSlug, chapterTitle]);

  if (loading) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className={`${bookmark ? 'text-teal-400' : 'text-slate-400'} hover:text-teal-300`}
    >
      {bookmark ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
    </Button>
  );
}