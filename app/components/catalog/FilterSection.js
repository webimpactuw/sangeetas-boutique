/**
 * Filter drawer subsection with title, optional clear, and bottom divider.
 */
export default function FilterSection({ title, onClear, showClear = false, children }) {
  return (
    <section className="border-b border-sanji-border pb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-cardo font-bold text-navy text-base md:text-lg">{title}</h3>
        {showClear ? (
          <button
            type="button"
            onClick={onClear}
            className="font-cardo text-sm text-navy/70 underline underline-offset-2 hover:text-navy hover:no-underline transition-colors"
          >
            Clear
          </button>
        ) : null}
      </div>
      {children}
    </section>
  )
}
