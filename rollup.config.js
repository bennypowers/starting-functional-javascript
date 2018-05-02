import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'slide-elements.js',
  output: {
    format: 'iife',
    file: 'slide-elements.nomodule.js',
    name: 'ESUpdate'
  },
  plugins: [
    resolve()
  ]
}
