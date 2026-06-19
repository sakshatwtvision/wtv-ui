import { defineConfig } from 'tsup';
import { readFileSync, writeFileSync } from 'node:fs';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  sourcemap: false,
  clean: true,
  treeshake: true,
  splitting: false,
  tsconfig: './tsconfig.build.json',
  esbuildOptions(options) {
    options.conditions = ['module'];
  },
  async onSuccess() {
    // esbuild hoists imports above any banner, so we post-process
    // to prepend "use client" before the import block in the ESM output.
    const esmPath = './dist/index.js';
    const src = readFileSync(esmPath, 'utf-8');
    if (!src.startsWith('"use client"')) {
      writeFileSync(esmPath, '"use client";\n' + src);
    }
  },
});
