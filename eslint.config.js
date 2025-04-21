import antfu from '@antfu/eslint-config'

export default antfu({
  yaml: true,
  typescript: true,
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  rules: {
    'perfectionist/sort-imports': 'warn',
    'perfectionist/sort-named-exports': 'warn',
    'sort-imports': [
      'error',
      {
        "groups": [
          ["builtin", "external"],
          "internal",
          "sibling",
          "parent",
          "index"
        ],
        allowSeparatedGroups: true,
        //   ignoreCase: false,
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
  },
})
