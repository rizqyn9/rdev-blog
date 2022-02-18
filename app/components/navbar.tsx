import clsx from 'clsx'
import * as React from 'react'
import { Link, Links, useLocation } from 'remix'
import { H1 } from './typography'
import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  useMenuButtonContext,
  MenuButton,
  Menu,
  MenuItems,
  MenuLink,
  MenuPopover,
} from '@reach/menu-button'

const LINKS = [
  { name: 'Blogs', to: '/blogs' },
  { name: 'Portfolio', to: '/portfolio' },
]
const MOBILE_LINKS = [{ name: 'Home', to: '/portfolio' }, ...LINKS]

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
          'underlined block whitespace-nowrap text-lg font-medium hover:text-white focus:text-white focus:outline-none',
          {
            'active text-white': isSelected,
            'text-pink': !isSelected,
          },
        )}
        prefetch="intent"
        to={to}
        {...rest}
      />
    </li>
  )
}

function MobileMenuList() {
  const { isExpanded } = useMenuButtonContext()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (isExpanded) {
      // don't use overflow-hidden, as that toggles the scrollbar and causes layout shift
      document.body.classList.add('fixed')
      document.body.classList.add('overflow-y-scroll')
      // alternatively, get bounding box of the menu, and set body height to that.
      document.body.style.height = '100vh'
    } else {
      document.body.classList.remove('fixed')
      document.body.classList.remove('overflow-y-scroll')
      document.body.style.removeProperty('height')
    }
  }, [isExpanded])

  if (typeof window !== 'undefined') {
    return (
      <AnimatePresence>
        {isExpanded ? (
          <MenuPopover
            position={r => ({
              top: `calc(${Number(r?.top) + Number(r?.height)}px + 2.25rem)`, // 2.25 rem = py-9 from navbar
              left: 0,
              bottom: 0,
              right: 0,
            })}
            style={{ display: 'block' }}
            className="z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.15,
                ease: 'linear',
              }}
              className="bg-primary flex h-full flex-col overflow-y-scroll border-t border-gray-200 pb-12 dark:border-gray-600"
            >
              <MenuItems className="border-none bg-transparent p-0">
                {MOBILE_LINKS.map(link => (
                  <MenuLink
                    className="hover:bg-secondary focus:bg-secondary text-primary border-b border-gray-200 px-5vw py-9 hover:text-team-current dark:border-gray-600"
                    key={link.to}
                    as={Link}
                    to={link.to}
                  >
                    {link.name}
                  </MenuLink>
                ))}
                <div className="noscript-hidden py-9 text-center">
                  {/* <DarkModeToggle variant="labelled" /> */}
                </div>
              </MenuItems>
            </motion.div>
          </MenuPopover>
        ) : null}
      </AnimatePresence>
    )
  } else {
    return null
  }
}

const topVariants = {
  open: { rotate: 45, y: 7 },
  closed: { rotate: 0, y: 0 },
}

const centerVariants = {
  open: { opacity: 0 },
  closed: { opacity: 1 },
}

const bottomVariants = {
  open: { rotate: -45, y: -5 },
  closed: { rotate: 0, y: 0 },
}

function MobileMenu() {
  const shouldReduceMotion = useReducedMotion()
  const transition = shouldReduceMotion ? { duration: 0 } : {}
  return (
    <Menu>
      {({ isExpanded }) => {
        const state = isExpanded ? 'open' : 'closed'
        return (
          <>
            <MenuButton className="focus:border-primary hover:border-primary border-secondary text-primary inline-flex h-14 w-14 items-center justify-center rounded-full border-2 p-1 transition focus:outline-none">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.rect
                  animate={state}
                  variants={topVariants}
                  transition={transition}
                  x="6"
                  y="9"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <motion.rect
                  animate={state}
                  variants={centerVariants}
                  transition={transition}
                  x="6"
                  y="15"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <motion.rect
                  animate={state}
                  variants={bottomVariants}
                  transition={transition}
                  x="6"
                  y="21"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            </MenuButton>

            <MobileMenuList />
          </>
        )
      }}
    </Menu>
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
            className="underlined block whitespace-nowrap text-2xl font-medium transition-all focus:outline-none"
          >
            <H1 className="font-rowdies text-pink">R Dev Studio</H1>
          </Link>
        </div>
        <ul className="hidden lg:flex ">
          {LINKS.map(val => (
            <NavLink key={val.to} to={val.to}>
              {val.name}
            </NavLink>
          ))}
        </ul>
        <div className="flex items-center justify-center">
          <div className="block lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </div>
  )
}

export { Navbar }
