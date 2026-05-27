/** Horizontal floral divider — tiles `public/images/flowers.png` */
export default function FiligreeBorder({ className = '' }) {
  return (
    <div className={`bg-cream overflow-hidden ${className}`} aria-hidden>
      <div
        role="presentation"
        className="h-10 md:h-14 w-full bg-[url('/images/flowers.png')] bg-repeat-x bg-center bg-[length:auto_100%]"
      />
    </div>
  )
}
