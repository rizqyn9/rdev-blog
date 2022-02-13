import * as React from 'react'
import { LinksFunction, LoaderFunction, useLoaderData } from 'remix'
import { json } from 'remix'
import codeMdxStyles from '../styles/codemdx.css'
import prismStyles from '../styles/prism-theme.css'
import { CompileMDX } from '~/utils/mdx.server'
import { useMdxComponent } from '~/utils/mdx'
import { MDXComponents } from '~/components/MDXComponents'

type LoaderData = {
  code: string
  frontmatter: any
}

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: codeMdxStyles },
    // { rel: 'stylesheet', href: prismStyles },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const resultMdx = await CompileMDX()

  return json(resultMdx, { status: 200 })
}

function Blogs() {
  const data = useLoaderData<LoaderData>()

  const Component = useMdxComponent(data.code)

  return (
    <div className="text-pink">
      <h1>Blogs</h1>
      <div className="mdx prose mx-auto mt-4 w-full transition-colors dark:prose-invert">
        {/* @ts-ignore */}
        <Component components={{ ...MDXComponents }} />
      </div>
    </div>
  )
}

export default Blogs
