const CoreJsVersion = '3.24'
const BabelRuntimeVersion = '7.18'

module.exports = api => {
  const production = api.env('production')
  const development = !production

  const presets = [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        corejs: CoreJsVersion,
        modules: false,
        useBuiltIns: 'entry'
      }
    ],
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        development,
        runtime: 'automatic'
      }
    ]
  ]

  const plugins = [
    'macros',
    ['@babel/plugin-transform-runtime', { version: BabelRuntimeVersion }],
    'lodash',
    [
      'babel-plugin-styled-components',
      {
        pure: true,
        displayName: development,
        fileName: development
      }
    ],
    production ? '@babel/plugin-transform-react-constant-elements' : undefined,
    development ? 'react-refresh/babel' : undefined
  ].filter(value => value != null)

  return {
    presets,
    plugins
  }
}
