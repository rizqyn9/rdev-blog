import * as React from 'react'
import { Outlet } from 'remix'

function Blogs() {
  return (
    <div className="">
      <h1>Blogs</h1>
      <Outlet />
    </div>
  )
}

export default Blogs
