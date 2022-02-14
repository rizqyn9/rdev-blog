import * as React from 'react'
import {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useCatch,
  useLoaderData,
} from 'remix'
import { json } from 'remix'
import codeMdxStyles from '../styles/codemdx.css'
import prismStyles from '../styles/prism-theme.css'
import { CompileMDX } from '~/utils/mdx.server'
import { useMdxComponent } from '~/utils/mdx'
import { MDXComponents } from '~/components/MDXComponents'
import { Grid } from '~/components/grid'
import { BlogType } from '../../types/index'
import { H1 } from '~/components/typography'

type LoaderData = {
  page: BlogType
}

export const meta: MetaFunction = data => {
  console.log(JSON.stringify)

  return {
    title: 'asdasd',
  }
}

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: codeMdxStyles },
    // { rel: 'stylesheet', href: prismStyles },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const resultMdx = await CompileMDX()

  return json(resultMdx)
  // throw json({}, { status: 404 })
}

export default function Blogs() {
  const { frontmatter, code } = useLoaderData<BlogType>()

  const Component = useMdxComponent(code)

  return (
    <div className="">
      <Grid className="mb-10 mt-24 lg:mb-24">
        <div className="col-span-full flex justify-between lg:col-span-8 lg:col-start-3">
          Test
          {/* <BackLink to="/blog">Back to overview</BackLink> */}
          {/* <TeamStats
            totalReads={data.totalReads}
            rankings={data.readRankings}
            direction="down"
            pull="right"
          /> */}
        </div>
      </Grid>

      <Grid className="mdx prose-light prose prose mb-24 ">
        <div className="col-span-full text-white">
          {/* @ts-ignore */}
          <Component components={{ ...MDXComponents }} />
        </div>
      </Grid>
    </div>
  )
}

// Handle slug notfound
export function CatchBoundary() {
  const caught = useCatch()

  console.log(caught)

  return (
    <div className="bg-pink">
      <H1>Not Found</H1>
    </div>
  )
}
