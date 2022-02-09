import clsx from 'clsx'
import * as React from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'medium' | 'large'
  children: React.ReactNode | React.ReactNode[]
}

function getClassName({ className }: { className?: string }) {
  return clsx(
    'group relative inline-flex text-lg font-medium focus:outline-none opacity-100 disabled:opacity-50 transition',
    className,
  )
}

function ButtonInner({
  children,
  variant,
  size,
}: Pick<ButtonProps, 'children' | 'variant' | 'size'>) {
  return (
    <>
      <div
        className={clsx(
          'focus-ring absolute inset-0 transform rounded-full opacity-100 transition disabled:opacity-50',
          {
            'bg- border-2 border-pink group-hover:border-transparent group-focus:border-white':
              variant === 'secondary' || variant === 'danger',
            danger: variant === 'danger',
            'bg-pink': variant === 'primary',
          },
        )}
      />

      <div
        className={clsx(
          'relative flex h-full w-full items-center justify-center whitespace-nowrap',
          {
            'text-pink': variant === 'secondary',
            'text-white': variant === 'primary',
            'text-red-500': variant === 'danger',
            'space-x-5 px-11 py-6': size !== 'medium',
            'space-x-3 px-8 py-4': size === 'medium',
          },
        )}
      >
        {children}
      </div>
    </>
  )
}

function Button({
  children,
  variant = 'primary',
  size = 'large',
  className,
  ...buttonProps
}: ButtonProps & JSX.IntrinsicElements['button']) {
  return (
    <button {...buttonProps} className={getClassName({ className })}>
      <ButtonInner variant={variant} size={size}>
        {children}
      </ButtonInner>
    </button>
  )
}

function LinkButton({
  className,
  underlined,
  ...buttonProps
}: { underlined?: boolean } & JSX.IntrinsicElements['button']) {
  return (
    <button
      {...buttonProps}
      className={clsx(
        className,
        underlined
          ? 'underlined whitespace-nowrap focus:outline-none'
          : 'underline',
        'text-primary inline-block',
      )}
    />
  )
}

export { Button, LinkButton }
