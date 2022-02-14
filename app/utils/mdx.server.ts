import { readFileSync } from 'fs'
import { join } from 'path'
import { bundleMDX } from 'mdx-bundler'

/**
 * Use Dummy MDX File
 */
async function CompileMDX() {
  let folder = 'blog'
  let slug = 'dummy'

  try {
    const { default: gfm } = await import('remark-gfm')
    const { default: rehypePrism } = await import('rehype-prism-plus')
    const { default: rehypeCodeTitle } = await import('rehype-code-title')
    const { default: rehypeSlug } = await import('rehype-slug')
    const { default: rehypeAutoHeadings } = await import(
      'rehype-autolink-headings'
    )

    const source = readFileSync(
      join(process.cwd(), 'contents', folder, `${slug}.mdx`),
      'utf-8',
    )

    const compiled = await bundleMDX({
      source,
      xdmOptions(options) {
        options.remarkPlugins = [...(options.remarkPlugins ?? []), gfm]
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeSlug,
          rehypeCodeTitle,
          [rehypePrism, { showLineNumbers: true }],
          [
            rehypeAutoHeadings,
            {
              properties: {
                className: ['hash-anchor'],
              },
            },
          ],
        ]
        return options
      },
    })

    // console.log(compiled.code)
    return compiled
  } catch (error) {
    console.log(error)
  }
}

export { CompileMDX }
