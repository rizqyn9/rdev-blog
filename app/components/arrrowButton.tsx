import clsx from 'clsx'
import { ReactNode } from 'react'
import { Link, LinkProps } from 'remix'
import { motion } from 'framer-motion'
import { H1, H3 } from './typography'

const LinkMotion = motion(Link)

const BackLink = ({
  to,
  className,
  children,
}: { to: LinkProps['to'] } & Partial<{
  className: string
  children: ReactNode
}>) => {
  return (
    <LinkMotion
      to={to}
      className={clsx(
        'underlined block whitespace-nowrap text-lg font-medium hover:text-white focus:text-white focus:outline-none',
        className,
      )}
    >
      <H3>back</H3>
    </LinkMotion>
  )
}

export { BackLink }
