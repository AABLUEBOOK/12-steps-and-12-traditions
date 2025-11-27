// Consolidated chapter content - lazy loaded
import { chapterContent } from './chapterContent';
import { chapterContent2 } from './chapterContent2';
import { chapterContent3 } from './chapterContent3';
import { chapterContent4 } from './chapterContent4';
import { chapterContent5 } from './chapterContent5';
import { chapterContent6 } from './chapterContent6';
import { chapterContent7 } from './chapterContent7';
import { chapterContent8 } from './chapterContent8';
import { chapterContent9 } from './chapterContent9';
import { chapterContent10 } from './chapterContent10';
import { chapterContent11 } from './chapterContent11';

export const allContent = {
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

export const getChapterContent = (slug) => allContent[slug] || null;