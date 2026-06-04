/** Thin chevron for carousel prev/next — no background circle. */
export default function CarouselArrow({ direction = 'left', className = '' }) {
  const path = direction === 'left' ? 'M16 6L10 12L16 18' : 'M8 6L14 12L8 18'

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-8 h-8 md:w-10 md:h-10 shrink-0 ${className}`}
      aria-hidden
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
