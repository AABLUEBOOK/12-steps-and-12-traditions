import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, X, Sun, Moon, Type } from 'lucide-react';

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [textSize, setTextSize] = useState(localStorage.getItem('textSize') || 'medium');

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-text-size', textSize);
    localStorage.setItem('textSize', textSize);
  }, [textSize]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-cyan-400 hover:text-cyan-300 p-2"
        title="Settings"
      >
        <SettingsIcon className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-slate-700 rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-200 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-white mb-6">Settings</h2>

            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-slate-100 mb-3">
                  {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <span className="font-medium">Theme</span>
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                      theme === 'dark'
                        ? 'bg-cyan-600 border-cyan-500 text-white'
                        : 'bg-slate-600 border-slate-500 text-slate-100 hover:bg-slate-500'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                      theme === 'light'
                        ? 'bg-cyan-600 border-cyan-500 text-white'
                        : 'bg-slate-600 border-slate-500 text-slate-100 hover:bg-slate-500'
                    }`}
                  >
                    Light
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-slate-100 mb-3">
                  <Type className="w-5 h-5" />
                  <span className="font-medium">Text Size</span>
                </label>
                <div className="flex gap-3">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setTextSize(size)}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-colors capitalize ${
                        textSize === size
                          ? 'bg-cyan-600 border-cyan-500 text-white'
                          : 'bg-slate-600 border-slate-500 text-slate-100 hover:bg-slate-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}