import { readFileSync } from 'fs'
import { join } from 'path'
import { bundleMDX } from 'mdx-bundler'
import { remarkCodeBlocksShiki } from '@kentcdodds/md-temp'
import type * as U from 'unified'

const remarkPlugins: U.PluggableList = [remarkCodeBlocksShiki]

export async function Test(): Promise<{
  code: string
  frontmatter: any
} | null> {
  const { default: remarkAutolinkHeadings } = await import(
    'remark-autolink-headings'
  )
  const { default: remarkSlug } = await import('remark-slug')
  const { default: gfm } = await import('remark-gfm')

  let type = 'blog'
  let slug = 'dummy'
  const source = true
    ? readFileSync(join(process.cwd(), 'contents', type, `${slug}.mdx`), 'utf8')
    : readFileSync(
        join(process.cwd(), 'src', 'contents', `${type}.mdx`),
        'utf8',
      )

  try {
    const { code, frontmatter } = await bundleMDX({
      source,
      xdmOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          remarkSlug,
          [remarkAutolinkHeadings, { behavior: 'wrap' }],
          gfm,
          ...remarkPlugins,
        ]
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          // ...rehypePlugins,
        ]
        return options
      },
    })

    return { code, frontmatter }
  } catch (error) {
    console.log(error)
    return null
  }
}
