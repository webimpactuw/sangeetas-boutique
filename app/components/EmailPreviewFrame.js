'use client'

/**
 * Renders email HTML in an isolated iframe (matches how email clients see it).
 */
export default function EmailPreviewFrame({ title, audience, when, html }) {
  return (
    <section className="rounded-xl border border-navy/10 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-navy/10 bg-[#f7f5f0] px-5 py-4">
        <h2 className="font-serif text-xl text-navy">{title}</h2>
        <p className="mt-1 text-sm text-navy/70">
          To: <strong>{audience}</strong> · {when}
        </p>
      </div>
      <iframe
        title={title}
        srcDoc={html}
        className="block w-full border-0 bg-[#f7f5f0]"
        style={{ minHeight: 820 }}
        sandbox="allow-same-origin"
      />
    </section>
  )
}
