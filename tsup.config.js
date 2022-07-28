import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  bundle: true,
  minify: true,
  outDir: 'lib',
  dts: true,
  config: './tsconfig.json',
  loader: {
    '.scss': 'file'
  },
  format: ['cjs', 'esm'],outExtension({ format, options, pkgType }) {
    return {
      js: `.${format}.js`,
    }
  }
});
