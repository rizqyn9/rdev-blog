import { ReactNode } from 'react'
import clsx from 'clsx'

const variantStyle = {
  primary: 'text-white bg-pink',
  secondary: '',
}

type ButtonProps = {
  children: ReactNode
  variant?: keyof typeof variantStyle
  className?: string
}

function Button({ children, variant = 'primary', className }: ButtonProps) {
  return (
    <button
      className={clsx(
        'w-full rounded-full py-6 px-8',
        variantStyle[variant],
        className,
      )}
    >
      <span>{children}</span>
    </button>
  )
}

export { Button }
