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
        className="text-accent hover:text-white p-2 rounded-full glass-interactive transition-all duration-300 hover:bg-white/10"
        title="Settings"
      >
        <SettingsIcon className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
          <div className="glass-material glass-elevation rounded-3xl max-w-md w-full p-8 relative animate-in fade-in slide-in-from-top-4 duration-300">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-slate-200 hover:text-white rounded-full p-2 hover:bg-white/10 transition-all duration-200"
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
                    className={`flex-1 py-3 px-4 rounded-2xl border transition-all duration-300 font-medium ${
                      theme === 'dark'
                        ? 'bg-accent border-accent text-white shadow-lg shadow-accent/30'
                        : 'bg-white/5 border-white/10 text-slate-100 hover:bg-white/10 hover:scale-105'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex-1 py-3 px-4 rounded-2xl border transition-all duration-300 font-medium ${
                      theme === 'light'
                        ? 'bg-accent border-accent text-white shadow-lg shadow-accent/30'
                        : 'bg-white/5 border-white/10 text-slate-100 hover:bg-white/10 hover:scale-105'
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
                      className={`flex-1 py-3 px-4 rounded-2xl border transition-all duration-300 capitalize font-medium ${
                        textSize === size
                          ? 'bg-accent border-accent text-white shadow-lg shadow-accent/30'
                          : 'bg-white/5 border-white/10 text-slate-100 hover:bg-white/10 hover:scale-105'
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