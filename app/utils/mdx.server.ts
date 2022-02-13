import { readFileSync } from 'fs'
import { join } from 'path'
import { bundleMDX } from 'mdx-bundler'
import type { Options } from 'rehype-pretty-code'

const optionsRehype: Partial<Options> = {
  // Use one of Shiki's packaged themes
  //   theme: 'one-dark-pro',
  theme: JSON.parse(
    readFileSync(join(process.cwd(), 'contents', 'moonlight.json'), 'utf-8'),
  ),
  // Or your own JSON theme
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  // Feel free to add classNames that suit your docs
  onVisitHighlightedLine(node) {
    node.properties.className.push('highlighted')
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['word']
  },
}

/**
 * Use Dummy MDX File
 */
async function CompileMDX() {
  let folder = 'blog'
  let slug = 'dummy'

  try {
    const { default: gfm } = await import('remark-gfm')
    const { default: rehypeHightlight } = await import('rehype-highlight')
    // const { default: rehypePrism } = await import('rehype-prism-plus')
    const { default: rehypePretty } = await import('rehype-pretty-code')

    const source = readFileSync(
      join(process.cwd(), 'contents', folder, `${slug}.mdx`),
      'utf-8',
    )

    const compiled = await bundleMDX({
      source,
      xdmOptions(options) {
        options.remarkPlugins = [...(options.remarkPlugins ?? [])]
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          //   rehypeHightlight,
          [rehypePretty, optionsRehype],
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

// import { readFileSync } from 'fs'
// import { join } from 'path'
// import { bundleMDX } from 'mdx-bundler'
// import { remarkCodeBlocksShiki } from '@kentcdodds/md-temp'
// import * as U from 'unified'
// import * as mdxBundler from 'mdx-bundler/client'

// function removePreContainerDivs() {
//   return async function preContainerDivsTransformer(tree: H.Root) {
//     const { visit } = await import('unist-util-visit')
//     visit(
//       tree,
//       { type: 'element', tagName: 'pre' },
//       function visitor(node, index, parent) {
//         if (parent?.type !== 'element') return
//         if (parent.tagName !== 'div') return
//         if (parent.children.length !== 1 && index === 0) return
//         Object.assign(parent, node)
//       },
//     )
//   }
// }

// export async function Test(): Promise<{
//   code: string
//   frontmatter: any
// } | null> {
//   const { default: remarkAutolinkHeadings } = await import(
//     'remark-autolink-headings'
//   )
//   const { default: remarkSlug } = await import('remark-slug')
//   const { default: gfm } = await import('remark-gfm')
//   const { default: rehypeSlug } = await import('rehype-slug')
//   const { default: rehypeAutolinkHeadings } = await import(
//     'rehype-autolink-headings'
//   )

//   let type = 'blog'
//   let slug = 'dummy'
//   const source = true
//     ? readFileSync(join(process.cwd(), 'contents', type, `${slug}.mdx`), 'utf8')
//     : readFileSync(
//         join(process.cwd(), 'src', 'contents', `${type}.mdx`),
//         'utf8',
//       )

//   try {
//     const { code, frontmatter } = await bundleMDX({
//       source,
//       xdmOptions(options) {
//         options.remarkPlugins = [
//           ...(options.remarkPlugins ?? []),
//           remarkSlug,
//           [remarkAutolinkHeadings, { behavior: 'wrap' }],
//           gfm,
//           remarkCodeBlocksShiki,
//         ]
//         options.rehypePlugins = [
//           ...(options?.rehypePlugins ?? []),
//           rehypeSlug,
//           [
//             rehypeAutolinkHeadings,
//             {
//               properties: {
//                 className: ['hash-anchor'],
//               },
//             },
//           ],
//           // removePreContainerDivs,
//         ]
//         return options
//       },
//     })

//     return { code, frontmatter }
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }
