import antfu from '@antfu/eslint-config'

export default antfu({
  yaml: true,
  typescript: true,
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
})
