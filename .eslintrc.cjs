module.exports = {
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['deprecation'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/no-unused-prop-types': 'error',
    'react/prop-types': 'off' // Too many false positives with TypeScript
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'deprecation/deprecation': 'warn',
        '@typescript-eslint/consistent-type-definitions': 'off', // A matter of taste
        '@typescript-eslint/no-confusing-void-expression': 'off', // allow returning void from arrow func
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/non-nullable-type-assertion-style': 'off',
        '@typescript-eslint/ban-types': ['error', { types: { '{}': false } }], // un-ban {} objects
        '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }], // Doesn't work with final-form
        '@typescript-eslint/return-await': 'off', // Annoying with single-line functions
        '@typescript-eslint/strict-boolean-expressions': 'off', // We're not ready yet
        'no-void': ['error', { allowAsStatement: true }], // Useful with promises, where a promise is handled somewhere else. E.g. react-query usage.
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'import/order': [
          'warn',
          {
            groups: ['external', 'builtin', 'internal', 'parent', 'sibling', 'index'],
            pathGroups: [
              { pattern: '@/utils/**', group: 'internal', position: 'before' },
              { pattern: '@/hooks/**', group: 'internal', position: 'before' },
              { pattern: '@/providers/**', group: 'internal', position: 'before' },
              { pattern: '@/containers/**', group: 'internal', position: 'before' },
              { pattern: '@/components/**', group: 'internal', position: 'before' },
              { pattern: '@/**', group: 'internal', position: 'before' }
            ],
            'newlines-between': 'never',
            warnOnUnassignedImports: true
          }
        ],
        'sort-imports': [
          'warn',
          {
            ignoreCase: true,
            ignoreDeclarationSort: true
          }
        ]
      },
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        createDefaultProgram: true
      }
    }
  ]
}
