import { notFound } from 'next/navigation'

import EmailPreviewFrame from '@/app/components/EmailPreviewFrame'
import {
  buildEmailPreviews,
  isEmailPreviewEnabled,
} from '@/app/lib/emailPreviewSample'

export const metadata = {
  title: 'Email previews | Sangeeta\'s Boutique',
  robots: { index: false, follow: false },
}

export default function EmailPreviewPage() {
  if (!isEmailPreviewEnabled()) {
    notFound()
  }

  const previews = buildEmailPreviews()

  return (
    <div className="min-h-screen bg-neutral-100 py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-navy/60">Sample order SNJ-482901</p>
          <h1 className="mt-2 font-serif text-3xl italic text-navy">Email previews</h1>
          <p className="mt-3 text-sm leading-relaxed text-navy/70 max-w-lg mx-auto">
            These are exactly what gets sent — scroll through all three to walk Sanji through
            the order flow. Buttons and links are for preview only.
          </p>
        </header>

        <div className="flex flex-col gap-10">
          {previews.map((preview) => (
            <EmailPreviewFrame key={preview.id} {...preview} />
          ))}
        </div>
      </div>
    </div>
  )
}
