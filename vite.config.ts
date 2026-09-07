import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'serve-seo-files',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/robots.txt') {
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
              res.end(fs.readFileSync(path.resolve(__dirname, 'public/robots.txt')));
              return;
            }
            if (req.url === '/sitemap.xml') {
              res.setHeader('Content-Type', 'application/xml; charset=utf-8');
              res.end(fs.readFileSync(path.resolve(__dirname, 'public/sitemap.xml')));
              return;
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      minify: 'esbuild',
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
                return 'vendor-react';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-lucide';
              }
              if (id.includes('gsap')) {
                return 'vendor-gsap';
              }
              if (id.includes('motion')) {
                return 'vendor-motion';
              }
              if (id.includes('jspdf') || id.includes('html2canvas')) {
                return 'vendor-pdf';
              }
            }
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
