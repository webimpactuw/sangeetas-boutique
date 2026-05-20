/**
 * @param {{ initial: string, size?: 'sm' | 'md' | 'lg' }} props
 */
export default function UserAvatar({ initial, size = 'md' }) {
  const sizeClass =
    size === 'sm'
      ? 'size-10 text-xl'
      : size === 'lg'
        ? 'size-[60px] text-4xl'
        : 'size-12 text-2xl'

  return (
    <div
      className={`${sizeClass} rounded-full bg-[#2a9d8f] flex items-center justify-center shrink-0`}
      aria-hidden
    >
      <span className="font-cardo text-white leading-none">{initial}</span>
    </div>
  )
}
