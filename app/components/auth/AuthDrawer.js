'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Right-side auth panel matching Figma drawer (login, signup, account menu).
 */
export default function AuthDrawer({ children, onClose, closeHref = '/' }) {
  const router = useRouter()

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const handleClose = () => {
    if (onClose) {
      onClose()
      return
    }
    if (closeHref) {
      router.push(closeHref)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close panel"
        className="flex-1 bg-black/50 min-w-0"
        onClick={handleClose}
      />
      <aside className="relative w-full min-w-[min(100%,360px)] max-w-[min(100%,360px)] md:max-w-[420px] lg:max-w-[480px] xl:max-w-[560px] bg-white h-full overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-10 bg-white border-b border-navy/20 px-6 md:px-10 pt-6 pb-4 flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="hover:opacity-80 transition-opacity"
            aria-label="Close"
          >
            <Image
              src="/images/boutique-logo-bw.png"
              alt=""
              width={70}
              height={70}
              className="object-contain w-14 h-14 md:w-[70px] md:h-[70px]"
            />
          </button>
        </div>
        <div className="px-6 md:px-10 lg:px-12 pb-16 pt-4">{children}</div>
      </aside>
    </div>
  )
}
