import clsx from 'clsx'
import { ReactNode } from 'react'
import { Link, LinkProps } from 'remix'
import { motion, useReducedMotion, Variant } from 'framer-motion'
import { H1, H3, H6 } from './typography'
import { useElementState, ElementState } from './hooks/useELemetState'
import { ArrowIcon, ArrowIconProps } from './arrowIcon'

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
        'flex space-x-4 underline-offset-4 transition-all hover:underline focus:outline-none',
        className,
      )}
      animate={state}
      transition={shouldReduceMotion ? { duration: 0 } : {}}
    >
      <motion.span
        variants={shouldReduceMotion ? {} : arrowVariants.left}
        transition={shouldReduceMotion ? { duration: 0 } : {}}
      >
        <ArrowIcon direction="left" />
      </motion.span>
      <H6 as="span">{children}</H6>
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
