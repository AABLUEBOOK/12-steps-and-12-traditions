import React, { useEffect } from 'react';

export default function Layout({ children }) {
  useEffect(() => {
    // Set viewport and caching meta tags
    const metaTags = [
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes' },
      { httpEquiv: 'Cache-Control', content: 'public, max-age=31536000, immutable' },
      { name: 'theme-color', content: '#1e293b' }
    ];
    
    metaTags.forEach(({ name, httpEquiv, content }) => {
      const existing = name 
        ? document.querySelector(`meta[name="${name}"]`)
        : document.querySelector(`meta[http-equiv="${httpEquiv}"]`);
      
      if (!existing) {
        const meta = document.createElement('meta');
        if (name) meta.name = name;
        if (httpEquiv) meta.httpEquiv = httpEquiv;
        meta.content = content;
        document.head.appendChild(meta);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-800 will-change-auto">
      <style>{`
        /* Critical render optimizations */
        * { box-sizing: border-box; }
        html { 
          scroll-behavior: smooth;
          -webkit-text-size-adjust: 100%;
          text-rendering: optimizeSpeed;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          line-height: 1.5;
        }
        img, video { max-width: 100%; height: auto; }
        
        /* GPU acceleration for animations */
        .will-change-auto { will-change: auto; }
        
        /* Reduce layout shifts */
        .chapter-content p { min-height: 1.5em; }
        
        html {
          scroll-behavior: smooth;
        }
        
        /* Highlight classes for content */
        /* New highlighting scheme */
        .highlight-steps {
          background-color: #fb923c;
          color: #1e293b;
          padding: 0 2px;
          border-radius: 2px;
        }
        .highlight-prayers {
          background-color: #4ade80;
          color: #1e293b;
          padding: 0 2px;
          border-radius: 2px;
        }
        .highlight-promises {
          background-color: #60a5fa;
          color: #1e293b;
          padding: 0 2px;
          border-radius: 2px;
        }
        .highlight-info {
          background-color: #fde047;
          color: #1e293b;
          padding: 0 2px;
          border-radius: 2px;
        }
        .highlight-tab {
          background-color: #f472b6;
          color: #1e293b;
          padding: 0 2px;
          border-radius: 2px;
        }

        /* Legacy classes for backwards compatibility */
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

        .font-serif {
          font-family: Georgia, 'Times New Roman', serif;
        }

        /* Iframe/embed optimizations */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
        `}</style>
      {children}
    </div>
  );
}