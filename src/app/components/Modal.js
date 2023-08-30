"use client"

import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Modal({ ...props }) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div>
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Delete comment
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                      Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-soft-red px-3 py-2 text-sm font-semibold text-white uppercase shadow-sm hover:bg-pale-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-red sm:col-start-2"
                    onClick={() => props.deleteCommentBy()}
                  >
                    Yes, delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-grayish-blue px-3 py-2 text-sm font-semibold text-white uppercase shadow-sm hover:bg-light-grayish-blue sm:col-start-1 sm:mt-0"
                    onClick={() => props.setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    No, cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
