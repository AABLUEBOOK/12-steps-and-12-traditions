import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-800">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        /* Highlight classes for content */
        .highlight-problem {
          background-color: #fde047;
          color: #1e293b;
          padding: 0 2px;
          border-radius: 2px;
        }
        .highlight-solution {
          background-color: #f472b6;
          color: #1e293b;
          padding: 0 2px;
          border-radius: 2px;
        }
        .highlight-action {
          background-color: #60a5fa;
          color: #1e293b;
          padding: 0 2px;
          border-radius: 2px;
        }
        .highlight-result {
          background-color: #4ade80;
          color: #1e293b;
          padding: 0 2px;
          border-radius: 2px;
        }
        
        /* Smooth transitions */
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Touch-friendly sizing */
        a, button {
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Typography */
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .font-serif {
          font-family: Georgia, 'Times New Roman', serif;
        }
      `}</style>
      {children}
    </div>
  );
}