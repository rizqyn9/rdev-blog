import * as React from 'react'
import { LinksFunction, LoaderFunction, useLoaderData } from 'remix'
import { json } from 'remix';
import codeMdxStyles from '../styles/codemdx.css'
import { CompileMDX } from '~/utils/mdx.server';
import { useMdxComponent } from '~/utils/mdx';


type LoaderData = {
  code: string;
  frontmatter: any;
}

export const links : LinksFunction = () => {
  return [
    {rel: 'stylesheet' , href: codeMdxStyles}
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
      <Component/>
    </div>
  )
}

export default Blogs
