import { defineConfig } from 'tsup'
import svgrPlugin from 'esbuild-plugin-svgr';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  clean: true,
  bundle: true,
  minify: true,
  outDir: 'lib',
  dts: true,
  config: './tsconfig.json',
  esbuildPlugins: [
    svgrPlugin({ref: false})
  ],
  format: ['cjs', 'esm'],outExtension({ format, options, pkgType }) {
    return {
      js: `.${format}.js`,
    }
  }
});
