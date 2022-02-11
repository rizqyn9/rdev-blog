import * as React from 'react'
import * as mdxBundler from 'mdx-bundler/client'

function getMdxComponent(code: string) {
  const Component = mdxBundler.getMDXComponent(code)
  function RBlogMdxComponent({
    components,
    ...rest
  }: Parameters<typeof Component>['0']) {
    return <Component components={{ ...components }} {...rest} />
  }
  return RBlogMdxComponent
}

function useMdxComponent(code: string) {
  return React.useMemo(() => getMdxComponent(code), [code])
}

export { useMdxComponent }
