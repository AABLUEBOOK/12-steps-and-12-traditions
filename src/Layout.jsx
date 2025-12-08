import React, { useEffect } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Layout({ children }) {
  useEffect(() => {
    // Set viewport, caching, and performance meta tags
    const metaTags = [
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover' },
      { httpEquiv: 'Cache-Control', content: 'public, max-age=31536000, immutable' },
      { httpEquiv: 'Content-Encoding', content: 'gzip, deflate, br' },
      { name: 'theme-color', content: '#1e293b' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'mobile-web-app-capable', content: 'yes' }
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

    // Preconnect to critical resources
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = window.location.origin;
    if (!document.querySelector(`link[rel="preconnect"]`)) {
      document.head.appendChild(preconnect);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-900 will-change-auto">
        <style>{`
              /* Critical render optimizations */
              * { 
                box-sizing: border-box;
                margin: 0;
                padding: 0;
              }
              html { 
                scroll-behavior: smooth;
                -webkit-text-size-adjust: 100%;
                text-rendering: optimizeSpeed;
                overflow-x: hidden;
                width: 100%;
                height: 100%;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                line-height: 1.5;
                width: 100%;
                min-height: 100vh;
                overflow-x: hidden;
              }
              img, video { 
                max-width: 100%; 
                height: auto;
                display: block;
                loading: lazy;
              }

              /* GPU acceleration & performance */
              .will-change-auto { 
                will-change: auto;
                transform: translateZ(0);
                backface-visibility: hidden;
                perspective: 1000px;
              }

              /* Reduce layout shifts & CLS */
              .chapter-content p { min-height: 1.5em; }

              /* Content visibility for off-screen optimization */
              .chapter-card { content-visibility: auto; contain-intrinsic-size: auto 80px; }

        /* Responsive typography - mobile-first */
        html { font-size: 14px; }
        @media (min-width: 641px) { html { font-size: 15px; } }
        @media (min-width: 1025px) { html { font-size: 16px; } }

        /* Fluid containers for all devices */
        .max-w-3xl { 
          max-width: min(48rem, 100vw - 2rem); 
          width: 100%;
          margin-inline: auto;
        }

        /* Highlight classes for content */
        /* New highlighting scheme */
        .highlight-steps {
          background-color: #fdba74;
          color: #000000;
          padding: 2px 4px;
          border-radius: 3px;
        }
        .highlight-prayers {
          background-color: #86efac;
          color: #000000;
          padding: 2px 4px;
          border-radius: 3px;
        }
        .highlight-promises {
          background-color: #93c5fd;
          color: #000000;
          padding: 2px 4px;
          border-radius: 3px;
        }
        .highlight-info {
          background-color: #fef08a;
          color: #000000;
          padding: 2px 4px;
          border-radius: 3px;
        }
        .highlight-tab {
          background-color: #f9a8d4;
          color: #000000;
          padding: 2px 4px;
          border-radius: 3px;
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
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
        }

        .font-serif {
          font-family: Georgia, 'Times New Roman', serif;
        }

        /* Wix embed & responsive optimization */
        @media (max-width: 768px) {
          .max-w-3xl { max-width: 100%; padding-inline: 1rem; }
          .px-4 { padding-inline: 0.75rem; }
          body { font-size: 14px; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .max-w-3xl { padding-inline: 1.5rem; }
          body { font-size: 15px; }
        }
        @media (min-width: 1025px) {
          body { font-size: 16px; }
        }

        /* Tablet landscape optimization */
        @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
          .max-w-3xl { max-width: 90vw; }
        }

        /* Theme support */
        html.light {
          --bg-primary: #f8fafc;
          --bg-secondary: #e2e8f0;
          --text-primary: #0f172a;
          --text-secondary: #475569;
          --border-color: #cbd5e1;
        }
        html.light .bg-slate-900 { background-color: var(--bg-primary, #f8fafc) !important; }
        html.light .bg-slate-800 { background-color: var(--bg-secondary, #e2e8f0) !important; }
        html.light .bg-slate-700 { background-color: var(--bg-secondary, #e2e8f0) !important; }
        html.light .text-white { color: var(--text-primary, #0f172a) !important; }
        html.light .text-slate-300, html.light .text-slate-400 { color: var(--text-secondary, #475569) !important; }
        html.light .border-slate-600, html.light .border-slate-700 { border-color: var(--border-color, #cbd5e1) !important; }

        /* Text size support */
        [data-text-size="small"] { font-size: 14px; }
        [data-text-size="medium"] { font-size: 16px; }
        [data-text-size="large"] { font-size: 18px; }

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
        </ErrorBoundary>
        );
        }