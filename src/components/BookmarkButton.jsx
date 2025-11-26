import React, { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function BookmarkButton({ chapterSlug, chapterTitle }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkBookmark();
  }, [chapterSlug]);

  const checkBookmark = async () => {
    try {
      const bookmarks = await base44.entities.Bookmark.filter({ chapter_slug: chapterSlug });
      if (bookmarks.length > 0) {
        setIsBookmarked(true);
        setBookmarkId(bookmarks[0].id);
      } else {
        setIsBookmarked(false);
        setBookmarkId(null);
      }
    } catch (error) {
      console.error('Error checking bookmark:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async () => {
    try {
      if (isBookmarked && bookmarkId) {
        await base44.entities.Bookmark.delete(bookmarkId);
        setIsBookmarked(false);
        setBookmarkId(null);
        toast.success('Bookmark removed');
      } else {
        const newBookmark = await base44.entities.Bookmark.create({
          chapter_slug: chapterSlug,
          chapter_title: chapterTitle
        });
        setIsBookmarked(true);
        setBookmarkId(newBookmark.id);
        toast.success('Bookmark added');
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Failed to update bookmark');
    }
  };

  if (loading) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleBookmark}
      className={`${isBookmarked ? 'text-teal-400' : 'text-slate-400'} hover:text-teal-300`}
      title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? (
        <BookmarkCheck className="w-5 h-5" />
      ) : (
        <Bookmark className="w-5 h-5" />
      )}
    </Button>
  );
}