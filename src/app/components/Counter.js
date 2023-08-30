"use client"

import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export default function Counter(props) {
  const [count, setCount] = useState(props.count)

  // Increase count
  const increment = () => {
    setCount(prevCount => prevCount + 1)
  }

  // Decrease count
  const decrement = () => {
    setCount(prevCount => prevCount - 1)
  }

  return (
    <span className="isolate inline-flex items-center justify-between rounded-[10px] bg-very-light-gray w-[100px] h-[40px] md:flex-col md:w-[40px] md:h-[100px]">
      <button
        type="button"
        className="relative inline-flex items-center rounded-l-[10px] px-2 h-full text-light-grayish-blue ring-1 ring-inset ring-very-light-gray hover:text-moderate-blue focus:z-10"
        onClick={increment}
      >
        <span className="sr-only">Increment</span>
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <span className='text-center text-moderate-blue heading-md'>
        {count}
      </span>
      <button
        type="button"
        className="relative inline-flex items-center rounded-r-[10px] px-2 h-full text-light-grayish-blue ring-1 ring-inset ring-very-light-gray hover:text-moderate-blue focus:z-10"
        onClick={decrement}
      >
        <span className="sr-only">Decrement</span>
        <MinusIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </span>
  )
}
