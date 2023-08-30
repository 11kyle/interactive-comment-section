import Link from 'next/link'
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const variantStyles = {
  primary:
    'rounded-lg bg-moderate-blue py-3 px-6 text-white hover:bg-light-grayish-blue disabled:bg-light-grayish-blue',
  secondary:
    'rounded-full bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300',
  filled:
    'rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400',
  outline:
    'rounded-full py-1 px-3 text-zinc-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white',
  text: 'text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500',
  edit: 'text-moderate-blue hover:text-light-grayish-blue',
  delete: 'text-soft-red hover:text-pale-red',
}

export default function Button({
  variant = 'primary',
  className,
  children,
  icon,
  ...props
}) {
  let Component = props.href ? Link : 'button'

  className = classNames(
    'inline-flex gap-2 justify-center items-center overflow-hidden body-md font-medium transition',
    variantStyles[variant],
    className
  )

  return (
    <Component className={className} {...props}>
      {icon === 'edit' && <PencilIcon className='w-4 h-4' aria-hidden="true" />}
      {icon === 'delete' && <TrashIcon className='w-4 h-4' aria-hidden="true" />}
      {children}
    </Component>
  )
}
