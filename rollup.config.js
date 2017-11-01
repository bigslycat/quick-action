import babel from 'rollup-plugin-babel'

import packageJson from './package.json'

const banner = `
/**
 * ${packageJson.name} v${packageJson.version}
 * ${packageJson.description}
 */
`

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/bundle.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        'flow',
        ['env', {
          targets: { browsers: [
            'last 2 versions',
            'safari >= 7',
            'ie >= 9',
          ] },
          modules: false,
        }],
      ],
    }),
  ],
  banner,
}
