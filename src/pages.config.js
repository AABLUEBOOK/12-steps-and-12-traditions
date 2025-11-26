import Home from './pages/Home';
import ChapterReader from './pages/ChapterReader';
import Bookmarks from './pages/Bookmarks';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "ChapterReader": ChapterReader,
    "Bookmarks": Bookmarks,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};