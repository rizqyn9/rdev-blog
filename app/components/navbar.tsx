import clsx from 'clsx'
import * as React from 'react'
import { Link, Links, useLocation } from 'remix'

const LINKS = [
  { name: 'Home', to: '/' },
  { name: 'Blogs', to: '/blogs' },
  { name: 'Portfolio', to: 'portfolio' },
]

function NavLink({
  to,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & { to: string }) {
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)

  return (
    <li className="leading-2 px-5 py-2 text-xl font-bold">
      <Link
        className={clsx(
          'underlined block whitespace-nowrap text-lg font-medium hover:text-team-current focus:text-team-current focus:outline-none',
          {
            'active text-team-current': isSelected,
            'text-secondary': !isSelected,
          },
        )}
        prefetch="intent"
        to={to}
        {...rest}
      />
    </li>
  )
}

function Navbar() {
  return (
    <div className="px-5vw py-9 lg:py-12">
      <nav className="mx-auto flex max-w-8xl items-center justify-between text-pink">
        <div>
          <Link
            prefetch="intent"
            to="/"
            className="text-primary underlined block whitespace-nowrap text-2xl font-medium transition focus:outline-none"
          >
            <h1>R Dev Studio x Kontol Studio</h1>
          </Link>
        </div>
        <ul className="hidden lg:flex ">
          {LINKS.map(val => (
            <NavLink key={val.to} to={val.to}>
              {val.name}
            </NavLink>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export { Navbar }
