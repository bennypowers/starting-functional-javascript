import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'slide-elements.local.js',
  output: {
    format: 'iife',
    file: 'slide-elements.nomodule.js',
    name: 'ESUpdate'
  },
  plugins: [
    resolve(),
    babel({
      presets: [['env', { modules: false }]],
      plugins: ['external-helpers'],
    }),
    uglify({
      warnings: true,
      keep_fnames: true,
      sourceMap: true,
      compress: { passes: 2 },
      mangle: { properties: false, keep_fnames: true }
    })
  ]
}
