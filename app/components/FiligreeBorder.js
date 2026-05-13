function Lotus() {
  return (
    <svg
      width="32"
      height="22"
      viewBox="0 0 32 22"
      fill="currentColor"
      aria-hidden
      className="flex-shrink-0"
    >
      <path d="M16 1.5 C16 6 17 10.5 16.6 14.5 L15.4 14.5 C15 10.5 16 6 16 1.5 Z" />
      <path d="M16 5 C13 8 11 11 9 14 L13.5 14 C14.5 11.5 15.2 9 16 5 Z" />
      <path d="M16 5 C19 8 21 11 23 14 L18.5 14 C17.5 11.5 16.8 9 16 5 Z" />
      <path d="M16 8 C12 10 8 12 5 15 L11 15.5 C12.5 13 14 11 16 8 Z" opacity="0.85" />
      <path d="M16 8 C20 10 24 12 27 15 L21 15.5 C19.5 13 18 11 16 8 Z" opacity="0.85" />
      <ellipse cx="16" cy="17" rx="9" ry="2" />
      <ellipse cx="16" cy="17" rx="11" ry="0.6" opacity="0.6" />
    </svg>
  )
}

export default function FiligreeBorder({ className = '' }) {
  return (
    <div
      className={`bg-cream-soft py-2 md:py-3 overflow-hidden text-navy ${className}`}
      aria-hidden
    >
      <div className="flex items-end justify-center gap-1 md:gap-2 px-2">
        {Array.from({ length: 40 }).map((_, i) => (
          <Lotus key={i} />
        ))}
      </div>
    </div>
  )
}
