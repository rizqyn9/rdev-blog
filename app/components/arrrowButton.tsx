import clsx from 'clsx'
import { ReactNode } from 'react'
import { Link, LinkProps } from 'remix'
import { motion, useReducedMotion, Variant } from 'framer-motion'
import { H1, H3 } from './typography'
import { useElementState, ElementState } from './hooks/useELemetState'
import { ArrowIconProps } from './arrowIcon'

const LinkMotion = motion(Link)

const BackLink = ({
  to,
  className,
  children,
}: { to: LinkProps['to'] } & Partial<{
  className: string
  children: ReactNode
}>) => {
  const [ref, state] = useElementState()

  // Remove for dev only
  const shouldReduceMotion = !useReducedMotion()
  return (
    <LinkMotion
      to={to}
      className={clsx(
        'underlined block whitespace-nowrap text-lg font-medium hover:text-white focus:text-white focus:outline-none',
        className,
      )}
      animate={state}
      transition={shouldReduceMotion ? { duration: 0 } : {}}
    >
      <motion.span>back</motion.span>
    </LinkMotion>
  )
}

const arrowVariants: Record<
  ArrowIconProps['direction'],
  Record<ElementState, Variant>
> = {
  down: {
    initial: { y: 0 },
    hover: { y: 4 },
    focus: {
      y: [0, 4, 0],
      transition: { repeat: Infinity },
    },
    active: { y: 12 },
  },
  up: {
    initial: { y: 0 },
    hover: { y: -4 },
    focus: {
      y: [0, -4, 0],
      transition: { repeat: Infinity },
    },
    active: { y: -12 },
  },
  left: {
    initial: { x: 0 },
    hover: { x: -4 },
    focus: {
      x: [0, -4, 0],
      transition: { repeat: Infinity },
    },
    active: { x: -12 },
  },
  right: {
    initial: { x: 0 },
    hover: { x: 4 },
    focus: {
      x: [0, 4, 0],
      transition: { repeat: Infinity },
    },
    active: { x: 12 },
  },
  'top-right': {
    initial: { x: 0, y: 0 },
    hover: { x: 4, y: -4 },
    focus: {
      x: [0, 4, 0],
      y: [0, -4, 0],
      transition: { repeat: Infinity },
    },
    active: { x: 12, y: -12 },
  },
}

export { BackLink }
