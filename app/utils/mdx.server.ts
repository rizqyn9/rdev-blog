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

// import { readFileSync } from 'fs'
// import { join } from 'path'
// import { bundleMDX } from 'mdx-bundler'
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
