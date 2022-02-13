import * as React from 'react'
import { LinksFunction, LoaderFunction, useLoaderData } from 'remix'
import { json } from 'remix'
import codeMdxStyles from '../styles/codemdx.css'
import prismStyles from '../styles/prism-theme.css'
import { CompileMDX } from '~/utils/mdx.server'
import { useMdxComponent } from '~/utils/mdx'
import { MDXComponents } from '~/components/MDXComponents'
import { Grid } from '~/components/grid'

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
    <div className="">
      <Grid className="mdx prose-light prose prose mb-24 ">
        <div className="col-span-full text-white">
          {/* @ts-ignore */}
          <Component components={{ ...MDXComponents }} />
        </div>
      </Grid>
    </div>
  )
}

export default Blogs
