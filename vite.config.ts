import { defineConfig, type Plugin } from 'vite';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(rootDir, 'src');

/**
 * Replaces <!--#include header.html --> style comments with the contents of
 * src/partials/<file>. Uses `transform` (not `transformIndexHtml`) with
 * `enforce: 'pre'` so the replacement happens before Vite's own HTML
 * processing — this way <script>/<link> tags inside partials are discovered
 * and bundled. Every page still ships as plain static HTML (good for SEO and
 * for GitHub Pages, which has no server-side includes).
 */
function htmlPartials(): Plugin {
  return {
    name: 'html-partials',
    enforce: 'pre',
    transform(code: string, id: string): string | undefined {
      if (!id.endsWith('.html')) return undefined;
      if (!code.includes('#include')) return undefined;
      return code.replace(/<!--\s*#include\s+([\w.\-]+)\s*-->/g, (_m, file: string) => {
        return readFileSync(resolve(srcDir, 'partials', file), 'utf8');
      });
    },
  };
}

// Every *.html directly under src/ becomes a page: dist/<name>.html
const pages = readdirSync(srcDir)
  .filter((f) => f.endsWith('.html'))
  .reduce<Record<string, string>>((acc, f) => {
    acc[basename(f, '.html')] = resolve(srcDir, f);
    return acc;
  }, {});

export default defineConfig({
  root: 'src',
  publicDir: resolve(rootDir, 'public'),
  // Custom domain serves the site from the domain root.
  base: '/',
  plugins: [htmlPartials()],
  build: {
    outDir: resolve(rootDir, 'dist'),
    emptyOutDir: true,
    rollupOptions: { input: pages },
  },
});
