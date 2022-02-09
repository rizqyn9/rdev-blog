import * as React from 'react'
import { json, useLoaderData } from 'remix'
import { H3 } from '~/components/typography'
import * as DummyMdx from '../dummy.mdx'

export const loader = async (data: any, data2: any) => {
  // let res = markdownToHtmlDocument(JSON.stringify(DummyMdx))
  // const compiled = await compileMdx('test', DummyMdx.attributes)
  // return json({ test: compiled }, { status: 200 })
  return null
}

export default function MDXRender() {
  const data = useLoaderData()
  return (
    <div>
      {JSON.stringify(data)}
      <H3>Test</H3>
    </div>
  )
}
