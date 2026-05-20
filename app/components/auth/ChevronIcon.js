export default function ChevronIcon({ className = '' }) {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-navy shrink-0 ${className}`}
      aria-hidden
    >
      <path
        d="M11 16L22.5 28L34 16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
