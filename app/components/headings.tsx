import * as React from 'react'
function Heading1(props: React.ComponentProps<'h1'>) {
  return <h1 className="test-h1">{props.children}</h1>
}

export { Heading1 }
