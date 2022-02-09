import { bundleMDX } from 'mdx-bundler'
import type * as U from 'unified'
import type * as M from 'mdast'
import type * as H from 'hast'
import { remarkCodeBlocksShiki } from '@kentcdodds/md-temp'
import calculateReadingTime from 'reading-time'

async function markdownToHtmlDocument(markdownString: string) {
  const { unified } = await import('unified')
  const { default: markdown } = await import('remark-parse')
  const { default: remark2rehype } = await import('remark-rehype')
  const { default: rehypeStringify } = await import('rehype-stringify')
  const { default: doc } = await import('rehype-document')
  const { default: format } = await import('rehype-format')
  const result = await unified()
    .use(markdown)
    .use(remark2rehype)
    .use(doc)
    .use(format)
    .use(rehypeStringify)
    .process(markdownString)

  return result.value.toString()
}

const remarkPlugins: U.PluggableList = [remarkCodeBlocksShiki]

async function compileMdx<FrontmatterType extends Record<string, unknown>>(
  slug: string,
  // githubFiles: Array<GitHubFile>,
  content: string,
) {
  const { default: remarkAutolinkHeadings } = await import(
    'remark-autolink-headings'
  )
  const { default: remarkSlug } = await import('remark-slug')
  const { default: gfm } = await import('remark-gfm')

  const indexRegex = new RegExp(`${slug}\\/index.mdx?$`)
  // const indexFile = githubFiles.find(({ path }) => indexRegex.test(path))
  // if (!indexFile) return null

  // const rootDir = indexFile.path.replace(/index.mdx?$/, '')
  // const relativeFiles: Array<GitHubFile> = githubFiles.map(
  //   ({ path, content }) => ({
  //     path: path.replace(rootDir, './'),
  //     content,
  //   }),
  // )
  // const files = arrayToObj(relativeFiles, {
  //   keyName: 'path',
  //   valueName: 'content',
  // })

  try {
    const { frontmatter, code } = await bundleMDX({
      source: content,
      // files,
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
    const readTime = calculateReadingTime(content)

    return {
      code,
      readTime,
      frontmatter: frontmatter as FrontmatterType,
    }
  } catch (error: unknown) {
    console.error(`Compilation error for slug: `, slug)
    throw error
  }
}

export { markdownToHtmlDocument, compileMdx }
