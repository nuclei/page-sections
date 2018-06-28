// rollup.config.js
import typescript from 'rollup-plugin-typescript'
import nodeResolve from 'rollup-plugin-node-resolve'

const pkg = require('./package')

export default {
  input: pkg.config.src,
  output: {
    file: pkg.main,
    format: 'iife',
    name: pkg.config.moduleName,
    sourceMap: true
  },
  plugins: [
    typescript({
      target: 'ES6',
      typescript: require('typescript')
    }),
    nodeResolve({
      module: true,
      jsnext: true,
      browser: true,
      extensions: [ '.js', '.json' ],
      preferBuiltins: false
    })
  ]
}
