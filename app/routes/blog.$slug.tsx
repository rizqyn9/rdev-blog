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
import { BackLink } from '~/components/ArrrowButton'

type LoaderData = {
  page: BlogType
}

export const meta: MetaFunction = data => {
  return {
    title: `Blog - ${data.data.frontmatter.title}`,
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

  // return existing slug
  return json(resultMdx)

  // Throw if slug doesnt exist
  // throw json({}, { status: 404 })
}

export default function Blogs() {
  const { frontmatter, code } = useLoaderData<BlogType>()

  const Component = useMdxComponent(code)

  return (
    <div className="text-white">
      <Grid className="mb-10 mt-24 lg:mb-24">
        <div className="col-span-full flex justify-between lg:col-span-8 lg:col-start-3">
          Test Title
          <BackLink to="/">Back to overview</BackLink>
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
