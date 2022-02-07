const path = require('path')
// const defaultTheme = require('tailwindcss/defaultTheme')
const fromRoot = p => path.join(__dirname, p)

module.exports = {
  // the NODE_ENV thing is for https://github.com/Acidic9/prettier-plugin-tailwind/issues/29
  mode: process.env.NODE_ENV ? 'jit' : undefined,
  darkMode: 'class',
  //   purge: {
  //     mode: 'layers',
  //     enabled: process.env.NODE_ENV === 'production',
  //     content: [fromRoot('./app/**/*.+(js|ts|tsx|mdx|md)')],
  //   },
  content: [fromRoot('./app/**/*.+(js|ts|tsx|mdx|md)')],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
