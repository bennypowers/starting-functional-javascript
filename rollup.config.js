import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const modules = {
  input: 'slide-elements.local.js',
  output: {
    format: 'es',
    file: 'main.js',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    terser({
      warnings: true,
      keep_fnames: true,
      sourcemap: true,
      compress: { passes: 2 },
      mangle: { properties: false, keep_fnames: true }
    })
  ]
}

export default [
  modules
]
