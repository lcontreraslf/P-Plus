import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { EDIT_MODE_STYLES } from './visual-editor-config.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

interface VitePlugin {
  name: string;
  apply: string;
  transformIndexHtml: () => Array<any>;
}

export default function inlineEditDevPlugin(): VitePlugin {
  return {
    name: 'vite:inline-edit-dev',
    apply: 'serve',
    transformIndexHtml() {
      const scriptPath = resolve(__dirname, 'edit-mode-script.ts');
      const scriptContent = readFileSync(scriptPath, 'utf-8');

      return [
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: scriptContent,
          injectTo: 'body'
        },
        {
          tag: 'style',
          children: EDIT_MODE_STYLES,
          injectTo: 'head'
        }
      ];
    }
  };
}
