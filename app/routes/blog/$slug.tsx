import * as React from 'react'
import { LoaderFunction, Outlet } from 'remix'
import { json, useLoaderData } from 'remix'
import { Grid } from '~/components/grid'
import { H3 } from '~/components/typography'
import { useMdxComponent } from '~/utils/mdx'
import { Test } from '~/utils/mdx.server'
import * as DummyMdx from '../dummy.mdx'

type LoaderData = {
  page: any
}

export const loader: LoaderFunction = async ({ request }) => {
  const resultMdx = await Test()

  const data: LoaderData = {
    page: resultMdx?.code,
  }

  return json(data, { status: 200 })
}

export default function MDXRender() {
  const data = useLoaderData<LoaderData>()

  const RblogMdxComponent = useMdxComponent(data.page)
  return (
    <div className="text-white">
      <Grid
        as="main"
        className="prose-light dark:prose-dark prose mb-24 block bg-pink"
      >
        <RblogMdxComponent />
      </Grid>
      <Outlet />
    </div>
  )
}
