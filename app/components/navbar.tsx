import * as React from 'react'
import { Link, Links, useLocation } from 'remix'

const LINKS = [{ name: 'Blogs', to: '/blog' }]

function NavLink({
  to,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & { to: string }) {
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)

  return (
    <li>
      <Link prefetch="intent" to={to} {...rest} />
    </li>
  )
}

function Navbar() {
  return (
    <div className="text-navy bg-gray-900">
      {LINKS.map(val => (
        <NavLink key={val.to} to={val.to}>
          {val.name}
        </NavLink>
      ))}
    </div>
  )
}

export { Navbar }
