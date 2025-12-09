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
        className="bg-[#5EAAFF]/10 backdrop-blur-xl rounded-full p-2 border border-[#5EAAFF]/20 text-[#5EAAFF] hover:bg-[#5EAAFF]/20 hover:scale-105 active:scale-95 transition-all duration-500 shadow-lg shadow-[#5EAAFF]/20"
        title="Settings"
      >
        <SettingsIcon className="w-6 h-6 drop-shadow-lg" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl max-w-md w-full p-8 relative shadow-2xl shadow-black/30 animate-in fade-in slide-in-from-top-4 duration-300">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-[#FFFFFD]/70 hover:text-[#FFFFFD] rounded-full p-2 hover:bg-white/10 hover:scale-110 active:scale-95 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-title tracking-wide text-[#FFFFFD] mb-6">Settings</h2>

            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-[#FFFFFD] mb-3">
                  {theme === 'dark' ? <Moon className="w-5 h-5 text-[#5EAAFF]" /> : <Sun className="w-5 h-5 text-[#5EAAFF]" />}
                  <span className="font-body font-semibold">Theme</span>
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex-1 py-3 px-4 rounded-2xl border transition-all duration-500 font-body font-semibold hover:scale-105 active:scale-95 ${
                      theme === 'dark'
                        ? 'bg-[#5EAAFF]/90 backdrop-blur-xl text-white border-white/20 shadow-xl shadow-[#5EAAFF]/40'
                        : 'bg-white/5 backdrop-blur-xl border-white/20 text-[#5EAAFF] hover:bg-white/10 hover:border-[#5EAAFF]/40 shadow-lg shadow-black/20'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex-1 py-3 px-4 rounded-2xl border transition-all duration-500 font-body font-semibold hover:scale-105 active:scale-95 ${
                      theme === 'light'
                        ? 'bg-[#5EAAFF]/90 backdrop-blur-xl text-white border-white/20 shadow-xl shadow-[#5EAAFF]/40'
                        : 'bg-white/5 backdrop-blur-xl border-white/20 text-[#5EAAFF] hover:bg-white/10 hover:border-[#5EAAFF]/40 shadow-lg shadow-black/20'
                    }`}
                  >
                    Light
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-[#FFFFFD] mb-3">
                  <Type className="w-5 h-5 text-[#5EAAFF]" />
                  <span className="font-body font-semibold">Text Size</span>
                </label>
                <div className="flex gap-3">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setTextSize(size)}
                      className={`flex-1 py-3 px-4 rounded-2xl border transition-all duration-500 capitalize font-body font-semibold hover:scale-105 active:scale-95 ${
                        textSize === size
                          ? 'bg-[#5EAAFF]/90 backdrop-blur-xl text-white border-white/20 shadow-xl shadow-[#5EAAFF]/40'
                          : 'bg-white/5 backdrop-blur-xl border-white/20 text-[#5EAAFF] hover:bg-white/10 hover:border-[#5EAAFF]/40 shadow-lg shadow-black/20'
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